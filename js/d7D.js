
//Call and Create function to hold array of  (Hoisting)

boneYard = buildDeck() 

function buildDeck() {
    const values = [
        { sideA: 0, sideB: 0, img:'images/v00.png'},
        { sideA: 0, sideB: 1, img:'images/v01.png'},
        { sideA: 0, sideB: 2, img:'images/v02.png'},
        { sideA: 0, sideB: 3, img:'images/v03.png'},
        { sideA: 0, sideB: 4, img:'images/v04.png'},
        { sideA: 0, sideB: 5, img:'images/v05.png'},
        { sideA: 0, sideB: 6, img:'images/v06.png'},
        { sideA: 0, sideB: 7, img:'images/v07.png'},
        { sideA: 1, sideB: 1, img:'images/v11.png'},
        { sideA: 1, sideB: 2, img:'images/v12.png'},
        { sideA: 1, sideB: 3, img:'images/v13.png'},
        { sideA: 1, sideB: 4, img:'images/v14.png'},
        { sideA: 1, sideB: 5, img:'images/v15.png'},
        { sideA: 1, sideB: 6, img:'images/v16.png'},
        { sideA: 1, sideB: 7, img:'images/v17.png'},
        { sideA: 2, sideB: 2, img:'images/v22.png'},
        { sideA: 2, sideB: 3, img:'images/v23.png'},
        { sideA: 2, sideB: 4, img:'images/v24.png'},
        { sideA: 2, sideB: 5, img:'images/v25.png'},
        { sideA: 2, sideB: 6, img:'images/v26.png'},
        { sideA: 2, sideB: 7, img:'images/v27.png' },
        { sideA: 3, sideB: 3, img:'images/v33.png' },
        { sideA: 3, sideB: 4, img:'images/v34.png' },
        { sideA: 3, sideB: 5, img:'images/v35.png' },
        { sideA: 3, sideB: 6, img:'images/v36.png' },
        { sideA: 3, sideB: 7, img:'images/v37.png' },
        { sideA: 4, sideB: 4, img:'images/v44.png' },
        { sideA: 4, sideB: 5, img:'images/v45.png' },
        { sideA: 4, sideB: 6, img:'images/v46.png' },
        { sideA: 4, sideB: 7, img:'images/v47.png' },
        { sideA: 5, sideB: 5, img:'images/v55.png' },
        { sideA: 5, sideB: 6, img:'images/v56.png' },
        { sideA: 5, sideB: 7, img:'images/v57.png' },
        { sideA: 6, sideB: 6, img:'images/v66.png' },
        { sideA: 6, sideB: 7, img:'images/v67.png' },
        { sideA: 7, sideB: 7, img:'images/v77.png' }
      ];
     
      const boneYard = [];
    
    //Loop through deck and add to the BoneYard array
       for (let i = 0; i < values.length; i++) {
        const value = values[i];
        boneYard.push({value});
      }
     return boneYard;
}

    function loadHands(boneYard) {

        // Add event listner for Start button to hide when clicked
        const startBut = document.getElementById("startBtn");
        startBut.style.display = 'none';

      //Enter number of players and Names
      /*
      let number = prompt("Enter number of players from 2 to 4")

        if(number < 2 || number > 4) {
            alert("Please enter a number from 2 to 4")
         }
          let p1Name = prompt("Enter name for PLayer 1");
          let p2Name = prompt("Enter name for PLayer 2");
          document.getElementById("player1").innerHTML = p1Name;
          document.getElementById("player2").innerHTML = p2Name;
        */

       //Initialize Player1 and Player2 Hand arrays
        const player1Hand = [];
        const player2Hand = [];
        const p1Doubles = [];
        const p2Doubles = [];

       //Random sort boneYard cards
       boneYard.sort(function(a,b){return 0.5 - Math.random()});
      
       //Loop and deal 9 card Player1 hand
       for (i =1; i < 10; i++) {
        const cardId = 'p1card' + i;
        document.getElementById(cardId).src = boneYard[i].value.img;

        let a = boneYard[i].value.sideA;
        let b = boneYard[i].value.sideB;
       
         if (a === b) {  //Find Player1 doubles and push to an array
           let dbl = a;         
           p1Doubles.push(dbl);
          }
            player1Hand.push(boneYard.shift()) //puts cards in player1's hand?
            document.getElementById("p1Dbl").innerHTML = "Player1 doubles : " + p1Doubles;
        }

        //Loop and deal 9 card Player2 hand
        for (i =1; i < 10; i++) {
          const cardId = 'p2card' + i;
          document.getElementById(cardId).src = boneYard[i].value.img;
          let a = boneYard[i].value.sideA;
          let b = boneYard[i].value.sideB;
       
             if (a === b) {   //Find Player2 doubles and push to an array
                let dbl= a;
                p2Doubles.push(dbl);
             }
                player2Hand.push(boneYard.shift())
                document.getElementById("p2Dbl").innerHTML = "Player2 doubles : " + p2Doubles;
         }

        //Find the highest double and display the double and which player has it
        const max1 = Math.max(...p1Doubles);
        const max2 = Math.max(...p2Doubles);
        if (max1 > max2) {
          let str = max1.toString();
          let double = max1 + str
          document.getElementById("highCard").innerHTML = "Player 1 plays first with: " + double;
        }
        else {
          let str = max2.toString();
          let double = max2 + str
          document.getElementById("highCard").innerHTML = "Player 2 plays first with: " + double;
        }

}
    

