function createFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = (4 + Math.random() * 3) + 's';
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 7000);
}

setInterval(createFlower, 500);

function showScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    document.getElementById("screenSize").textContent =
        `📱 ${width}px x ${height}px`;
}

window.addEventListener("resize", showScreenSize); // ekran dönünce günceller
showScreenSize(); // sayfa açılır açılmaz göster
