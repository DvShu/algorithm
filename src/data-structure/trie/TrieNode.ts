export default class TrieNode {

  readonly character: string; // 当前节点所在的字符
  isCompleteWord: boolean;    // 标记当前节点以及之前的节点是否是完整的单词
  private children: Map<string, TrieNode>;  // 当前节点的子节点
  frequency: number; // 词频
  isEnd: boolean; // 表明是否是要删除的单词的最后一个子节点

  /**
   * 构造函数
   * @param character       当前节点的字符(char)
   * @param isCompleteWord  当前节点是否表示完整的单词
   */
  constructor (character: string, isCompleteWord: boolean = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new Map<string, TrieNode>();
    this.frequency = 0;
  }

  /**
   * 添加子节点
   * @param character       子节点字符
   * @param isCompleteWord  添加的子节点是否是完整的单词路径
   */
  addChild (character: string, isCompleteWord: boolean = false): TrieNode {
    if (!this.hasChild(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }
    const childNode = this.getChild(character);
    childNode.rise(); // 词频 + 1
    return childNode;
  }

  /**
   * 移除节点，只能移除是完整单词的节点；如果移除的节点，词频大于0，则减少词频；如果待删除的节点，词频 = 0 并且 该子节点不存在子节点，则直接删除节点
   * @param character @{char}
   */
  removeChild (character: string) {
    // 获取需要删除的子节点
    let childNode = this.getChild(character);
    /**
     * 只能删除完整的单词节点
     */
    if (childNode) {
      if (childNode.isEnd === true) { // 是要删除的最后一个节点
        // 1.待删除节点必须是单词节点
        if (childNode.isCompleteWord) {
          // 2. 如果待删除的节点是完整的单词节点并且词频不为0，则词频 - 1
          if (childNode.frequency > 1) {
            childNode.frequency -= 1;
            childNode.isEnd = false; // 重置删除节点
          } else {
            childNode.isCompleteWord = false;
            childNode.frequency = 0;
            if (!childNode.hasChildren()) {
              // 3. 词频已经为最小，则删除节点
              this.children.delete(character); // 删除节点
            } else {
              childNode.isEnd = false; // 重置删除节点
            }
          }
        }
      } else { // 不是要删除的最后一个节点
        // 如果该节点既不是最后一个节点，也不是完整的单词节点，并且没有子节点，则删除该节点
        if (!childNode.isCompleteWord && !childNode.hasChildren()) {
          this.children.delete(character); // 删除节点
        }
      }
    }
    childNode = undefined;
  }

  /**
   * 频率涨幅
   */
  rise () {
    if (this.isCompleteWord === true) {
      this.frequency++;
    }
  }

  /**
   * 词频下降
   */
  drop (): boolean {
    if (this.isCompleteWord === true && this.frequency > 0) {
      this.frequency--;
      return true;
    }
    return false;
  }

  end () {
    if (this.isCompleteWord) {
      this.isEnd = true;
    }
  }

  /**
   * 获取某个字符路径子节点
   * @param character @{char} 字符
   */
  getChild (character: string): TrieNode {
    return this.children.get(character);
  }

  /**
   * 判断是否存在某个字符路径
   * @param character @{char}
   */
  hasChild (character: string): boolean {
    return this.children.has(character);
  }

  /**
   *
   * 判断当前节点是否存在子节点
   */
  hasChildren (): boolean {
    return this.children.size > 0
  }
}
