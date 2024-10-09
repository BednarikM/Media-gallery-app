import icons from "../assets/icons.svg";

export default function SvgIcon({ className, iconName, handleIconClick }) {
  return (
    <svg className={className} onClick={handleIconClick}>
      <use xlinkHref={`${icons}#${iconName}`} />
    </svg>
  );
}
