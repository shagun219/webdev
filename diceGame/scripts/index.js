var p1 = rollDice();
var p2 = rollDice();
var heading;
if(p1 === p2) {
    heading = "Draw";
}
else if(p1 > p2) {
    heading = "🚩 Player 1 wins";
}
else {
    heading = "Player 2 wins 🚩"; 
}
document.querySelector("h1").textContent = heading;
document.querySelector(".img1").setAttribute("src", getDiceImage(p1));
document.querySelector(".img2").setAttribute("src", getDiceImage(p2));

function rollDice() {
    return Math.floor(Math.random()*6)+1;
}

function getDiceImage(diceNum) {
    return "images/dice"+diceNum+".png";
}