export const ratingToNumber = (rating) => {
  let sum = 0;
  let votes = 0;
  rating.map((rate, i) => {
    if (rate.rate) {
      sum += rate.rate * rate.votes;
      votes += rate.votes;
    } else {
      sum += rate;
      votes++;
    }
  });
  const answer = Math.round((sum * 10) / votes) / 10;
  return answer;
};
