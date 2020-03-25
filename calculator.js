//Our container that will encapsulate our calculator
const container = document.querySelector("#container");
container.style.width="50%";
container.style.height="50%";
container.style.border="10px solid black";
container.style.position = "absolute";
container.style.cursor="move";

//Create the display
const display = document.createElement("div");
display.style.border = "1px solid black";
display.textContent=0;
display.style.width="100%";
display.style.height="11.1%";
display.style.textAlign = "right";
display.style.fontSize="2em"
container.appendChild(display);
//Create operator buttons
var operators = ["+","-","x","÷"];
var operatorBTNS = [];
var numBTNS = [];
operators.forEach(op=>{
    closeDragElement();
    var button = document.createElement("button");
    button.textContent = op;
    button.style.width="25%";
    button.style.height="11.1%";
    button.style.fontSize = "2em"
    operatorBTNS.push(button);
    container.appendChild(button);
})
//Create number buttons
for(var i=1; i<=9;i++){
    var num = document.createElement("button");
    num.textContent = i;
    num.style.width = "33.33%";
    num.style.height="11.1%";
    num.style.fontSize = "2em"
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
clear.style.height="11.1%";
clear.style.fontSize = "2em"
zero.style.height="11.1%";
zero.style.width="33.33%";
zero.style.fontSize = "2em"
equal.style.width = "100%";
equal.style.height="11.1%";
equal.style.fontSize = "2em"
decimal.style.width = "100%";
decimal.style.height="11.1%";
equal.style.fontSize = "2em"
backspace.style.width = "100%";
backspace.style.height="11.1%";
container.appendChild(zero);
container.appendChild(clear);
container.appendChild(equal);
container.appendChild(decimal);
container.appendChild(backspace);
//-----Main Logic-----
var opCaptured = null;
var a = null;
var replaceDisplay = false;
//=== Container drag logic ===
dragElement(container);

function dragElement(iElemnt){
    var pos1 = 0; pos2 = 0; pos3 =0; pos4 =0; elemnt = iElemnt
    elemnt.onmousedown = moveElement;
}
function moveElement(e){
    //  // get the mouse cursor position at startup:
     pos3 = e.clientX;
     pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    //  // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}
function elementDrag(e) {
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    //set the element's new position:
    elemnt.style.top = (elemnt.offsetTop - pos2) + "px";
    elemnt.style.left = (elemnt.offsetLeft - pos1) + "px";
  }
function closeDragElement(){
    document.onmouseup = null;
    document.onmousemove = null;
}

//=== Keybindings ===
window.addEventListener("keydown",e=>{
     switch(e.keyCode){
         //numbers
        case 48:
            zero.click();
            break;
        case 49:
            numBTNS[0].click();
            break;
        case 50:  
            numBTNS[1].click();
            break;          
        case 51:
            numBTNS[2].click();
            break;
        case 52:
            numBTNS[3].click();
            break;
        case 53:  
            numBTNS[4].click();
            break;          
        case 54:
            numBTNS[5].click();
            break;
        case 55:  
            numBTNS[6].click();
            break;          
        case 56:
            numBTNS[7].click();
            break;
        case 57:  
            numBTNS[8].click();
            break; 
        //Operators
        case 61:
            if (e.key === "+")operatorBTNS[0].click();
            else equal.click();
        case 173:
            //minus
            operatorBTNS[1].click();
            break;
        case 13:
            //equal
            equal.click();
            break; 
        case 8:
            //backspace
            e.preventDefault();
            backspace.click();
            break;
        case 190:
            //decimal
            decimal.click();
            break;       
        case 191:
            e.preventDefault();
            operatorBTNS[3].click();
            break; 
     }
})


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