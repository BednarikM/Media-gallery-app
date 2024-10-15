import MediaDetailField from "./MediaDetailField";
import ImageContainer from "../components/ImageContainer";
import GenreList from "../components/GenreList";
import { useEffect, useContext, useState } from "react";
import { ApiOptionsContext } from "../context/Context.js";
import { formatDate } from "../utils/Utils.js";

import "../styles/MediaDetailCard.scss";

export default function MediaDetailCard() {
  const { apiOptions } = useContext(ApiOptionsContext);
  const [queryParams, setQueryParams] = useState({});
  const [mediaData, setMediaData] = useState({});
  const [dataAreFetched, setDataAreFetched] = useState(false);

  async function fetchSelectedMedia(queryParams, apiOptions) {
    const url = `https://api.themoviedb.org/3/${queryParams.type}/${queryParams.id}?language=en-US`;
    const response = await fetch(url, apiOptions);
    const fetchedData = await response.json();

    const mappedData = {
      ...fetchedData,
      release_date: formatDate("full", fetchedData.release_date),
      spoken_language: fetchedData.spoken_languages.map(
        (language) => language["iso_639_1"]
      ),
      genres: fetchedData.genres.map((genre) => genre.name),
      media_type: queryParams.type
    };

    setMediaData(mappedData);
    setDataAreFetched(true);

    console.log(mappedData);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramsObject = Object.fromEntries(queryParams.entries());

    if (Object.entries(paramsObject).length) console.log(paramsObject);
    setQueryParams(paramsObject);
  }, []);

  useEffect(() => {
    if (Object.entries(queryParams).length) {
      fetchSelectedMedia(queryParams, apiOptions);
    }
  }, [queryParams]);

  return (
    <div className="media-detail-card">
      {dataAreFetched && (
        <div className="media-detail-card__content">
          <MediaDetailField label="Title" value={mediaData.title} />
          <ImageContainer
            parentClass={"media-detail-card"}
            imageUrl={mediaData.poster_path}
            imageAlt={mediaData.title}
          />

          <MediaDetailField
            label="Release date:"
            value={mediaData.release_date}
          />
          <MediaDetailField label="Genres:">
            <GenreList formattedGenres={mediaData.genres} />
          </MediaDetailField>
          <MediaDetailField label="Age restriction:" value={mediaData.adult.toString()} />
          <MediaDetailField label="Media type:" value={mediaData.media_type} />
          <MediaDetailField label="Overview:" value={mediaData.overview} />
          <MediaDetailField
            label="Average rating:"
            value={`${mediaData.vote_average} / 10  (${mediaData.vote_count} votes)`}
          />
        </div>
      )}
    </div>
  );
}
