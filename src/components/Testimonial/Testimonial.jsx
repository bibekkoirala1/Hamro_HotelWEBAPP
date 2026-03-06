import React from "react";
import Slider from "react-slick";

const TestimonialsData = [
  {
    id: 1,
    name: "Bibhakta",
    text: "Booking my hotel was extremely easy! The process was smooth, and the hotel exceeded all my expectations. Highly recommended!",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 2,
    name: "Avash",
    text: "Hamro Hotel made finding the perfect stay simple and fast. The hotel matched exactly what was shown on the website.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Sandip",
    text: "Great hotel options and a very smooth booking experience. I will definitely use this platform again for my future trips.",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 4,
    name: "Manish",
    text: "My stay was amazing! The booking process was quick and the hotel service was excellent. Highly satisfied with Hamro Hotel.",
    img: "https://picsum.photos/104/104",
  },
];

const Testimonial = () => {
  const setting = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-14 mb-10 ">
      <div className="container">
        
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-6">
          <h1 className="uppercase font-semibold text-blue-600">
            OUR TESTIMONIALS
          </h1>

          <p className="font-semibold text-3xl">
            What Our Guests Say About Their Stay
          </p>
        </div>

        <div>
          <Slider {...setting}>
            {TestimonialsData.map((item) => {
              return (
                <div key={item.id}>
                  <div className="flex flex-col gap-4 p-8 shadow-lg mx-4 rounded-xl bg-white">
                    
                    {/* upper section */}
                    <div className="flex justify-start items-center gap-5">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 rounded-full"
                      />

                      <div>
                        <p className="text-xl font-bold text-black/80">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">Guest</p>
                      </div>
                    </div>

                    {/* bottom section */}
                    <div className="py-6 space-y-4">
                      <p className="text-sm text-gray-500">{item.text}</p>
                      <p className="text-orange-500">⭐⭐⭐⭐⭐</p>
                    </div>

                  </div>
                </div>
              );
            })}
          </Slider>
        </div>

      </div>
    </div>
  );
};

export default Testimonial;