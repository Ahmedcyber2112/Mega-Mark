"use client";
import Link from 'next/link';
import { RiArrowLeftLine } from 'react-icons/ri';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الشروط والأحكام</h1>
          <p className="text-gray-600">آخر تحديث: سبتمبر 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. قبول الشروط</h2>
            <p className="text-gray-700 leading-relaxed">
              باستخدامك لموقع Mega Mark، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
              إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. استخدام الموقع</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              يمكنك استخدام موقعنا للأغراض المشروعة فقط. يُمنع عليك:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>استخدام الموقع لأي غرض غير قانوني أو محظور</li>
              <li>محاولة الوصول إلى أنظمة الموقع بطريقة غير مصرح بها</li>
              <li>إرسال أي محتوى ضار أو مؤذي</li>
              <li>انتهاك حقوق الآخرين</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. المنتجات والأسعار</h2>
            <p className="text-gray-700 leading-relaxed">
              نحن نسعى للحفاظ على دقة المعلومات المتعلقة بالمنتجات والأسعار، 
              لكننا لا نضمن عدم وجود أخطاء. نحتفظ بالحق في تصحيح الأخطاء وتعديل الأسعار في أي وقت.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. سياسة الإرجاع</h2>
            <p className="text-gray-700 leading-relaxed">
              يمكنك إرجاع المنتجات خلال 30 يوماً من تاريخ الشراء، بشرط أن تكون في حالتها الأصلية. 
              تطبق رسوم الشحن على المُشتري ما لم يكن المنتج معيباً.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. المسؤولية</h2>
            <p className="text-gray-700 leading-relaxed">
              Mega Mark غير مسؤولة عن أي أضرار مباشرة أو غير مباشرة قد تنتج عن استخدام الموقع 
              أو المنتجات المشتراة منه، باستثناء ما هو منصوص عليه قانونياً.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. تعديل الشروط</h2>
            <p className="text-gray-700 leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستصبح التعديلات سارية فور نشرها على الموقع.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. الاتصال بنا</h2>
            <p className="text-gray-700 leading-relaxed">
              إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا عبر:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
              <li>البريد الإلكتروني: support@megamark.com</li>
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