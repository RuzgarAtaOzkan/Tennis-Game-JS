'use strict';

const print = console.log;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gameFrame = 1000 / 60;
const easy_button = document.getElementById('easy');
const normal_button = document.getElementById('normal');
const hard_button = document.getElementById('hard');
const btnsDiv_div = document.querySelector('.btns-div');
let userScore = 0;
let computerScore = 0;

class Ball {
    constructor() {
        this.x = Math.random() * 800;
        this.y = Math.random() * 600;
        this.width = 10;
        this.height = 10;
        this.xSpeed = 10;
        this.ySpeed = 5;
    }
}

class Paddle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 200;
        this.ySpeed = 20;
    }
}

const paddle2XPosition = canvas.width - new Paddle().width;
const paddleYPosition = canvas.height - (canvas.height / 2) - (new Paddle().height / 2);
const ball = new Ball();
const paddle1 = new Paddle(0, paddleYPosition);
const paddle2 = new Paddle(paddle2XPosition, paddleYPosition);

function fill(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawLine(x, y, toX, toY) {
    ctx.beginPath();
    ctx.setLineDash([30, 8]); /*dashes are 5px and spaces are 3px*/
    ctx.moveTo(x, y);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function fillText(content, x, y) {
    ctx.fillText(content, x, y);
}

function font(font) {
    ctx.font = font;
}

function fillBall(x, y, size, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fill();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

function draw() {
    fill(0, 0, canvas.width, canvas.height, 'black');
    fill(paddle1.x, paddle1.y, paddle1.width, paddle1.height - 100, 'white');
    fill(paddle2.x, paddle2.y, paddle2.width, paddle2.height, 'white');
    font('20px sans-seris');
    fillText(userScore, (canvas.width / 2) - (canvas.width / 4), 100);
    fillText(computerScore, (canvas.width / 2) + (canvas.width / 4), 100);
    fillBall(ball.x, ball.y, ball.width, 'white');
    drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height);
}

canvas.onmousemove = (e) => {
    paddle1.y = e.y - (paddle1.height / 2);
    //paddle2.y = e.y - (paddle2.height / 2);
}

function move() {
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    paddle2.y += paddle2.ySpeed;

    if (ball.x > canvas.width - paddle2.width) {
        if (ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
            ball.xSpeed = -ball.xSpeed;
        } else {
            userScore++;
            if (userScore === 30) {
                clearInterval(game);
                alert('Game is Over');
            }
            resetBall();
        }
    }
    
    if (ball.x < 10) {
        if (ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
            ball.xSpeed = -ball.xSpeed;
        } else {
            computerScore++;
            if (computerScore === 30) {
                clearInterval(game);
                alert('Game is Over');
            }
            resetBall();
        }
    }

    if (ball.y < 0) {
        ball.ySpeed = -ball.ySpeed;
    }

    if (ball.y > canvas.height) {
        ball.ySpeed = -ball.ySpeed;
    }
    //paddle2 movement
    if (paddle2.y + paddle2.height > canvas.height) {
        paddle2.ySpeed = -paddle2.ySpeed;
    }
    if (paddle2.y < 0) {
        paddle2.ySpeed = -paddle2.ySpeed;
    }
}

const game = setInterval(() => {
    draw();
    move();
}, gameFrame);

easy_button.onclick = () => {
    paddle2.ySpeed = 10;
    ball.xSpeed = 10;
}

normal_button.onclick = () => {
    paddle2.ySpeed = 20;
    ball.xSpeed = 10;
}

hard_button.onclick = () => {
    paddle2.ySpeed = 80;
    ball.xSpeed = 20;
}

btnsDiv_div.style.left = canvas.width / 4 - 20 + 'px';
