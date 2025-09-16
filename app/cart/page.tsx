"use client";
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { FaPlus, FaMinus, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <HiOutlineShoppingBag className="mx-auto text-6xl text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">عربة التسوق فارغة</h2>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات بعد</p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 rounded-lg hover:bg-blue/90 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              تصفح المنتجات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-blue hover:text-blue/80 transition-colors"
            >
              <FaArrowLeft />
              الرجوع للتسوق
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">عربة التسوق</h1>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <FaTrash />
              إفراغ العربة
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">المنتجات ({totalItems})</h2>
              </div>
              <div className="p-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.category}`} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">الفئة: {item.category}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-blue text-lg">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">₹{item.price * item.quantity}</p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد المنتجات:</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي:</span>
                  <span className="font-medium">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الشحن:</span>
                  <span className="font-medium text-green-600">مجاني</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي:</span>
                    <span className="text-blue">₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="block w-full bg-blue text-white py-3 rounded-lg hover:bg-blue/90 transition-colors font-bold text-lg mb-4 text-center"
              >
                إتمام الشراء
              </Link>

              <Link 
                href="/"
                className="block w-full text-center border border-blue text-blue py-3 rounded-lg hover:bg-blue hover:text-white transition-colors font-medium"
              >
                الاستمرار في التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}