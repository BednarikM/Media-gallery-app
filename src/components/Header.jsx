import SearchInput from "./SearchInput.jsx";

import "../styles/Header.scss";

export default function Header(props) {
  return (
    <div className="header">
      <span className="neon-text">{props.heading}</span>
      <SearchInput />
    </div>
  );
}
