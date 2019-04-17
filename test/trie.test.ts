import test from 'ava';
import Trie from "../src/data-structure/trie";

test('trie_insert', (t) => {
  let trie = new Trie();
  trie.insert('an');
  t.is(trie.contains('an'), true);
});

test('trie_delete', (t) => {
  let trie = new Trie();
  trie.insert('an');
  trie.insert('and');
  trie.insert('test');
  trie.delete('and');
  t.is(trie.contains('an'), true);
});

test('trie_frequency', (t) => {
  let trie = new Trie();
  trie.insert('an');
  trie.insert('and');
  trie.insert('test');
  trie.insert('and');
  t.is(trie.getFrequency('and'), 2);
});

test('trie_frequency_drop', (t) => {
  let trie = new Trie();
  trie.insert('an');
  trie.insert('and');
  trie.insert('test');
  trie.insert('and');
  trie.delete('and');
  t.is(trie.getFrequency('and'), 1);
});
