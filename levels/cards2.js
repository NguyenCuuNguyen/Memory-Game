
var errors = 0;
var cardSet = [
    "../img/emotions/belief",
    "../img/emotions/fear",
    "../img/emotions/flat",
    "../img/emotions/nature",
    "../img/emotions/pity",
    "../img/emotions/ridicule",
    "../img/emotions/spite",
    "../img/emotions/wish",
    "../img/emotions/_belief",
    "../img/emotions/_fear",
    "../img/emotions/_flat",
    "../img/emotions/_nature",
    "../img/emotions/_pity",
    "../img/emotions/_ridicule",
    "../img/emotions/_spite",
    "../img/emotions/_wish",
    "../img/mind/_prob",
    "../img/mind/_tradition",
    "../img/mind/prob",
    "../img/mind/tradition",
]

var cardSet;
var board = [];
var rows = 4;
var columns =5;
var remainCards = cardSet.length
var card1Selected;
var card2Selected;


window.onload = function() {
    shuffleCards();
    startGame();
}




function shuffleCards() {
    //cardSet = cardList.concat(cardList); //two of each card
    console.log("Before shuffle: ",cardSet);
    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); //get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log("After shuffle: ",cardSet);
}

function startGame() {
    //arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            // <img id="0-0" class="card" src="water.jpg">
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            console.log("card.id is: ", card.id)
            card.src = cardImg + ".png";
            console.log("card.src is: ", card.src)
            card.classList.add("card");
            console.log("card.classList is: ", card.classList)
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);

        }
        board.push(row);
        console.log("row is: ", row)
    }

    console.log("board is: ", board); //flash the cards before hiding
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "../front.png";
        }
    }
}

function selectCard() {

    if (this.src.includes("front")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            console.log("card1Selected.id is: ", card1Selected.id);
            card1Selected.src = board[r][c] + ".png";
            console.log("card1Selected.src is: ", card1Selected.src);
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".png";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    //figure out if name match:
    console.log("card1Selected.src is: ", card1Selected.src);
    console.log("card2Selected.src is: ", card2Selected.src);
    if (card1Selected.src.includes("_")){
        card1 = card1Selected.src.split("_")[1]
        card2 = card2Selected.src.split("/")[5]
    }else {
        card1 = card1Selected.src.split("/")[5]
        card2 = card2Selected.src.split("_")[1]
    }
    console.log("card1 is: ", card1);
    console.log("card2 is: ", card2);
    //if cards aren't the same, flip both back
    if (card1 != card2) {
        card1Selected.src = "../front.png";
        card2Selected.src = "../front.png";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }else{
        remainCards -= 2;
        console.log("remainCards ", remainCards)
        if (remainCards === 0) {
            nextLevel()
        }
    }
    card1Selected = null;
    card2Selected = null;
}



function nextLevel(){
    // var myBtn=document.getElementById("nextLevel");
    //popup is now a div, id=nextLevel
    console.log()
    var popup = document.getElementsByClassName("finishPopup")[0];
    console.log("popup", popup);
    popup.style.visibility = "visible";
    popup.style.display = "block";
    
    var blur = document.getElementsByClassName("blur")[0];
    blur.classList.add("active");


    document.querySelector("#close").addEventListener("click", function(){
        document.querySelector(".finishPopup").style.display = "none";
    });
    
}
