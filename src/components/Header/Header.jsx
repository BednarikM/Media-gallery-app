import SearchInput from "../SearchInput/SearchInput";

import "./Header.scss";

export default function Header(props) {
  return (
    <div className="header">
      <div className="¨neon-wrapper">
        <span className="neon-text">{props.heading}</span>
        <span className="neon-gradient"></span>
      </div>
      <SearchInput />
    </div>
  );
}
