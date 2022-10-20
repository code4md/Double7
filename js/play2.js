    //Code for  game play
    //Create global variables
    let firstCard = 1;
    let active = "";
    let imgA = "0";
    let imgB = "0";
    let sideA = 0;
    let sideB = 0;
    let aaMatch = true;
    let abMatch = true;
    let baMatch = true;
    let bbMatch = true;
    let matchA = false;
    let matchB = false;
    let cardValue = 0;
    let double = false;
    let by1 = 1;
    let by2 = 10;
    let set1EdgeA;
    let set1EdgeB;
    let set2EdgeA;
    let set2EdgeB;
    
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

        //Next card being selected
        if (firstCard > 1) {
            let imgSrc = document.getElementById(plyr).src;
            let v = imgSrc.indexOf("v");
            imgA = imgSrc[30];
            imgB = imgSrc[31];

            //Convert to numbers
            sideA = parseInt(imgA);
            sideB = parseInt(imgB);
            boardPts= edgeA + edgeB;

            //Edge Card on board is a double
            if (edgeA === edgeB) {   
                double = true;   
            }

            //Check if selected card can be played (matches an edge)
    
            if (sideA === edgeA) {
                edge(sideB, edgeB);
            }   else if (sideA === edgeB) {
                edge(sideB, edgeA);
            }   else if (sideB === edgeA) {
                edge(sideA, edgeB);
            }   else if (sideB === edgeB) {
                edge(sideA, edgeA);
            }   else {
                alert("Card is not playable"); 
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
  
    //Code for Game Play -------------------------------------------------------------------------------
      
      document.addEventListener("drop", function(event) {
        // First Card play
        if (firstCard == 1 && event.target.className == "droptargetC") {
            event.preventDefault();

            if (active == "Player 1") {   
            boardPts = edgeA + edgeB;
            p1Pts = boardPts;
            sideA = edgeA;
            sideB = edgeB;
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
                p2Pts = boardPts;
                sideA = edgeA;
                sideB = edgeB;

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
    
        //  Next Card being played  (firstCard > 1)  
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

            //Card match - check calculate scoring

           // if (bb) {
           //     edgeA = sideA;
           //     if (double) {
           //         boardPts = edgeA + edgeB * 2;
           //         displayPts(boardPts);
           //     } else {
           //         double = false;
           //         boardPts = edgeA + edgeB;
          //          displayPts(boardPts);
          //      }
          //  }
       

           /* if (double && aa) {
                cardValue = sideB + edgeA + edgeB;  //calculate possible plaayer points

                boardPts = cardValue;      //Update board points
                displayPts(boardPts);      //Display updtaed board points
                //divByFive(cardValue);
            }
            else if (double && ab) {
                cardValue = sideB + edgeA + edgeB;  //calculate possible plaayer points
                boardPts = cardValue;      //Update board points
                displayPts(boardPts);      //Display updtaed board points
                //divByFive(cardValue);
            }
            else if (double && ba) {
                cardValue = sideA + edgeA + edgeB;  //calculate possible plaayer points
                boardPts = cardValue;      //Update board points
                displayPts(boardPts);      //Display updtaed board points
                //divByFive(cardValue);
            }
            else if (double && bb) {
                cardValue = sideA + edgeA + edgeB;  //calculate possible plaayer points
                boardPts = cardValue;      //Update board points
                displayPts(boardPts);      //Display updtaed board points
                //divByFive(cardValue);
            }
            else if (!double && aa) {     //Not a double for the edge card
                cardValue = sideB + edgeB  //calculate possible plaayer points
                boardPts = cardValue;      //Update board points
                displayPts(boardPts);      //Display updtaed board points
                //divByFive(cardValue);
            }
            else if (!double && ab) {     //Not a double for the edge card
                cardValue = sideB + edgeA  //calculate possible plaayer points
                boardPts = cardValue;      //Update board points
                displayPts(boardPts);      //Display updtaed board points
                //divByFive(cardValue);
            }
            else if (!double &&  ba) {     //Not a double for the edge card
                cardValue = sideA + edgeB  //calculate possible plaayer points
                boardPts = cardValue;      //Update board points
                displayPts(boardPts);      //Display updtaed board points
                //divByFive(cardValue);
            }
            else if (!double && bb) {     //Not a double for the edge card
                cardValue = sideA + edgeA  //calculate possible plaayer points
                boardPts = cardValue;      //Update board points
                displayPts(boardPts);      //Display updtaed board points
                //divByFive(cardValue);
            }
*/




           // if (p2Pts % 5 == 0) {
                //Write points to PLayer 2
                    // document.getElementById("p2Points").innerHTML = edgeA + edgeB;
               // }

             //Store the card value from the img src (vxx) in a varaible for the card being dropped
             //let cardSrc = document.getElementById(data).src;
             //cardSrc = cardSrc.slice(30, 32);
             //let cardValue = parseInt(cardSrc, 10);  //Convert to a number

             //alert(cardValue);
             //alert(document.getElementById(data).src);
            
        }
          
    
        }
        

        function edge(a, b) {
            alert(a, b);
        }


        //Write to Current play and Board Pts displays
        function displayPts(onTheBoard) {
            document.getElementById("playResult").innerHTML = "Points: " + onTheBoard;
            document.getElementById("edge1").innerHTML = "Edge1: SideA: " + sideA + " " + "SideB: " + sideB;
            document.getElementById("edge2").innerHTML = "Edge2: SideA: " + sideA + " " + "SideB: " + sideB;
            
            return;
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


    
    
  
   