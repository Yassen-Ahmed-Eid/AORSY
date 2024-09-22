document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const loginPage = document.querySelector('.login-page');

    setTimeout(() => {
        loader.style.display = 'none'; // إخفاء الـ loader
        loginPage.style.display = 'flex'; // إظهار صفحة تسجيل الدخول
        loginPage.classList.add('show'); // إضافة تأثير الانتقال
    }, 2000); // يمكنك تعديل الوقت حسب الحاجة
});


window.addEventListener('load', () => {
    // إضافة class لمنع التمرير
    document.body.classList.add('no-scroll');

    // إزالة class بعد ثانيتين
    setTimeout(() => {
        document.body.classList.remove('no-scroll');
    }, 2000); // 2000 مللي ثانية = 2 ثانية
});