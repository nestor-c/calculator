const container = document.querySelector('#container');
container.style.width='50%'
container.style.height='50%'

//Create the display
const display = document.createElement('div');
display.style.border = '1px solid black';
display.textContent="0";
display.style.width='100%';
display.style.textAlign = 'right';
container.appendChild(display)

//Create operator buttons
var operators = ['+','-','*','/'];
var operatorBTNS = [];
var numBTNS = [];
operators.forEach(op=>{
    var button = document.createElement('button');
    button.textContent = op;
    button.style.width='25%'
    operatorBTNS.push(button);
    container.appendChild(button)
})
//Create number buttons
for(var i=1; i<=9;i++){
    var num = document.createElement('button');
    num.textContent = i;
    num.style.width = '33.33%'
    numBTNS.push(num);
    container.appendChild(num);
}
//Create clear and zero button
var clear = document.createElement('button');
var zero = document.createElement('button');
clear.textContent = 'C'
zero.textContent = '0'
clear.style.width='66.67%'
zero.style.width='33.33%'
clear.addEventListener('click',e=>{
    curr = 0;
    display.textContent = '0';
})
container.appendChild(zero);
container.appendChild(clear);


//Calculator Logic
var a = null;
var currentValue;
var currOp = null;

numBTNS.forEach(btn=>{
    btn.addEventListener('click',e=>{
        if (a === null){
			//seperate display logic from calculation logic
			display.textContent = e.target.innerHTML;
			
        }else{
            display.textContent += e.target.innerHTML;
            curr = parseInt(display.textContent)
        }
    })
})

operatorBTNS.forEach(op=>{
    op.addEventListener('click',e=>{
        if (a === null){
			currOp = e.target.innerHTML;
			a = display.textContent;
		} 
		else {
			display.textContent = operate(currOp,a,display.textContent);
			a = display.textContent;
			currOp = e.target.innerHTML;
		}
	 })
});

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
    if (b==0) return "You can't divide by zero, silly."
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
            return divide(a,b)
            break;
        case "*":
            return multiply(a,b)
            break;
        default: return "Invalid parameters."       
    }
}