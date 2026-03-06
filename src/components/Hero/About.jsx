import React from "react";
import venue1 from "../../assets/hero2.png";
import venue2 from "../../assets/hero3.png";
import venue3 from "../../assets/hero2.png";
import venue4 from "../../assets/hero3.png";

const AboutUs = () => {
  return (
    <div id="about" className="px-6 md:px-20 py-12 bg-white mt-10">
      <div className="flex flex-col md:flex-row items-start justify-between">
        {/* Text Section */}
        <div className="flex-1 mb-10 md:mb-0 md:pr-8">
          <p className="text-blue-600 text-sm font-medium mb-5">
            ABOUT US ---------
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Welcome to <span className="text-blue-600">Hamro Hotel</span>
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed text-justify">
            Your trusted platform for seamless hotel bookings and hospitality
            services in Nepal. At Hamro Hotel, we simplify the process of
            discovering and booking the perfect hotels for vacations, business
            trips, family stays, and special occasions.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Our team is dedicated to bringing you the best hotels with
            transparent pricing, detailed hotel information, and user-friendly
            booking features to make your stay comfortable and memorable.
          </p>

          <button className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-orange-50 transition">
            Discover More
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-6 place-items-center">
            <div className="rounded-2xl overflow-hidden h-40 w-full">
              <img
                src={venue1}
                alt="Hotel 1"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-2xl overflow-hidden h-40 w-full">
              <img
                src={venue2}
                alt="Hotel 2"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-2xl overflow-hidden h-40 w-full">
              <img
                src={venue3}
                alt="Hotel 3"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-2xl overflow-hidden h-40 w-full">
              <img
                src={venue4}
                alt="Hotel 4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
