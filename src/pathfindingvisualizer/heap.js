
export function buildMinHeap(array) {
    var index = Math.floor(array.length / 2) - 1;
    while (index >= 0) {
        minHeapify(array, index, array.length);
        index--;
    }
}

function minHeapify(array, index, arrLength) {
    var smallest = index;
    var left = index * 2 + 1;
    var right = index * 2 + 2;

    // console.log(array[left]);
    if (left < arrLength && array[left].distance < array[smallest].distance)
        smallest = left;
    if (right < arrLength && array[right].distance < array[smallest].distance)
        smallest = right;

    if (smallest != index) {
        swap(array, index, smallest);

        if (smallest * 2 + 2 > arrLength) {
            return;
        }
        minHeapify(array, smallest, arrLength);
    }
}

export function heapUnshift(array) {
    console.log(`heap unshift arr length:` + array.length);
    var length = array.length - 1;
    swap(array, 0, length);
    var toRemove = array.pop();
    buildMinHeap(array);
    console.log(`heap unshift arr length:` + array.length);
    return toRemove;

}

function swap(arr, leftIdx, rightIdx) {
    // console.log('swapper  left:' + leftIdx + ' right:' + rightIdx);
    var temp = arr[leftIdx];
    arr[leftIdx] = arr[rightIdx];
    arr[rightIdx] = temp;
}
