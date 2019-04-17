import test from 'ava';
import LinkedHash from "../src/data-structure/hash/LinkedHash";
import ArrayHash from "../src/data-structure/hash/ArrayHash";

test('LinkedHash_add', (t) => {
  let hashTable = new LinkedHash();
  hashTable.set('key1', 'key1_value');
  hashTable.set('key2', 'key2_value');
  t.is(hashTable.get('key1'), 'key1_value');
});


test('LinkedHash_delete', (t) => {
  let hashTable = new LinkedHash();
  hashTable.set('key1', 'key1_value');
  hashTable.set('key2', 'key2_value');
  hashTable.set('key3', 'key3_value');
  hashTable.delete('key3');
  t.falsy(hashTable.get('key3'));
});

test('LinkedHash_update', (t) => {
  let hashTable = new LinkedHash();
  hashTable.set('key1', 'key1_value');
  hashTable.set('key2', 'key2_value');
  hashTable.set('key3', 'key3_value');
  hashTable.set('key1', 'key_value');
  t.is(hashTable.get('key1'), 'key_value');
});

test('ArrayHash_add', (t) => {
  let hashTable = new ArrayHash();
  hashTable.set('key1', 'key1_value');
  hashTable.set('key2', 'key2_value');
  hashTable.set('key3', 'key3_value');
  t.is(hashTable.get('key3'), 'key3_value');
});

test('ArrayHash_update', (t) => {
  let hashTable = new ArrayHash();
  hashTable.set('key1', 'key1_value');
  hashTable.set('key2', 'key2_value');
  hashTable.set('key3', 'key3_value');
  hashTable.set('key1', 'key_value');
  t.is(hashTable.get('key1'), 'key_value');
});

test('ArrayHash_delete', (t) => {
  let hashTable = new ArrayHash();
  hashTable.set('key1', 'key1_value');
  hashTable.set('key2', 'key2_value');
  hashTable.set('key3', 'key3_value');
  hashTable.delete('key1');
  t.falsy(hashTable.get('key1'));
});
