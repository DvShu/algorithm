/**
 * 提供比较功能
 */
export default class Comparator<T> {

  /**
   * 比较两个参数的顺序
   *    第1个参数 < 第2个参数 => -1
   *    第1个参数 > 第2个参数 => 1
   *    第1个参数 = 第2个参数 => 0
   * @param param1  待比较的数据1
   * @param param2  待比较的数据2
   */
  compare (param1: T, param2: T): number {
    if (param1 === param2) {
      return 0;
    } else if (param1 < param2) {
      return -1;
    } else if (param1 > param2) {
      return 1;
    }
  }
}
