interface NodeConfig {
  value?:any;
  prev?:any;
  next?:any;
}

class Node {
  prev: any;
  next: any;
  item: any;

  constructor (prev:any, item: any, next:any) {
    this.prev = prev;
    this.item = item;
    this.next = next;
  }
}

/**
 * 双向链表
 */
export default class DoublyLinkedList {
  private _first: Node; // 链表的第一个元素
  private _last: Node; // 链表的最后一个元素
  length: number;

  constructor (list?:any) {
    this.length = 0;
    if (list) {
      this.addAll(list);
    }
  }

  // 私有函数, 将元素插入到末尾
  private _linkLast (value:any) {
    let newNode: Node = new Node(this._last, value, null);
    if (this._last == null) { // 插入元素到开始位置
      this._first = newNode;
      if (this.length === 0) {
        this._last = newNode;
      }
    } else {
      this._last = newNode;
    }
    this.length++;
  }

  // 在指定节点 succ 之前插入新的节点
  private _linkBefore (value:any, succ: Node) {
    let pred: Node = succ.prev;
    let newNode: Node = new Node(pred, value, succ);
    if (pred == null) { // 插入到开始节点
      this._first = newNode;
    } else {
      pred.next = newNode;
    }
    this.length++;
  }

  /**
   * 将指定元素添加到此列表的指定位置, 如果没有指定位置, 则插入到结尾。
   * @param value 要添加到此列表的元素
   * @param index 要在其中插入指定元素的索引, 如果没有指定，则添加到末尾
   */
  add (value:any, index?:number) {
    index = index || this.length;
    if (index === this.length) { // 插入元素到结尾
      this._linkLast(value)
    } else {
      this._linkBefore(value, this._node(index))
    }
  }

  /**
   * 添加指定 Iterator 中的所有元素到此列表的结尾，顺序是指定 Iterator 的迭代器返回这些元素的顺序。如果指定的 Iterator 在操作过程中被修改，则此操作的行为是不确定的。（注意，如果指定 Iterator 就是此列表并且非空，则此操作的行为是不确定的。）
   * @param list  包含要添加到此列表的元素的 Iterator
   * @param index 添加到列表的位置, 如果不填, 则添加到列表的末尾
   */
  addAll (list:any, index?:number) {
    index = index || this.length;
    let numNew:number = list.length;
    if (numNew === 0) {
      return;
    }
    let pred: Node, succ: Node;
    if (index === this.length) { // 在列表尾部插入列表元素
      succ = null;
      pred = this._last;
    } else { // 找到 index 所在的节点
      succ = this._node(index);
      pred = succ.prev;
    }
    for (let v of list) {
      let newNode: Node = new Node(pred, v, null);
      if (pred == null) { // 插入到开始位置
        this._first = newNode;
      } else {
        pred.next = newNode;
      }
      pred = newNode;
    }
    if (succ == null) { // 插入到列表尾部
      this._last = pred;
    } else {
      pred.next = succ;
      succ.prev = pred;
    }
    this.length += numNew;
  }

  /**
   * 添加元素到开始位置
   * @param value 需要添加的元素值
   */
  addFirst (value:any) {
    this.add(value, 0);
  }

  /**
   * 添加元素到末尾
   * @param value 需要添加的元素值
   */
  addLast (value:any) {
    this._linkLast(value);
  }

  // 获取指定位置处的元素
  private _node (index) {
    let n: Node;
    // this.length / 2 <=> this.length >> 1
    if (index > (this.length >> 1)) { // 从末尾往前找
      n = this._last;
      for (let i = this.length - 1; i > index; i--) {
        n = n.prev;
      }
    } else { // 从前往后找
      n = this._first;
      for (let i = 0; i < index; i++) {
        n = n.next;
      }
    }
    return n;
  }

  /**
   * 根据元素值获取第一个匹配的元素
   * @param value 进行匹配的元素值
   * @private
   */
  private _nodeFirstOccurrence (value:any): Node {
    let n: Node = this._first;
    for (let i = 0; i < this.length; i++) {
      if (n.item === value) {
        break;
      }
      n = n.next;
    }
    return n;
  }

  private _nodeLastOccurrence (value:any): Node {
    let n: Node = this._last;
    for (let i = this.length - 1; i >= 0; i--) {
      if (n.item === value) {
        break;
      }
      n = n.prev;
    }
    return n;
  }

  /**
   * 返回此列表中指定位置处的元素。
   * @param index 要返回的元素的索引
   */
  get (index) {
    return this._node(index).item;
  }

  /**
   * 返回此列表的第一个元素。
   */
  getFirst () {
    return this._first.item;
  }

  /**
   * 返回此列表的最后一个元素。
   */
  getLast () {
    return this._last.item;
  }

  /**
   * 更新指定位置的元素值
   * @param index 指定的位置
   * @param value 更新后的元素值
   */
  set (index:number, value:any) {
    let node: Node = this._node(index);
    node.item = value;
  }

  /**
   * 如果此列表包含指定元素，则返回 true。
   * @param value 要测试在此列表中是否存在的元素
   */
  contains (value: any) {
    let contains = false;
    this.forEach((v) => {
      return (contains = (value === v));
    });
    return contains;
  }

  /**
   * 返回此列表中首次出现的指定元素的索引，如果此列表中不包含该元素，则返回 -1。
   * @param value 要搜索的元素
   */
  indexOf (value: any) {
    let index = -1;
    this.forEach((v, i) => {
      if (v === value) {
        index = i;
        return true;
      }
    });
    return index;
  }

  /**
   * 返回此列表中最后出现的指定元素的索引，如果此列表中不包含该元素，则返回 -1。
   * @param value 要搜索的元素
   */
  lastIndexOf (value: any) {
    let n = this._last;
    let index = -1;
    for (let i = this.length - 1; i >= 0; i--) {
      if (n.item === value) {
        index = i;
        break;
      }
      n = n.prev;
    }
    return index;
  }

  /**
   * 遍历列表
   * @param cb @{function} 回调函数(value,index), 遍历到的每一项都通过回调函数的参数返回; 如果回调函数返回 true, 则跳出循环
   */
  forEach (cb) {
    let n = this._first;
    for (let i = 0; i < this.length; i++) {
      if (cb(n.item, i)) {
        break;
      }
      n = n.next;
    }
  }

  /**
   * 删除指定节点
   * @param node  需要删除的节点
   * @private
   */
  _unlink (node: Node):void {
    let pred = node.prev;
    let next = node.next;
    if (pred == null) { // 移除的是开头的元素
      this._first = node.next;
    } else {
      pred.next = next;
      node.prev = null;
    }
    if (next == null) { // 移除的是末尾的元素
      this._last = pred;
    } else {
      next.prev = pred;
      node.next = null;
    }
    node.item = null;
    node = null;
    this.length--;
  }

  remove (value:any): void;
  remove (index:number): void;
  /**
   * 移除元素, 如果参数位 number 类型的，则移除指定位置的元素；否则移除第一次出现指定值的元素
   * @param x @{number|object} number -- 移除指定位置的元素;object -- 移除指定元素的值
   */
  remove (x):void {
    let node: Node;
    if (typeof x === 'number') { // 移除指定位置的元素
      node = this._node(x); // 获取需要移除的节点
    } else { // 找到需要移除的元素
      node = this._nodeFirstOccurrence(x); // 获取需要移除的元素
    }
    this._unlink(node);
  }

  /**
   *  从此列表中移除第一次出现的指定元素（从头部到尾部遍历列表时）。
   * @param value 需要进行删除匹配的元素值
   */
  removeFirstOccurrence (value:any): void {
    this._unlink(this._nodeFirstOccurrence(value));
  }

  /**
   * 从此列表中移除最后一次出现的指定元素（从头部到尾部遍历列表时）。
   * @param value 要从此列表中移除的元素（如果存在）
   */
  removeLastOccurrence (value:any): void {
    this._unlink(this._nodeLastOccurrence(value));
  }

  /**
   * 移除此列表的第一个元素
   */
  removeFirst () {
    this._unlink(this._first);
  }

  /**
   * 移除此列表的最后一个元素
   */
  removeLast () {
    this._unlink(this._last);
  }

  /**
   * 移除并返回队列的头部元素
   */
  poll (): any {
    let value = this._first.item;
    this._unlink(this._first);
    return value;
  }

  /**
   * 移除并返回队列的尾部元素
   */
  pop (): any {
    let value = this.getLast();
    this.removeLast();
    return value;
  }

  // 部署遍历器
  [Symbol.iterator] () {
    let current = this._first;
    let index = 0;

    function next ():any {
      if (current) {
        let value = current.item;
        current = current.next;
        index++;
        return { value: { value, index }, done: false };
      } else {
        return { done: true };
      }
    }
    return { next };
  }

  /**
   * 从此列表中移除所有元素。
   */
  clear () {
    this._first.prev = undefined;
    this._first.next = undefined;
    this._first = undefined;
    this._last.prev = undefined;
    this._last.next = undefined;
    this._last = undefined;
    this.length = 0
  }

  /**
   * 返回此 LinkedList 的浅表副本。
   */
  clone () {
    let ds = new DoublyLinkedList();
    this.forEach((v) => {
      ds.add(v);
    });
    return ds;
  }

  /**
   * 返回以适当顺序（从第一个元素到最后一个元素）包含此列表中所有元素的数组。
   */
  toArray () {
    let a = [];
    this.forEach((v) => {
      a.push(v);
    });
    return a;
  }

  /**
   * 返回以适当顺序（从第一个元素到最后一个元素）包含此列表中所有元素的字符串, 以 ',' 分隔。
   * @param separator @{string} 指定的分隔符, 默认：','
   */
  toString (separator:string = ',') {
    let str = '';
    this.forEach((v) => {
      str += separator + v;
    });
    return str.substring(1);
  }
}
