
class SortOriginal {

  heap (sortArray: any, order: string = 'asc'): Array<any> {
    console.log('head');
    let arr = new Array(sortArray.length);
    return [1];
  }

  static s () {
    return '1';
  }

}

var target = {
  heap () {
    return 'heap'
  }
};

let Sort = new Proxy(SortOriginal, {

  apply (target, thisArg, argumentsList) {
    console.log('Sort_Apply');
    console.log(target);
    console.log(thisArg);
    console.log(argumentsList);
    return 'I am proxy';
  },

  construct: function(target, args) {
    console.log('fdasfd');
    return new target();
  }
});

export default Sort;
