function mergeSort(data) {
    if (data.length < 2 ) {
      return data;
    }

    var mid = Math.floor(data.length / 2);
    var left = mergeSort(data.slice(0, mid));
    var right = mergeSort(data.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
  var result = [];

  while (left.length > 0 && right.length > 0) {
    result.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return result.concat(left.length ? left : right);
}
