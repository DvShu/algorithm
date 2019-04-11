/**
 * 比较器类，该类对于数据比较
 */
export default class Comparable {

  /**
   * 比较两个值是否相同的函数, 如果相同返回true,否则返回 false
   * @param val1  用于判断的值
   * @param val2  每次遍历的元素
   */
  equals (val1:any, val2:any) {
    return val1 === val2;
  }

}
