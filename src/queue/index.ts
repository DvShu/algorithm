/**
 * 队列, 先进先出(FIFO)
 */
import QueueLinked from "./QueueLinked";

export default class Queue extends QueueLinked{

  /**
   * 将指定元素添加到此队列的末尾（最后一个元素）
   * @param value 入队的元素
   * @return true
   */
  offer (value: any): boolean {
    this.list.addLast(value);
    return true;
  }

  /**
   * 移除并返回队列的头部元素
   */
  poll (): any {
    return this.list.poll();
  }

}
