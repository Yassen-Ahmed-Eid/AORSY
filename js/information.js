/*Music Toggle Script*/ 
document.getElementById('music-toggle').addEventListener('click', function(event) {
    event.preventDefault();
    var music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
        this.querySelector('i').style.color = '#f39c12'; // Change icon color to orange
    } else {
        music.pause();
        music.currentTime = 0; // Reset music to the beginning
        this.querySelector('i').style.color = ''; // Reset icon color
    }
});
/******************************************************************* */
let currentIndex = 0;
const totalCards = 10; // عدد الكروت
const cards = document.querySelectorAll('.card');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function updateCards() {
    cards.forEach((card, index) => {
        if (index >= currentIndex && index < currentIndex + 3) {
            card.style.display = 'block';
            card.style.opacity = '1'; // جعل الكارت مرئيًا
        } else {
            card.style.display = 'none'; // إخفاء الكارت
        }
    });
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalCards - 3 : currentIndex - 1; // إذا كانت في البداية، ابدأ من النهاية
    animateCards();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex >= totalCards - 3) ? 0 : currentIndex + 1; // إذا كانت في النهاية، ابدأ من البداية
    animateCards();
});

function animateCards() {
    const currentCards = [...cards].slice(currentIndex, currentIndex + 3);
    
    currentCards.forEach((card, index) => {
        card.style.transition = 'opacity 0.5s ease'; // تأثير التلاشي
        card.style.opacity = '0'; // إخفاء الكارت

        setTimeout(() => {
            if (index === 0) {
                updateCards(); // تحديث العرض بعد التلاشي
            }
        }, 500); // بعد انتهاء التأثير
    });
}

// تحديث الكروت عند تحميل الصفحة
updateCards();
//////////********************************** */
function openPopup(title, text) {
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-text').innerText = text;
    document.getElementById('popup').style.display = 'flex'; // تغيير إلى flex لتمركز المحتوى
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}