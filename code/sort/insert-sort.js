/**
 * 快速排序
 * @param {number[]} arr
 */
function inserSort(arr) {
  // 当前数组长度
  const len = arr.length;
  // 当前已排序索引
  let sortedIndex = 0;
  // 移动元素
  let temp;
  // 默认第一个已经为排序的元素，开始遍历
  for (let i = 1; i < len; i++) {
    // 遍历边界待定
    let minIndex = i;
    for (let j = 0; j <= sortedIndex; j++) {
      // 比较，如果 arr[i] 比当前大，往前，比当前小，所有元素往后移动
      if (arr[i] < arr[j]) {
        minIndex = j;
        break;
      }
    }
    temp = arr[i];
    for (let k = i; k > minIndex; k--) {
      arr[k] = arr[k - 1];
    }
    if (typeof temp === "number") {
      arr[minIndex] = temp;
    }
    sortedIndex++;
  }
  return arr;
}

function generateList(len = 1000) {
  const list = [];
  for (let i = 0; i < len; i++) {
    list.push(parseInt(Math.random() * len * 10));
  }
  return list;
}

const list = generateList(500);
console.log(list, "===");

console.log(inserSort(list));
