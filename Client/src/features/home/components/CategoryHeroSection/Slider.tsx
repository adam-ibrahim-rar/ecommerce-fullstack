// FristSection/Slider/Slider.tsx
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { HiOutlineArrowRight } from "react-icons/hi";
import "swiper/css";
import "swiper/css/pagination";
import type { Banner } from "../../types/home";

interface SliderProps {
  slides: Banner[];
}

export default function Slider({ slides }: SliderProps) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      className="hero-swiper w-[892px] h-[344px] mt-8 bg-black"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="flex h-full">
            <div className="w-[45%] flex flex-col justify-center pl-16 text-white">
              <div className="flex items-center gap-6 mb-6">
                <span className="text-base font-light">{slide.title}</span>
              </div>
              <h1 className="text-[48px] leading-[60px] font-semibold tracking-wide w-[290px]">
                {slide.heading ?? slide.title}
              </h1>
              <Link to={slide.link} className="mt-8 inline-flex items-center gap-3 w-fit">
                <span className="border-b border-white pb-1">Shop Now</span>
                <HiOutlineArrowRight className="text-2xl" />
              </Link>
            </div>
            <div className="w-[55%] flex justify-end items-end pr-8">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-[500px] h-[320px] object-contain self-center"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}