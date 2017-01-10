function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function bubbleSort(arr) {
  var swapped;
  do {
    swapped = false;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i] !== undefined && arr[i + 1]!== undefined && arr[i] > arr[i + 1]) {
        swap(arr, i, i+1);
        swapped = true;
      }
    }
  } while(swapped);
  return arr;
}
