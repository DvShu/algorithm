import {SinglyLinkedList} from "../linked-list/SinglyLinkedList";
import Comparable from "../lang/Comparable";

class Compare extends Comparable {
  equals(key: any, val2: any): boolean {
    return key === val2.key;
  }
}

const compare = new Compare();

/**
 * hash冲突后，采用 拉链法 的方式解决冲突问题。会占用更多的内存
 * 这里采用比较简单的 累加除留余数法 计算hash
 * 主要演示的是在插入以及查询的时候，hash 冲突的情况
 */
export default class LinkedHash {

  private buckets: any; // 单链表集合保存值, 避免冲突
  private keyMap: any;  // 保存所有的 key 的集合
  private length: number;

  constructor (len:number = 15) {
    this.length = len || 15;
    this.keyMap = new Map();
    this.buckets = new Array(this.length).fill(new SinglyLinkedList(compare));
  }

  /**
   * 从此映射中移除所有映射关系
   */
  clear () {
    this.keyMap.clear();
    this.buckets = new Array(this.length).fill(new SinglyLinkedList(compare));
  }

  /**
   * 计算 hash, 累加除留余数法
   * @param key 需要计算 hash 的字符串
   * @private
   */
  private _hash (key) {
    let hash = 0;
    for (let f of key) {
      hash += f.charCodeAt(0);
    }
    return hash % this.length;
  }

  /**
   * 往 hash 表中新增或者修改数据，如果存在对应的 key 则修改数据，否则为新增数据
   * @param key
   * @param value
   */
  set (key: string, value: any) {
    let hash = this.keyMap.get(key);
    if (!hash) { // 新增数据
      hash = this._hash(key);
      this.keyMap.set(key, hash); // 新增键值对
    }
    this.buckets[hash].set(key, { key, value });
  }

  /**
   * 获取某个键的值
   * @param key 需要获取的键
   */
  get (key: any): any {
    let hash = this.keyMap.get(key);
    if (hash == null) {
      return undefined;
    } else {
      return this.buckets[hash].get(key).value;
    }
  }

  /**
   * 删除数据
   * @param key
   */
  delete (key: any) {
    let hash = this.keyMap.get(key);
    if (hash != null) {
      this.buckets[hash].remove(key);
      this.keyMap.delete(key);
    }
  }

  /**
   * 某个键是否在当前 Hash列表 之中
   * @param key 判断是否存在的健
   */
  has (key:any): any {}

  /**
   * 返回此hash表的成员总数
   */
  size (): number {
    return this.keyMap.size;
  }

  /**
   * 返回键名的遍历器。
   */
  keys (): any {
    return this.keyMap.keys();
  }

}
