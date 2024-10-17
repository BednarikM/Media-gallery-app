import { useEffect, useContext, useState } from "react";

import { ApiOptionsContext } from "../context/Context.js";
import {
  formatDate,
  formatRuntime,
  capitalFirstLetter,
  getFullLangNames,
} from "../utils/Utils.js";

import MediaDetailField from "../components/MediaDetailField.jsx";
import ImageContainer from "../components/ImageContainer.jsx";
import GenreList from "../components/GenreList.jsx";
import Rating from "../components/Rating.jsx";
import CountryFlags from "../components/CountryFlags.jsx";

import "../styles/components/MediaDetailCard.scss";

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
      release_date: fetchedData.release_date
        ? formatDate(fetchedData.release_date, "year")
        : null,
      first_air_date: fetchedData.first_air_date
        ? formatDate(fetchedData.first_air_date, "year")
        : null,
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
    <>
      {dataAreFetched && (
        <div className="media-detail-card">
          <div className="media-detail-card__content-container">
            <div className="media-detail-card__content">
              <div className="media-detail-card__main-information-container">
                <div className="media-detail-card__meta-container media-detail-card__meta-container">
                  <div className="media-detail-card__title">
                    {mediaData.media_type === "movie" && mediaData.title}
                    {mediaData.media_type === "tv" && mediaData.name}
                  </div>
                  <div className="media-detail-card__tagline">
                    {mediaData.tagline}
                  </div>
                  <div className="media-detail-card__sub-information">
                    {mediaData.media_type === "movie" && (
                      <>
                        <span>{mediaData.release_date}</span>
                        <CountryFlags country={mediaData.origin_country} />
                        <span>{capitalFirstLetter(mediaData.media_type)}</span>
                        <span>{formatRuntime(mediaData.runtime)}</span>
                      </>
                    )}
                    {mediaData.media_type === "tv" && (
                      <>
                        <span>{mediaData.first_air_date}</span>
                        <CountryFlags country={mediaData.origin_country} />
                        <span>{`${mediaData.media_type.toUpperCase()} ${
                          mediaData.type
                        }`}</span>
                        <span>{`${mediaData.number_of_seasons} SE`}</span>
                        <span>{`${mediaData.number_of_episodes} EP`}</span>
                      </>
                    )}
                    {mediaData.homepage && (
                      <span className="homepage-link">
                        <a
                          href={mediaData.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Homepage
                        </a>
                      </span>
                    )}

                    {mediaData.imdb_id && (
                      <span className="imdb-link">
                        <a
                          href={`https://www.imdb.com/title/${mediaData.imdb_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          IMDB
                        </a>
                      </span>
                    )}
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
                {mediaData.production_companies && (
                  <MediaDetailField
                    parentClass={"media-detail-card"}
                    label="Production companies"
                  >
                    {mediaData.production_companies.map((company) => {
                      return <span key={company}>{company}</span>;
                    })}
                  </MediaDetailField>
                )}
                {mediaData.created_by && (
                  <MediaDetailField
                    parentClass={"media-detail-card"}
                    label="Created by"
                  >
                    {mediaData.created_by.map((creator) => {
                      return <span key={creator}>{creator}</span>;
                    })}
                  </MediaDetailField>
                )}
                <MediaDetailField
                  parentClass={"media-detail-card"}
                  label="Spoken languages"
                >
                  {mediaData.spoken_languages.map((language) => {
                    return <span key={language}>{language}</span>;
                  })}
                </MediaDetailField>
              </div>
            </div>
            <ImageContainer
              classModifier={"desktop"}
              parentClass={"media-detail-card"}
              imageUrl={mediaData.poster_path}
              imageAlt={mediaData.title}
            />
          </div>
        </div>
      )}
    </>
  );
}
