const displayScreen = document.querySelector('h1');
const buttons = document.querySelectorAll('button');
const clearBtn = document.getElementById('clearBtn');

let firstValue = 0;
let operatorValue = '';
let secondValue = false;

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function operate(operator, firstNumber, secondNumber) {
    let calculation = 0;
    switch (operator) {
        case '+':
            calculation = add(firstNumber, secondNumber);
            break;
        case '-':
            calculation = subtract(firstNumber, secondNumber);
            break;
        case '*':
            calculation = multiply(firstNumber, secondNumber);
            break;
        case '/':
            if (secondNumber === 0) {
                displayScreen.textContent = "Sorry can't divide by 0!";
                return;
            }
            calculation = divide(firstNumber, secondNumber);
            break;
    }
    return calculation;
}

function updateDisplayScreen(number) {
    if (secondValue) {
        displayScreen.textContent = number;
        secondValue = false;
    } else {
        const displayValue = displayScreen.textContent;
        displayScreen.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    if (secondValue) return;
    if (!displayScreen.textContent.includes('.')) {
        displayScreen.textContent = `${displayScreen.textContent}.`
    }
}

buttons.forEach((button) => {
    if (button.classList.length === 0) {
        button.addEventListener('click', () => updateDisplayScreen(button.value));
    } else if (button.classList.contains('operator')) {
        button.addEventListener('click', () => {
            const currentValue = Number(displayScreen.textContent);
            if (operatorValue && secondValue) {
                operatorValue = button.value;
                return;
            }
            if (!firstValue || firstValue.length > 3) {
                firstValue = currentValue;
                displayScreen.textContent = currentValue.toLocaleString();
            } else {
                let calculation = operate(operatorValue, firstValue, currentValue);
                displayScreen.textContent = calculation.toLocaleString();
                firstValue = calculation;
            }
            secondValue = true;
            operatorValue = button.value;
        });
    } else if (button.classList.contains('decimal')) {
        button.addEventListener('click', () => addDecimal());
    }
});

function resetAll() {
    firstValue = 0;
    operatorValue = '';
    secondValue = false;

    displayScreen.textContent = '0';
}


clearBtn.addEventListener('click', resetAll);
document.addEventListener('keydown', (event) => {
    const key = event.key;
  
    if (!isNaN(key)) {
      updateDisplayScreen(key);
    } else if (key === '.') {
      addDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      operate(key);
    } else if (key === 'Enter' || key === '=') {
      operate(operatorValue);
    } else if (key === 'Backspace' || key === 'Delete') {
      resetAll();
    }
  });