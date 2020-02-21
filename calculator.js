//Our container that will encapsulate our calculator
const container = document.querySelector("#container");
container.style.width="50%";
container.style.height="50%";

//Create the display
const display = document.createElement("div");
display.style.border = "1px solid black";
display.textContent=0;
display.style.width="100%";
display.style.textAlign = "right";
container.appendChild(display);

//Create operator buttons
var operators = ["+","-","*","/"];
var operatorBTNS = [];
var numBTNS = [];
operators.forEach(op=>{
    var button = document.createElement("button");
    button.textContent = op;
    button.style.width="25%";
    operatorBTNS.push(button);
    container.appendChild(button);
})
//Create number buttons
for(var i=1; i<=9;i++){
    var num = document.createElement("button");
    num.textContent = i;
    num.style.width = "33.33%";
    numBTNS.push(num);
    container.appendChild(num);
}
//Create clear,zero, and equal buttons
var clear = document.createElement("button");
var zero = document.createElement("button");
var equal = document.createElement("button");
clear.textContent = "C";
zero.textContent = "0";
equal.textContent = "=";
clear.style.width="66.67%";
zero.style.width="33.33%";
equal.style.width = "100%";
clear.addEventListener("click",e=>{
	display.textContent = "0";
	a = null;
	opCaptured = null;
})
zero.addEventListener("click",e=>{
	displayLogic(e.target.innerHTML)
})
equal.addEventListener("click",e=>{
	a = operate(opCaptured,a,currDisplay())
	displayLogic(a);
	opCaptured = null;
})
container.appendChild(zero);
container.appendChild(clear);
container.appendChild(equal);

//Main Logic
var opCaptured = null;
var a = null;

numBTNS.forEach(btn=>{
    btn.addEventListener("click",e=>{
		displayLogic(e.target.innerHTML);
    })
});
operatorBTNS.forEach(op=>{
    op.addEventListener("click",e=>{
        if (a === null || opCaptured === null){
           a = currDisplay();
           opCaptured = e.target.innerHTML;
        } else {
            a = operate(opCaptured,a,currDisplay());
            opCaptured = e.target.innerHTML; 
            displayLogic(a);
        }
	 })
});
function displayLogic(numToDisplay){ 
	var numToDisplay = parseInt(numToDisplay)
    display.textContent === "0" || opCaptured !== null ? display.textContent= numToDisplay:display.textContent += numToDisplay;
};
function currDisplay (){
    return parseInt(display.textContent);
};
function add(a,b){
    return a + b;
};
function subtract(a,b){
    return a-b;
};
function multiply(a,b){
    return a*b;
};
function divide(a,b){
    return a/b;
};
function operate(operator,a,b){
    switch(operator){
        case "+":
            return add(a,b)
            break;
        case "-":
            return subtract(a,b)
            break;
        case "/":
            return divide(a,b);
            break;
        case "*":
            return multiply(a,b)
            break;
        default: return "Invalid parameters."       
    }
}