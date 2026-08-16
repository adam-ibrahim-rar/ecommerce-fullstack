import React from "react";
import Arrow from "./Arrow";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function Swapers() {
  return (
    <div className="flex justify-between items-center w-[100px]">
      <Arrow icon={<GoArrowLeft />} onClick={() => {}} />
      <Arrow icon={<GoArrowRight />} onClick={() => {}} />
    </div>
  );
}
