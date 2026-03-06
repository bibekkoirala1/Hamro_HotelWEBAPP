import React from "react";
import CountUp from "react-countup";

const NumberCounter = () => {
  return (
    <div className="bg-blue-600 py-12">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold text-white">
            <CountUp
              start={0}
              end={150}
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p className="text-white">Hotels Listed</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold text-white">
            <CountUp
              end={50000}
              separator=","
              suffix="+"
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p className="text-white">Guests Hosted</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold text-white">
            <CountUp
              end={200}
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p className="text-white">Rooms Available</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold text-white">
            <CountUp
              end={100000}
              separator=","
              suffix="+"
              duration={3}
              enableScrollSpy={true}
              scrollSpyOnce={true}
            />
          </p>
          <p className="text-white">Happy Customers</p>
        </div>
      </div>
    </div>
  );
};

export default NumberCounter;
