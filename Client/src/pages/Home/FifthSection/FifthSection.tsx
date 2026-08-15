import iphone from "../../../assets/iphone.jpg";
import Button from "../../../components/Button";

export default function FifthSection() {
  return (
    <div className=" mt-7 flex h-[500px] w-[1170px] items-center justify-between bg-black px-[40px] text-white">
      <section className="flex h-full w-[45%]  flex-col justify-center">
        <span className="mb-8 text-lg font-medium  capitalize text-secondary-three">
          Categories
        </span>

        <h2 className=" h-[120px] text-5xl  capitalize font-semibold line-clamp">
          enhance Your music experience
        </h2>

        <div className="mt-8 flex items-center gap-3">
          <TimeBox value="23" label="Hours" />
          <TimeBox value="05" label="Days" />
          <TimeBox value="59" label="Minutes" />
          <TimeBox value="35" label="Seconds" />
        </div>

        <Button
          content="Buy Now!"
          classes="mt-9 w-fit hover:opacity-80 font-medium bg-secondary-three "
          handleClick={() => {}}
        />
      </section>

      <div className="flex h-[420px] w-[600px] items-center justify-center">
        <img
          src={iphone}
          alt="Product"
          className="h-[420px] rounded-2xl w-[600px] object-cover"
        />
      </div>
    </div>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex h-[62px] w-[62px] flex-col items-center justify-center rounded-full bg-white text-black">
      <span className="text-xl font-bold ">{value}</span>
      <span className="mb-1 font-medium text-[12px]">{label}</span>
    </div>
  );
}
