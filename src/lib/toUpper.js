export function toUpper(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      if (word === "and") return word;
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
}