document.getElementById('rotatebutton1').addEventListener('click', function () {
    document.getElementById('front').style.height = '50%';
    document.getElementById('front').style.transition = '5s';
    document.getElementById('card').style.transform = 'rotateY(180deg)';
    document.getElementById('card').style.transition = '5s';
    document.getElementById('back').style.height = '50%';
    document.getElementById('back').style.transition = '5s';
});


document.getElementById('rotatebutton2').addEventListener('click', function () {
    document.getElementById('back').style.height = '100%';
    document.getElementById('back').style.transition = '5s';
    document.getElementById('card').style.transform = 'rotateY(0deg)';
    document.getElementById('card').style.transition = '5s';
    document.getElementById('front').style.height = '100%';
    document.getElementById('front').style.transition = '5s';
});
