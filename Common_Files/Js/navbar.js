document.addEventListener('DOMContentLoaded', () => {
    fetch('/Common_Files/html/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });
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