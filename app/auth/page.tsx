"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiEyeLine, RiEyeOffLine, RiMailLine, RiLockLine, RiUserLine, RiPhoneLine } from 'react-icons/ri';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        alert('كلمة المرور غير متطابقة!');
        setIsLoading(false);
        return;
      }
      if (!formData.agreeToTerms) {
        alert('يرجى الموافقة على الشروط والأحكام');
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        alert('تم تسجيل الدخول بنجاح!');
      } else {
        alert('تم إنشاء الحساب بنجاح!');
      }
      router.push('/');
    }, 2000);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`تسجيل الدخول عبر ${provider} قريباً...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img 
              src="/Logo (2).webp" 
              alt="Mega Mark Logo" 
              className="w-10 h-10 object-contain" 
            />
            <span className="text-2xl font-bold text-blue">Mega Mark</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? 'مرحباً بعودتك!' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-gray-600">
            {isLogin ? 'سجل دخولك للمتابعة' : 'انضم إلينا وابدأ التسوق'}
          </p>
        </div>

        {/* Auth Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
              isLogin 
                ? 'bg-white text-blue shadow-sm' 
                : 'text-gray-600 hover:text-blue'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
              !isLogin 
                ? 'bg-white text-blue shadow-sm' 
                : 'text-gray-600 hover:text-blue'
            }`}
          >
            إنشاء حساب
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Field (Sign Up Only) */}
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <RiUserLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-blue focus:border-blue transition-colors"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <RiMailLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-blue focus:border-blue transition-colors"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
          </div>

          {/* Phone Field (Sign Up Only) */}
          {!isLogin && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <RiPhoneLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required={!isLogin}
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-blue focus:border-blue transition-colors"
                  placeholder="أدخل رقم هاتفك"
                />
              </div>
            </div>
          )}

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <RiLockLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pr-10 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-blue focus:border-blue transition-colors"
                placeholder="أدخل كلمة المرور"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
              >
                {showPassword ? (
                  <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-blue transition-colors" />
                ) : (
                  <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-blue transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field (Sign Up Only) */}
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <RiLockLine className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pr-10 pl-10 py-3 border border-gray-300 rounded-lg focus:ring-blue focus:border-blue transition-colors"
                  placeholder="أعد إدخال كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-blue transition-colors" />
                  ) : (
                    <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-blue transition-colors" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Terms and Conditions (Sign Up Only) */}
          {!isLogin && (
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue focus:ring-blue border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="mr-2 block text-sm text-gray-700">
                أوافق على{' '}
                <Link href="/terms" className="text-blue hover:text-blue-600 font-medium">
                  الشروط والأحكام
                </Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-blue hover:text-blue-600 font-medium">
                  سياسة الخصوصية
                </Link>
              </label>
            </div>
          )}

          {/* Forgot Password (Login Only) */}
          {isLogin && (
            <div className="text-left">
              <Link href="/forgot-password" className="text-sm text-blue hover:text-blue-600 font-medium">
                نسيت كلمة المرور؟
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                جاري المعالجة...
              </div>
            ) : (
              isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-500">
                أو {isLogin ? 'سجل دخولك' : 'أنشئ حسابك'} عبر
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <FaFacebook className="h-5 w-5 text-blue-600" />
            </button>
            <button
              onClick={() => handleSocialLogin('Twitter')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <FaTwitter className="h-5 w-5 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-blue font-medium transition-colors"
          >
            ← العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}