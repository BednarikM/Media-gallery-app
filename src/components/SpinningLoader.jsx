import "../styles/components/SpinningLoader.scss";

export default function SpinningLoader() {
  return (
    <div className="spinning-loader">
      <span className="spinning-loader__text">Fetching media...</span>
      <div className="spinning-loader__circle" />
    </div>
  );
}
