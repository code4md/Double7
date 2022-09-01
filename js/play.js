    //Code for  game play
    //Create global variables
    let firstCard = 1;
    let active = "";
    let sideA = 0;
    let sideB = 0;
    
    const icon1 = document.getElementById("play1");
    const icon2 = document.getElementById("play2");

   
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    
    document.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text", event.target.id);
        event.target.style.border = "4px solid gold";

        //Code to determine which player's card is being dragged
        let plyr = event.target.id;
        let checkNum  = plyr[4] + plyr[5];
        
        if (typeof plyr[5] == "undefined") {
            active = "Player 1";
            
        } else {
            active = "Player 2";
        };

        //Code to check card match
       if (firstCard > 1) {  
        let imgSrc = document.getElementById(plyr).src;
        let v = imgSrc.indexOf("v");
        sideA = imgSrc[30];
        sideB = imgSrc[31];
        let cardValue = sideA + sideB;
     
       }
    });

    // While dragging change the border color
    document.addEventListener("drag", function(event) {
        event.target.style.border = "4px dashed white";
        // Get element by ID that contains`card`
        const cardID = document.querySelector(`[id*="card"]`).id;   
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
      // First Card play
 
      document.addEventListener("drop", function(event) {
            
        if (firstCard == 1 && event.target.className == "droptargetC") {
            event.preventDefault();

            if (active == "Player 1") {
               
            p1Pts = edgeA + edgeB;
            //PLayer 1 turn ends - hide icon  
            event.target.style.border = "solid 3px rgb(6, 39, 54)";
            icon1.style.visibility = "hidden";
            icon2.style.visibility = "visible";

            //Check if Pts value is Divisible by 5
            if (p1Pts % 5 == 0) {
                //Write points to PLayer 1
                document.getElementById("p1Points").innerHTML = edgeA + edgeB;
            }
           
            //Write to the Board Display - id=playResult
            document.getElementById("playResult").innerHTML = "EdgeA: " + edgeA + " " + "EdgeB: " + edgeB;

            } else {
               
            p2Pts = edgeA + edgeB;

            //PLayer 2 turn ends - hide icon and show for Player1
           //document.getElementById("play2").visibility = "hidden";
        
            event.target.style.border = "solid 3px rgb(177, 151, 4)"; 
            icon2.style.visibility = "hidden";
            icon1.style.visibility = "visible";
            
            //Check if Pts value is Divisible by 5
             if (p2Pts % 5 == 0) {
                 //Write points to PLayer 2
                 document.getElementById("p2Points").innerHTML = edgeA + edgeB;
             }
           
                //Write to the Board Display - id=playResult
                document.getElementById("playResult").innerHTML = "Edge A: " + edgeA + " " + "Edge B: " + edgeB;
            }
     
            const data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
            firstCard ++;
// End First Card Play ----------------------------------------------------------------------------------------  
          //Code to check what card is being played
           // alert(document.getElementById(data).src);
            //alert(whoseTurn);

        } else {

// Next Card being played -------------------------------------------------------------------------------------------------------
        if (firstCard > 1 && event.target.className == "droptarget") {
            event.preventDefault();

            if (active == "Player 1") {
                event.target.style.border = "solid 3px rgb(6, 39, 54)"; 
                icon1.style.visibility = "hidden";
                icon2.style.visibility = "visible";
            } else {
                event.target.style.border = "solid 3px rgb(177, 151, 4)"; 
                icon2.style.visibility = "hidden";
                icon1.style.visibility = "visible";
            }

            const data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));

             //Store the card value from the img src (vxx) in a varaible for the card being dropped
             let cardSrc = document.getElementById(data).src;
             cardSrc = cardSrc.slice(30, 32);
             let cardValue = parseInt(cardSrc, 10);  //Convert to a number

             //alert(cardValue);
           
           //alert(document.getElementById(data).src);
            }
        }
    });
    
  
//jQuery code to rotate image 90deg with each click event

function rotateCard(x) {
    let angle = ($('#card'+x).data('angle') + 90) || 90;
    $('#card'+x).css({'transform': 'rotate(' + angle + 'deg)'});
    $('#card'+x).data('angle', angle);
  }
  
   