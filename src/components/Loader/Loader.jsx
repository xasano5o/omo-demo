import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loader({ extraClass, Class, Color, Size }) {
  return (
    <div className={extraClass}>
      <ClipLoader  className={Class} color={Color} size={Size} />
    </div>
  );
}
