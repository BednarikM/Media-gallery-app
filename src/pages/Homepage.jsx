import MediaList from "../components/MediaList.jsx";
import { useEffect } from "react";
export default function Homepage({ mediasData }) {
  useEffect(() => {}, [mediasData]);

  return <MediaList mediasData={mediasData} />;
}
