function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function quicksort(arr, left, right) {
  if (arr.length > 1) {
    left = typeof left !== "number" ? 0 : left;
    right = typeof right !== "number" ? arr.length - 1 : right;

    var pivot = partition(arr, left, right);

    if (left < pivot - 1) {
      quicksort(arr, left, pivot - 1);
    }
    if (right > pivot) {
      quicksort(arr, pivot, right);
    }
  }
  return arr;
}

function partition(arr, left, right) {
  var pivot = arr[Math.floor((left + right) / 2 )];

  while (left <= right) {
    while (arr[left] < pivot) {
      left++;
    }
    while (arr[right] > pivot) {
      right--;
    }
    if (left <= right) {
      swap(arr, left, right);
      left++;
      right--;
    }
  }
  return left;
}
