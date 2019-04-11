import test from 'ava';
import MaxHeap from "../src/heap/MaxHeap";
import MinHeap from "../src/heap/MinHeap";

test('MaxHeap_insert', (t) => {
  let heap = new MaxHeap();
  heap.insert(10);
  heap.insert(7);
  heap.insert(2);
  heap.insert(5);
  heap.insert(1);
  heap.insert(16);
  t.is(heap.toString(), '16,7,10,5,1,2')
});

test('MinHeap_insert', (t) => {
  let heap = new MinHeap();
  heap.insert(1);
  heap.insert(5);
  heap.insert(2);
  heap.insert(7);
  heap.insert(10);
  heap.insert(16);
  t.is(heap.toString(), '1,5,2,7,10,16')
});
