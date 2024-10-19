import { formatRuntime, capitalFirstLetter } from "../utils/Utils.js";

import CountryFlags from "../components/CountryFlags.jsx";

import "../styles/components/MediaSubInformation.scss";

export default function MediaSubInformation({ mediaData }) {
  const {
    media_type,
    origin_country,
    release_date,
    first_air_date,
    runtime,
    number_of_seasons,
    number_of_episodes,
    homepage,
    imdb_id,
    type,
  } = mediaData;

  return (
    <div className="sub-information">
      {media_type === "movie" && (
        <>
          {release_date && <span>{release_date}</span>}
          {origin_country && <CountryFlags country={origin_country} />}
          {media_type && <span>{capitalFirstLetter(media_type)}</span>}
          {runtime && <span>{formatRuntime(runtime)}</span>}
        </>
      )}
      {media_type === "tv" && (
        <>
          {first_air_date && <span>{first_air_date}</span>}
          {origin_country && <CountryFlags country={origin_country} />}
          {media_type && <span>{`${media_type.toUpperCase()} ${type}`}</span>}
          {number_of_seasons && <span>{`${number_of_seasons} SE`}</span>}
          {number_of_episodes && <span>{`${number_of_episodes} EP`}</span>}
        </>
      )}
      {homepage && (
        <span className="sub-information__homepage-link">
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            Homepage
          </a>
        </span>
      )}

      {imdb_id && (
        <span className="sub-information__imdb-link">
          <a
            href={`https://www.imdb.com/title/${imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            IMDB
          </a>
        </span>
      )}
    </div>
  );
}
