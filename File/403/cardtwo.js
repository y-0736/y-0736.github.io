document.getElementById("formactive").addEventListener("click", function(event) {
    event.preventDefault(); // Eğer bir form içindeyse formun gönderilmesini engellemek için
    var form403 = document.getElementById("form403");
    var box403 = document.getElementById("box403");
    form403.style.opacity = "1";
    form403.style.position = "relative";
    form403.style.top = "-50px";
    form403.style.paddingTop = "75px";
    box403.style.transition = "height 0.5s ease";
});

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
