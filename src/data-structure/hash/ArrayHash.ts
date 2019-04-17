/**
 * hash冲突后，开放定址法：线性探查法、平方探查法、伪随机序列法、双哈希函数法 解决冲突问
 * 遇到冲突，将冲突的数据依次往后挪位置，直到挪到没有数据的地方为止
 */
export default class ArrayHash {

  private keyMap: any;
  private buckts: any;
  private length: number;

  constructor (len: number = 15) {
    this.length = len;
    this.keyMap = new Map();
    this.buckts = new Array(len);
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

  private _add (index:number, key:any, value:any) {
    let tmp = { key, value }, succ:boolean = false; // 临时值, 缓存插入地方的原来的值
    for (; index < this.length; index++) {
      if (this.buckts[index] == null) { // 插入到了没有数据的节点地方，成功放入数据，跳出循环
        this.buckts[index] = tmp;
        this.keyMap.set(tmp.key, index);
        succ = true;
        break;
      } else { // 依次将数据往后挪位置
        this.keyMap.set(tmp.key, index);
        let old = this.buckts[index];
        this.buckts[index] = tmp;
        tmp = old;
      }
    }
    if (!succ) { // 一直遍历到末尾都没有放入元素，则动态扩充长度
      this.buckts.push(tmp);
      this.keyMap.set(tmp.key, this.buckts.length - 1);
    }
  }

  private _remove (hash) {
    // 要删除的位置的元素之后的所有元素向前移一位
    for (let i = hash + 1, len = this.buckts.length; i < len; i++) {
      let item = this.buckts[i];
      // 更新 keyMap 对应的位置
      this.keyMap.set(item.key, i - 1);
      this.buckts[i - 1] = item;
    }
    // 移动位置完成后，删除数组的最后一个元素
    this.buckts.pop();
  }

  set (key: string, value: any) {
    let hash = this.keyMap.get(key);
    if (hash == null) { // 新增
      this._add(hash, key, value);
    } else {
      this.buckts[hash] = { key, value };
    }
  }

  delete (key: string) {
    let hash = this.keyMap.get(key);
    if (hash != null) {
      this._remove(hash);
      this.keyMap.delete(key);
    }
  }

  get (key: string) {
    let hash = this.keyMap.get(key);
    if (hash != null) {
      return this.buckts[hash].value;
    }
    return undefined;
  }

}
