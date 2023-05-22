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
        compare: (inputSeq) => {
            if(inputSeq.length > seq.length) {
                //Game already over
                return +1; //No match
            }
            
            if(inputSeq.length < seq.length) {
                for(let i=0; i<inputSeq.length; i++) {
                    if(seq[i] !== inputSeq[i]) {
                        return +1; //No match, game over
                    }
                }
                return -1; // wait for more input
            }

            for(let i=0; i<seq.length; i++) {
                if(seq[i] !== inputSeq[i]) {
                    return +1; //No match
                }
            }
            return 0; // exact match, move to next level
        },
        getSeqLength: () => seq.length,
        readSeq: () => seq
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
        getSeq : () => inputSeq
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
let gameOn = false;

function autoGenerateNextAction() {
    input.reset();
    const nextColor = pattern.next();
    console.log("Current pattern");
    console.log(pattern.readSeq());
    const nextButtonId = "#" + nextColor;
    $("#level-title").text("Level " + pattern.getSeqLength());
    audios[nextColor].play();
    $(nextButtonId).addClass("pressed").delay(1000).queue(function( next ){
        $(this).removeClass('pressed'); 
        next();
    });
}

function gameOverAction() {
    audios.wrong.play();
    input.reset();
    pattern.reset();
    gameOn = false;
    $("#level-title").text("Game Over, Press Any Key to Restart");
}

$(".btn").click(function(){
    audios[this.id].play();
    if(gameOn) {
        console.log("Game is on");
        input.add(this.id);
        if(res === 0) {
            autoGenerateNextAction();
        }
        else if(res > 0) {
            //Game Over
            gameOverAction();
        }
    }
})

$(document).keypress(function() {
    if(!gameOn) {
        gameOn =true;
    }
    autoGenerateNextAction();
})