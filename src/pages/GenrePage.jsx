import { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";

import { MediaGenresContext } from "../context/MediaGenresContext.jsx";

import MediaList from "../components/MediaList.jsx";

export default function GenrePage({ mediaDataState }) {
  const { genre } = useParams();
  const { validMediaGenres } = useContext(MediaGenresContext);

  if (!validMediaGenres.includes(genre)) {
    return <Navigate to="/404" replace />; // TRIGER NOTFOUND PAGE
  }

  return <MediaList mediaDataState={mediaDataState} />;
}
