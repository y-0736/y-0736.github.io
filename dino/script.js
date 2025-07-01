const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

let isJumping = false;

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let position = 0;
  let upInterval = setInterval(() => {
    if (position >= 100) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 5;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 5;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function startGameLoop() {
  let cactusPosition = 800;

  let loop = setInterval(() => {
    if (cactusPosition < -20) {
      cactusPosition = 800;
    } else {
      cactusPosition -= 5;
      cactus.style.left = cactusPosition + "px";
    }

    // çarpışma kontrolü
    if (
      cactusPosition < 90 &&
      cactusPosition > 50 &&
      parseInt(dino.style.bottom) < 40
    ) {
      alert("Game Over!");
      clearInterval(loop);
      location.reload();
    }
  }, 20);
}

startGameLoop();
