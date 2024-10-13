import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MediaDetailCard from "../components/MediaDetailCard";

export default function MediaDetail() {
  const [media, _] = useState(
    JSON.parse(localStorage.getItem("selectedMedia")) || {}
  );

  // console.log(media);

  const navigate = useNavigate();

  if (Object.entries(media).length === 0) {
    return null;
  }

  useEffect(() => {
    if (Object.entries(media).length === 0) {
      navigate("/404");
    }
  }, [media]);

  return <MediaDetailCard media={media} />;
}
