import { useEffect, useContext, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { ApiOptionsContext } from "../context/Context.js";
import { getFullLangNames } from "../utils/Utils.js";

import MediaDetailField from "../components/MediaDetailField.jsx";
import ImageContainer from "../components/ImageContainer.jsx";
import GenreList from "../components/GenreList.jsx";
import Rating from "../components/Rating.jsx";
import FavoriteIcon from "../components/FavoriteIcon.jsx";
import MediaSubInformation from "../components/MediaSubInformation.jsx";

import "../styles/components/MediaDetailCard.scss";

export default function MediaDetailCard() {
  const { state: { mediaDataLocationState } = {} } = useLocation();
  const { apiOptions } = useContext(ApiOptionsContext);

  const [searchParams] = useSearchParams();
  const [mediaDataState, setMediaDataState] = useState({});
  const [dataAreFetched, setDataAreFetched] = useState(false);

  const prevSearchParamsRef = useRef();

  async function fetchSelectedMedia(queryParams, apiOptions) {
    const url = `https://api.themoviedb.org/3/${queryParams.type}/${queryParams.id}?language=en-US`;
    const response = await fetch(url, apiOptions);
    const fetchedData = await response.json();

    const mappedData = {
      ...fetchedData,
      spoken_languages: fetchedData.spoken_languages.map((language) =>
        getFullLangNames(language["iso_639_1"])
      ),
      genres: fetchedData.genres.map((genre) => genre.name),
      media_type: queryParams.type,
      production_companies:
        fetchedData.production_companies &&
        fetchedData.production_companies.length
          ? fetchedData.production_companies.map((company) => company.name)
          : "",
      created_by:
        fetchedData.created_by && fetchedData.created_by.length
          ? fetchedData.created_by.map((creator) => creator.name)
          : "",
      media_page: fetchedData.homepage,
    };

    setMediaDataState(mappedData);
    setDataAreFetched(true);
  }

  useEffect(() => {
    const paramsObject = Object.fromEntries(searchParams.entries());

    if (
      JSON.stringify(paramsObject) !==
      JSON.stringify(prevSearchParamsRef.current)
    ) {
      prevSearchParamsRef.current = paramsObject;

      if (Object.keys(paramsObject).length > 0) {
        fetchSelectedMedia(paramsObject, apiOptions);
      }
    }
  }, [searchParams]);

  return (
    <>
      {dataAreFetched && (
        <div className="media-detail-card">
          <div className="media-detail-card__content-container">
            <div className="media-detail-card__content">
              <div className="media-detail-card__main-information-container">
                <div className="media-detail-card__meta-container media-detail-card__meta-container">
                  <div className="media-detail-card__title">
                    {mediaDataState.media_type === "movie" &&
                      mediaDataState.title}
                    {mediaDataState.media_type === "tv" && mediaDataState.name}
                  </div>
                  <div className="media-detail-card__tagline">
                    {mediaDataState.tagline}
                  </div>
                  <MediaSubInformation mediaData={mediaDataState} />
                  <GenreList
                    parentClass={"media-detail-card"}
                    formattedGenres={mediaDataState.genres}
                  />
                  <div className="media-detail-card__likeness">
                    <Rating
                      voteAverage={mediaDataState.vote_average}
                      voteCount={mediaDataState.vote_count}
                    />
                    <FavoriteIcon mediaData={mediaDataLocationState} />
                  </div>
                </div>
                <ImageContainer
                  classModifier={"mobile"}
                  parentClass={"media-detail-card"}
                  imageUrl={mediaDataState.poster_path}
                  imageAlt={mediaDataState.title}
                />
              </div>
              <div className="media-detail-card__secondary-information-container">
                <MediaDetailField
                  parentClass={"media-detail-card"}
                  label="Overview"
                  value={mediaDataState.overview}
                />
                {mediaDataState.production_companies && (
                  <MediaDetailField
                    parentClass={"media-detail-card"}
                    label="Production companies"
                  >
                    {mediaDataState.production_companies.map((company) => {
                      return <span key={company}>{company}</span>;
                    })}
                  </MediaDetailField>
                )}
                {mediaDataState.created_by && (
                  <MediaDetailField
                    parentClass={"media-detail-card"}
                    label="Created by"
                  >
                    {mediaDataState.created_by.map((creator) => {
                      return <span key={creator}>{creator}</span>;
                    })}
                  </MediaDetailField>
                )}
                <MediaDetailField
                  parentClass={"media-detail-card"}
                  label="Spoken languages"
                >
                  {mediaDataState.spoken_languages.map((language) => {
                    return <span key={language}>{language}</span>;
                  })}
                </MediaDetailField>
              </div>
            </div>
            <ImageContainer
              classModifier={"desktop"}
              parentClass={"media-detail-card"}
              imageUrl={mediaDataState.poster_path}
              imageAlt={mediaDataState.title}
            />
          </div>
        </div>
      )}
    </>
  );
}
