"use client";
import { useState } from "react";
import Link from 'next/link';
import { DataImg } from '../Components/Constent';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function BeautyPage() {
  
  const slides = [
    {
      title: "Best Deal Online on beauty products",
      headline: "BEAUTY & CARE.",
      discount: "UP to 70% OFF",
      image: "/image2-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on beauty products",
      headline: "BEAUTY & CARE.",
      discount: "UP to 70% OFF",
      image: "/image3-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on beauty products",
      headline: "BEAUTY & CARE.",
      discount: "UP to 70% OFF",
      image: "/image4-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on beauty products",
      headline: "BEAUTY & CARE.",
      discount: "UP to 70% OFF",
      image: "/image6-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on beauty products",
      headline: "BEAUTY & CARE.",
      discount: "UP to 70% OFF",
      image: "/image8-removebg-preview.webp",
    },
  ];

  const slide = [
    {
      img: "/aa1-removebg-preview.webp",
      img2: "/aa2-removebg-preview.webp",
      img3: "/aa3-removebg-preview.webp",
    },
    {
      img: "/aa1-removebg-preview.webp",
      img2: "/aa2-removebg-preview.webp",
      img3: "/aa3-removebg-preview.webp",
    },
    {
      img: "/aa1-removebg-preview.webp",
      img2: "/aa2-removebg-preview.webp",
      img3: "/aa3-removebg-preview.webp",
    },
    {
      img: "/aa1-removebg-preview.webp",
      img2: "/aa2-removebg-preview.webp",
      img3: "/aa3-removebg-preview.webp",
    },
    {
      img: "/aa1-removebg-preview.webp",
      img2: "/aa2-removebg-preview.webp",
      img3: "/aa3-removebg-preview.webp",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = slides.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      <div className="relative overflow-hidden mx-[6%] my-[2%] rounded-3xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full bg-[#212844] py-[1.5%] relative flex justify-center items-center">
              <div className="w-[80%] flex flex-col md:flex-row justify-between items-center text-white">
                <div className="text-center md:text-left">
                  <p className="text-2xl font-medium">{slide.title}</p>
                  <h1 className="text-6xl font-medium">{slide.headline}</h1>
                  <p className="text-2xl font-medium">{slide.discount}</p>
                </div>
                <img className="z-50 max-w-[300px]" src={slide.image} alt="Product Image" />
              </div>
              <img className=" hidden sm:block absolute top-0 right-0" src="/bg.webp" alt="Background" />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute -left-5 z-50 top-1/2 transform -translate-y-1/2 bg-white w-15 h-15 flex items-center justify-center rounded-full shadow-lg"
        >
          <FaChevronLeft className="text-blue text-md bg-BlueGray w-13 h-13 p-2 rounded-full z-50" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute -right-5 z-50 top-1/2 transform -translate-y-1/2 bg-white w-15 h-15 flex items-center justify-center rounded-full shadow-lg"
        >
          <FaChevronRight className="text-blue text-md bg-BlueGray w-13 h-13 p-2 rounded-full z-50" />
        </button>
        <div className="flex items-center absolute bottom-8 left-1/2 transform -translate-x-1/2">
          {Array.from({ length: slides.length }).map((_, idx) => (
            <div key={idx} className="relative flex items-center">
              <span
                className={`w-3 h-3 gap-3 rounded-full transition-all duration-300 relative ${
                  idx === activeIndex || idx === Math.min(activeIndex + 1, slides.length)
                    ? "bg-white mx-1"
                    : "bg-gray-400 mx-1"
                }`}
              />
              {idx === activeIndex && idx !== slides.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/4 w-9 h-3 bg-white rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className=" px-[5%] my-2">
        <div className=" flex justify-between">
          <h4 className=" text-primary font-bold text-xl">Shop From<span className=" text-blue">Top Categories</span></h4>
          <Link href="/search?q=beauty" className=" flex items-center hover:text-blue transition-colors duration-300">View All<MdOutlineKeyboardArrowRight className=" text-2xl text-blue" /></Link>
        </div>
        <div className=" h-1 mt-2 bg-[#EDEDED] rounded-full">
          <div className=" h-1 bg-blue w-[18%] rounded-full"></div>
        </div>
      </div>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 my-[3%]">
        {DataImg.map((pero) => (
          <Link key={pero.id} href={`/product?id=${pero.id}&category=category`}>
            <article className=" mx-auto text-center cursor-pointer">
              <div className="border-2 p-2 border-bg hover:border-blue bg-bg h-[100px] w-[100px]  flex justify-center rounded-full hover:scale-110 transition-transform duration-300">
                <img className="" src={pero.img} alt="" />
              </div>
              <h4 className=" mt-3 text-lg font-medium">{pero.title}</h4>
            </article>
          </Link>
        ))}
      </div>

      <div className="relative overflow-hidden mx-[6%] my-[2%] rounded-3xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slide.map((slide, index) => (
            <div key={index} className="min-w-full relative flex justify-center items-center">
              <div className=" w-[90%] gap-5 flex justify-between items-center text-white">
                <img src={slide.img} alt="" />
                <img src={slide.img2} alt="" />
                <img src={slide.img3} alt="" />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 z-50 top-1/2 transform -translate-y-1/2 bg-white w-15 h-15 flex items-center justify-center rounded-full shadow-lg"
        >
          <FaChevronLeft className="text-blue text-md bg-BlueGray w-13 h-13 p-2 rounded-full z-50" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 z-50 top-1/2 transform -translate-y-1/2 bg-white w-15 h-15 flex items-center justify-center rounded-full shadow-lg"
        >
          <FaChevronRight className="text-blue text-md bg-BlueGray w-13 h-13 p-2 rounded-full z-50" />
        </button>
        <div className="flex items-center justify-center absolute bottom-8 left-[40%] transform translate-x-1/2">
          {Array.from({ length: slides.length + 1 }).map((_, idx) => (
            <div key={idx} className={`relative flex items-center ${idx === activeIndex ? "" : ""}`}>
              <span
                className={`w-3 h-3 gap-3 rounded-full transition-all duration-300 relative ${idx === activeIndex || idx === Math.min(activeIndex + 1, slides.length)
                  ? "bg-blue mx-1"
                  : "bg-gray-400 mx-1"
                  }`}
              />
              {idx === activeIndex && idx !== slides.length && (
                <div className="absolute left-1/2 -translate-x-1/4 w-9 h-3 bg-blue rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}