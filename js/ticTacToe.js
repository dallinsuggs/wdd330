let p1 = true;
let p2 = false;

let targetElement = document.getElementById('board');

let turnCount = 0;

function Touched(ev) {
  if (p1) {
    ev.target.textContent = "X";
    p1 = false;
    p2 = true;
    turnCount++;
    document.getElementById("turn").textContent = "Player :: 2";
  } else if (p2) {
    ev.target.textContent = "O";
    p2 = false;
    p1 = true;
    turnCount++;
    document.getElementById("turn").textContent = "Player :: 1";
  }
  checkWin();
  if (turnCount>= 9) {
    document.getElementById("turn").textContent = "It's a draw!";
  }
}

let divs = document.getElementsByClassName("square");



function reset() {
  for (let i = 0; i < divs.length; i++) {
    divs[i].textContent = "";
  };
  let p1 = true;
  let p2 = false;
  document.getElementById("turn").textContent = "Player :: 1";
  turnCount = 0;
}

function checkWin() {
  let arr = [];
  for (let i = 0; i < divs.length; i++) {
    arr.push(divs[i].textContent);
  }
  //CHECK FOR X WINNING
  checkArray(arr, 0, 1, 2, "X")
  checkArray(arr, 3, 4, 5, "X")
  checkArray(arr, 6, 7, 8, "X")

  checkArray(arr, 0, 3, 6, "X")
  checkArray(arr, 1, 4, 7, "X")
  checkArray(arr, 2, 5, 8, "X")

  checkArray(arr, 0, 4, 8, "X")
  checkArray(arr, 6, 4, 2, "X")

  //CHECK FOR O WINNING
  checkArray(arr, 0, 1, 2, "O")
  checkArray(arr, 3, 4, 5, "O")
  checkArray(arr, 6, 7, 8, "O")

  checkArray(arr, 0, 3, 6, "O")
  checkArray(arr, 1, 4, 7, "O")
  checkArray(arr, 2, 5, 8, "O")

  checkArray(arr, 0, 4, 8, "O")
  checkArray(arr, 6, 4, 2, "O")
}

function checkArray(arr, num1, num2, num3, player) {
  if (arr[num1] == player && arr[num2] == player && arr[num3] == player) {
    document.getElementById("turn").textContent = `Player ${player} won!`;
    turnCount = 0;
  }
}