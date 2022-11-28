const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(e) {
    if (e.keyCode === 37 && dir !== "right") dir = "left";
    else if (e.keyCode === 38 && dir !== "down") dir = "up";
    else if (e.keyCode === 39 && dir !== "left") dir = "right";
    else if (e.keyCode === 40 && dir !== "up") dir = "down";
}

function setModal() {
    const modal = document.createElement("div");
    const restartButton = document.createElement("button");
    const modalText = document.createElement("div");
    const endText = document.createElement("p");

    endText.textContent = "ИГРА ОКОНЧЕНА";
    
    modalText.classList.add("modal-text");
    
    if (score > localStorage.record) {
        localStorage.record = score;
        modalText.innerHTML = `Новый рекорд!<br>${score}`;
    } else {
        const currentScore = document.createElement("p");
        const record = document.createElement("p");
        
        currentScore.innerHTML = `Ваш счет:<br>${score}`;
        record.innerHTML = `Рекорд:<br>${localStorage.record}`;

        modalText.append(currentScore);
        modalText.append(record);
    }


    modal.append(endText);
    modal.append(modalText);
    modal.append(restartButton);
    modal.classList.add("modal");

    restartButton.addEventListener("click", () => location.reload());

    document.body.append(modal);
}

function eatTale(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            clearInterval(game);
            setModal();
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        }
    } else snake.pop();

    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
        clearInterval(game);
        setModal();
    }

    if (dir === "left") snakeX -= box;
    if (dir === "right") snakeX += box;
    if (dir === "up") snakeY -= box;
    if (dir === "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    eatTale(newHead, snake);

    snake.unshift(newHead);
}

var game = setInterval(drawGame, 150);

drawGame();