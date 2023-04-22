

var buttons = document.querySelectorAll(".drum");
for(let i=0; i<buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        playSound(this.innerHTML);
        buttonPressAnimation(this.innerHTML);
    });
}

document.addEventListener("keydown", function (event) {
    playSound(event.key);
    buttonPressAnimation(event.key);
});

function playSound(key) {
    switch(key) {
        case "w" : 
            new Audio("sounds/tom-1.mp3").play();
            break;
        case "a" :
            new Audio("sounds/tom-2.mp3").play();
            break;
        case "s" :
            new Audio("sounds/tom-3.mp3").play();
            break;
        case "d" :
            new Audio("sounds/tom-4.mp3").play();
            break;
        case "j" :
            new Audio("sounds/crash.mp3").play();
            break;
        case "k" :
            new Audio("sounds/kick-bass.mp3").play();
            break;
        case "l" :
            new Audio("sounds/snare.mp3").play();
            break;
        default :
            console.log("invalid choice");
    }
}

function buttonPressAnimation(key) {
    var activeButton = document.querySelector("."+key);
    activeButton.classList.add("pressed");
    setTimeout(function () {activeButton.classList.remove("pressed");}, 100);
}