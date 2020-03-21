//Our container that will encapsulate our calculator
const container = document.querySelector("#container");
container.style.width="50%";
container.style.height="50%";
container.style.border="10px solid black";
container.style.position = "relative";

//Make calculator draggable
container.addEventListener("mousedown",eContainer=>{
    document.addEventListener("mousemove",eDoc=>{
        container.style.left = (eContainer.clientX - eDoc.clientX) + "px";
    })
    document.onmouseup = e=>{
        
    }
})

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
//Create clear,zero, backspace, and equal buttons
var clear = document.createElement("button");
var zero = document.createElement("button");
var equal = document.createElement("button");
var decimal = document.createElement("button");
var backspace = document.createElement("button");
clear.textContent = "C";
zero.textContent = "0";
equal.textContent = "=";
decimal.textContent = "."
backspace.textContent = "🔙"; 
clear.style.width="66.67%";
zero.style.width="33.33%";
equal.style.width = "100%";
decimal.style.width = "100%";
backspace.style.width = "100%";
container.appendChild(zero);
container.appendChild(clear);
container.appendChild(equal);
container.appendChild(decimal);
container.appendChild(backspace);

//-----Main Logic-----
var opCaptured = null;
var a = null;
var replaceDisplay = false;

clear.addEventListener("click",e=>{
	display.textContent = "0";
	a = null;
    opCaptured = null;
    replaceDisplay = true;
})
zero.addEventListener("click",e=>{
	displayLogic(e.target.innerHTML)
});
equal.addEventListener("click",e=>{
    if (opCaptured === null){
        replaceDisplay = true;
        a = currDisplay();
        opCaptured = null;
        displayLogic(a)
        return;
    }
    replaceDisplay = true;
	a = operate(opCaptured,a,currDisplay()).toPrecision(2)
	displayLogic(a);
    opCaptured = null;
})
decimal.addEventListener("click",e=>{
    if (!hasDecimal()){
        replaceDisplay = false;
        displayLogic(".");
    }
    else return;
})
backspace.addEventListener("click",e=>{
    if (display.textContent.length === 1){
        display.textContent = "0";
    }
    else{
        replaceDisplay = true;
        var edit = display.textContent.split("");
        edit.pop();
        displayLogic(edit.join(""))
        replaceDisplay = false;
    }
})
numBTNS.forEach(btn=>{
    btn.addEventListener("click",e=>{
        displayLogic(e.target.innerHTML);
        replaceDisplay = false;
    })
});
operatorBTNS.forEach(op=>{
    op.addEventListener("click",e=>{
        if (a === null || opCaptured === null){
           a = currDisplay();
           opCaptured = e.target.innerHTML;
           replaceDisplay = true;
        } else {
            replaceDisplay = true;
            a = operate(opCaptured,a,currDisplay());
            opCaptured = e.target.innerHTML; 
			replace = true;
			displayLogic(a);
        }
	 })
});
function displayLogic(numToDisplay){ 
    // if (numToDisplay !== ".") numToDisplay = parseFloat(numToDisplay);
    display.textContent === "0" || replaceDisplay === true ? display.textContent= numToDisplay:display.textContent += numToDisplay;
};
function hasDecimal(){
	var input = currDisplay().toString();
	input = input.split();
	input.forEach(char=>{
		if (char === ".") return true;
	});
	return false;
}
function currDisplay (){
    return parseFloat(parseFloat(display.textContent).toFixed(04));
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
            return add(a,b);
            break;
        case "-":
            return subtract(a,b);
            break;
        case "/":
            return divide(a,b);
            break;
        case "*":
            return multiply(a,b);
            break;
        default: return "Invalid parameters."       
    }
}
function hasDecimal(){
  var stringToCheck = currDisplay().toString();
  return stringToCheck.includes(".")  
}