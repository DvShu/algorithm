import HeapInterface from "./HeapInterface";
import Comparator from "../lang/Comparator";

/**
 * 堆，最大堆和最小堆都需要实现该类
 *     10
 *   7    2
 * 5   1
 *
 * 1. 获取某一个字节点的父节点：parent(i) = floor((i - 1) / 2)
 * 2. 同理根据父节点获取其左边字节的的index: 2*i + 1
 * 3. 根据父节点index获取其右边子节点的index: 2*i + 2
 */
export default abstract class Heap<T> {

  protected heapContainer: T[];
  protected readonly comparator: Comparator<T>;

  public constructor(compare?: Comparator<T>) {
    this.heapContainer = [];
    this.comparator = compare || new Comparator();
  }

  /**
   * 根据子节点的index获取父节点的 index
   * @param childIndex  子节点的 index
   * @private
   */
  private _parentIndex (childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * 根据字节的的 index 获取父节点
   * @param childIndex
   * @private
   */
  private _parent (childIndex: number): any {
    return this.heapContainer[this._parentIndex(childIndex)];
  }

  /**
   * 交换两个序列的值
   * @param index1
   * @param index2
   * @private
   */
  private _swap (index1, index2) {
    let tmp = this.heapContainer[index1];
    this.heapContainer[index1] = this.heapContainer[index2];
    this.heapContainer[index2] = tmp;
  }

  _hasLeftChild (i: number): boolean {
    return (2 * i + 1) < this.heapContainer.length;
  }

  /**
   * 在堆的尾部添加一个新的元素，然后使用 shiftUp 来修复堆。
   * 时间复杂度：O(log n)
   * @param item @{any}  在尾部插入的新的元素
   */
  insert(item: T) {
    this.heapContainer.push(item);
    this.shiftUp(); // 整理堆数据
  }

  /**
   * 从某个位置开始向上整理堆数据，如果不填，默认从数组最后开始
   * 如果一个节点比它的父节点大（最大堆）或者小（最小堆），那么需要将它同父节点交换位置。这样是这个节点在数组的位置上升。
   * @param startIndex @{interger} 从某个位置开始向上整理堆数据，如果不填，默认从数组最后开始
   */
  shiftUp (startIndex?: number) {
    // 获取插入到数组中的新数据的index
    let index = startIndex || this.heapContainer.length - 1;
    // 父节点的index
    let parentIndex = this._parentIndex(index);

    while (
      index > 0 &&
      !this.pairIsCorrect(this.heapContainer[parentIndex], this.heapContainer[index])
    ) {
      // 交换当前值和父节点的值
      this._swap(parentIndex, index);
      index = parentIndex;
      parentIndex = this._parentIndex(index);
    }
  }

  /**
   * 如果一个节点比它的子节点小（最大堆）或者大（最小堆），那么需要将它向下移动。这个操作也称作“堆化（heapify）”。
   */
  shiftDown (startIndex: number = 0) {
    let len = this.heapContainer.length;
    // 获取左边子节点的index
    let leftIndex = 2 * startIndex + 1;
    let swapIndex = null;
    while (leftIndex < len) {
      // 获取右边字节点
      let rightIndex = 2 * startIndex + 2;
      // 如果存在右边子节点且值大(小)于左边子节点
      if (rightIndex < len && this.pairIsCorrect(this.heapContainer[rightIndex], this.heapContainer[leftIndex])) {
        swapIndex = rightIndex;
      } else {
        swapIndex = leftIndex;
      }
      // 如果父节点的值本身就大(小)于子节点的值，则不用交换
      if (this.pairIsCorrect(this.heapContainer[startIndex], this.heapContainer[swapIndex])) {
        break;
      }
      // 重置父节点的值为最大的子节点的值
      this._swap(startIndex, swapIndex);
      startIndex = swapIndex;
    }
  }

  private _removeIndexs (indexs: any) {
    for (let i = 0, len = indexs.length; i < len; i++) {
      // 获取需要删除的数据项index
      let removeIndex = indexs.pop();
      // 如果删除的是最后一个节点，则直接删除
      if (removeIndex === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        // 重置删除点的值为最末尾的值，然后进行堆整理
        this.heapContainer[removeIndex] = this.heapContainer.pop();
        let parentItem = this._parent(removeIndex); // 删除点的父节点的值
        if (this._hasLeftChild(removeIndex) && (!parentItem || this.pairIsCorrect(parentItem, this.heapContainer[removeIndex]))) { // 向下整理数据
          this.shiftDown(removeIndex); // 向下整理数据
        } else {
          this.shiftUp(removeIndex); // 向上整理数据
        }
      }
    }
  }

  /**
   * 移除指定序列的元素，如果没有指定序列则移除首元素
   * @param index 需要移除的元素 index，默认为 0
   */
  remove (index: number = 0) {
    this._removeIndexs([index]);
  }

  /**
   * 移除所有的指定值的item
   * @param item  指定需要移除的item
   */
  removeItems (item: T) {
    // 获取所有的匹配的需要移除的项
    let toRemoveItems = this.heapContainer.filter((v) => v === item);
    this._removeIndexs(toRemoveItems);
  }

  /**
   * 将一个更小的值（最小堆）或者更大的值（最大堆）赋值给一个节点。由于这个操作破坏了堆属性，所以需要使用 shiftUp() 来修复堆属性。
   * @param index @{integer}  堆数组中的索引
   * @param value @{any}      需要替换的节点的值
   */
  replace (index: number, value: any) {
    this.heapContainer[index] = value;
    let parentItem = this._parent(index); // 删除点的父节点的值
    if (this._hasLeftChild(index) && (!parentItem || this.pairIsCorrect(parentItem, this.heapContainer[index]))) { // 向下整理数据
      this.shiftDown(index); // 向下整理数据
    } else {
      this.shiftUp(index); // 向上整理数据
    }
  }

  /**
   * 通过反复调用 insert() 方法将一个（无序）数组转换成一个堆。
   * @param array 需要转换为堆的数组
   */
  buildHeap (array: T[]) {
    for (let item of array) {
      this.insert(item);
    }
  }

  /**
   * 搜索值在堆中的索引
   * 堆不是为快速搜索而建立的，但是 replace() 和 removeAtIndex() 操作需要找到节点在数组中的index，所以你需要先找到这个index。
   * 时间复杂度：O(n)
   * @param value 需要搜索的堆
   * @return @{interger}  堆中的索引
   */
  search (value: T): number {
    return this.heapContainer.indexOf(value);
  }

  /**
   * 不删除节点并返回最大值（最大堆）或者最小值（最小堆）
   * 时间复杂度 O(1)
   * @return @{any} 堆中的最大(小)值
   */
  peek (): T {
    return this.heapContainer[0];
  }

  /**
   * 判断该堆是否有数据
   * @return true - 堆里面有数据，反之亦然
   */
  isEmpty(): boolean {
    return !this.heapContainer.length;
  }

  /**
   * 返回剩余堆大小
   */
  size (): number {
    return this.heapContainer.length;
  }

  toString(): string {
    return this.heapContainer.toString();
  }

  /**
   * 检查堆属性是否正确
   * @param parentItem  父节点的属性值
   * @param childItem   子节点的属性值
   */
  abstract pairIsCorrect(parentItem: T, childItem: T): boolean;

}
