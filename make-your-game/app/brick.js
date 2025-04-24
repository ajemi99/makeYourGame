import {speed}from "./move.js"
import { checkWin } from "../main.js"
const border = document.querySelector('.border')
const brickContainer = document.querySelector('.brickContainer')
let ball = document.querySelector('.ball')

let gameWidth = border.offsetWidth

const brickCount = 5
let brickRow = 4
let brickColumn = 5


let brickWidth = gameWidth / (brickCount + 1)
let margin = brickWidth / 6
let top = 50
let brickHeight = 15



for (let row = 0; row < brickRow; row++) {
    for (let column = 0; column < brickColumn; column++) {
        let brick = document.createElement("div")
        brick.className = "brick"

        const x = margin + column * (brickWidth + margin)
        const y = top + row * (brickHeight + margin)


        brick.style.left = `${x}px`
        brick.style.top = `${y}px`
        brick.style.width = `${brickWidth}px`
        brick.style.height = `${brickHeight}px`

        
        brickContainer.append(brick)
    }

}

const score = document.getElementById('score')
let scoreCount = 0

export function checkBrickCollision() {
   
    let ballRect = ball.getBoundingClientRect()
   
    let allBricks = document.querySelectorAll('.brick')

    allBricks.forEach(brick => {

        let brickRect = brick.getBoundingClientRect()

       const check = brickRect.left <= ballRect.right &&
        brickRect.right >= ballRect.left &&
        brickRect.top <= ballRect.bottom &&
        brickRect.bottom >= ballRect.top

        if  (check)  {
            
            let nasBrick = (brickRect.right - brickRect.width / 2)
            let nasBall = (ballRect.right - ballRect.width / 2)
    
            let derc = nasBall - nasBrick
    
            speed.ballPositionXSpeed = (derc / brickRect.width) * 10
            speed.ballPositionYSpeed *=-1
            brick.remove()

            scoreCount += 10
            score.textContent = scoreCount
         }

         if (scoreCount === 20) {
            console.log("dd");
            
            checkWin()
         }

    })
 }


