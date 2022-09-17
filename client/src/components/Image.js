import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Image = (props) => {
  const { filename, url } = props;

  const [image, setImage] = useState({ searching: true });

  useEffect(() => {
    if (image && !image.searching) return;
    axios
      .get("/api/photos/download/" + filename)
      .then(() => {
        try {
          setImage(require("../images/cache/" + filename));
          axios
            .get("/api/photos/delete/" + filename)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        } catch (e) {
          setImage(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return image && !image.searching ? (
    <img className="h-full" src={image} alt="" />
  ) : (
    <Skeleton style={{ width: "100%", height: "100%" }} />
  );
};
