/**
 * 关于 Heap 的最基本的操作的接口定义
 */
export default interface HeapInterface {

  /**
   * 如果一个节点比它的父节点大（最大堆）或者小（最小堆），那么需要将它同父节点交换位置。这样是这个节点在数组的位置上升。
   */
  shiftUp ();

  /**
   * 在堆的尾部添加一个新的元素，然后使用 shiftUp 来修复堆。
   * 时间复杂度：O(log n)
   * @param value @{any}  在尾部插入的新的元素
   */
  insert (value: any);

  /**
   * 移除并返回最大值（最大堆）或者最小值（最小堆）。为了将这个节点删除后的空位填补上，需要将最后一个元素移到根节点的位置，然后使用 shiftDown 方法来修复堆。
   * 时间复杂度：O(log n)
   * @return 移除的值
   */
  remove (): any;

  /**
   * 和 remove() 一样，差别在于可以移除堆中任意节点，而不仅仅是根节点。当它与子节点比较位置时无序时使用 shiftDown()，如果与父节点比较发现无序则使用 shiftUp()。
   * @param index @{integer}  堆数组中的索引
   */
  removeAtIndex (index: number);

  /**
   * 将一个更小的值（最小堆）或者更大的值（最大堆）赋值给一个节点。由于这个操作破坏了堆属性，所以需要使用 shiftUp() 来修复堆属性。
   * @param index @{integer}  堆数组中的索引
   * @param value @{any}      需要替换的节点的值
   */
  replace (index: number, value: any);

  /**
   * 搜索值在堆中的索引
   * 堆不是为快速搜索而建立的，但是 replace() 和 removeAtIndex() 操作需要找到节点在数组中的index，所以你需要先找到这个index。
   * 时间复杂度：O(n)
   * @param value 需要搜索的堆
   * @return @{interger}  堆中的索引
   */
  search (value: any): number;

  /**
   * 通过反复调用 insert() 方法将一个（无序）数组转换成一个堆。
   * @param array 需要转换为堆的数组
   */
  buildHeap (array);

  /**
   * 由于堆就是一个数组，我们可以使用它独特的属性[最大(小)堆]将数组从低到高排序。
   * 时间复杂度：O(n lg n)。
   */
  sort ();

  /**
   * 不删除节点并返回最大值（最大堆）或者最小值（最小堆）
   * 时间复杂度 O(1)
   * @return @{any} 堆中的最大(小)值
   */
  peek (): any;

}
