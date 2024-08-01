document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        emailsjs.init({
            user_id: 'XAwBmb6X1yVQ6vdiM', // Emails.js kullanıcı kimliğiniz
            service_id: 'service_3eh04lq', // Emails.js hizmet kimliğiniz
            template_id: 'template_xu94wbu', // Emails.js şablon kimliğiniz
            template_params: {
                'name': document.getElementById('name').value,
                'email': document.getElementById('email').value,
                'message': document.getElementById('message').value,
            }
        }).then(function (response) {
            alert('Mesaj başarıyla gönderildi!');
        }).catch(function (error) {
            console.error('Mesaj gönderme hatası:', error);
            alert('Mesaj gönderilemedi.');
        });
    });
}); 