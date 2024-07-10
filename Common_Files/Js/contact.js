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