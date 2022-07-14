const draggableCard = document.querySelector("#dragIt");

draggableCard.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", draggableCard.id);
});

for (const dropZone of document.querySelectorAll(".drop-zone")) {
    //When draggable element is over a drop zone
    dropZone.addEventListener("dragover", e => {
        e.preventDefault();  //Required to allow element to be dropped into the drop zone
        dropZone.classList.add("drop-zone--over");
    });

    //When draggable element is dropped onto a drop zone
    dropZone.addEventListener("drop", e => {
        e.preventDefault();

        const droppedElementId = e.dataTransfer.getData("text/plain");
        const droppedElement = document.getElementById(droppedElementId);
        dropZone.appendChild(droppedElement);

    });
}
