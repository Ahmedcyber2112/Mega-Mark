"use client";
import { useState } from "react";
import Link from 'next/link';
import { DataFood } from '../Components/Constent';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function PremiumFruitsPage() {
  const slides = [
    {
      title: "Best Deal Online on fresh fruits",
      headline: "PREMIUM FRUITS.",
      discount: "UP to 50% OFF",
      image: "/ss1-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on fresh fruits",
      headline: "PREMIUM FRUITS.",
      discount: "UP to 50% OFF",
      image: "/ss2-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on fresh fruits",
      headline: "PREMIUM FRUITS.",
      discount: "UP to 50% OFF",
      image: "/ss3-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on fresh fruits",
      headline: "PREMIUM FRUITS.",
      discount: "UP to 50% OFF",
      image: "/ss4-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on fresh fruits",
      headline: "PREMIUM FRUITS.",
      discount: "UP to 50% OFF",
      image: "/ss5-removebg-preview.webp",
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
          <h4 className=" text-primary font-bold text-xl">Fresh <span className=" text-blue">Essentials</span></h4>
          <Link href="/search?q=fruits" className=" flex items-center hover:text-blue transition-colors duration-300">View All<MdOutlineKeyboardArrowRight className=" text-2xl text-blue" /></Link>
        </div>
        <div className=" h-1 mt-2 bg-[#EDEDED] rounded-full">
          <div className=" h-1 bg-blue w-[18%] rounded-full"></div>
        </div>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 px-[5%] gap-6 my-8">
        {DataFood.map((product) => (
          <Link key={product.id} href={`/product?id=${product.id}&category=food`}>
            <article className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border hover:border-blue group overflow-hidden cursor-pointer">
              <div className="bg-bg h-[200px] rounded-t-2xl flex items-center justify-center">
                <img className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300" src={product.img} alt={product.title} />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-xl text-blue">₹299</span>
                  <span className="text-gray-500 line-through text-sm">₹499</span>
                </div>
                <div className="border-t border-[#EDEDED] my-3"></div>
                <p className="text-green-600 font-medium text-sm mb-3">40% OFF</p>
                <button className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue/90 transition-all duration-300 font-semibold">
                  Add to Cart
                </button>
              </div>
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                40% OFF
              </div>
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