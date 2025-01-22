export const quickSort = (arr, key) => {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = arr.filter((item) => item[key].localeCompare(pivot[key]) < 0);
  const right = arr.filter((item) => item[key].localeCompare(pivot[key]) > 0);

  return [...quickSort(left, key), pivot, ...quickSort(right, key)];
};

export const binarySearch = (arr, key) => {
  let left = 0;
  let right = arr.length - 1;
  let results = [];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const name = arr[mid].name.toLowerCase();

    if (name.includes(key)) {
      results.push(arr[mid]);

      let i = mid - 1;
      while (i >= 0 && arr[i].name.toLowerCase().includes(key)) {
        results.push(arr[i]);
        i--;
      }

      i = mid + 1;
      while (i < arr.length && arr[i].name.toLowerCase().includes(key)) {
        results.push(arr[i]);
        i++;
      }
      break;
    } else if (name < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return results;
};
