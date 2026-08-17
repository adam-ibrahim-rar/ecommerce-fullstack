import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoSendOutline } from "react-icons/io5";

import qrCode from "../../assets/iphone.jpg";
import googlePlay from "../../assets/iphone.jpg";
import appStore from "../../assets/iphone.jpg";

export default function Footer() {
  return (
    <footer className=" w-full bg-black text-white mt-20">
      <div className="w-[1170px] mx-auto py-8">
        <div className="grid grid-cols-5 gap-[60px]">
          <div className="flex flex-col gap-4">
            <Link to={"/"}>
              <h2 className="text-[24px] font-semibold">Exclusive</h2>
            </Link>

            <h3 className="text-[18px] font-medium">Subscribe</h3>

            <p className="text-[14px]">Get 10% off your first order</p>

            <div className="relative w-[170px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  h-[38px]
                  bg-transparent
                  border
                  border-white
                  rounded-[3px]
                  px-3
                  pr-9
                  text-[13px]
                  outline-none
                  placeholder:text-gray-500
                "
              />

              <button
                type="button"
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                  hover:scale-110
                  transition
                "
              >
                <IoSendOutline size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[18px] font-medium">Support</h2>

            <p className="text-[14px] leading-6">
              111 Bijoy sarani, Dhaka,
              <br />
              DH 1515, Bangladesh.
            </p>

            <a
              href="mailto:exclusive@gmail.com"
              className="text-[14px] hover:text-gray-400 transition"
            >
              exclusive@gmail.com
            </a>

            <a
              href="tel:+88015888889999"
              className="text-[14px] hover:text-gray-400 transition"
            >
              +88015-88888-9999
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[18px] font-medium">Account</h2>

            <Link
              to="/account"
              className="text-[14px] hover:text-gray-400 transition"
            >
              My Account
            </Link>

            <Link
              to="/account/register"
              className="text-[14px] hover:text-gray-400 transition"
            >
              Login / Register
            </Link>

            <Link
              to="/cart"
              className="text-[14px] hover:text-gray-400 transition"
            >
              Cart
            </Link>

            <Link
              to="/wishlist"
              className="text-[14px] hover:text-gray-400 transition"
            >
              Wishlist
            </Link>

            <Link
              to="/products"
              className="text-[14px] hover:text-gray-400 transition"
            >
              Shop
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[18px] font-medium">Quick Link</h2>

            <Link
              to="/privacy-policy"
              className="text-[14px] hover:text-gray-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-[14px] hover:text-gray-400 transition"
            >
              Terms Of Use
            </Link>

            <Link
              to="/faq"
              className="text-[14px] hover:text-gray-400 transition"
            >
              FAQ
            </Link>

            <Link
              to="/contact"
              className="text-[14px] hover:text-gray-400 transition"
            >
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-[18px] font-medium">Download App</h2>

            <p className="text-[11px] text-gray-400">
              Save $3 with App New User Only
            </p>

            <div className="flex gap-2">
              <img
                src={qrCode}
                alt="QR Code"
                className="w-[62px] h-[62px] object-contain bg-white"
              />

              <div className="flex flex-col gap-1">
                <img
                  src={googlePlay}
                  alt="Google Play"
                  className="w-[91px] h-[28px] object-contain"
                />

                <img
                  src={appStore}
                  alt="App Store"
                  className="w-[91px] h-[28px] object-contain"
                />
              </div>
            </div>

            <div className="flex items-center gap-5 mt-2">
              <a href="#" className="hover:text-gray-400 transition">
                <FaFacebookF size={16} />
              </a>

              <a href="#" className="hover:text-gray-400 transition">
                <FaTwitter size={17} />
              </a>

              <a href="#" className="hover:text-gray-400 transition">
                <FaInstagram size={18} />
              </a>

              <a href="#" className="hover:text-gray-400 transition">
                <FaLinkedinIn size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="py-3 flex justify-center">
          <p className="text-[14px] text-gray-600">
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
