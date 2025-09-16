"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DataSmart } from '../Components/Constent';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { FaChevronLeft, FaChevronRight, FaShoppingCart, FaBolt } from "react-icons/fa";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';
import Toast from '../Components/Toast';

interface ProductItem {
  id: string;
  title: string;
  img: string;
  price: string;
  price2: string;
  save: string;
}

export default function ElectronicsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlistItems } = useWishlist();
  
  const slides = [
    {
      title: "Best Deal Online on smartphones",
      headline: "ELECTRONICS.",
      discount: "UP to 80% OFF",
      image: "/phone1-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on smartphones",
      headline: "ELECTRONICS.",
      discount: "UP to 80% OFF",
      image: "/phone2-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on smartphones",
      headline: "ELECTRONICS.",
      discount: "UP to 80% OFF",
      image: "/phone3-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on smartphones",
      headline: "ELECTRONICS.",
      discount: "UP to 80% OFF",
      image: "/phone4-removebg-preview.webp",
    },
    {
      title: "Best Deal Online on smartphones",
      headline: "ELECTRONICS.",
      discount: "UP to 80% OFF",
      image: "/phone5-removebg-preview.webp",
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
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' as 'success' | 'error' | 'info' });
  const totalSlides = slides.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  // مراقبة تغييرات wishlist لإجبار إعادة رسم component
  useEffect(() => {
    // إعادة رسم component عند تحديث wishlist
  }, [wishlistItems]);

  const handleAddToCart = (item: ProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: parseInt(item.id),
      title: item.title,
      img: item.img,
      price: parseInt(item.price.replace('₹', '').replace(',', '')),
      originalPrice: parseInt(item.price2.replace('₹', '').replace(',', '')),
      discount: item.save,
      category: 'smart'
    });
    
    alert(`تم إضافة ${item.title} إلى عربة التسوق!`);
  };

  const handleBuyNow = (item: ProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: parseInt(item.id),
      title: item.title,
      img: item.img,
      price: parseInt(item.price.replace('₹', '').replace(',', '')),
      originalPrice: parseInt(item.price2.replace('₹', '').replace(',', '')),
      discount: item.save,
      category: 'smart'
    });
    
    router.push('/cart');
  };

  const handleWishlistToggle = (item: ProductItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const itemId = parseInt(item.id);
      
      const wishlistItem = {
        id: itemId,
        title: item.title,
        img: item.img,
        price: parseInt(item.price.replace('₹', '').replace(',', '')),
        originalPrice: parseInt(item.price2.replace('₹', '').replace(',', '')),
        discount: item.save,
        category: 'electronics'
      };

      if (isInWishlist(itemId)) {
        removeFromWishlist(itemId);
        showToast(`تم إزالة ${item.title} من المفضلة! 💔`, 'info');
      } else {
        addToWishlist(wishlistItem);
        showToast(`تم إضافة ${item.title} إلى المفضلة! ❤️`, 'success');
      }
      
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      showToast('حدث خطأ في إضافة/إزالة المنتج من المفضلة', 'error');
    }
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
          <h4 className=" text-primary font-bold text-xl">Grab the best deal on <span className=" text-blue">Smartphones</span></h4>
          <Link href="/search?q=smartphone" className=" flex items-center hover:text-blue transition-colors duration-300">View All<MdOutlineKeyboardArrowRight className=" text-2xl text-blue" /></Link>
        </div>
        <div className=" h-1 mt-2 bg-[#EDEDED] rounded-full">
          <div className=" h-1 bg-blue w-[25%] rounded-full"></div>
        </div>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-[5%] gap-6 my-[3%]">
        {DataSmart.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 hover:border-blue group overflow-hidden relative">
            {/* Wishlist Button */}
            <button
              onClick={(e) => handleWishlistToggle(item, e)}
              className="absolute top-2 left-2 z-50 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-red-300"
              title={isInWishlist(parseInt(item.id)) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            >
              {(() => {
                const itemId = parseInt(item.id);
                const isWishlisted = isInWishlist(itemId);
                
                if (isWishlisted) {
                  return <RiHeartFill className="text-red-500 text-lg" />;
                } else {
                  return <RiHeartLine className="text-gray-600 hover:text-red-500 text-lg transition-colors" />;
                }
              })()}
            </button>

            <Link href={`/product?id=${item.id}&category=smart`} className="block">
              <div className="bg-bg h-[200px] rounded-t-xl flex items-center justify-center relative overflow-hidden">
                <Image 
                  className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" 
                  src={item.img} 
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
            </Link>
            
            {/* Discount Badge */}
            <div className="absolute top-3 right-3 bg-blue text-white px-2 py-1 rounded-full text-xs font-bold">
              56% OFF
            </div>
            
            <div className="p-4">
              <Link href={`/product?id=${item.id}&category=smart`}>
                <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 hover:text-blue transition-colors">
                  {item.title}
                </h3>
              </Link>
              
              {/* Price Section */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xl text-blue">{item.price}</span>
                  <span className="text-gray-500 line-through text-sm">{item.price2}</span>
                </div>
                <span className="text-green-600 font-medium text-sm">{item.save}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2">
                <button 
                  onClick={(e) => handleAddToCart(item, e)}
                  className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue/90 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="text-sm" />
                  إضافة للعربة
                </button>
                <button 
                  onClick={(e) => handleBuyNow(item, e)}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                >
                  <FaBolt className="text-sm" />
                  اشتري الآن
                </button>
                <Link 
                  href={`/product?id=${item.id}&category=smart`}
                  className="block w-full text-center border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          </div>
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
      
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </>
  );
}