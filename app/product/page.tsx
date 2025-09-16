"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { DataSmart, DataFood, DataImg } from '../Components/Constent';
import { useCart } from '../contexts/CartContext';
import { FaChevronLeft, FaChevronRight, FaStar, FaHeart, FaShoppingCart, FaMinus, FaPlus, FaBolt } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';

interface ProductDetails {
  id: string;
  img: string;
  title?: string;
  dish?: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
}

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('id');
  const category = searchParams.get('category');
  const { addToCart: addToCartContext } = useCart();
  
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (productId && category) {
      let foundProduct = null;
      
      if (category === 'smart') {
        foundProduct = DataSmart.find(p => p.id === productId);
      } else if (category === 'food') {
        foundProduct = DataFood.find(p => p.id === productId);
      } else if (category === 'category') {
        foundProduct = DataImg.find(p => p.id === productId);
      }
      
      if (foundProduct) {
        // إضافة بيانات إضافية للمنتج
        const productDetails: ProductDetails = {
          ...foundProduct,
          price: "₹299",
          originalPrice: "₹499",
          discount: "40% OFF",
          rating: 4.5,
          reviews: 128,
          description: "منتج عالي الجودة مصنوع من أفضل المواد، يوفر لك تجربة ممتازة ونتائج مضمونة. مناسب للاستخدام اليومي ومصمم ليدوم طويلاً.",
          features: [
            "جودة عالية ومضمونة",
            "سهولة في الاستخدام",
            "تصميم عصري وأنيق",
            "ضمان لمدة سنة كاملة",
            "توصيل مجاني"
          ],
          specifications: {
            "العلامة التجارية": "Mega Mark",
            "بلد المنشأ": "الهند",
            "الوزن": "500 جم",
            "الأبعاد": "20 × 15 × 10 سم"
          },
          images: [foundProduct.img, foundProduct.img, foundProduct.img]
        };
        setProduct(productDetails);
      }
    }
  }, [productId, category]);

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
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slide.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slide.length) % slide.length);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const addToCart = () => {
    if (!product) return;
    
    addToCartContext({
      id: parseInt(product.id),
      title: product.title || product.dish || 'منتج',
      img: product.img,
      price: parseInt(product.price.replace('₹', '')),
      originalPrice: product.originalPrice ? parseInt(product.originalPrice.replace('₹', '')) : undefined,
      discount: product.discount,
      category: category || 'unknown'
    });
    
    alert(`تم إضافة ${quantity} من ${product?.title || product?.dish} إلى عربة التسوق!`);
  };

  const buyNow = () => {
    if (!product) return;
    
    // إضافة المنتج للعربة أولاً
    addToCartContext({
      id: parseInt(product.id),
      title: product.title || product.dish || 'منتج',
      img: product.img,
      price: parseInt(product.price.replace('₹', '')),
      originalPrice: product.originalPrice ? parseInt(product.originalPrice.replace('₹', '')) : undefined,
      discount: product.discount,
      category: category || 'unknown'
    });
    
    // الانتقال مباشرة لصفحة الدفع
    router.push('/checkout');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">جاري تحميل تفاصيل المنتج...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-[5%] py-4 bg-gray-50">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-blue">الرئيسية</Link>
          <MdOutlineKeyboardArrowRight className="mx-2" />
          <span className="text-blue">تفاصيل المنتج</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-[5%] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-bg rounded-2xl p-4 h-[400px] flex items-center justify-center">
              <img 
                src={product.images[selectedImage]} 
                alt={product.title || product.dish}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg p-2 h-20 w-20 flex items-center justify-center ${
                    selectedImage === index ? 'border-blue' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.title || product.dish}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} تقييم)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-blue">{product.price}</span>
                <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold mb-3">وصف المنتج</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold mb-3">المميزات</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-lg font-semibold">الكمية:</span>
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                  <span className="px-4 py-3 border-x">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <FaPlus className="text-sm" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Add to Cart Button */}
                <button 
                  onClick={addToCart}
                  className="w-full bg-blue text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue/90 transition-colors"
                >
                  <FaShoppingCart />
                  إضافة إلى العربة
                </button>
                
                {/* Buy Now Button */}
                <button 
                  onClick={buyNow}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
                >
                  <FaBolt />
                  اشتري الآن
                </button>
                
                {/* Wishlist Button */}
                <button className="w-full border border-gray-300 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <FaHeart className="text-xl text-gray-600" />
                  <span className="font-medium text-gray-700">إضافة للمفضلة</span>
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xl font-bold mb-3">المواصفات</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      <div className="px-[5%] my-8">
        <h3 className="text-2xl font-bold mb-6">منتجات ذات صلة</h3>
        <div className="relative overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slide.map((slideItem, index) => (
              <div key={index} className="min-w-full relative flex justify-center items-center bg-gray-100 py-8">
                <div className="w-[90%] gap-5 flex justify-between items-center">
                  <img src={slideItem.img} alt="" className="max-w-[250px]" />
                  <img src={slideItem.img2} alt="" className="max-w-[250px]" />
                  <img src={slideItem.img3} alt="" className="max-w-[250px]" />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-2 z-50 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-50"
          >
            <FaChevronLeft className="text-blue" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 z-50 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-50"
          >
            <FaChevronRight className="text-blue" />
          </button>
        </div>
      </div>
    </>
  );
}