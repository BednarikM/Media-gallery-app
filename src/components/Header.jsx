import SearchInput from "./SearchInput.jsx";

import "../styles/Header.scss";

export default function Header(props) {
  return (
    <div className="header">
      <div className="neon-wrapper">
        <span className="neon-text">{props.heading}</span>
        <div className="neon-gradient" />
      </div>
      <SearchInput />
    </div>
  );
}
