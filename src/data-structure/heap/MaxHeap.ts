import Heap from "./Heap";

/**
 * 最大堆
 */
export default class MaxHeap<T> extends Heap<T> {

  /**
   * 最大堆要求父节点的值必须大于所有的子节点
   * @param parentItem  父节点的值
   * @param childItem   子节点的值
   */
  pairIsCorrect(parentItem: T, childItem: T): boolean {
    return this.comparator.compare(parentItem, childItem) >= 0;
  }

}
