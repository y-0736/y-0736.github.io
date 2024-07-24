document.addEventListener('DOMContentLoaded', () => {
    fetch('/Common_Files/html/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        });
});

function toggleSidebar() {
    document.getElementById("mySidebar").classList.toggle('active');
}

function closeSidebar() {
    document.getElementById("mySidebar").classList.remove('active');
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

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const navbar = document.getElementById('navbar')

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark')
        navbar.classList.toggle('dark');
        body.classList.toggle('light')
        navbar.classList.toggle('light');
    });
    body.classList.add('light')
    navbar.classList.add('light')
});
