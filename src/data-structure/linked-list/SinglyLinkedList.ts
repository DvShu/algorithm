import Comparable from '../lang/Comparable';

class SinglyNode {
  value: any;
  next: SinglyNode;

  constructor (value?: any) {
    this.value = value;
  }
}

/**
 * 单向链表
 */
export class SinglyLinkedList {
  private head: SinglyNode; // 头部元素
  private tail: SinglyNode; // 尾部元素
  length: number;
  private comparator: Comparable;

  constructor (comparator?:Comparable) {
    this.length = 0;
    this.comparator = comparator || new Comparable();
  }

  /**
   * 将指定元素添加到链表的末尾
   * @param value 需要添加到末尾的值
   */
  add (value:any) {
    let node = new SinglyNode(value);
    // 判断是否是添加到头部
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
      this.length = 1;
    } else {
      this.tail.next = node;
      this.tail = node;
      this.length++;
    }
  }

  /**
   * 遍历链表
   * @param cb @{function} 参数为遍历的元素, index
   */
  forEach (cb) {
    let n: SinglyNode = this.head;
    for (let i = 0; i < this.length; i++) {
      if (cb(n.value, i) === true) {
        break; // 跳出循环
      }
      n = n.next;
    }
  }

  /**
   * 判断链表是否包含某个元素
   * @param val 判断是否被包含的元素
   */
  contains (val) {
    let contails = false;
    this.forEach((v) => {
      return (contails = (this.comparator.equals(val, v) === true));
    });
    return contails;
  }

  /**
   * 获取第一个匹配值的元素
   * @param v 需要获取的匹配的值
   */
  get (v: any) {
    let value:any;
    this.forEach((val) => {
      if (this.comparator.equals(v, val) === true) {
        value = val;
        return true;
      }
    });
    return value;
  }

  /**
   * 更新第一个匹配的节点的值，如果没有查询到对应的节点，则往链表中插入数据
   * @param oldValue  进行匹配的值
   * @param newValue  匹配到后，需要更新的值
   */
  set (oldValue: any, newValue: any) {
    let n = this.head;
    for (let i = 0; i < this.length; i++) {
      if (this.comparator.equals(oldValue, n.value)) {
        break;
      }
      n = n.next;
    }
    if (n) { // 更新数据
      n.value = newValue;
    } else {
      this.add(newValue);
    }
  }

  /**
   * 根据元素值删除节点
   * @param value 判断需要删除的元素值
   */
  remove (value:any) {
    let pred: SinglyNode = null, current = this.head;
    for (let i = 0; i < this.length; i++) {
      if (this.comparator.equals(value, current.value)) { // 当前节点就是删除的节点
        if (pred == null) { // 删除的是首节点
          this.head = current.next;
        } else {
          pred.next = current.next;
        }
        if (current.next == null) { // 删除的末尾节点
          this.tail = null;
        }
        break;
      }
      pred = current;
      current = current.next;
    }
  }
}
