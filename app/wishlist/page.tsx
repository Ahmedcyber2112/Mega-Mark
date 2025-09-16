"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { RiShoppingCart2Line, RiDeleteBinLine, RiHeartFill } from 'react-icons/ri';
import { HiOutlineShoppingBag } from 'react-icons/hi';

interface WishlistItem {
  id: number;
  title: string;
  img: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  category: string;
}

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (item: WishlistItem) => {
    const cartItem = {
      id: item.id,
      title: item.title,
      img: item.img,
      price: parseFloat(item.price.toString().replace(/[^\d.]/g, '')),
      originalPrice: item.originalPrice ? parseFloat(item.originalPrice.toString().replace(/[^\d.]/g, '')) : undefined,
      discount: item.discount,
      category: item.category,
      quantity: 1
    };
    addToCart(cartItem);
  };

  const handleBuyNow = (item: WishlistItem) => {
    handleAddToCart(item);
    router.push('/cart');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <RiHeartFill className="text-6xl text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">قائمة المفضلة فارغة</h1>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد</p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              <HiOutlineShoppingBag className="text-xl" />
              تسوق الآن
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RiHeartFill className="text-3xl text-red-500" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">قائمة المفضلة</h1>
                  <p className="text-gray-600">{wishlistItems.length} منتج</p>
                </div>
              </div>
              {wishlistItems.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  <RiDeleteBinLine />
                  مسح الكل
                </button>
              )}
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Link href={`/product?id=${item.id}&category=${item.category}`}>
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-48 object-contain rounded-t-lg hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow text-red-500 hover:text-red-600"
                    >
                      <RiDeleteBinLine className="text-lg" />
                    </button>
                    {item.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                        {item.discount}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <Link href={`/product?id=${item.id}&category=${item.category}`}>
                      <h3 className="font-medium text-gray-800 mb-2 hover:text-blue transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-blue">
                        {typeof item.price === 'number' ? `$${item.price}` : item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {typeof item.originalPrice === 'number' ? `$${item.originalPrice}` : item.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        <RiShoppingCart2Line />
                        أضف للعربة
                      </button>
                      <button
                        onClick={() => handleBuyNow(item)}
                        className="flex-1 bg-orange-500 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                      >
                        اشتري الآن
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link 
                href="/" 
                className="flex items-center justify-center gap-2 border border-blue text-blue px-6 py-3 rounded-lg font-medium hover:bg-blue hover:text-white transition-colors"
              >
                <HiOutlineShoppingBag />
                متابعة التسوق
              </Link>
              
              {wishlistItems.length > 0 && (
                <button
                  onClick={() => {
                    wishlistItems.forEach(item => handleAddToCart(item));
                    router.push('/cart');
                  }}
                  className="flex items-center justify-center gap-2 bg-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  <RiShoppingCart2Line />
                  أضف الكل للعربة
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}