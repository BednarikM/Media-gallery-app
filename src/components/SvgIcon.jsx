import icons from "../assets/icons.svg";

export default function SvgIcon({ className, iconName, handleIconClick }) {
  return (
    <svg className={className} onClick={(e) => handleIconClick(e)}>
      <use xlinkHref={`${icons}#${iconName}`} />
    </svg>
  );
}
