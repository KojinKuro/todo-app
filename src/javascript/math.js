export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

export function randomNumber(min, max) {
  const range = max - min;
  const randomNumber = Math.floor(Math.random() * (range + 1)) + min;
  return randomNumber;
}

export function generateRandomID(identifierLength) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const charString = alphabet.toLowerCase() + alphabet.toUpperCase() + numbers;
  const timeStamp = Date.now().toString();

  let randomID = "";
  for (let i = 0; i < identifierLength; ++i) {
    let randomIndex = randomNumber(0, charString.length - 1);
    randomID += charString.at(randomIndex);
  }

  return randomID + timeStamp;
}
