import TrieNode from "./TrieNode";

export default class Trie {

  private head: TrieNode;

  constructor () {
    this.head = new TrieNode('$');
  }

  /**
   * 插入单词
   * @param word
   */
  insert (word: string) {
    let node: TrieNode = this.head;
    for (let i = 0, len = word.length; i < len; i++) {
      node = node.addChild(word[i], i === len - 1);
    }
  }

  /**
   * 删除单词，只能删除没有子节点的完整单词，复杂度[O(n)]
   * @param word
   */
  delete (word: string) {
    /**
     * 递归删除节点
     * @param node  需要删除子节点的节点
     * @param index 待删除的节点 index
     */
    let depthDelete = (node: TrieNode, index: number = 0) => {
      if (index >= word.length) {
        return;
      }
      let char = word[index];
      // 获取下一个节点，表示要删除的节点
      let nextNode: TrieNode = node.getChild(char);
      if (nextNode == null) {
        return;
      }
      // 递归依次从最后开始删除节点
      depthDelete(nextNode, index + 1);
      if (index === word.length - 1) { // 待删除节点为最后一个单词节点
        nextNode.end(); // 表明待删除的节点为最后一个节点
      }
      // 删除子节点
      node.removeChild(char);
    };

    depthDelete(this.head);
  }

  /**
   * 判断字典树中是否包含指定的文本
   * @param word
   */
  contains (word: string): boolean {
    let lastNode: TrieNode = this.getLastCharNode(word);
    return lastNode != null && lastNode.isCompleteWord;
  }

  /**
   * 获取词频，单词出现的频率
   * @param word
   */
  getFrequency (word: string): number {
    let lastNode: TrieNode = this.getLastCharNode(word);
    if (lastNode != null) {
      if (lastNode.isCompleteWord) {
        return lastNode.frequency;
      }
    }
    return 0;
  }

  /**
   * 获取最后一个字符节点
   * @param word
   */
  getLastCharNode (word: string): TrieNode {
    let node: TrieNode = this.head;
    for (let i = 0, l = word.length; i < l; i++) {
      node = node.getChild(word[i]);
    }
    return node;
  }
}
