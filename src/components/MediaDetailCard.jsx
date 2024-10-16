import { useEffect, useContext, useState } from "react";
import { ApiOptionsContext } from "../context/Context.js";
import {
  formatDate,
  formatRuntime,
  capitalFirstLetter,
} from "../utils/Utils.js";

import MediaDetailField from "../components/MediaDetailField.jsx";
import ImageContainer from "../components/ImageContainer.jsx";
import GenreList from "../components/GenreList.jsx";
import Rating from "../components/Rating.jsx";

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
      release_date: formatDate(fetchedData.release_date, "year"),
      spoken_languages: fetchedData.spoken_languages.map(
        (language) => language["iso_639_1"]
      ),
      genres: fetchedData.genres.map((genre) => genre.name),
      media_type: queryParams.type,
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
        <>
          <div className="media-detail-card__content-container">
            <div className="media-detail-card__content">
              <div className="media-detail-card__main-information-container">
                <div className="media-detail-card__meta-container media-detail-card__meta-container">
                  <div className="media-detail-card__title">
                    {mediaData.title}
                  </div>
                  <div className="media-detail-card__tagline">
                    {mediaData.tagline}
                  </div>
                  <div className="media-detail-card__sub-information">
                    <span>{mediaData.release_date}</span>
                    <span>{capitalFirstLetter(mediaData.media_type)}</span>
                    <span>{formatRuntime(mediaData.runtime)}</span>
                  </div>
                  <GenreList
                    parentClass={"media-detail-card"}
                    formattedGenres={mediaData.genres}
                  />
                  <Rating
                    voteAverage={mediaData.vote_average}
                    voteCount={mediaData.vote_count}
                  />
                </div>
                <ImageContainer
                  classModifier={"mobile"}
                  parentClass={"media-detail-card"}
                  imageUrl={mediaData.poster_path}
                  imageAlt={mediaData.title}
                />
              </div>
              <div className="media-detail-card__secondary-information-container">
                <MediaDetailField
                  parentClass={"media-detail-card"}
                  label="Overview"
                  value={mediaData.overview}
                />
              </div>
            </div>
            <ImageContainer
              classModifier={"desktop"}
              parentClass={"media-detail-card"}
              imageUrl={mediaData.poster_path}
              imageAlt={mediaData.title}
            />
          </div>
        </>
      )}
    </div>
  );
}
