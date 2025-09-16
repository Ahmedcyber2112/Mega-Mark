"use client";
import { useState } from 'react';
import Link from 'next/link';
import { RiMailLine, RiArrowLeftLine } from 'react-icons/ri';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 2000);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <img 
                src="/Logo (2).webp" 
                alt="Mega Mark Logo" 
                className="w-10 h-10 object-contain" 
              />
              <span className="text-2xl font-bold text-blue">Mega Mark</span>
            </Link>
            
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <RiMailLine className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              تم إرسال البريد الإلكتروني!
            </h2>
            <p className="text-gray-600 mb-6">
              تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور
            </p>
            <p className="text-sm text-gray-500 mb-6">
              لم تتلق البريد الإلكتروني؟ تحقق من مجلد الرسائل غير المرغوب فيها
            </p>

            <div className="space-y-4">
              <button
                onClick={() => setEmailSent(false)}
                className="w-full py-3 px-4 border border-blue text-blue rounded-lg font-medium hover:bg-blue hover:text-white transition-colors"
              >
                إرسال مرة أخرى
              </button>
              <Link 
                href="/auth"
                className="block w-full py-3 px-4 bg-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-center"
              >
                العودة لتسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            نسيت كلمة المرور؟
          </h2>
          <p className="text-gray-600">
            أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-blue focus:border-blue transition-colors"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                جاري الإرسال...
              </div>
            ) : (
              'إرسال رابط إعادة التعيين'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <Link 
            href="/auth"
            className="inline-flex items-center gap-2 text-sm text-blue hover:text-blue-600 font-medium transition-colors"
          >
            <RiArrowLeftLine />
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}