import { FaTruck, FaHeadphones, FaShieldAlt } from "react-icons/fa";

export default function EighthSection() {
  return (
    <section className="w-[943px] h-[161px] mx-auto flex justify-between">

      <div className="w-[280px] flex flex-col items-center text-center">
        <div className="w-[62px] h-[62px] rounded-full bg-one flex items-center justify-center mb-5">
          <div className="w-[44px] h-[44px] rounded-full bg-black flex items-center justify-center">
            <FaTruck className="text-white text-[22px]" />
          </div>
        </div>

        <h3 className="text-[16px] font-bold uppercase">
          Free And Fast Delivery
        </h3>

        <p className="text-[14px] mt-1">
          Free delivery for all orders over $140
        </p>
      </div>

      <div className="w-[280px] flex flex-col items-center text-center">
        <div className="w-[62px] h-[62px] rounded-full bg-one flex items-center justify-center mb-5">
          <div className="w-[44px] h-[44px] rounded-full bg-black flex items-center justify-center">
            <FaHeadphones className="text-white text-[22px]" />
          </div>
        </div>

        <h3 className="text-[16px] font-bold uppercase">
          24/7 Customer Service
        </h3>

        <p className="text-[14px] mt-1">
          Friendly 24/7 customer support
        </p>
      </div>

      <div className="w-[280px] flex flex-col items-center text-center">
        <div className="w-[62px] h-[62px] rounded-full bg-one flex items-center justify-center mb-5">
          <div className="w-[44px] h-[44px] rounded-full bg-black flex items-center justify-center">
            <FaShieldAlt className="text-white text-[22px]" />
          </div>
        </div>

        <h3 className="text-[16px] font-bold uppercase">
          Money Back Guarantee
        </h3>

        <p className="text-[14px] mt-1">
          We return money within 30 days
        </p>
      </div>

    </section>
  );
}