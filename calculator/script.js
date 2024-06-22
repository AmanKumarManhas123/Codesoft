document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');

    let currentInput = '';
    let resultDisplayed = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { number, operator } = button.dataset;

            if (number) {
                if (resultDisplayed) {
                    currentInput = number;
                    resultDisplayed = false;
                } else {
                    currentInput += number;
                }
            } else if (operator) {
                if (resultDisplayed) {
                    resultDisplayed = false;
                }
                currentInput += ` ${operator} `;
            } else if (button.id === 'clear') {
                currentInput = '';
            } else if (button.id === 'backspace') {
                currentInput = currentInput.trim();
                if (currentInput.endsWith(' ')) {
                    currentInput = currentInput.slice(0, -3);
                } else {
                    currentInput = currentInput.slice(0, -1);
                }
            } else if (button.id === 'equals') {
                try {
                    currentInput = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/')).toString();
                    resultDisplayed = true;
                } catch {
                    currentInput = 'Error';
                }
            }

            display.textContent = currentInput || '0';
        });
    });
});
