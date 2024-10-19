
document.addEventListener("DOMContentLoaded", () => {
    fetch("/Common_Files/html/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        });
});


document.getElementById("btnthm").addEventListener("click", function () {
    document.getElementById("solid-second").style.transform = "translateX(28px)";

});

function toggleSidebar() {
    document.getElementById("mySidebar").classList.toggle("active");
}

function closeSidebar() {
    document.getElementById("mySidebar").classList.remove("active");
}

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

function y0736() {
    window.location.href = "https://y-0736.github.io";
}