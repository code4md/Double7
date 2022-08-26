
  document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    alert(event.target.src);
  })
  
  document.addEventListener("dragstart", function(event) {
  // The dataTransfer.setData() method sets the data type and the value of the dragged data
    

    event.dataTransfer.setData("text", event.target.id);
    if (event.target.className === "card p1") {
        event.target.style.border = "3px solid rgb(6, 39, 54)";
        let hiLite = event.target.style.border;

    } else
        event.target.style.border = "3px solid rgb(177, 151, 4)";
        let hiLite = event.target.style.border;
    
    });

// When entering a target area change border to dotted red
       document.addEventListener("dragenter", function(event) {
       // event.target.style.opacity = 1;
        if ( event.target.className == "droptarget" ) {
         event.target.style.border = "2px dotted red";
  }
});

document.addEventListener("dragenter", function(event) {
  // event.target.style.opacity = 1;
        if ( event.target.className == "droptargetC" ) {
        event.target.style.border = "2px dotted red";
  }
});

// To allow a drop, we must prevent the default handling of the element
        document.addEventListener("dragover", function(event) {
        event.preventDefault();
});

// When the draggable element leaves the droptarget, reset the border style
         document.addEventListener("dragleave", function(event) {
          if ( event.target.className == "droptarget" ) {
           event.target.style.border = "";
  }
});

          document.addEventListener("dragleave", function(event) {
          if ( event.target.className == "droptargetC" ) {
          event.target.style.border = "";
  } 
});

/* On drop append the dragged element into the drop target
*/
    document.addEventListener("drop", function(event) {
    event.preventDefault();
        if ( event.target.className == "droptarget" ) {
           event.target.style.border = "";
           //event.target.style.border = hiLite;
           const data = event.dataTransfer.getData("text");
           event.target.appendChild(document.getElementById(data));
  }
});

    document.addEventListener("drop", function(event) {
    event.preventDefault();
      if ( event.target.className == "droptargetC" ) {
         event.target.style.border = "";
         //event.target.style.border = hiLite;
         const data = event.dataTransfer.getData("text");
         event.target.appendChild(document.getElementById(data));
}
});



//jQuery code to rotate image 90deg with each click event

function rotateCard(x) {
  let angle = ($('#card'+x).data('angle') + 90) || 90;
  $('#card'+x).css({'transform': 'rotate(' + angle + 'deg)'});
  $('#card'+x).data('angle', angle);
}

 