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


function openLetter() {
    const flap = document.querySelector('.flap');
    const content = document.getElementById('letterContent');
    const heart = document.getElementById('heart');
    const mektup = document.getElementById('envelope');
    // Zarf kapağını yukarı doğru çevir
    flap.style.transform = 'rotateX(-180deg)';

    heart.style.opacity = 0;


    // Mektubu göster
    content.style.opacity = 1;
    content.style.transform = 'translateY(0)';

    setTimeout(function () {
        mektup.classList.add("auto");
    }, 500)
}

function gosterNot() {
  document.getElementById("uyariKutusu").style.display = "block";
}

function kapatNot() {
  document.getElementById("uyariKutusu").style.display = "none";
}
