module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // تجاهل تحذيرات img tags (مؤقتاً للتوافق مع التصميم الحالي)
    '@next/next/no-img-element': 'off',
    // تجاهل any types (لحين تحسين الأنواع)
    '@typescript-eslint/no-explicit-any': 'warn',
    // تجاهل المتغيرات غير المستخدمة في development
    '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  }
}