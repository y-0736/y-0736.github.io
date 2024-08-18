document.getElementById("formactive").addEventListener("click", function(event) {
    event.preventDefault(); // Eğer bir form içindeyse formun gönderilmesini engellemek için
    var form403 = document.getElementById("form403");
    var box403 = document.getElementById("box403");
    form403.style.opacity = "1";
    form403.style.position = "relative";
    form403.style.top = "-15px";
    form403.style.paddingTop = "30px";
    box403.style.transition = "height 0.5s ease";
});

(function () {
    emailjs.init("XAwBmb6X1yVQ6vdiM");
})();

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: name,
        message: message,
        from_email: email
    };

    emailjs.send('service_3eh04lq', 'template_cwotxob', templateParams)
        .then(function () {
            alert('Mesaj başarıyla gönderildi!');
        }, function (error) {
            console.error('FAILED...', error);
            alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
        });
});

document.getElementById('extbtn').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'http://www.google.com';
})