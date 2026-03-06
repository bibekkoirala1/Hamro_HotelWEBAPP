import React from "react";
import { GiPartyPopper } from "react-icons/gi";
import { FaRegClock } from "react-icons/fa";
import { IoIosPin } from "react-icons/io";

const WhyChooseData = [
  {
    id: 1,
    title: "Wide Range of Hotels",
    desc: "Explore a variety of hotels that match your comfort, budget, and travel needs.",
    icon: <GiPartyPopper />,
    bgColor: "#f97316",
  },
  {
    id: 2,
    title: "Easy Online Booking",
    desc: "Book your hotel room in just a few clicks with our simple and secure system.",
    link: "/",
    icon: <FaRegClock />,
    bgColor: "#fb923c",
  },
  {
    id: 3,
    title: "Prime Locations",
    desc: "Choose hotels located in the best areas for convenience and accessibility.",
    link: "/",
    icon: <IoIosPin />,
    bgColor: "#ea580c",
  },
  {
    id: 4,
    title: "Affordable Prices",
    desc: "We offer competitive pricing for hotel bookings that fit your budget.",
    link: "/",
    icon: <GiPartyPopper />,
    bgColor: "#fdba74",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="">
      <div className="container py-24">
        <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-blue-600">
            Why Choose Us
          </h1>

          <p className="font-semibold text-3xl">
            Benefits of booking with Hamro Hotel
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {WhyChooseData.map((item) => {
            return (
              <div
                key={item.id}
                className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)]"
              >
                {/* icon section */}
                <div
                  style={{ backgroundColor: item.bgColor }}
                  className="w-10 h-10 rounded-lg flex justify-center items-center text-white"
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>

                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
