import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaApple } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

import "swiper/css";
import "swiper/css/pagination";

import iphone from "../../assets/iphone.jpg"

const slides = [
  {
    id: 1,
    title: "iPhone 14 Series",
    heading: "Up to 10% off Voucher",
    image: iphone,
  },
  {
    id: 2,
    title: "iPhone 14 Series",
    heading: "Up to 10% off Voucher",
    image: iphone,
  },
  {
    id: 3,
    title: "iPhone 14 Series",
    heading: "Up to 10% off Voucher",
    image: iphone,
  },
  {
    id: 4,
    title: "iPhone 14 Series",
    heading: "Up to 10% off Voucher",
    image: iphone,
  },
  {
    id: 5,
    title: "iPhone 14 Series",
    heading: "Up to 10% off Voucher",
    image: iphone,
  },
];

export default function Slider() {
  return (
   <Swiper
  modules={[Pagination, Autoplay]}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop
  className="hero-swiper w-[892px] h-[344px] mt-8 bg-black "
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.id}>
      <div className="flex h-full">

        <div className="w-[45%] flex flex-col justify-center pl-16 text-white">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-base font-light">
              {slide.title}
            </span>
          </div>

          <h1 className="text-[48px] leading-[60px] font-semibold tracking-wide w-[290px]">
            Up to 10%
            <br />
            off Voucher
          </h1>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-3 w-fit"
          >
            <span className="border-b border-white pb-1">
              Shop Now
            </span>

            <HiOutlineArrowRight className="text-2xl" />
          </Link>
        </div>

        <div className="w-[55%] flex justify-end items-end pr-8">
          <img
            src={slide.image}
            alt=""
            className="w-[500px] h-[320px] object-contain"
          />
        </div>

      </div>
    </SwiperSlide>
  ))}
</Swiper>
  );
}