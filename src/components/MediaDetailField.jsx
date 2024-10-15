export default function MediaDetailField({ label, value, children }) {
  return (
    <div
      className={`media-detail-field media-detail-field__${label
        .replace(" ", "-")
        .toLowerCase()}`}
    >
      {label !== "Title" && (
        <span className="media-detail-field__key">{label}</span>
      )}

      {children && children}
      {value && <span className="media-detail-field__value">{value}</span>}
    </div>
  );
}
