import test from 'ava';
import DoublyLinkedList from "../src/linked-list/DoublyLinkedList";

test('doubly_addAll', (t) => {
  let ds = new DoublyLinkedList([1,2,3]);
  ds.addAll([4,5,6]);
  t.is(ds.length, 6);
});

test('doubly_getFirst', (t) => {
  let ds = new DoublyLinkedList([1,2,3]);
  ds.addAll([4,5,6]);
  t.is(ds.getFirst(), 1);
});

test('doubly_getLast', (t) => {
  let ds = new DoublyLinkedList([1,2,3]);
  ds.addAll([4,5,6]);
  t.is(ds.getLast(), 6);
});

test('doubly_get', (t) => {
  let ds = new DoublyLinkedList([1,2,3,4,5,6]);
  t.is(ds.get(4), 5);
});

test('doubly_add', (t) => {
  let ds = new DoublyLinkedList([2]);
  ds.add(1, 0); // 添加到开头
  ds.add(4); // 添加到结尾
  ds.add(3, 2); // 添加到指定位置
  t.is(ds.toString(), '1,2,3,4');
});

test('doubly_add1', (t) => {
  let ds = new DoublyLinkedList();
  ds.add(4); // 添加到结尾
  t.is(ds.toString(), '4');
});

test('doubly_indexOf', (t) => {
  let ds = new DoublyLinkedList([1,2,3,4,5,6]);
  t.is(ds.indexOf(6), 5);
});
