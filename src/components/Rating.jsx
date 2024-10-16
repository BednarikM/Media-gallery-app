import SvgIcon from "../components/SvgIcon.jsx";

import "../styles/Rating.scss";

export default function Rating({ voteAverage, voteCount }) {
  return (
    <div className="rating">
      <SvgIcon className="rating__svg-star" iconName={"star"} />
      <div className="rating__numbers">
        <div className="rating__numbers-container">
          <span className="rating__average">{voteAverage}</span>
          <span className="rating__maximum">/10</span>
        </div>
        <span className="rating__count">{voteCount}x</span>
      </div>
    </div>
  );
}
