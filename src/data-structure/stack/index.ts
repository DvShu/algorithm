import QueueLinked from "../queue/QueueLinked";

// 栈，后进先出(LIFO)
export default class Stack extends QueueLinked{

  /**
   * 添加元素到栈的顶端(末尾)
   * @param value 添加的元素
   */
  push (value:any): void {
    this.list.addLast(value);
  }

  /**
   * 移除并返回栈最顶端(末尾)的元素
   */
  pop (): any {
    this.list.pop();
  }
}
