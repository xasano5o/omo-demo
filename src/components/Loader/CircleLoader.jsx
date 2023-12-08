import React from "react";
import { ClockLoader } from "react-spinners";

export default function CircleLoader({ extraclassName, Color }) {
  return <ClockLoader color={Color} className={extraclassName} size={18} />;
}
