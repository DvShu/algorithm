import MaxHeap from "../../data-structure/heap/MaxHeap";
import Heap from "../../data-structure/heap/Heap";
import MinHeap from "../../data-structure/heap/MinHeap";

type OrderType = 'asc' | 'desc';

/**
 * 排序
 */
const Sort = {

  /**
   * 堆排序
   * @param sortArray @{Array}  待排序的数组<集合>
   * @param order     @{String} 排序方式, asc: 正序，否则倒叙
   */
  heap<T>(sortArray: T[], order: OrderType): T[] {
    let orderedArray: T[] = new Array(sortArray.length); // 排序后的数组
    if (sortArray.length === 1) { // 只有一个元素, 直接返回
      orderedArray[0] = sortArray[0];
    } else {
      // 构造一个堆
      let heap: Heap;
      if (order == 'asc') { // 正序
        heap = new MaxHeap();
      } else { // 倒序
        heap = new MinHeap();
      }
      heap.buildHeap(sortArray); // 将待排序的数组构建为堆
      while (!heap.isEmpty()) {
        orderedArray[heap.size() - 1] = heap.peek();
        heap.remove(); // 移除首元素, 然后重新构造堆
      }
    }
    return orderedArray;
  }
};

export default Sort;
