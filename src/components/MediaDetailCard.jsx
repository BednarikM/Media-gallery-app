import ImageContainer from "../components/ImageContainer";

export default function MediaDetailCard({ media }) {
  return (
    <div className="media-detail-card">
      <div className="media-detail-card__title">
        <span className="media-detail-card__key">Title</span>
        <span className="media-detail-card__value">{media.formattedTitle}</span>
      </div>
      <ImageContainer
        parentClass={"media-detail-card"}
        imageUrl={media.backdrop_path}
        imageAlt={media.formattedTitle}
      />

      <div className="media-detail-card__release-date">
        <span className="media-detail-card__key">Release date</span>
        <span className="media-detail-card__value">
          {media.formattedReleaseDate}
        </span>
      </div>
      <div className="media-detail-card__genres-container">
        {media.formattedGenres.map((genre, index) => {
          return (
            <span className="media-detail-card__genre" key={index}>
              {genre}
            </span>
          );
        })}
      </div>
      <div className="media-detail-card__age-restriction">
        <span className="media-detail-card__key">Age restriction</span>
        <span className="media-detail-card__value">
          {media.adult.toString()}
        </span>
      </div>
      <div className="media-detail-card__media-type">
        <span className="media-detail-card__key">Media type</span>
        <span className="media-detail-card__value">{media.media_type}</span>
      </div>
      <div className="media-detail-card__overview">
        <span className="media-detail-card__key">Overview</span>
        <span className="media-detail-card__value">{media.overview}</span>
      </div>
      <div className="media-detail-card__rating">
        <span className="media-detail-card__key">Average rating</span>
        <span className="media-detail-card__value">
          {`${media.vote_average} / 10 (${media.vote_count} votes)`}
        </span>
        <span></span>
      </div>
      <div className="media-detail-card__vote-count">
        <span className="media-detail-card__key">Vote count</span>
        <span className="media-detail-card__value">{media.vote_count}</span>
      </div>
    </div>
  );
}
