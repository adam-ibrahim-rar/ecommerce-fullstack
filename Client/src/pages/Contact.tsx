import { useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import Button from "../components/Button";
import PathLocation from "../components/PathLocation";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="w-[1170px] mx-auto">
    <PathLocation/>
      <div className="flex gap-5">
        <div className="w-[340px] shadow-lg inset-shadow-xs h-[457px] flex flex-col items-start px-[50px] justify-center gap-6">
          <div className="flex flex-col gap-4 w-[262px]">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] rounded-full bg-secondary-two text-white flex items-center justify-center">
                <FiPhone size={20} />
              </div>

              <span className="text-[17px] font-semibold">Call To Us</span>
            </div>

            <p className="text-[14px] font-medium">
              We are available 24/7, 7 days a week.
            </p>

            <p className="text-[14px] font-medium">
              Phone: +880161112222
            </p>
          </div>

          <div className="bg-gray-700 h-[1.5px] w-[270px]"></div>

          <div className="flex flex-col gap-4 h-[180px] items-start w-[250px]">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] rounded-full bg-secondary-two text-white flex items-center justify-center">
                <FiMail size={20} />
              </div>

              <span className="text-[17px] font-semibold">Write To Us</span>
            </div>

            <p className="text-[14px] leading-5 font-medium">
              Fill out our form and we will contact
              <br />
              you within 24 hours.
            </p>

            <p className="text-[14px] font-medium">
              Emails: customer@exclusive.com
            </p>

            <p className="text-[14px] font-medium">
              Emails: support@exclusive.com
            </p>
          </div>
        </div>

        <div className="w-[800px] h-[457px] p-7 shadow-lg inset-shadow-xs">
          <form className="flex flex-col gap-8 w-[737px] h-[377px]">
            <div className="flex gap-3">

            <div className="relative w-full">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full h-[50px] bg-gray-100 px-3 text-[14px] outline-none"
                />

                <span
                  className={`absolute left-[88px] top-1/2 -translate-y-1/2 text-secondary-two ${
                    name ? "hidden" : ""
                  }`}
                >
                  *
                </span>
              </div>

              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full h-[50px] bg-gray-100 px-3 text-[14px] outline-none"
                />

                <span
                  className={`absolute left-[85px] top-1/2 -translate-y-1/2 text-secondary-two ${
                    email ? "hidden" : ""
                  }`}
                >
                  *
                </span>
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your Phone"
                  className="w-full h-[50px] bg-gray-100 px-3 text-[14px] outline-none"
                />

                <span
                  className={`absolute left-[90px] top-1/2 -translate-y-1/2 text-secondary-two ${
                    phone ? "hidden" : ""
                  }`}
                >
                  *
                </span>
              </div>

            </div>

            <textarea
              placeholder="Your Massage"
              className="w-full h-[207px] bg-gray-100 px-3 py-3 text-[14px] outline-none resize-none"
            />

            <div className="self-end">
              <Button
                content="Send Message"
                handleClick={() => {}}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}