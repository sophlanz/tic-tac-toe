
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
            document.getElementById("btn").addEventListener('click', clearGameBoard);
        })
    } ;
  
    
})();
//score counters
let p1Counter = 0;
let p2Counter = 0;
//checks if pq has won
function p1winner (){
    const spaces = document.querySelectorAll("#space")
    const p1Numbers = [];
    function someoneWon() {
        p1Counter ++;
        const storedPlayers = JSON.parse(localStorage.getItem('players'));
         const p1Name = storedPlayers[0].name
         toggleModalName(p1Name);
        score();
        }
    //get P1's moves
    for(let i=0;i<9;i++) {
        //check if it has the p1 attribute and is player 1
        if(spaces[i].hasAttribute('player1') && spaces[i].getAttribute('player1') == "true") {
            //keep track of p1 chosen spaces by pushing it to the array
            
            p1Numbers.push(spaces[i].getAttribute('number'));
        } 
    }
//We have the moves, now check for a win
            //looop through p1Moves and check for 3 in a row
            for(let i=0;i<=p1Numbers.length-3;i++) {
                for(let j=1;j<=p1Numbers.length-2;j++) {
                    for(let k=2;k<=p1Numbers.length-1;k++) {
                        
                 //get the number of the 3rd one and subtract the 2nd one. Get the difference.
                      //check to see if the difference also applies to the 2nd-1st.
                      const difference1 = p1Numbers[k] - p1Numbers[j];
                      const difference2 = p1Numbers[j] - p1Numbers[i];
                         if (difference1 == 1 && difference2 == 1) {
                             //create set for comparison
                                if(p1Numbers.includes("0")&& p1Numbers.includes("1")&& p1Numbers.includes("2")) {
                                    return someoneWon();
                                }else if (p1Numbers.includes("3")&& p1Numbers.includes("4")&& p1Numbers.includes("5")) {
                                    return someoneWon();
                                }else if (p1Numbers.includes("6")&& p1Numbers.includes("7")&& p1Numbers.includes("8")) {
                                    return someoneWon();
                                }
                            }
                         else if (difference1 == 2 && difference2 == 2) {
                              if(p1Numbers.includes("2")&& p1Numbers.includes("4")&& p1Numbers.includes("6")){
                                 return  someoneWon();
                              }
                             
                         } else if (difference1 == 3 && difference2 == 3) {
                              
                             return someoneWon()
 
                         }else if (difference1==4 && difference2==4) {
                              //create set for comparison
                             return someoneWon();
                         } 
                      }
                     }}
                 };
//checks if p2 has won
function p2winner () {
    const spaces = document.querySelectorAll("#space")
    const p2Numbers = [];
 function someoneWon() {
    p2Counter ++;
    const storedPlayers = JSON.parse(localStorage.getItem('players'));
     const p2Name = storedPlayers[1].name
     toggleModalName(p2Name);
    score();
    }
     //get P2's moves
     for(let i=0;i<spaces.length;i++) {
        //check if it has the p1 attribute and is player 1
        if (spaces[i].hasAttribute('player1') && spaces[i].getAttribute('player1') !== "true"){
            //keep track of p2 chosen spaces by pushing it to the array
            p2Numbers.push(spaces[i].getAttribute('number'));
        }
    }
            //loop through p2Moves and check for 3 in a row
            for(let i=0; i<=p2Numbers.length-3;i++) {
                for(let j=1;j<=p2Numbers.length-2;j++) {
                    for(let k=2;k<=p2Numbers.length-1;k++) {
                         //get the number of the 3rd one and subtract the 2nd one. Get the difference.
                      //check to see if the difference also applies to the 2nd-1st.
                     const difference1 = p2Numbers[k] - p2Numbers[j];
                     const difference2 = p2Numbers[j] - p2Numbers[i];
                        
                     if (difference1 == 1 && difference2 == 1) {
                            //create set for comparison
                            if(p2Numbers.includes("0")&& p2Numbers.includes("1")&& p2Numbers.includes("2")) {
                                return someoneWon();
                            }else if (p2Numbers.includes("3")&& p2Numbers.includes("4")&& p2Numbers.includes("5")) {
                                return someoneWon();
                            }else if (p2Numbers.includes("6")&& p2Numbers.includes("7")&& p2Numbers.includes("8")) {
                                return someoneWon();
                            }
                            } else if (difference1 == 2 && difference2 == 2) {
                             //create set for comparison
                             if(p2Numbers.includes("2")&& p2Numbers.includes("4")&& p2Numbers.includes("6")){
                                return someoneWon();
                            }
                            
                        } else if (difference1 == 3 && difference2 == 3) {
                            //no need to compare
                                 return someoneWon();
                             

                        }else if (difference1==4 && difference2==4) {
                          //no need to compare   
                            return someoneWon();
                        } }
                     }
                    }
                };
let turn = 0;//player 1, turn=1 player2
let turnCounter1 = 0;
let turnCounter2 =0;
upDown();
//updown animation for player turn
function upDown  () {
    if(turn == 0 ){
    var style = document.createElement('style');
    //create moving up and down for the specific player
    var keyFrames = '\
    @keyframes MoveUpDown {\
        0%, 100% {\
          transform: translateY(0px);\
        }\
        50% {\
          transform: translateY(-10px);\
        }\
    }';
    style.innerHTML = keyFrames;
    
    document.getElementById('p1Card').appendChild(style);
    document.getElementById('p1Card').style.animation = 'MoveUpDown 1s linear infinite';
    if(turnCounter2 > 0){
        
        document.getElementById('p2Card').style.animation= "none ";
    }
    } else if(turn == 1 ) {
        var style = document.createElement('style');
        //create moving up and down for the specific player
        var keyFrames = '\
        @keyframes MoveUpDown {\
            0%, 100% {\
              transform: translateY(0px);\
            }\
            50% {\
              transform: translateY(-10px);\
            }\
        }';
        
        style.innerHTML = keyFrames;
        document.getElementById('p2Card').appendChild(style);
        document.getElementById('p2Card').style.animation = 'MoveUpDown 1s linear infinite';
        if(turnCounter1 > 0){
            
            document.getElementById('p1Card').style.animation = " none";
        }
    }}
//event listener on each space. Will invoke the winner function. 
function makeAMove (){
    //checking to see there's been at least 3 turns
    if(turn == 0){
            this.innerHTML = "<img src=\"images/X.svg\">"; 
            //remove listener so the move can't be changed.
            this.removeEventListener('click', makeAMove);
            //monitor whether the space has been selected and by which player
            this.setAttribute('player1', 'true');
            turnCounter1 ++
            
            if (turnCounter1 > 2){
                p1winner();
            } 
            
            
            turn++
            upDown();
    } else { 
        this.innerHTML = "<img src=\"images/O.svg\">";
    
        //remove listener so the move can't be changed.
        this.removeEventListener('click', makeAMove);
        //monitor whether the space has been selected and by who
            this.setAttribute('player1', 'false');
            turnCounter2 ++
            
            if (turnCounter2 > 2){
                p2winner();
            }
        turn--
        upDown();
    }
    if(turnCounter1 == 5 || turnCounter2 == 5 ) {
     toggleModalTie();
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
         marker: "X"
     };
     //create player 2 user object
     let player2 = {
         name:document.querySelector('#p2Name').value,
         marker: "O"
     };
     //add send data function to be used for display
     player1.sendData = function (){
        document.getElementById("p1Display")
        .innerText= player1.name;
        
     };
     player2.sendData = function () {
        document.getElementById("p2Display")
        .innerText = player2.name;

     };
    //push to player array;
     players.push(player1,player2);
     //save to local storage
     localStorage.setItem('players', JSON.stringify(players));
     //clear form for next entry
     //document.querySelector('form').reset();
     //send added notification
     console.warn("added", {players});
    //for display purposes
    window.location = "index.html";
    player1.sendData();
    player2.sendData();
    
    
    //player1.sendDataDisplay();
    //player2.sendDataDisplay();

 };
//displays score on screen, resets turn counter to zero
function score () {
  const p1Score =  document.querySelector("#p1score");
  const p2Score =  document.querySelector("#p2score");
  p1Score.innerText = `Wins: ${p1Counter}`;
  p2Score.innerText= `Wins: ${p2Counter}`;
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
function toggleModalTie (){
    const modalDisplay = document.querySelector("#pop-up");
    const modal = document.querySelector(".modal");
    modal.classList.toggle('show-modal');
    modalDisplay.innerText = ("It's a tie! Play again!");
    clearGameBoard();
   };

(function modal(){
    if(window.location.href.indexOf('index')!==-1){

        const close = document.querySelector("#close");
        close.addEventListener('click',toggleModal);
        //click anywhere on the screen to click out of winner. 
        window.addEventListener('click',closeOnClick);
    };
    function closeOnClick (event) {
        const modal = document.querySelector(".modal")
        if(event.target == modal){
           toggleModal();
        }
    };
})();




