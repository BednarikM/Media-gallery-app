import { useState } from "react";

import {
  formatRuntime,
  capitalFirstLetter,
  formatDate,
} from "../utils/Utils.js";

import CountryFlags from "../components/CountryFlags.jsx";

import "../styles/components/MediaSubInformation.scss";

export default function MediaSubInformation({ mediaData }) {
  const [visitedLinks, setVisitedLinks] = useState({
    mediaPage: false,
    imdb: false,
  });

  const {
    media_type,
    origin_country,
    release_date,
    first_air_date,
    runtime,
    number_of_seasons,
    number_of_episodes,
    media_page,
    imdb_id,
    type,
  } = mediaData;

  function handleLinkVisited(linkType) {
    setVisitedLinks((prev) => ({ ...prev, [linkType]: true }));
  }

  return (
    <div className="sub-information">
      {media_type === "movie" && (
        <>
          {release_date && <span>{formatDate(release_date)}</span>}
          {origin_country && <CountryFlags country={origin_country} />}
          {media_type && <span>{capitalFirstLetter(media_type)}</span>}
          {runtime && <span>{formatRuntime(runtime)}</span>}
        </>
      )}
      {media_type === "tv" && (
        <>
          {first_air_date && <span>{formatDate(first_air_date)}</span>}
          {origin_country && <CountryFlags country={origin_country} />}
          {(media_type || type) && (
            <span>
              {media_type && `${media_type.toUpperCase()}`}
              {type && ` ${type}`}
            </span>
          )}
          {number_of_seasons && <span>{`${number_of_seasons} SE`}</span>}
          {number_of_episodes && <span>{`${number_of_episodes} EP`}</span>}
        </>
      )}
      {media_page && (
        <span
          className={`sub-information__media-page-link ${
            visitedLinks.mediaPage
              ? "sub-information__media-page-link--visited"
              : ""
          }`}
        >
          <a
            href={media_page}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkVisited("mediaPage")}
          >
            Media page
          </a>
        </span>
      )}

      {imdb_id && (
        <span
          className={`sub-information__imdb-link ${
            visitedLinks.mediaPage
              ? "sub-information__media-page-link--visited"
              : ""
          }`}
        >
          <a
            href={`https://www.imdb.com/title/${imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkVisited("imdb")}
          >
            IMDB
          </a>
        </span>
      )}
    </div>
  );
}
