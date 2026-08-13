import FristSection from "./FristSection";
import SecondSection from "./SecondSection";

export default function Home() {
  return (
    <div className="w-[1170px] flex flex-col gap-8 mx-auto">
      <FristSection/>
      <SecondSection/>
    </div>
  )
}
