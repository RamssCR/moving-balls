//accessing to the canvas
const canvas = document.querySelector(".canvas")

//getting the place to draw with "getContext()"
let ctx = canvas.getContext("2d")

//getting the width and height from the window
let width = (canvas.width = window.innerWidth)
let height = (canvas.height = window.innerHeight)

//creating the function to get a random number between a min-max number
function randomNumber(min, max) {
    let number = Math.floor(Math.random() * (max - min + 1)) + min
    return number
}

//we create the object "Ball" based on its features
function Ball(x, y, velX, velY, color, size) {
    this.x = x //position in X
    this.y = y //position in Y
    this.velX = velX //velocity in X
    this.velY = velY //velocity in Y
    this.color = color //color
    this.size = size //size
}

//we create the balls prototype
Ball.prototype.draw = function () {
    //beginPath to start drawing
    ctx.beginPath()
    //fillStyle to fill the shape with a color
    ctx.fillStyle = this.color
    //arc to create the circles(positionX, positionY, radius, startRadian, endRadian)
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    //fill to finish the drawing and print the shape on screen
    ctx.fill()
}

//we create the ball movement
Ball.prototype.update = function () {
    //if they touch the corners, change their velocity
    if (this.x + this.size >= width) {
        this.velX = -this.velX
    }

    if (this.x - this.size <= 0) {
        this.velX = -this.velX
    }

    if (this.y + this.size >= height) {
        this.velY = -this.velY
    }

    if (this.y - this.size <= 0) {
        this.velY = -this.velY
    }

    //add the velocity to the positions X-Y
    this.x += this.velX
    this.y += this.velY
}

//balls is made to save less than 30 balls
let balls = [];

//we create the loop animation
function loop() {
    ctx.fillStyle = "rgba(19, 0, 17, 0.25)"
    ctx.fillRect(0, 0, width, height)

    while (balls.length < 31) {
        let size = randomNumber(10, 20)
        let ball = new Ball(
            randomNumber(0 + size, width - size),
            randomNumber(0 + size, height - size),
            randomNumber(-7, 7),
            randomNumber(-7, 7),
            `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(0, 255)})`,
            size
        );

        balls.push(ball);
    }

    //in order to apply the functions draw() and update(), we modify them using a for structure
    //NOTE: We can also use "foreach"
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw()
        balls[i].update()
    }

    requestAnimationFrame(loop);
}

loop();