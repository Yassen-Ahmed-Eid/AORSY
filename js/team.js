    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const container = document.querySelector('.container');
            if (container) {
                container.classList.remove('hidden');
                container.classList.add('visible');
            }
        }, 2000); // 2000 ميللي ثانية = 2 ثانية
    });
