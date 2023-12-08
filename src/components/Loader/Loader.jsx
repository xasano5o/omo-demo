import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loader({ extraclassName, className, Color, Size }) {
  return (
    <div className={extraclassName}>
      <ClipLoader  className={className} color={Color} size={Size} />
    </div>
  );
}
