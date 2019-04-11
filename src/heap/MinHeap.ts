import Heap from "./Heap";

/**
 * 最小堆
 */
export default class MinHeap extends Heap {

  /**
   * 对于最小堆要求父节点的值必须小于子节点的值
   * @param parentItem  父节点的值
   * @param childItem   子节点的值
   */
  pairIsCorrect(parentItem: any, childItem: any): boolean {
    return parentItem <= childItem;
  }

}
