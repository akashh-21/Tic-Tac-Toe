let boxes = document.querySelectorAll(".Box");
let resetBnt = document.querySelector("#reset-bnt");
let newGameBnt = document.querySelector("#new-bnt");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // for palyerX, playerO

let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let bntCount = 0;
// For each Box , add an event listener
boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        if(turnO){
            // palyerO
            box.innerText = "O";
            turnO = false;
        }
        else{
            //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        bntCount++;
        let winner = checkWinner();
        if(bntCount===9 && !winner){
            gameDraw();
        }
    });
   
});
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  
};
const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    bntCount = 0;
};
const enableBoxes = () =>{
    boxes.forEach((box) =>{
        box.disabled = false;
         box.innerText = "";
    });
}
const disableBoxes = () =>{
    boxes.forEach((box)=>{
        box.disabled = true;
       
    });
};
const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1!= "" && pos2!="" && pos3!="" && pos1 == pos2 && pos2 == pos3){
            showWinner(pos1);
            return true;
        }
    }
};
newGameBnt.addEventListener("click",resetGame);
resetBnt.addEventListener("click",resetGame);
