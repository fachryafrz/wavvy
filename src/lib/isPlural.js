export const isPlural = (value, singleText, pluralText) => {
  if (value === 1) {
    return singleText;
  } else {
    return pluralText;
  }
};
