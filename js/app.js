"use strict";

const print = console.log;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const easy_button = document.getElementById('easy');
const normal_button = document.getElementById('normal');
const hard_button = document.getElementById('hard');
const btnsDiv_div = document.querySelector('.btn-div');
const ballXSpawn = [canvas.width / 4 + 50, canvas.width / 2 - 100, canvas.width / 3, canvas.width / 2];
const ballYSpawn = [canvas.height / 3, canvas.height / 2 + 70, canvas.height / 4 + 50, canvas.height / 2];
const gameFrame = 1000 / 60;
let userScore = 0;
let computerScore = 0;
btnsDiv_div.style.left = (canvas.width / 4) - 20 + 'px';

class Ball {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
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
        this.height = 100;
        this.ySpeed = 20;
    }
}

const paddle2XPosition = canvas.width - new Paddle().width;
const paddleYPosition = canvas.height - (canvas.height / 2) - (new Paddle().height / 2);
const ball = new Ball();
const paddle1 = new Paddle(0, paddleYPosition);
const paddle2 = new Paddle(paddle2XPosition, paddleYPosition);
paddle2.height = paddle2.height * 2;

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
    ball.x = ballXSpawn[Math.floor(Math.random() * 4)];
    ball.y = ballYSpawn[Math.floor(Math.random() * 4)];
}

function draw() {
    fill(0, 0, canvas.width, canvas.height, 'black');
    fill(paddle1.x, paddle1.y, paddle1.width, paddle1.height, 'white');
    fill(paddle2.x, paddle2.y, paddle2.width, paddle2.height, 'white');
    font('20px sans-seris');
    fillText(userScore, (canvas.width / 2) - (canvas.width / 4), 100);
    fillText(computerScore, (canvas.width / 2) + (canvas.width / 4), 100);
    fillBall(ball.x, ball.y, ball.width, 'white');
    drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height);
}

canvas.addEventListener('mousemove' ,(e) => {
    paddle1.y = e.y - (paddle1.height / 2);
    //paddle2.y = e.y - (paddle2.height / 2);
});

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
                alert('Game is Over. You won!!!');
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
                alert('Game is Over. You lost :(');
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
    //paddle2 movement rules
    if (paddle2.y + paddle2.height > canvas.height) {
        paddle2.ySpeed = -paddle2.ySpeed;
    }
    if (paddle2.y < 0) {
        paddle2.ySpeed = -paddle2.ySpeed;
    }
}

function easy() {
    paddle2.ySpeed = 10;
    ball.xSpeed = 10;
    easy_button.removeEventListener('click', easy);
    normal_button.removeEventListener('click', normal);
    hard_button.removeEventListener('click', hard);
    setTimeout(() => easy_button.addEventListener('click', easy), 4000);
    setTimeout(() => normal_button.addEventListener('click', normal), 4000);
    setTimeout(() => hard_button.addEventListener('click', hard), 4000);
}

function normal() {
    paddle2.ySpeed = 20;
    ball.xSpeed = 10;
    easy_button.removeEventListener('click', easy);
    normal_button.removeEventListener('click', normal);
    hard_button.removeEventListener('click', hard);
    setTimeout(() => easy_button.addEventListener('click', easy), 4000);
    setTimeout(() => normal_button.addEventListener('click', normal), 4000);
    setTimeout(() => hard_button.addEventListener('click', hard), 4000);
}

function hard() {
    paddle2.ySpeed = 80;
    ball.xSpeed = 20;
    easy_button.removeEventListener('click', easy);
    normal_button.removeEventListener('click', normal);
    hard_button.removeEventListener('click', hard);
    setTimeout(() => easy_button.addEventListener('click', easy), 4000);
    setTimeout(() => normal_button.addEventListener('click', normal), 4000);
    setTimeout(() => hard_button.addEventListener('click', hard), 4000);
}

easy_button.addEventListener('click', easy);
normal_button.addEventListener('click', normal);
hard_button.addEventListener('click', hard);

const game = setInterval(() => {
    draw();
    move();
}, gameFrame);
