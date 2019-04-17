import test from 'ava';
import Sort from "../src/algorithm/sort";

test('HeapSort_asc', (t) => {
  let a = [10, 7, 5, 2, 8];
  let os = Sort.heap(a, 'asc');
  t.is(os.toString(), '2,5,7,8,10');
});

test('HeapSort_desc', (t) => {
  let a = [10, 7, 5, 2, 8];
  let os = Sort.heap(a, 'desc');
  t.is(os.toString(), '10,8,7,5,2');
});

