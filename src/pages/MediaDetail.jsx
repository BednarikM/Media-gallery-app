import { useEffect, useState, useContext } from "react";
import { GenreContext } from "../context/Context.js";
import { useNavigate } from "react-router-dom";

import MediaDetailCard from "../components/MediaDetailCard";

export default function MediaDetail() {
  const [media, _] = useState(
    JSON.parse(localStorage.getItem("selectedMedia")) || {}
  );
  const { setActiveMediasGenre } = useContext(GenreContext);

  const navigate = useNavigate();

  if (Object.entries(media).length === 0) {
    return null;
  }

  useEffect(() => {
    if (Object.entries(media).length === 0) {
      navigate("/404");
    }
  }, [media]);

  useEffect(() => {
    setActiveMediasGenre("search");
  });

  return <MediaDetailCard media={media} />;
}
