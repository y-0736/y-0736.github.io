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

function toggleSidebar() {
    var sidebar = document.getElementById("mySidebar");
    var navbar = document.getElementById("navbar");
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        navbar.classList.remove("responsive");
    } else {
        sidebar.style.width = "250px";
        navbar.classList.add("responsive");
    }
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("navbar").classList.remove("responsive");
}
 
// BURDAN KOD YAZMAYA BAŞLA ÜST KISMA SAKIN DOKUNMA //

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    emailjs.send('service_3eh04lq', 'template_xu94wbu', templateParams)
        .then(function(response) {
            alert('Mesajınız başarıyla gönderilmiştir!');
        }, function(error) {
            alert('Mesajınız gönderilmedi. Hata Mesajı: ' + JSON.stringify(error));
        });
});