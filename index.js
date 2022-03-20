
(function ticTacToe (){
    //event listener for players submit page
    if(window.location.href.indexOf('players') !== -1) {
        document.addEventListener('DOMContentLoaded',()=> {
            document.getElementById("btn").addEventListener('click', player);
        })
    };
    if(window.location.href.indexOf('index') !==-1){
        
        const storedPlayers = JSON.parse(localStorage.getItem('players'));
        const p1Name = storedPlayers[0].name
        const p2Name = storedPlayers[1].name
        document.getElementById('p1Display')
        .innerText= p1Name;
        document.getElementById('p2Display')
        .innerText= p2Name;
        createGameBoard();
        
        document.addEventListener('DOMContentLoaded',()=> {
            document.getElementById("clearBtn").addEventListener('click', clearGameBoard);
        })
    } ;
  
    
})();
//score counters
let p1Counter = 0;
let p2Counter = 0;
function p1winner (){
    const spaces = document.querySelectorAll("#space")
    const p1Moves = [];
    //get P1's moves
    for(let i=0;i<9;i++) {
        //check if it has the p1 attribute and is player 1
        if(spaces[i].hasAttribute('player1') && spaces[i].getAttribute('player1') == "true") {
            //keep track of p1 chosen spaces by pushing it to the array
            p1Moves.push(spaces[i]);
        } 
    }
   
//We have the moves, now check for a win
            //looop through p1Moves and check for 3 in a row
            for(let i=0;i<=p1Moves.length-3;i++) {
                for(let j=1;j<=p1Moves.length-2;j++) {
                    for(let k=2;k<=p1Moves.length-1;k++) {
                      //get the number of the 3rd one and subtract the 2nd one. Get the difference.
                      //check to see if the difference also applies to the 2nd-1st.
                     const difference1 = p1Moves[k].getAttribute('number') - p1Moves[j].getAttribute('number');
                   const difference2 = p1Moves[j].getAttribute('number') - p1Moves[i].getAttribute('number');
                   if (difference1 == difference2 && difference1 !==1 ) {
                       p1Counter ++;
                       score();
                       //make sure if it increments by 1, that the first space chosen is the first space in the row. so the index must be 0,3,6
                   } else if(difference1==difference2 && (p1Moves[0].getAttribute('number')== (0||3||6))) {
                    p1Counter ++;
                    score();
                   }
            }
         }
    }
}
function p2winner () {
    const spaces = document.querySelectorAll("#space")
    const p2Moves = [];
     //get P2's moves
     for(let i=0;i<spaces.length;i++) {
        //check if it has the p1 attribute and is player 1
        if (spaces[i].hasAttribute('player1') && spaces[i].getAttribute('player1') !== "true"){
            //keep track of p2 chosen spaces by pushing it to the array
            p2Moves.push(spaces[i]);
        }
    }
            //loop through p2Moves and check for 3 in a row
            for(let i=0; i<=p2Moves.length-3;i++) {
                for(let j=1;j<=p2Moves.length-2;j++) {
                    for(let k=2;k<=p2Moves.length-1;k++) {
                      //get the number of the 3rd one and subtract the 2nd one. Get the difference.
                      //check to see if the difference also applies to the 2nd-1st.
                     const difference1 = p2Moves[k].getAttribute('number') - p2Moves[j].getAttribute('number');
                   const difference2 = p2Moves[j].getAttribute('number') - p2Moves[i].getAttribute('number');
                   if (difference1 == difference2 && difference1 !==1 ) {
                       p2Counter ++;
                       score();
                   } else if (difference1==1 && difference2 ==1 && (p2Moves[0].getAttribute('number')  == (0||3||6))){
                    p2Counter ++;
                    const storedPlayers = JSON.parse(localStorage.getItem('players'));
                    const p2Name = storedPlayers[1].name
                    toggleModalName(p2Name);
                    score();
                    }
                   }
                 }
             }
         };
let turn = 0;//player 1, turn=1 player2
let turnCounter1 = 0;
let turnCounter2 =0;
//event listener on each space. Will invoke the winner function. 
function makeAMove (){
    //checking to see there's been at least 3 turns
    if(turn == 0){
            this.innerText = "X";
            //remove listener so the move can't be changed.
            this.removeEventListener('click', makeAMove);
            //monitor whether the space has been selected and by which player
            this.setAttribute('player1', 'true');
            turnCounter1 ++
            if (turnCounter1 > 2){
                p1winner();
            }
            
            turn++
    } else { 
        this.innerText = "O";
        //remove listener so the move can't be changed.
        this.removeEventListener('click', makeAMove);
        //monitor whether the space has been selected and by who
            this.setAttribute('player1', 'false');
            turnCounter2 ++
            if (turnCounter2 > 2){
                p2winner();
            }
        turn--
    }
    };
//adds spaces to gameboard, add's event listener for makeAMove
 function createGameBoard  () {
     //check to see if id=space element exists,if not create new board;
     if(document.querySelector('#space') == null){
        let gameBoard = document.querySelector("#gameBoard");
        gameBoard.style.setProperty ('grid-template-columns', "1fr 1fr 1fr");
        gameBoard.style.setProperty('grid-template-rows', "repeat(3,1fr)");
        for(let i=0; i<9;i++) {
            const space = document.createElement("div");
            space.setAttribute("id","space");
            space.setAttribute('number',i)
            space.style.border = "2px solid black";
            //add listener to invoke function that keeps track of moves after each click. 
            space.addEventListener('click',makeAMove);
            //check for a winner after each move.
            //spaces[i].addEventListener("click",winner);
             
            
            gameBoard.appendChild(space);
        };
     }
    
};
//clears marks on gameboard, sets turnCounter to 0
function clearGameBoard (){
    //reset turn counter to 0;
    turnCounter1=0;
    turnCounter2=0;
    //get all spaces
  const spaces =  document.querySelectorAll("#space");
    //loop through and reset all of the spaces with a player1 attribute(the ones that've been selected)
    for(let i=0;i<spaces.length;i++) {
        if (spaces[i].hasAttribute('player1')) {
            //reset innerText
            spaces[i].innerText = "";
            //remove player1 attribute
            spaces[i].removeAttribute('player1');
            //add event listener click MakeAMove
            spaces[i].addEventListener('click',makeAMove);
            
            
        } 
    } 
        
    
}

 function player (ev){
     //click event
     ev.preventDefault()// don't reload the page, so data will still be on page
     const players = [];
     //create player 1 user object
     let player1 = {
         name:document.querySelector('#p1Name').value,
         marker: document.querySelector('#p1Marker').value
     }
     //create player 2 user object
     let player2 = {
         name:document.querySelector('#p2Name').value,
         marker: document.querySelector('#p2Marker').value
     }
     //add send data function to be used for display
     player1.sendData = function (){
        document.getElementById('display1')
        .innerText= player1.name;
        
     }
     player2.sendData = function () {
        document.getElementById('display2')
        .innerText = player2.name;

     }
   
    //push to player array;
     players.push(player1,player2);
     //save to local storage
     localStorage.setItem('players', JSON.stringify(players));
     //clear form for next entry
     //document.querySelector('form').reset();
     //send added notification
     console.warn("added", {players});
    //for display purposes
    player1.sendData();
    player2.sendData();
    window.location = "index.html";
    
    //player1.sendDataDisplay();
    //player2.sendDataDisplay();


    
    
 };
//displays score on screen, resets turn counter to zero
function score () {
  const p1Score =  document.querySelector("#p1score");
  const p2Score =  document.querySelector("#p2score");
  p1Score.innerText = p1Counter;
  p2Score.innerText= p2Counter;
  turnCounter1 == 0;
  turnCounter2 ==0;

};
//modal functions

//toggle between the screenw tih gameboard and the modal showing the winner. 
function toggleModalName (name){
    const modalDisplay = document.querySelector("#pop-up");
    const modal = document.querySelector(".modal");
    modal.classList.toggle('show-modal');
    modalDisplay.innerText = (`Congrats! You have won, ${name}`);
   };
function toggleModal (){
    const modal = document.querySelector(".modal");
    modal.classList.toggle('show-modal');
    
   };

(function modal(){
    if(window.location.href.indexOf('index')!==-1){

        const close = document.querySelector("#close");
        close.addEventListener('click',toggleModal);
        //click anywhere on the screen to click out of winner. 
        window.addEventListener('click',closeOnClick);
    }
    function closeOnClick (event) {
        const modal = document.querySelector(".modal")
        if(event.target == modal){
           toggleModal();
        }
    };
})();
//click on window and close modal






