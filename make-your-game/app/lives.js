const lives = document.querySelector("#lives")
lives.textContent = "❤️❤️❤️"
let str = lives.textContent

let s = "🖤"
let v


export function livesGame(pad, ball, padX, ballX, ballY) {


    pad.style.transform = `translate(${padX}px, 575px)`
    ball.style.transform = `translate(${ballX}px, ${ballY}px)`

    //    for (let i = str.length-1; i >= 0; i -= 2) {
    //         console.log(str[i]);
    //    }
}