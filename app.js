/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const displaySize = 16;
const symbols = ['+', '-', '*', '/', 'C', '='];

/*-------------------------------- Variables --------------------------------*/
let runningTotal = '';
let eqlNumber = '';  
let isEqual = false; //Allows for multiple addion division or subtraction of the last modifier and number inputted

/*------------------------ Cached Element References ------------------------*/
let cachedSymbol = '';

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerText; 

        //Check for C and reset if so
        if (value === 'C'){ // Resets everything
            runningTotal = '';
            cachedSymbol = '';
            display.innerText = '';
            isEqual = false;
            return;
        }

        //Check if cachedSymbol is complete to reset the display after = has been pressed. allows for continued manipulation of the answer
        if (isEqual) {
            display.innerText = '';
        }

        //Check whether input is symbol or number and limits input to display size 
        if (display.innerText.length < displaySize && !isNaN(value)){
            display.innerText += value;
            if (isEqual){
                isEqual = false;  //Stops the is equal functionality
                cachedSymbol = '';//Allows you start from the begining without pressin C to start a new calculation
            }
          } 
          else if (symbols.includes(value)){
            if (isEqual && value !== '='){ 
                isEqual = false;  //Stops the is equal functionality
                cachedSymbol = value;
            } else {
                symbolPressed(value);
            }
          }
    });
  });
  
/*-------------------------------- Functions --------------------------------*/

const compute = (num1, num2, modifier) => {

    num1 = Number(num1);
    num2 = Number(num2);

    if (modifier === '+') num1 = num1 + num2;
    if (modifier === '-') num1 = num1 - num2;
    if (modifier === '*') num1 = num1 * num2;
    if (modifier === '/') num1 = num1 / num2;
    return num1;
}

const symbolPressed = (symbol) => {

    let newNumber = display.innerText;
    if (isEqual) newNumber = eqlNumber; //maintains the number if looking for the equal functionality

    display.innerText = ''; //Allows next number to be added following the use of a modifier

    if (cachedSymbol === '') runningTotal = newNumber; // Handles first number before a modifier is provided
    
    runningTotal = compute(runningTotal, newNumber, cachedSymbol);
    console.log (`Running total: ${runningTotal} newNumber ${newNumber} cachedSymbol ${cachedSymbol}`);
    if (symbol !== '=') cachedSymbol = symbol;

    if (symbol === '=') {
        display.innerText = String(runningTotal).substring(0, 16);
        isEqual = true;
        eqlNumber = newNumber;
    }

}

// I added functionality in which the total is maintained and you can use the equal symbol to perfomr the last method with the last number 
// multiple times by repeatedly pressing =

//Additionaly you can perform multiple  methods on a sequence of numbers returning the final value at the end.

//Following the = you can still manipulate the result until the C is used to clear the view. 

// I would like to add the functionality to be able to see the total updated in a sequence of multiple additions subtractions etc. 
