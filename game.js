const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  gravity: 0.6,
  lift: -10,
  velocity: 0
};

let pipes = [];
let score = 0;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  for (let pipe of pipes) {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height) bird.y = canvas.height - bird.height;
  if (bird.y < 0) bird.y = 0;

  if (frames % 90 === 0) {
    let top = Math.random() * (canvas.height / 2);
    let bottom = canvas.height - top - 150;
    pipes.push({ x: canvas.width, top: top, bottom: bottom, width: 40 });
  }

  for (let i = 0; i < pipes.length; i++) {
    let pipe = pipes[i];
    pipe.x -= 2;

    // Collision detection
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }

    if (pipe.x + pipe.width < 0) {
      pipes.splice(i, 1);
      score++;
    }
  }

  drawPipes();
  drawBird();

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  frames++;
  requestAnimationFrame(update);
}

function jump() {
  bird.velocity = bird.lift;
}

document.addEventListener("keydown", jump);

let frames = 0;
update();
