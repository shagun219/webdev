//Random Sequence Generato class
function randomSequenceGenerator() {
    colors = ["red","green", "blue", "yellow"];
    const seq = [];
    return {
        next: () => {
            const randomNum = Math.floor(Math.random()*4);
            const nextColor = colors[randomNum];
            seq.push(nextColor)
            return nextColor;
        },
        reset: () => {
            while(seq.length > 0) {
                seq.pop();
            }
        },
        compare: (index, inputColor) => index < seq.length && seq[index] === inputColor,
        getLength: () => seq.length
    }
}

//Input Sequence class
function inputSequence() {
    const inputSeq = []
    return {
        add: (color) => inputSeq.push(color),
        reset : () => {
            while(inputSeq.length > 0) {
                inputSeq.pop();
            }
        },
        getLength: () => inputSeq.length
    }
}

const audios = {
    "red" : new Audio("sounds/red.mp3"),
    "green": new Audio("sounds/green.mp3"),
    "blue": new Audio("sounds/blue.mp3"), 
    "yellow": new Audio("sounds/yellow.mp3"),
    "wrong":  new Audio("sounds/wrong.mp3")
};
const pattern = randomSequenceGenerator();
const input = inputSequence();
const delay = ms => new Promise(res => setTimeout(res, ms));
let gameOn = false;

const autoGenerateNextAction = async () => {
    input.reset();
    const nextColor = pattern.next();
    const nextButtonId = "#" + nextColor;
    await delay(500);
    $("#level-title").text("Level " + pattern.getLength()).delay(1000);
    
    audios[nextColor].play();
    $(nextButtonId).addClass("pressed").delay(100).queue(function( next ){
        $(this).removeClass('pressed'); 
        next();
    });
}

const gameOverAction = () => {
    audios.wrong.play();
    input.reset();
    pattern.reset();
    gameOn = false;
    $("#level-title").text("Game Over, Press Any Key to Restart");
}

$(".btn").click(function(){
    if(gameOn) {
        audios[this.id].play();
        input.add(this.id);
        let res = pattern.compare(input.getLength()-1, this.id);
        if(input.getLength > pattern.getLength || !res) {
            gameOverAction();
        }
        else if(input.getLength() === pattern.getLength() && res) {
            autoGenerateNextAction();
        }
    }
})

$(document).keypress(function() {
    if(!gameOn) {
        gameOn =true;
        autoGenerateNextAction();
    }
})