import DoublyLinkedList from "../linked-list/DoublyLinkedList";

/**
 * 队列、栈的基础类
 */
export default class QueueLinked {
  protected list: DoublyLinkedList;

  constructor () {
    this.list = new DoublyLinkedList();
  }

  /**
   * 队列是否为空
   * @return false -- 队列为空，否则队列不为空
   */
  isEmpty (): boolean {
    return this.list.length === 0;
  }

  /**
   * 获取但不移除此队列的头（第一个元素）
   */
  peek (): any {
    return this.list.getFirst();
  }

  toString (): string {
    return this.list.toString();
  }
}
