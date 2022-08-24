import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const stars = [1, 2, 3, 4, 5];

export const Stars = (props) => {
    const {rate} = props;
  return (
    <ul className="stars flex" title={`${rate} / 5`}>
      {stars.map((star, i) => (
        <li className="relative" key={i}>
          <FontAwesomeIcon icon={faStar} color={"#ced0cf"} />
          {rate+1 > (star) && <FontAwesomeIcon
            className="absolute top-1 left-0 z-20"
            icon={(rate > (star-0.25)) ? faStar : faStarHalf}
            color={"#b92f2d"}
          />}
        </li>
      ))}
    </ul>
  );
};
