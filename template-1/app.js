document.addEventListener('DOMContentLoaded', () => {
    const centerCard = document.querySelector('.center-card-wrapper');
    const imgLeft = document.querySelector('.img-left');
    const imgRight = document.querySelector('.img-right');
    const heroTitle = document.querySelector('.hero-title');

    if (centerCard) {
        centerCard.style.opacity = '0';
        centerCard.style.transform = 'translateY(20px)';
    }

    if (imgLeft) {
        imgLeft.style.opacity = '0';
        imgLeft.style.transform = 'translateX(-30px)';
    }

    if (imgRight) {
        imgRight.style.opacity = '0';
        imgRight.style.transform = 'translateX(30px)';
    }

    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(-20px)';
    }

    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 100);

    setTimeout(() => {
        if (centerCard) {
            centerCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            centerCard.style.opacity = '1';
            centerCard.style.transform = 'translateY(0)';
        }
    }, 300);

    setTimeout(() => {
        if (imgLeft) {
            imgLeft.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            imgLeft.style.opacity = '1';
            imgLeft.style.transform = 'translateX(0)';
        }
        if (imgRight) {
            imgRight.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            imgRight.style.opacity = '1';
            imgRight.style.transform = 'translateX(0)';
        }
    }, 500);
});
