
const boxes = document.getElementsByClassName("symbol");
const boardState = Array(boxes.length).fill(""); 

let currentPlayer = "X";//this makes currentPlayer X
function InitializeGame(box1) {
    let symbol = document.getElementById(box1);
     // Update the innerHTML of the symbol
    symbol.innerHTML = currentPlayer;
    // Update the corresponding value in the boardState array
    boardState[parseInt(box1.slice(-1)) - 1] = currentPlayer;
    symbol.disabled=true;
    changeturn(); 
    checkAllRows();   
    displayScore();
    checkDraw();
    disablebuttonWin();
  
}

function WinningCondition() { //all win conditions
    let row1 = (boardState[0] !== "" && boardState[0] === boardState[1] && boardState[1] === boardState[2]);
    let row2 = (boardState[3] !== "" && boardState[3] === boardState[4] && boardState[4] === boardState[5]);
    let row3 = (boardState[6] !== "" && boardState[6] === boardState[7] && boardState[7] === boardState[8]);
    let col1 = (boardState[0] !== "" && boardState[0] === boardState[3] && boardState[3] === boardState[6]);
    let col2 = (boardState[1] !== "" && boardState[1] === boardState[4] && boardState[4] === boardState[7]);
    let col3 = (boardState[2] !== "" && boardState[2] === boardState[5] && boardState[5] === boardState[8]);
    let diag1 = (boardState[0] !== "" && boardState[0] === boardState[4] && boardState[4] === boardState[8]);
    let diag2 = (boardState[2] !== "" && boardState[2] === boardState[4] && boardState[4] === boardState[6]);

    return row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2; //return them
}

//the x and o is mixed up not sure how
function checkAllRows(displayScore) {
    if (WinningCondition()) {//if win condition is met
        if(currentPlayer==='X'){
            document.getElementById("WhoWins").innerHTML = "Player O wins";
        }
        else if(currentPlayer==='O'){
            document.getElementById("WhoWins").innerHTML = "Player X wins";
        } 
    }
}

function checkDraw() {
    let Displaydraw = true;

    for (let i = 0; i < boardState.length; i++) {
        if (boardState[i] === "") {//if the board still has blank
            Displaydraw = false; //then draw is not true
            break;//so break
        }
    }
    if (Displaydraw && !WinningCondition()) {//if draw and no win condition
        document.getElementById("WhoWins").innerHTML = "Draw";//print draw
    }

}

//assign score to 0
let playerXscore = 0;
let playerOscore = 0;
function displayScore(){
    if (WinningCondition()) {//if winning condition is met
        if (currentPlayer === 'X') {//and if the player is x
            playerXscore++;//add one to the player score element
            document.getElementById("text2").innerHTML = playerXscore;//put it into the innerhtml

        } else if (currentPlayer === 'O') {//if it's O
            playerOscore++;//add one
            document.getElementById("text1").innerHTML = playerOscore;//paste it into html

        }
    }
}

function continueGame(){//continue will only erase the board
    for (let i = 1; i <= 9; i++) {//loops from 1-9
        let clear = document.getElementById("box" + i);//takes the box and assigns 1-9 after it
        clear.innerHTML = " ";//clear all the innerhtml
        clear.disabled = false;//disable all buttons
    }
    currentPlayer = "X";//will reassign player to x
    document.getElementById("WhoWins").innerHTML = " ";//erase the who wins text
    boardState.fill("");//entire board is blank
}

function disablebuttonWin(){
        for (let i = 1; i <= 9; i++) {//loops 1-9
            if(WinningCondition()){//if winningcondition function is true
                let cleared = document.getElementById("box" + i);//then clear all button
                cleared.disabled = true;//disable all button
            }

    }
}

function resetGame(){//will reset board and the score
    playerOscore=0;
    playerXscore=0;
    document.getElementById("text1").innerHTML = 0;
    document.getElementById("text2").innerHTML = 0;
    for (let i = 1; i <= 9; i++) {//loops through 1-9
        let clear = document.getElementById("box" + i);//will locate att boxes
        clear.innerHTML = " ";//clear the button of any symbols
        clear.disabled = false;//disable all button
    }
    document.getElementById("WhoWins").innerHTML = " ";//winner text blank
    currentPlayer = "X";//current player back to x
    boardState.fill("");//board state is all back to blank
}

function changeturn(){
    if(currentPlayer==="X"){//if the currenplayer is X then switch to O
        currentPlayer="O"
    }
    else{
        currentPlayer="X"//if not then keep it X
    }
}




