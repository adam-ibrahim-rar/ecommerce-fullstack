import { CiTwitter, CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";
import {
  FiShoppingBag,
  FiDollarSign,
  FiPackage,
  FiBriefcase,
} from "react-icons/fi";

import ourStory from "../assets/iphone.jpg";
import tomCruise from "../assets/iphone.jpg";
import emmaWatson from "../assets/iphone.jpg";
import willSmith from "../assets/iphone.jpg";
import PathLocation from "../components/Helpers/PathLocation";
import OurServices from "../components/Helpers/OurServices";
import { useEffect, useState } from "react";
import AboutSkeleton from "../components/Skeletons/AboutSkeleton";

const statistics = [
  {
    number: "10.5k",
    text: "Sellers active our site",
    icon: FiShoppingBag,
  },
  {
    number: "33k",
    text: "Monthly Product Sale",
    icon: FiDollarSign,
    active: true,
  },
  {
    number: "45.5k",
    text: "Customer active in our site",
    icon: FiPackage,
  },
  {
    number: "25k",
    text: "Anual gross sale in our site",
    icon: FiBriefcase,
  },
];
const team = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: tomCruise,
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image: emmaWatson,
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    image: willSmith,
  },
];

export default function About() {
  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];
  const [loading, setlodaing] = useState(true);
  useEffect(() => {
    setTimeout(() => setlodaing(false), 500);
  }, []);

  return loading ? (
    <AboutSkeleton />
  ) : (
    <div className="w-[1170px] mx-auto">
      <PathLocation />
      <div className="flex items-center justify-between ">
        <div className="w-[500px]">
          <h1 className="text-[54px] font-semibold mb-7">Our Story</h1>

          <p className="text-[16px] leading-6 font-medium mb-5">
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions.
          </p>

          <p className="text-[16px] leading-6 font-medium">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>

        <img
          src={ourStory}
          alt="Our Story"
          className="w-[585px] h-[620px] object-cover"
        />
      </div>

      <div className="flex justify-between mt-14">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.number}
              className={`
        w-[270px] h-[230px]
        border border-gray-300
        rounded-sm
        flex items-center justify-between
        ${item.active ? "bg-secondary-two text-white" : "bg-white"}
      `}
            >
              <div className="w-full h-[170px] flex flex-col items-center justify-center gap-2">
                <div
                  className={`
            w-[80px] h-[80px]
            rounded-full
            flex items-center justify-center
            border-[10px]
            mb-2
            ${
              item.active
                ? "bg-white  text-secondary-two border-red-300"
                : "bg-black text-white border-gray-300"
            }
          `}
                >
                  <Icon size={30} />
                </div>

                <span className="text-[36px] leading-none font-semibold">
                  {item.number}
                </span>

                <span className="text-[16px] h-[24px] leading-none text-center">
                  {item.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-5 mt-14">
        {team.map((member) => (
          <div key={member.name} className=" h-[564px] gap-8">
            <div className="w-full h-[430px] bg-gray-100 flex items-end justify-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-3xl  mt-3">{member.name}</h2>

            <p className="text-[16px] mt-1">{member.role}</p>

            <div className="flex gap-3 mt-2">
              <CiTwitter size={24} />
              <CiInstagram size={24} />
              <RiLinkedinLine size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-5 mb-10">
        {pages.map((item) => (
          <button
            key={item}
            onClick={() => setPage(item)}
            className={`
        w-2 h-2 rounded-full cursor-pointer
        ${page === item ? "bg-secondary-two outline-1 outline-offset-2" : "bg-gray-300"}
      `}
          />
        ))}
      </div>
      <OurServices />
    </div>
  );
}
