let screenContainer = document.getElementById('screen-container');
let mathExpression = [];

function addExpression(token) {
    if (screenContainer.innerHTML == 0) {
        screenContainer.innerHTML = '';
    }

    if (mathExpression.length === 0) {
        if (typeof token === 'number') {
            screenContainer.innerHTML = token;
            mathExpression.push(token);
        } else {
            screenContainer.innerHTML = 0;
        }
    } else {
        let lastToken = mathExpression[mathExpression.length - 1];
        if (typeof token === 'number') {
            if (typeof lastToken === 'number') {
                screenContainer.innerHTML += token;
                token = Number(lastToken + '' + token);
                mathExpression[mathExpression.length - 1] = token;
            } else {
                screenContainer.innerHTML += ' ' + token;
                mathExpression.push(token);
            }
        } else {
            if (typeof lastToken === 'string') {
                screenContainer.innerHTML  = screenContainer.innerHTML.slice(0, screenContainer.innerHTML.length - 1) + token;
                mathExpression[mathExpression.length-1] = token;
            } else {
                screenContainer.innerHTML += ' ' + token;
                mathExpression.push(token);
            }
        }
    }
}

function getPresedence(operator) {
    if (operator === 'x' || operator === '/') {
        return 2;
    } else if (operator === '+' || operator === '-') {
        return 1;
    }
    return 0;
}

function calculate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case 'x':
            return firstNumber * secondNumber;
        case '/':
            return firstNumber / secondNumber;
    }
}

function evaluate(expression) {
    let numbers = [];
    let operators = [];

    expression.forEach(token => {
        if (typeof token === 'number') {
            numbers.push(token);
        } else {
            while (operators.length > 0) {
                lastOperator = operators[operators.length - 1];
                if (getPresedence(lastOperator) > getPresedence(token)) {
                    operator = operators.pop();
                    const secondNumber = numbers.pop();
                    const firstNumber = numbers.pop();
                    const result = calculate(firstNumber, secondNumber, operator);
                    numbers.push(result);
                } else {
                    break;
                }
            }
            operators.push(token);
        }
    });

    while (operators.length > 0) {
        const secondNumber = numbers.pop();
        const firstNumber = numbers.pop();
        const result = calculate(firstNumber, secondNumber, operators.pop());
        numbers.push(result);
    }

    result = numbers.pop();
    mathExpression = [result];
    return result;
}

function getResult() {
    const result = evaluate(mathExpression);
    screenContainer.innerHTML = result;
}

function deleteScreen() {
    mathExpression = [];
    screenContainer.innerHTML = 0;
}