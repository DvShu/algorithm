import Heap from "./Heap";

/**
 * 最小堆
 */
export default class MinHeap<T> extends Heap<T> {

  /**
   * 对于最小堆要求父节点的值必须小于子节点的值
   * @param parentItem  父节点的值
   * @param childItem   子节点的值
   */
  pairIsCorrect(parentItem: T, childItem: T): boolean {
    return this.comparator.compare(parentItem, childItem) <= 0;
  }

}
