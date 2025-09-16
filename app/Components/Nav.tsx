"use client"
import React from 'react'
import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useSearch } from '../contexts/SearchContext';
import { TiLocation } from "react-icons/ti";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { CgMenuLeft } from "react-icons/cg";
import { HiOutlineSearch } from "react-icons/hi";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiUser3Line } from "react-icons/ri";
import { RiShoppingCart2Line } from "react-icons/ri";
import { RiHeartLine } from "react-icons/ri";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";

export default function Nav() {
  const [activeIndex, setActiveIndex] = useState<string>("Electronics");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { recentSearches, performSearch, addToRecentSearches } = useSearch();
  const router = useRouter();

  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      addToRecentSearches(query);
      performSearch(query);
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowSearchDropdown(false);
      setSearchInput("");
    }
  }, [addToRecentSearches, performSearch, router]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  }, [handleSearch, searchInput]);

  const handleRecentSearchClick = useCallback((query: string) => {
    setSearchInput(query);
    handleSearch(query);
  }, [handleSearch]);
  return (
    <>
      <div className="hidden sm:flex bg-bg justify-between items-center py-[0.3%] px-[5%]">
        <small className=" text-primary">Welcome to worldwide Megamart!</small>
        <div className=" flex gap-4 items-center">
          <small className=" flex gap-1 items-center text-primary"><TiLocation className=" text-blue text-base"/>Deliver to <span className=" font-bold">423651</span></small>
          <p>|</p>
          <small className=" flex gap-1 items-center text-primary"><FaTruckFast className=" text-blue text-base"/>Track your order</small>
          <p>|</p>
          <small className=" flex gap-1 items-center text-primary"><BiSolidOffer className=" text-blue text-base"/>All Offers</small>
        </div>
      </div>

      {/* Mobile Search Bar (Always Visible) */}
      <div className="sm:hidden px-4 pb-2">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="flex gap-2 items-center bg-BlueGray rounded-lg px-3 py-2">
            <button type="submit" className="text-blue text-xl hover:text-blue-700 transition-colors">
              <HiOutlineSearch />
            </button>
            <input 
              className="flex-1 py-1 outline-0 bg-transparent" 
              type="text" 
              placeholder='Search essentials, groceries...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setShowSearchDropdown(!showSearchDropdown)}
              className="text-blue text-xl hover:text-blue-700 transition-colors"
            >
              <TfiMenuAlt />
            </button>
          </div>

          {/* Mobile Search Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 mx-0">
              {recentSearches.length > 0 ? (
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                    <FaHistory className="text-blue" />
                    آخر عمليات البحث
                  </h3>
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-gray-700 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 text-gray-500 text-center">
                  لا توجد عمليات بحث سابقة
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      <div className=" flex justify-between py-[1%] px-[5%]">
        <Link href="/" prefetch={true} className=" flex items-center gap-3 text-3xl font-bold text-blue hover:text-blue-700 transition-all duration-300 hover:scale-105">
          <img 
            src="/Logo (2).webp" 
            alt="Mega Mark Logo" 
            className="w-12 h-12 object-contain drop-shadow-sm hover:drop-shadow-md transition-all duration-300" 
          />
          <span className="hidden sm:block">Mega Mark</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 sm:hidden">
          <Link href="/wishlist" prefetch={true} className="flex items-center text-blue relative">
            <RiHeartLine className="text-2xl" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link href="/cart" prefetch={true} className="flex items-center text-blue relative">
            <RiShoppingCart2Line className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-blue text-2xl"
          >
            <CgMenuLeft />
          </button>
        </div>

        <div className=" hidden sm:flex gap-4 items-center w-[60%]">
          <form onSubmit={handleSearchSubmit} className="relative w-[60%]">
            <div className="flex gap-2 items-center bg-BlueGray rounded-md px-5 relative">
              <button type="submit" className="text-blue text-2xl hover:text-blue-700 transition-colors">
                <HiOutlineSearch />
              </button>
              <input 
                className="w-[100%] py-2 outline-0 bg-transparent" 
                type="text" 
                placeholder='Search essentials, groceries and more...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 150)}
              />
              <button 
                type="button"
                onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                className="text-blue text-2xl hover:text-blue-700 transition-colors"
              >
                <TfiMenuAlt />
              </button>
            </div>

            {/* Search Dropdown with Recent Searches */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50">
                {recentSearches.length > 0 ? (
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                      <FaHistory className="text-blue" />
                      آخر عمليات البحث
                    </h3>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="block w-full text-left py-2 px-3 hover:bg-gray-100 rounded text-gray-700 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-gray-500 text-center">
                    لا توجد عمليات بحث سابقة
                  </div>
                )}
              </div>
            )}
          </form>
          <Link href="/auth" className=" hidden sm:flex gap-1 items-center text-primary text-xl font-medium hover:text-blue transition-colors cursor-pointer">
            <RiUser3Line className=" text-blue text-3xl" />
            Sign Up/Sign In
          </Link>
          <h2 className=" hidden sm:flex text-[#D9D9D9]">|</h2>
          <Link href="/wishlist" prefetch={true} className=" hidden sm:flex gap-1 items-center text-primary text-xl font-medium hover:text-blue transition-colors cursor-pointer relative">
            <RiHeartLine className=" text-blue text-3xl" />
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <h2 className=" hidden sm:flex text-[#D9D9D9]">|</h2>
          <Link href="/cart" prefetch={true} className=" hidden sm:flex gap-1 items-center text-primary text-xl font-medium hover:text-blue transition-colors cursor-pointer relative">
            <RiShoppingCart2Line className=" text-blue text-3xl" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="hidden sm:flex border-1 border-[#EDEDED]"></div>

      <div className=" hidden sm:flex justify-between px-[4%] py-[1%]">
        <Link href="/electronics" prefetch={true} onClick={() => setActiveIndex("Electronics")} className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-all duration-300 ${ activeIndex === "Electronics" ? " bg-blue text-white" : " bg-BlueGray text-black" }`}>Electronics<RiArrowDownSLine className={`text-lg ${ activeIndex === "Electronics" ? "text-white" : "text-blue" }`} /></Link>
        <Link href="/fashion" prefetch={true} onClick={() => setActiveIndex("Fashion")} className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-all duration-300 ${ activeIndex === "Fashion" ? " bg-blue text-white" : " bg-BlueGray text-black" }`}>Fashion<RiArrowDownSLine className={`text-lg ${ activeIndex === "Fashion" ? "text-white" : "text-blue" }`} /></Link>
        <Link href="/beauty" prefetch={true} onClick={() => setActiveIndex("Beauty")} className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-all duration-300 ${ activeIndex === "Beauty" ? " bg-blue text-white" : " bg-BlueGray text-black" }`}>Beauty<RiArrowDownSLine className={`text-lg ${ activeIndex === "Beauty" ? "text-white" : "text-blue" }`} /></Link>
        <Link href="/home-kitchen" prefetch={true} onClick={() => setActiveIndex("Home")} className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-all duration-300 ${ activeIndex === "Home" ? " bg-blue text-white" : " bg-BlueGray text-black" }`}>Home & Kitchen<RiArrowDownSLine className={`text-lg ${ activeIndex === "Home" ? "text-white" : "text-blue" }`} /></Link>
        <Link href="/groceries" prefetch={true} onClick={() => setActiveIndex("Groceries")} className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-all duration-300 ${ activeIndex === "Groceries" ? " bg-blue text-white" : " bg-BlueGray text-black" }`}>Groceries<RiArrowDownSLine className={`text-lg ${ activeIndex === "Groceries" ? "text-white" : "text-blue" }`} /></Link>
        <Link href="/premium-fruits" prefetch={true} onClick={() => setActiveIndex("Premium")} className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-all duration-300 ${ activeIndex === "Premium" ? " bg-blue text-white" : " bg-BlueGray text-black" }`}>Premium Fruits<RiArrowDownSLine className={`text-lg ${ activeIndex === "Premium" ? "text-white" : "text-blue" }`} /></Link>
        <Link href="/home-improvement" prefetch={true} onClick={() => setActiveIndex("Improvement")} className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-all duration-300 ${ activeIndex === "Improvement" ? " bg-blue text-white" : " bg-BlueGray text-black" }`}>Home Improvement<RiArrowDownSLine className={`text-lg ${ activeIndex === "Improvement" ? "text-white" : "text-blue" }`} /></Link>
        <Link href="/sports-toys" prefetch={true} onClick={() => setActiveIndex("Toys")} className={` py-1 px-4 rounded-full flex items-center gap-2 font-medium hover:scale-105 transition-all duration-300 ${ activeIndex === "Toys" ? " bg-blue text-white" : " bg-BlueGray text-black" }`}>Sports, Toys & Luggage<RiArrowDownSLine className={`text-lg ${ activeIndex === "Toys" ? "text-white" : "text-blue" }`} /></Link>
      </div>

      <div className="hidden sm:flex border-1 border-[#EDEDED]"></div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-2">
            <Link 
              href="/electronics" 
              prefetch={true}
              onClick={() => {setActiveIndex("Electronics"); setMobileMenuOpen(false);}} 
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "Electronics" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              Electronics
            </Link>
            <Link 
              href="/fashion" 
              prefetch={true}
              onClick={() => {setActiveIndex("Fashion"); setMobileMenuOpen(false);}} 
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "Fashion" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              Fashion
            </Link>
            <Link 
              href="/beauty" 
              prefetch={true}
              onClick={() => {setActiveIndex("Beauty"); setMobileMenuOpen(false);}} 
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "Beauty" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              Beauty
            </Link>
            <Link 
              href="/home-kitchen" 
              prefetch={true}
              onClick={() => {setActiveIndex("Home"); setMobileMenuOpen(false);}} 
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "Home" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              Home & Kitchen
            </Link>
            <Link 
              href="/groceries" 
              prefetch={true}
              onClick={() => {setActiveIndex("Groceries"); setMobileMenuOpen(false);}} 
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "Groceries" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              Groceries
            </Link>
            <Link 
              href="/premium-fruits" 
              prefetch={true}
              onClick={() => {setActiveIndex("Premium"); setMobileMenuOpen(false);}} 
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "Premium" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              Premium Fruits
            </Link>
            <Link 
              href="/home-improvement" 
              prefetch={true}
              onClick={() => {setActiveIndex("Improvement"); setMobileMenuOpen(false);}} 
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "Improvement" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              Home Improvement
            </Link>
            <Link 
              href="/sports-toys" 
              prefetch={true}
              onClick={() => {setActiveIndex("Toys"); setMobileMenuOpen(false);}} 
              className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "Toys" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              Sports, Toys & Luggage
            </Link>

            {/* Additional Pages */}
            <div className="pt-2 mt-2 border-t border-gray-200">
              <Link 
                href="/about" 
                prefetch={true}
                onClick={() => {setActiveIndex("About"); setMobileMenuOpen(false);}} 
                className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeIndex === "About" ? "bg-blue text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
              >
                About Us
              </Link>
            </div>

            {/* Mobile User Actions */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link 
                href="/auth" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full py-3 px-4 bg-gray-100 rounded-lg text-black font-medium hover:bg-gray-200 transition-colors"
              >
                <RiUser3Line className="text-blue text-xl" />
                Sign Up/Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
