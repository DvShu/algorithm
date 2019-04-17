# algorithm
算法和数据结构，这个工程只有具体的代码实现以及注释。
## 数据结构(src/data-structure)
* [linked-list](https://codeburst.io/js-data-structures-linked-list-3ed4d63e6571 "linked-list") 链表：
  1. SinglyLinkedList 单向链表
  2. DoublyLinkedList 双向链表
  3. CircularLinkedList 循环链表  
    循环列表需要在每一次添加完成后，将首节点 `_first` 的 `prev` 指向末尾节点 `_last` ，将末尾节点 `_last` 的 `next` 指向首节点 `_first`，实现细节跟 `DoubleLinkedList` 大同小异并且不太常用，所以这里不做代码实现；
* queue 队列
* stack 栈   
* hash 哈希表
  1. ArrayHash 使用 开放定址法 解决 `hash` 冲突
  2. LinkedHash 使用 拉链法 解决 `hash` 冲突  
  > 现在在实际使用的时候，可以考虑使用 `Map` 来存储数据, `Map` 的键是基于内存地址绑定，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题。
* heap [堆](https://www.jianshu.com/p/6b526aa481b1 "堆")：
  1. MaxHeap 最大堆
  2. MinHeap 最小堆
* priority-queue 优先队列  
* trie 字典树
## 算法(src/algorithm)
### 排序算法(sort)
整理的一些常用排序算法的 `js` 实现，对于排序算法的简单介绍，参考[十大经典排序算法](https://www.cnblogs.com/onepixel/articles/7674659.html "十大经典排序算法")  
目前整理的排序算法有：
  1. [堆排序](https://www.cnblogs.com/chengxiao/p/6129630.html "堆排序")  
    
 ## 参考
 [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms "javascript-algorithms") 
