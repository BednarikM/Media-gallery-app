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

      {value && <span className="media-detail-field__value">{value}</span>}
      {children && <span className="media-detail-field__children">{children}</span>}
    </div>
  );
}
