document.addEventListener('DOMContentLoaded', () => {
    // Add subtle entrance animation to the hero items
    const textCard = document.querySelector('.text-card');
    const image1 = document.querySelector('.image-1');
    const image2 = document.querySelector('.image-2');

    textCard.style.opacity = '0';
    textCard.style.transform = 'translateY(20px)';

    image1.style.opacity = '0';
    image1.style.transform = 'translateY(30px) rotate(-2deg)';

    image2.style.opacity = '0';
    image2.style.transform = 'translateY(40px)';

    setTimeout(() => {
        textCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        textCard.style.opacity = '1';
        textCard.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        image1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        image1.style.opacity = '1';
        image1.style.transform = 'translateY(0) rotate(-2deg)';
    }, 300);

    setTimeout(() => {
        image2.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        image2.style.opacity = '1';
        image2.style.transform = 'translateY(0)';
    }, 500);
});
