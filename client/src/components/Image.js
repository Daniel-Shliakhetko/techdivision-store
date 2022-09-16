import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ImagePage = (props) => {
  const {filename, url} = props;

  const [image, setImage] = useState({ searching: true });

  useEffect(() => {
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

  return image && <img className="" src={image} alt="" />;
};
