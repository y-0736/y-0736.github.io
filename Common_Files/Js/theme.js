function theme() {
    var ThemeElements = document.querySelectorAll(".themelemnt");

    document.getElementById("LightBtn").style.opacity = "0";
    setTimeout(function () {
        document.getElementById("LightBtn").classList.toggle("fa-moon");
        document.getElementById("LightBtn").classList.toggle("fa-sun");
    }, 150);
    setTimeout(function () {
        document.getElementById("LightBtn").style.opacity = "1";
    }, 250);

    ThemeElements.forEach(function (ThemeElement) {
        ThemeElement.classList.toggle("darktheme");
        ThemeElement.classList.toggle("lighttheme");
    });
}