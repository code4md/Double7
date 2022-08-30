    //Code for  game play
    //Create global variables
    let firstCard = 1;
    let active = "";
    
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
      // On drop append the dragged element into the drop target
 
      document.addEventListener("drop", function(event) {
            
        if (firstCard == 1 && event.target.className == "droptargetC") {
            event.preventDefault();

            if (active == "Player 1") {

            //PLayer 1 turn ends - hide icon  
            event.target.style.border = "solid 3px rgb(6, 39, 54)";
            icon1.style.visibility = "hidden";
            icon2.style.visibility = "visible";


            } else {

            //PLayer 2 turn ends - hide icon and show for Player1
           //document.getElementById("play2").visibility = "hidden";
        
            event.target.style.border = "solid 3px rgb(177, 151, 4)"; 
            icon2.style.visibility = "hidden";
            icon1.style.visibility = "visible";
            }
           
            const data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
            firstCard ++;

          //Code to check what card is being played
           // alert(document.getElementById(data).src);
            //alert(whoseTurn);

        } else {

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
           
           // alert(document.getElementById(data).src);
            }

          //Store the img src in a varaible for the card being dropped
          //Store the img class to get the player

             let cardSrc = document.getElementById(data).src;
      
        }
    });
    
  
//jQuery code to rotate image 90deg with each click event

function rotateCard(x) {
    let angle = ($('#card'+x).data('angle') + 90) || 90;
    $('#card'+x).css({'transform': 'rotate(' + angle + 'deg)'});
    $('#card'+x).data('angle', angle);
  }
  
   