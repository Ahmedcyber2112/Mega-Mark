"use client";
import Link from 'next/link';
import { RiArrowLeftLine, RiShieldCheckLine } from 'react-icons/ri';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img 
              src="/Logo (2).webp" 
              alt="Mega Mark Logo" 
              className="w-10 h-10 object-contain" 
            />
            <span className="text-2xl font-bold text-blue">Mega Mark</span>
          </Link>
          <div className="bg-blue-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <RiShieldCheckLine className="w-8 h-8 text-blue" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">سياسة الخصوصية</h1>
          <p className="text-gray-600">آخر تحديث: سبتمبر 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">التزامنا بخصوصيتك</h2>
            <p className="text-gray-700 leading-relaxed">
              في Mega Mark، نحن ملتزمون بحماية خصوصيتك وأمان معلوماتك الشخصية. 
              هذه السياسة توضح كيفية جمعنا واستخدامنا وحماية معلوماتك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">المعلومات التي نجمعها</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">المعلومات الشخصية</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>الاسم الكامل</li>
                  <li>عنوان البريد الإلكتروني</li>
                  <li>رقم الهاتف</li>
                  <li>عنوان الشحن والفوترة</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">معلومات الاستخدام</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>صفحات الموقع التي تزورها</li>
                  <li>المنتجات التي تتصفحها</li>
                  <li>تاريخ ووقت الزيارات</li>
                  <li>معلومات الجهاز والمتصفح</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">كيفية استخدام معلوماتك</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>معالجة وتنفيذ طلباتك</li>
              <li>التواصل معك بشأن طلباتك</li>
              <li>تحسين خدماتنا ومنتجاتنا</li>
              <li>إرسال عروض وتحديثات (بموافقتك)</li>
              <li>منع الاحتيال وضمان الأمان</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">مشاركة المعلومات</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الحالات التالية:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>مع شركاء الشحن لتسليم طلباتك</li>
              <li>مع معالجي المدفوعات لمعالجة المعاملات</li>
              <li>عند الطلب القانوني من السلطات المختصة</li>
              <li>لحماية حقوقنا أو سلامة الآخرين</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">أمان المعلومات</h2>
            <p className="text-gray-700 leading-relaxed">
              نستخدم تقنيات الأمان المتقدمة لحماية معلوماتك، بما في ذلك التشفير SSL وأنظمة الحماية من الاختراق. 
              جميع المعاملات المالية محمية بأعلى معايير الأمان.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
            <p className="text-gray-700 leading-relaxed">
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع، مثل حفظ تفضيلاتك وتسهيل عملية التسوق. 
              يمكنك تعطيل ملفات تعريف الارتباط من إعدادات متصفحك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">حقوقك</h2>
            <p className="text-gray-700 leading-relaxed mb-4">لديك الحق في:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>الوصول إلى معلوماتك الشخصية</li>
              <li>تصحيح أو تحديث معلوماتك</li>
              <li>حذف حسابك ومعلوماتك</li>
              <li>إلغاء الاشتراك في النشرات الإعلانية</li>
              <li>طلب نسخة من بياناتك</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">التواصل معنا</h2>
            <p className="text-gray-700 leading-relaxed">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية أو ترغب في ممارسة حقوقك، يرجى الاتصال بنا:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li>البريد الإلكتروني: privacy@megamark.com</li>
              <li>الهاتف: +966-XX-XXX-XXXX</li>
              <li>العنوان: الرياض، المملكة العربية السعودية</li>
            </ul>
          </section>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link 
            href="/auth"
            className="inline-flex items-center gap-2 text-blue hover:text-blue-600 font-medium transition-colors"
          >
            <RiArrowLeftLine />
            العودة لصفحة التسجيل
          </Link>
        </div>
      </div>
    </div>
  );
}