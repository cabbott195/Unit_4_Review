"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Review Assignment

   Author: Colby Abbott
   Date:   3/9/20

   Global Variables
   ================
   
   allCells
      References the TD cells within the Hitori table grid.   
      
   Function List
   =============

   startUp()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   switchPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   findErrors()
      Highlights the errors in the Hitori puzzle in a red font.
      
   showSolution()
      Shows the solution to the Hitori puzzle
    
   checkSolution()
      Checks the current user's puzzle to verify whether it contains
      the complete and correct solution.

   drawHitori(numbers, blocks, rating)
      Returns a text string of the HTML code to
      display a Hitori puzzle table based on the contents of
      the numbers, blocks, and rating parameters.
	
*/










         
/* ================================================================= */
//Number 3 Global Variable
var allCells;
//Number 4 This runs the startUp function when the page is loaded
window.onload = startUp;
//Number 5 Sets up the initial event handlers after the page is loaded
function startUp() {
    document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
    document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
    var puzzleButtons = document.getElementsByClassName("puzzles");
    for (var i = 0; i < puzzleButtons.length; i++) {
        puzzleButtons[i].onclick = switchPuzzle;
    }
    setupPuzzle();
    //Checks for the solution by showing the numbers in red when the "Check Solution button is pressed"
    document.getElementById("check").addEventListener("click", findErrors);
    //Show the solution when the "Show Solution" button is pressed
    document.getElementById("solve").addEventListener("click", showSolution);
}
//Number 6 Switches between three puzzles when the button is clicked
function switchPuzzle(e) {
    if (confirm("Do you want to switch puzzles your work will be lost?")) {
        var puzzleID = e.target.id;
        document.getElementById("puzzleTitle").innerHTML = e.target.value;
        switch (puzzleID) {
            //switches to puzzle one when the "Puzzle 1" button is pressed
            case "puzzle1":
            document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
            break;
            //switches to puzzle two when the "Puzzle 2" button is pressed
            case "puzzle2":
            document.getElementById("puzzle").innerHTML = drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
            break;
            //switches to puzzle three when the "Puzzle 3" button is pressed
            case "puzzle3":
            document.getElementById("puzzle").innerHTML = drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
            break;
        }
        setupPuzzle();
   }
}
//Number 7 Sets up the features of the puzzle table
function setupPuzzle() {
    allCells = document.querySelectorAll("table#hitoriGrid td");
    for (var i = 0; i < allCells.length; i++ ) {
        allCells[i].style.backgroundColor = "white";
        allCells[i].style.color = "black";
        allCells[i].style.borderRadius = "0";
        allCells[i].addEventListener("mousedown",
            function(e) {
            //Erases/Changes blocks back to white when the shift key is pressed
            if(e.shiftKey) {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
                e.target.style.borderRadius = "0";
            }
            //Changes the blocks to black when the alt key is pressed
            else if (e.altKey) {
                e.target.style.backgroundColor = "black";
                e.target.style.color = "white";
                e.target.style.borderRadius = "0";
            }
            else {
                e.target.style.backgroundColor = "rgb(101,101,101)";
                e.target.style.color = "white";
                e.target.style.borderRadius = "50%";
            }
            e.preventDefault();
            });
        document.addEventListener("mouseover",
            function(e) {
               //Changes cursor to an eraser when the shift key is pressed
                if(e.shiftKey) {
                    e.target.style.cursor = "url(images/jpf_eraser.png), alias";
                }
                //Changes the cursor to a cell when the alt key is pressed
                else if (e.altKey) {
                    e.target.style.cursor = "url(images/jpf_block.png), cell";
                }
                //Keeps the cursor as a pointer when anything else happens
                else {
                    e.target.style.cursor = "url(images/jpf_circle.png), pointer";
                }
            });
        document.addEventListener("mouseup", checkSolution);
    }
}
//Number 8 This runs the function that highlights any incorrect cells in red
function findErrors() {
    for (var i = 0; i < allCells.length; i++) {
        if ((allCells[i].className === "blocks" &&
        allCells[i].style.backgroundColor === "rgb(101,101,100)")
        ||
            (allCells[i].className === "circles" &&
                allCells[i].style.backgroundColor === "black")) {
            allCells[i].style.color = "red";
        }
    }
    setTimeout(
        function() {
            for (var i = 0; i < allCells.length; i++) {
               if(allCells[i].style.color === "red"){
                  allCells[i].style.color = "white";
               }
            }
        }
    ,1000);
}

function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   var solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */

   for (var i = 0; i < allCells.length; i++) {
      var cellColor = allCells[i].style.backgroundColor;
      var cellClass = allCells[i].className;

      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not white */
      if ( (cellClass == "blocks" && cellColor !== "black") || 
           (cellClass == "circles" && cellColor !== "rgb(101, 101, 101)")) {
         solved = false;
         break;
      }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution () {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };   
}

function drawHitori(numbers, blocks, rating) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";
   

   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString +="</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}