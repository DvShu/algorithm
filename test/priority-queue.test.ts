import test from 'ava';
import ProirityQueue from '../src/data-structure/priority-queue';
import PriorityQueue from "../src/data-structure/priority-queue";
import Comparator from "../src/data-structure/lang/Comparator";

class KeyComparator extends Comparator<any> {
  compare(param1: any, param2: any): number {
    if (param1.priority < param2.priority) {
      return -1;
    } else if (param1.priority === param2.priority) {
      return 0;
    } else {
      return 1;
    }
  }
}

test('PriorityQueue_1', (t) => {
  let pq = new ProirityQueue<number>();
  pq.buildHeap([10, 7, 8, 5, 2]);
  t.is(pq.peek(), 2);
});

test('PriorityQueue_comparator', (t) => {
  let pq = new PriorityQueue<any>(new KeyComparator());
  pq.insert({
    value: 10,
    priority: 5
  });
  pq.insert({
    value: 8,
    priority: 3
  });
  pq.insert({
    value: 7,
    priority: 4
  });
  pq.insert({
    value: 5,
    priority: 2
  });
  pq.insert({
    value: 2,
    priority: 1
  });
  t.is(pq.peek().value, 2);
});
