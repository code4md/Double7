    //Code for  game play
    
    let firstCard = 1;
   
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    
    document.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text", event.target.id);
        event.target.style.border = "4px solid gold";
    });

    // While dragging change the border color
    document.addEventListener("drag", function(event) {
        event.target.style.border = "4px dashed gold";
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
  
      // On drop append the dragged element into the drop target
 
      document.addEventListener("drop", function(event) {
            
        if (firstCard == 1 && event.target.className == "droptargetC") {
            event.preventDefault();
            event.target.style.border = "";
            const data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
            firstCard ++;
            
        } else {

        if (firstCard > 1 && event.target.className == "droptarget") {
            event.preventDefault();
            event.target.style.border = "";
            const data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data));
            }
        }
    });
    
  
//jQuery code to rotate image 90deg with each click event

function rotateCard(x) {
    let angle = ($('#card'+x).data('angle') + 90) || 90;
    $('#card'+x).css({'transform': 'rotate(' + angle + 'deg)'});
    $('#card'+x).data('angle', angle);
  }
  
   