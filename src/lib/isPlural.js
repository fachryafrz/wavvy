export const isPlural = (value, singleText, pluralText) => {
  if (value > 1) {
    return pluralText;
  } else {
    return singleText;
  }
};
