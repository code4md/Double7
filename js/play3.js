    //Code for  game play
    //Create global variables
    let active = "";
    let imgA = "0";
    let imgB = "0";
    let edgeAB = 0;      //Represents a double - both edges are equal
    let edges;
    let cardValue ="";
    let by1 = 1;
    let by2 = 10;

    
    const icon1 = document.getElementById("play1");
    const icon2 = document.getElementById("play2");


    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    
    document.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text", event.target.id);
        event.target.style.border = "4px solid gold";

        //Determine which player's card is being dragged
        let plyr = event.target.id;
        let checkNum  = plyr[4] + plyr[5];
        
        if (typeof plyr[5] === "undefined") {
            active = "Player 1";
        } else {
            active = "Player 2";
        };


        //Code checks (after first card) whether selected card matches an edge and can be played
        if (firstCard > 1) {
            let imgSrc = document.getElementById(plyr).src;
            let v = imgSrc.indexOf("v");
            imgA = imgSrc[30];
            imgB = imgSrc[31];

            //Convert to numbers
            cardA = parseInt(imgA);
            cardB = parseInt(imgB);
            
            if (cardA === edgeA) {
                edges = "cBeB"
                edgeA = cardB;
                edgeB = edgeB;

               } else if(cardA === edgeB) {
                 edges = "cBeA";
                 edgeA = edgeA;
                 edgeB = cardB;

                } else if(cardB === edgeA) {
                 edges = "cAeB"
                 edgeA = cardA;
                 edgeB = edgeB;

                } else if (cardB === edgeB) {
                  edges = "cAeA";
                  edgeA = edgeA;
                  edgeB = cardA;

                 } else {
                    alert("Card not playable..Select another card!");
            }
        }
    });
          
    // While dragging change the border color
    document.addEventListener("drag", function(event) {
        event.target.style.border = "4px dashed white";
        // Get element by ID that contains`card`
        const cardID = document.querySelector(`[id*="card"]`).id;  
        event.target.id.draggable = false; 
     });

    // At dragend change the border color
    document.addEventListener("dragend", function(event) {
        event.target.style.border = "";
    });

    //On entering the drop area, check for both target areas
    document.addEventListener("dragenter", function(event) {
        if (event.target.className == "droptargetC" ) {
            event.target.style.border = "4px dotted red";
        } 
        else if (event.target.className == "droptarget") {
            event.target.style.border = " 4px dotted white";
        }
    });

    // To allow a drop, we must prevent the default handling of the element
    document.addEventListener("dragover", function(event) {
            event.preventDefault(); 
    });

    // When the draggable element leaves the droptarget, reset the border style
    document.addEventListener("dragleave", function(event) {
        if (event.target.className == "droptargetC" ) {
            event.target.style.border = "";
        } 
        else if (event.target.className == "droptarget") {
            event.target.style.border = "";
        }
    });
// ----------------------------Card Drop code --------------------------------------------------------------
        document.addEventListener("drop", function(event) {
        
            // First Card play -- Currently first card will be a double (app.js)

            if (firstCard == 1 && event.target.className == "droptargetC") {
                event.preventDefault();
    
                if (active == "Player 1") {   
                    boardPts = edgeA + edgeB;
                    edgeAB = boardPts;
                    cardA = edgeA;
                    cardB = edgeB;
                    p1Pts = boardPts;

                //PLayer 1 turn ends - hide icon  
                event.target.style.border = "solid 3px rgb(6, 39, 54)";
                icon1.style.visibility = "hidden";
                icon2.style.visibility = "visible";
    
                //Write pts to Player 1 if divisible by 5
                if (p1Pts % 5 === 0) {
                    //Write points to PLayer 1
                    document.getElementById("p1Points").innerHTML = edgeA + edgeB;
                }
               
                //Write to the Board Display - id=playResult
                displayPts(boardPts);
    
                } else {
                   
                    boardPts = edgeA + edgeB;
                    edgeAB = boardPts;
                    cardA = edgeA;
                    cardB = edgeB;
                    p2Pts = boardPts;
    
                //PLayer 2 turn ends - hide icon  
                event.target.style.border = "solid 3px rgb(177, 151, 4)"; 
                icon2.style.visibility = "hidden";
                icon1.style.visibility = "visible";
                
                //Write pts to Player 2 if divisible by 5
                if (p2Pts % 5 == 0) {
                //Write points to PLayer 2
                     document.getElementById("p2Points").innerHTML = edgeA + edgeB;
                }
                //Write to the Board Display - id=playResult
                    displayPts(boardPts);
                }
         
                const data = event.dataTransfer.getData("text");
                event.target.appendChild(document.getElementById(data));
                firstCard ++;
        
            } else {  
        
//  All play code after the first card is dropped --------------------------------------------------------------------
                if (firstCard > 1 && event.target.className == "droptarget") {
                event.preventDefault();
    
                if (active === "Player 1") {
                    event.target.style.border = "solid 3px rgb(6, 39, 54)"; 
                    icon1.style.visibility = "hidden";
                    icon2.style.visibility = "visible";
                } else {
                    event.target.style.border = "solid 3px rgb(177, 151, 4)"; 
                    icon2.style.visibility = "hidden";
                    icon1.style.visibility = "visible";
                }
                //Drop the card
                const data = event.dataTransfer.getData("text");
                event.target.appendChild(document.getElementById(data));
                displayPts(boardPts);     
            }
        }
             //Write to Current play and Board Pts displays
             function displayPts(onTheBoard) {
                if (edges === "cAeA" && double === true) {
                    onTheBoard = boardPts + edgeA;
                   
                } else {
                    onTheBoard = edgeA + edgeB;
                    double = false;
                }

                if (edges === "cAeB" && double === true) {
                    onTheBoard = boardPts + edgeB;
                } else {
                    onTheBoard = edgeA + edgeB;
                    double = false;
                }

                if (edges === "cBeA" && double === true) {
                    onTheBoard = boardPts + edgeA;
                } else {
                    onTheBoard = edgeA + edgeB;
                    double = false;
                }

                if (edges === "cBeB" && double === true) {
                    onTheBoard = boardPts + edgeB;
                } else {
                    onTheBoard = edgeA + edgeB;
                    double = false;
                }
                alert(edges)

                    document.getElementById("playResult").innerHTML = "Points: " + onTheBoard;
                    document.getElementById("edge1").innerHTML = "EdgeA  " + edgeA + " " + "EdgeB " + edgeB;
                    document.getElementById("sides").innerHTML = "CardA  " + cardA + " " + "CardB " + cardB;
              
                
             
            }
    
                
    });

//jQuery code to rotate image 90deg with each click event

function rotateCard(x) {
    let angle = ($('#card'+x).data('angle') + 90) || 90;
    $('#card'+x).css({'transform': 'rotate(' + angle + 'deg)'});
    $('#card'+x).data('angle', angle);
  }
  
  //Show/Hide function for boneyard displays

function showHideBY(pBY, state) {
    if (pBY === player1BY && state === showBtn1) {
        document.getElementById("player1BY").style.visibility = "visible";
        document.getElementById("showBtn1").style.visibility = "hidden";
        document.getElementById("hideBtn1").style.visibility = "visible";
    }     
    else if (pBY === player1BY && state === hideBtn1) {
        document.getElementById("player1BY").style.visibility = "hidden";
        document.getElementById("showBtn1").style.visibility = "visible";
        document.getElementById("hideBtn1").style.visibility = "hidden";
    }
    else if (pBY === player2BY && state === showBtn2) {
        document.getElementById("player2BY").style.visibility = "visible";
        document.getElementById("showBtn2").style.visibility = "hidden";
        document.getElementById("hideBtn2").style.visibility = "visible";
    }     
    else if (pBY === player2BY && state === hideBtn2) {
        document.getElementById("player2BY").style.visibility = "hidden";
        document.getElementById("showBtn2").style.visibility = "visible";
        document.getElementById("hideBtn2").style.visibility = "hidden";
    }
}

function drawBone(player) {
   if (player === player1BY) {
        boneId = "bone" + by1;
        document.getElementById(boneId).src = boneYard.shift().value.img;
        by1 ++;
   }
   else if (player === player2BY) {
        boneId = "bone" + by2;
        document.getElementById(boneId).src = boneYard.shift().value.img;
        by2 ++;
   }
}


    
    