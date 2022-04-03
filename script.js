'use strict';

const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const plusMinus = document.querySelector('.plus-minus');
const del = document.querySelector('.delete');
const acButton = document.querySelector('.ac');
const previousOutputElement = document.querySelector('.previous-output');
const currentOutputElement = document.querySelector('.current-output');

class Calculator {
  constructor(previousOutputElement, currentOutputElement) {
    this.previousOutputElement = previousOutputElement;
    this.currentOutputElement = currentOutputElement;
    this.allClear();
  }

  allClear() {
    this.currentOutput = '';
    this.previousOutput = '';
    this.operation = '';
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number[0] === '0' && this.currentOutput == '0') {
      return;
    }

    if (number === '.' && this.currentOutput.includes('.')) {
      return;
    }

    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  chooseOperation(operation) {
    this.operation = operation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = '';

    if (this.currentOutput === '') {
      return;
    }

    if (this.previousOutput !== '') {
      this.compute();
    }
  }

  compute() {
    let computation;
    const previous = this.previousOutput;
    const current = this.currentOutput;

    if (isNaN(previous) || isNaN(current)) {
      return;
    }

    switch (this.operation) {
      case '+':
        computation = +previous + +current;
        break;
      case '-':
        computation = previous - current;
        break;
      case 'x':
        computation = previous * current;
        break;
      case '/':
        computation = previous / current;
        break;
      default:
        return;
    }

    if (Number.isInteger(computation)) {
      this.currentOutput = computation;
    } else {
      this.currentOutput = this.getDecimalNumber(computation);
    }

    this.operation = '';
    this.previousOutput = '';
  }

  updateDisplay() {
    this.currentOutputElement.textContent = this.currentOutput;

    if (this.operation != null) {
      this.previousOutputElement.textContent = `${this.previousOutput} ${this.operation}`;
    } else {
      this.previousOutputElement.textContent = '';
    }
  }

  plusMinusOperation() {
    if (this.currentOutput === null) {
      return;
    }

    this.currentOutput = -this.currentOutput;
  }

  getDecimalNumber(number) {
    const stringNumber = number.toString();
    const integerNumber = stringNumber.split('.')[0];
    const decimalNumber = stringNumber.split('.')[1];
    let resultNumber = [integerNumber, decimalNumber.slice(0, 8)].join('.');
    return resultNumber;
  }
}

const calculator = new Calculator(previousOutputElement, currentOutputElement);

numbers.forEach(number => {
  number.addEventListener('click', () => {
    calculator.appendNumber(number.textContent);
    calculator.updateDisplay();
  });
});

operations.forEach(operation => {
  operation.addEventListener('click', () => {
    calculator.chooseOperation(operation.textContent);
    calculator.updateDisplay();
  });
});

equal.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

acButton.addEventListener('click', button => {
  calculator.allClear();
  calculator.updateDisplay();
});

del.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

plusMinus.addEventListener('click', () => {
  calculator.plusMinusOperation();
  calculator.updateDisplay();
});
