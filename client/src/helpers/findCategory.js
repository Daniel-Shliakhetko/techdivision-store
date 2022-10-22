export const findCategory = (
  categories,
  toFind,
  options = { parent: false }
) => {
  let answer = [];
  categories.forEach((category) => {
    if (options.parent) {
      if (category.parent.contains(toFind)) {
        answer.push(category);
      }
    } else {
      if (category.category.contains(toFind)) {
        answer.push(category);
      }
    }
  });
  return answer;
};
