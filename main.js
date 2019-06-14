const calculator = {
displayValue: '0',
firstOperand: null,
waitingForSecondOperand: false,
operator: null,

};

function updateDisplay() {
	const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
  
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', (event) => {
	const {target} = event; //deconstructing
  if(!target.matches('button')){ //Checks so see if it is a button (note lack of . in front)
  	return;
  }
  
  if(target.classList.contains('operator') || target.classList.contains('equal-sign')){
  	console.log('operator', target.value);
  	handleOperator(target.value);
    updateDisplay();
    return;
  }
  
 	if(target.classList.contains('decimal')){
    inputDecimal(target.value); //would be a dot anyways lol
    updateDisplay();
    return;
  }
  
  if(target.classList.contains('all-clear')){
  resetCalculator();
  updateDisplay();
  return;
  }
  
  if(target.classList.contains('del')){
  	deleteLastChar();
    updateDisplay();
    return;
  }
  
  console.log('digit', target.value);
  inputDigit(target.value);
  updateDisplay();
});

function inputDigit(digit) {

  const { displayValue, waitingForSecondOperand }= calculator;
  
  if(waitingForSecondOperand === true){
  	calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }
  else{
  calculator.displayValue = (displayValue === '0') ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
if (calculator.waitingForSecondOperand === true) return;
	if(!calculator.displayValue.includes(dot)) //if it already has it
  	calculator.displayValue += dot;
}


function handleOperator(nextOperator){

  const {firstOperand, displayValue, operator} = calculator;
  const inputVal = parseFloat(displayValue);
	
  console.log("In function");

	if(operator && calculator.waitingForSecondOperand){
  	calculator.operator= nextOperator;
    return;
  }
	
  if(firstOperand == null){
  	  if(nextOperator === "sqrt"){
      	console.log("It's true");
  			calculator.displayValue = String(performCalculation[nextOperator](inputVal));
    return;
  }
    calculator.firstOperand = inputVal;
  } else if(operator){
    const result = performCalculation[operator](firstOperand, inputVal);

    calculator.displayValue = String(result);
    calculator.fisrtOperand = result;
  }


  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}


const performCalculation = {

	'sqrt' : (firstOperand) => Math.sqrt(firstOperand),
  
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator (){

	calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  }
  
 function deleteLastChar(){
 	const {displayValue} = calculator;
  
  calculator.displayValue = (displayValue === '0' || displayValue.length === 1) ? '0' : displayValue.substring(0, displayValue.length - 1);
 }
 
