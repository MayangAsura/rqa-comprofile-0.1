import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowRight } from "react-icons/rx";
import { TESTIMONI_DATA } from "../../constants/testimoni/imagesData";

const SquareSlider = () => {
  return (
    <div className="h-[1000px] flex flex-col md:flex-row gap-5 items-center justify-center bg-[#6c34af]">
      <div className="flex flex-col gap-3">
        <h1 className="text-white text-[50px] font-semibold">
          My Work<span className="text-red-500">.</span>
          <p className="text-[16px] max-w-[400px] text-gray-200 md:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </h1>
      </div>
      <div className="w-[70%] md:w-[40%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
        >
          <SwiperSlide className="mb-14">
            <div className="grid grid-cols-2 gap-4 px-10">
              {TESTIMONI_DATA.map((testimoni) => (
                <div className="relative group" key={testimoni.testimoni_image_url}>
                  <img
                    src={testimoni.testimoni_image_url}
                    alt="purple"
                    className="rounded-md h-[240px] w-[240px] object-cover"
                  />
                  <div className="cursor-pointer absolute inset-0 bg-gradient-to-r max-w-[240px] rounded-md from-purple-800 via-pink-500 to-purple-800 opacity-0 group-hover:opacity-70" />
                  <div className="absolute text-white inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                    View Project
                    <RxArrowRight className="ml-2 w-[24px] h-[24px]" />
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
          <SwiperSlide className="mb-14">
            <div className="grid grid-cols-2 gap-4 px-10">
              {TESTIMONI_DATA.map((image) => (
                <div className="relative group" key={image.testimoni_image_url}>
                  <img
                    src={image.testimoni_image_url}
                    alt="purple"
                    className="rounded-md h-[240px] w-[240px] object-cover"
                  />
                  <div className="cursor-pointer absolute inset-0 max-w-[240px] rounded-md bg-gradient-to-r from-purple-900 via-orange-500 to-purple-900 opacity-0 group-hover:opacity-70" />
                  <div className="absolute text-white inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                    View Project
                    <RxArrowRight className="ml-2 w-[24px] h-[24px]" />
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SquareSlider;