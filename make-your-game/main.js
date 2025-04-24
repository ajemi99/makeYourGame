import { moves, moveBall, click } from "./app/move.js"
import { checkBrickCollision } from "./app/brick.js"



    const start = document.querySelector("#start")
    const restart = document.querySelector("#restart")


    // pause game !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let pauseTime = false
    let num = 0
    const pauseGameClick = () => {
        num++
        if (num % 2 != 0) {
            pauseTime = true
            cancelAnimationFrame(cancel)
            removeEventListener("keydown", click)

        } else {
            pauseTime = false
            requestAnimationFrame(gameLoop)
            addEventListener("keydown", click)
        }
    }




    addEventListener("resize", () => {
      this.location.reload()  
    })


    // time game !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    const timeID = document.getElementById("time")
    let min = 3
    let sec = 60

    const timeGame = () => {

        let id = setInterval(() => {
            if (!pauseTime && startCheck) {
                sec--

                if (sec < 10) {
                    timeID.textContent = `${min}:0${sec}`
                } else {
                    timeID.textContent = `${min}:${sec}`
                }

                if (sec === 0 && min === 0) {
                    clearInterval(id)
                    setTimeout(() => {
                        alert("Game Over !!")
                    }, 1000)
                    return
                }

                if (sec === 0) {
                    min--
                    sec = 60
                }

            }


        }, 1000);

    }

    timeGame()

    export function checkWin() {
        console.log('ff');
        
        cancelAnimationFrame(cancel)
                removeEventListener("keydown", click)
    }



    // game loop !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    
    let cancel
    function gameLoop() {
        
       checkBrickCollision()

        moves()
        moveBall()
        cancel = requestAnimationFrame(gameLoop)
    }


   
    



    // start game !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    let startCheck = false
    function startGame() {

        startCheck = true
        start.style.display = "none"
        restart.style.display = "block"
        let count = false

        addEventListener("keydown", (e) => {
            if (e.key === " " && !count) {
                count = true
                const divPause = document.createElement("div")
                divPause.id = "pop"
                divPause.style.height = "50px"
                divPause.style.width = "300px"
                divPause.style.backgroundColor = "aqua"
                divPause.style.transform = "translate(150px,250px)"
                divPause.style.color = "black"
                divPause.style.display = "flex"
                divPause.style.justifyContent = "center"
                divPause.style.alignItems = "center"
                divPause.style.fontSize = "20px"
                divPause.innerHTML = "<strong>Press Space To Continue !</strong>"
                document.querySelector(".border").appendChild(divPause)
                pauseGameClick()

            } else if (e.key === " " && count) {
                count = false
                const divPause = document.querySelector("#pop")
                console.log(divPause);
                divPause.remove()
                pauseGameClick()
            }

        })

        addEventListener("keydown", click)
        cancel = requestAnimationFrame(gameLoop)

    }
    start.addEventListener("click", startGame)

    let beginning = false
    addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !beginning) {
            beginning = true
            startGame()
        } else if (e.key == "Enter") {
            location.reload()
        }
    })


    // restart game !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    restart.addEventListener("click", () => {
        // startCheck = false
        start.style.display = "block"
        restart.style.display = "none"
        location.reload()
    })





