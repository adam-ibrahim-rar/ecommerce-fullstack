import Arrow from "./Arrow";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function Swapers({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}) {
  return (
    <div className="flex justify-between items-center w-[100px]">
      <Arrow icon={<GoArrowLeft />} onClick={onPrev} disabled={prevDisabled} />
      <Arrow icon={<GoArrowRight />} onClick={onNext} disabled={nextDisabled} />
    </div>
  );
}
