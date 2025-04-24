import { livesGame } from "./lives.js"

let pad = document.querySelector(".pad")
let ball = document.querySelector('.ball')
let border = document.querySelector('.border')


let borderWidth = border.offsetWidth


let padXSpeed = 0

let padPositionX = (borderWidth / 2) - (pad.offsetWidth / 2)
let padPositionY = 575
let ballPositionY = 560
let ballPositionX = padPositionX + (pad.offsetWidth / 2 - ball.offsetHeight / 2)


export const speed = {
    ballPositionYSpeed : -5,
  ballPositionXSpeed : 3,
}

let left = false
let right = false


pad.style.transform = `translate(${padPositionX}px, ${padPositionY}px)`
ball.style.transform = `translate(${ballPositionX}px, ${ballPositionY}px)`




export const click = (e) => {
    if (e.key === "ArrowRight") {
        right = true
        padXSpeed = 7
    } else if (e.key === "ArrowLeft") {
        left = true
        padXSpeed = -7
    }
}


addEventListener("keyup", function (e) {
    if (e.key === "ArrowRight") right = false
    if (e.key === "ArrowLeft") left = false
})


export function moves() {

    if (padPositionX >= borderWidth - pad.offsetWidth) {

        if (padXSpeed < 0) {
            padPositionX += padXSpeed
        }
        return
    }

    if (padPositionX <= 0) {
        if (padXSpeed > 0) padPositionX += padXSpeed
        return
    }

    if (right || left) {
        padPositionX += padXSpeed
    }

    if (padPositionX + padXSpeed < 0) padPositionX = 0
    if (padPositionX + padXSpeed > borderWidth - pad.offsetWidth) padPositionX = borderWidth - pad.offsetWidth

    pad.style.transform = `translate(${padPositionX}px, 575px)`



}

addEventListener("keydown", (e) => {

    if (e.key === "z") ballPositionY -= 5
    if (e.key === "q") ballPositionX -= 5
    if (e.key === "s") ballPositionY += 5
    if (e.key === "d") ballPositionX += 5

    ball.style.transform = `translate(${ballPositionX}px, ${ballPositionY}px)`
})



// console.log("ball", ball.getBoundingClientRect());

// console.log("pad", pad.getBoundingClientRect());


export const moveBall = () => {

    let padRect = pad.getBoundingClientRect()
    let ballRect = ball.getBoundingClientRect()
    let borderRect = border.getBoundingClientRect()


    ballPositionY += speed.ballPositionYSpeed
    ballPositionX += speed.ballPositionXSpeed

    ball.style.transform = `translate(${ballPositionX}px, ${ballPositionY}px)`


    // wall !!!!!!!!!!!!!!!!!

    if (ballPositionY <= 0) {
        speed.ballPositionYSpeed *= -1
    }

    if (ballPositionX <= 0) {
        ballPositionX = 0
        speed.ballPositionXSpeed *= -1
    }

    if (ballPositionX >= borderWidth - ballRect.width) {
        ballPositionX = borderWidth - ballRect.width
        speed.ballPositionXSpeed *= -1
    }

    if (
        speed.ballPositionYSpeed > 0 &&
        ballRect.bottom >= padRect.top &&
        ballRect.right >= padRect.left &&
        ballRect.left <= padRect.right &&
        ballRect.bottom <= padRect.bottom
    ) {
        let nasPad = (padRect.right - padRect.width / 2)
        let nasBall = (ballRect.right - ballRect.width / 2)

        let derc = nasBall - nasPad

        speed.ballPositionXSpeed = (derc / padRect.width) * 10
        speed.ballPositionYSpeed *= -1
    }




    // check lives

    if (ballRect.bottom >= borderRect.bottom) {
        padPositionX = (borderWidth / 2) - (pad.offsetWidth / 2)
        ballPositionX = padPositionX + (pad.offsetWidth / 2 - ball.offsetHeight / 2)
        ballPositionY = 560

        speed.ballPositionXSpeed *= -1
        speed.ballPositionYSpeed *= -1

        livesGame(pad, ball, padPositionX, ballPositionX, ballPositionY)
        return
    }
}

