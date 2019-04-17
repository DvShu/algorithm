import MinHeap from "../heap/MinHeap";

/**
 * 基于 MinHeap(最小堆) 实现的优先队列，默认是基于数据的自然顺序的，也可以构建 Comparator 来实现顺序比较
 */
export default class PriorityQueue<T> extends MinHeap<T> {

  /**
   * 检索并删除此队列的头。
   */
  poll (): T {
    let v: T = super.peek();
    super.remove();
    return v;
  }

  /**
   * 将指定的元素插入到此优先级队列中。
   * @param item
   */
  add (item: T) {
    super.insert(item);
  }

  /**
   * 从此优先级队列中删除所有元素。
   */
  clear () {
    this.heapContainer = [];
  }
}
