export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function randomNumber(min, max) {
  const range = max - min;
  const randomNumber = Math.floor(Math.random() * (range + 1)) + min;
  return randomNumber;
}
