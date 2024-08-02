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

    emailjs.send('service_3eh04lq', 'template_xu94wbu', templateParams)
        .then(function () {
            alert('Mesaj başarıyla gönderildi!');
        }, function (error) {
            console.error('FAILED...', error);
            alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
        });
});