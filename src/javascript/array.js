export function isEverythingUnique(array, key) {
  const uniqueArray = new Set(array.map((item) => item[key]));
  return [...uniqueArray].length === array.length;
}

function getDuplicates(array, key) {
  const keys = array.map((item) => item[key]);
  return keys.filter((key) => keys.indexOf(key) !== keys.lastIndexOf(key));
}
