document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Sayfa yenilenmesini engelle
    document.getElementById("loadingIco").classList.add("fa-solid","fa-spinner","fa-spin-pulse");
    
    // Form bilgilerini al
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);

    // EmailJS ile gönderim
    emailjs.send("service_3eh04lq", "template_xu94wbu", formObject)
        .then(function (response) {
            document.getElementById("loadingIco").classList.remove("fa-solid", "fa-spinner", "fa-spin-pulse");
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById("sendButton").classList.toggle("success");
            document.getElementById("sendText").textContent = "Gönderildi";
            document.getElementById("sendIco").classList.add("fa-solid", "fa-check");
        }, function (error) {
            document.getElementById("loadingIco").classList.remove("fa-solid","fa-spinner","fa-spin-pulse");
            console.log("FAILED...", error);
            document.getElementById("sendButton").classList.toggle("failed");
            document.getElementById("sendText").textContent = "Gönderilmedi";
            document.getElementById("sendIco").classList.add("fa-solid", "fa-xmark");
        });
});
