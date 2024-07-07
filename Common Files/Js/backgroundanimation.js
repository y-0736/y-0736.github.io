document.addEventListener("DOMContentLoaded", function () {
    const colors = ['#ff7e5f', '#feb47b', '#6a82fb', '#fc5c7d', '#c5c6c7'];
    const numCircles = 15;
    const background = document.querySelector('.background');

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');

        const size = Math.random() * 5 + 5; // 20 ile 60 px arasında boyut
        const left = Math.random() * 100; // % cinsinden sol konum
        const delay = Math.random() * 5; // 0 ile 5 saniye arasında gecikme
        const duration = Math.random() * 10 + 5; // 5 ile 15 saniye arasında süre
        const color = colors[Math.floor(Math.random() * colors.length)];

        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.left = `${left}%`;
        circle.style.backgroundColor = color;
        circle.style.animationDelay = `${delay}s`;
        circle.style.animationDuration = `${duration}s`;

        background.appendChild(circle);
    }
});