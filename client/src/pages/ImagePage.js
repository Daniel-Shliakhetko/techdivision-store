import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ImagePage = (props) => {
  const params = useParams();

  const [image, setImage] = useState({searching:true});

  useEffect(() => {
    if(image && !image.searching) return;
    axios.get("/api/photos/download/" + params.filename).then(() => {
      try {
        setImage(require("../images/cache/" + params.filename));
        axios.get("/api/photos/delete/" + params.filename).then(() => {

        }).catch((error)=>{
        console.log(error);
    })
      } catch (e) {
        setImage(false);
      }
    }).catch((error)=>{
        console.log(error);
    });
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {image.searching ? (
        <span className="text-3xl font-bold">Searching</span>
      ):
      image ? (
        <img className="" src={image} alt="none image" />
      ) : (
        <span className="text-3xl font-bold">Nothing Found!</span>
      )}
    </div>
  );
};
