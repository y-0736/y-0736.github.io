document.addEventListener("DOMContentLoaded", function() {
    fetch('/Common_Files/html/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Footer yüklenirken bir hata oluştu:', error));
});
