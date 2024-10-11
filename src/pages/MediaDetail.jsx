import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImageContainer from "../components/ImageContainer";

export default function MediaDetail() {
  const [media, _ ] = useState(
    JSON.parse(localStorage.getItem("selectedMedia")) || {}
  );

  console.log(media)

  const navigate = useNavigate();

  if (Object.entries(media).length === 0) {
    return null;
  }

  useEffect(() => {
    if (Object.entries(media).length === 0) {
      navigate("/404");
    }
  }, [media]);

  return (
    <div>
      <h1>TEST</h1>
      <div>{media.name}</div>
      <div>{media.adult.toString()}</div>
      <ImageContainer imageUrl={media.backdrop_path} imageAlt={media.formattedTitle}/>
    </div>
  )
}
