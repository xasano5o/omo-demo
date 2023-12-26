import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "#dad2d2",
};

function Loading() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;