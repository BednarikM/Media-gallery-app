export default function SvgIcon({ className, iconName, handleIconClick }) {
  return (
    <svg
      className={className}
      onClick={handleIconClick ? (e) => handleIconClick(e) : undefined}
    >
      <use xlinkHref={`/icons.svg#${iconName}`} />
    </svg>
  );
}
