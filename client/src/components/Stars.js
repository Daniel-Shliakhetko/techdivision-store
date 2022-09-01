import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { ratingToNumber } from "../helpers/ratingToNumber";

export const Stars = (props) => {
  const stars = [1, 2, 3, 4, 5];

  const { rate, rating, comments, showNumberOfVotes } = props;
  let thisRate = comments
    ? ratingToNumber(comments.map((comment) => comment.rate))
    : rate
    ? rate
    : rating
    ? ratingToNumber(rating)
    : null

  const countNumberOfVotes = () => {
    let answer = 0;
    stars.map((star, i) => {
      answer += rating[i].votes;
    });
    return answer;
  };

  return (
    <div className="flex">
      {showNumberOfVotes && (
        <span className="mr-2">
          Number of votes: {rating && countNumberOfVotes()}
        </span>
      )}
      <ul className="stars flex" title={`${thisRate} / 5`}>
        {stars.map((star, i) => (
          <li className="relative" key={i}>
            <FontAwesomeIcon icon={faStar} color={"#ced0cf"} />
            {thisRate + 1 > star && (
              <FontAwesomeIcon
                className="absolute top-1 left-0 z-20"
                icon={thisRate > star - 0.25 ? faStar : faStarHalf}
                color={"#b92f2d"}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
