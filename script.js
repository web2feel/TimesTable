let timestable = document.querySelector('#timestable')
let playButton = document.querySelector('.playButton') 
let reloadPlay = document.querySelector('.playAgain') 
let overlay = document.querySelector('#overlay') 
let scorebox = document.querySelector('.scorebox') 
let passTime = true

document.querySelector('.playAgain').addEventListener('click', function(){
    window.location.reload()
})
//Start game

playButton.addEventListener('click', function(){
    timer()
    openBox()
    this.disabled = true
})

//End game

const endGame = () => {
    overlay.style.display='flex'
    scorebox.innerHTML = `You scored ${score} points!! `
}

//Timer function

const timer = () => {
let timeleft = 150;
const gameTime = setInterval( () => {
        if(passTime){
            document.getElementById("countdown").innerHTML = timeleft + " <span> seconds</span>"
            timeleft -= 1
        }
    if(timeleft < 1){
        clearInterval(gameTime)
        document.getElementById("countdown").innerHTML = "Time is up"
        endGame()
    }
    },1000) 
}



//Score collection

let score = 0
document.getElementById("scoreCard").innerHTML = `Score - ${score}`

//Make number boxes
const makeBoxes = () => {
    let box = ''
    let n = 0
    for (let i = 1; i < 11; i++) {
        for (let j = 1; j < 13; j++) {
            if(i>0 && j>0){
            box += `<div class="box close"><input id="box-${n++}"class="number" data-num="${i*j}" type="text" value="" oninput="checknumber(this)" ></div>`
            }
        }    
    }
    return box
}
timestable.innerHTML = makeBoxes()

// switch
const openBox = () => {
        const boxList = [...document.querySelectorAll(".close")]
        let item = boxList[Math.floor(Math.random()*boxList.length)]
        item.classList.remove('close')
        item.classList.add('open')
        item.children[0].focus()    
}


//Check entry function
const checknumber = (obj) => {
    let thisbox = obj.getAttribute('id')
    let val = obj.value
    let mult = obj.getAttribute('data-num')
    if(val.length == 0){
        document.getElementById(thisbox).classList.remove('wrong')
        document.getElementById(thisbox).classList.remove('checked')
    } else if( val == mult){
        document.getElementById(thisbox).classList.remove('wrong')
        document.getElementById(thisbox).classList.add('checked','animate', 'bounceIn')
        document.getElementById(thisbox).disabled = true
        score++
        document.getElementById("scoreCard").innerHTML = `Score - ${score}`
        if([...document.querySelectorAll(".close")].length !== 0){
            openBox()   
        } else {
            endGame()
            passTime = false
        }   
    } else {
        document.getElementById(thisbox).classList.remove('checked')
        document.getElementById(thisbox).classList.add('wrong')
    }
}
