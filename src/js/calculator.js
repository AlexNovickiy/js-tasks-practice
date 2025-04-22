import { evaluate } from 'mathjs';

const outerInput = document.querySelector('.input-expressions');
const listInputBtns = document.querySelector('.list-buttons-input-numbers');

outerInput.value = '0';

listInputBtns.addEventListener('click', (e) => {
    const target = e.target;

    if (!target.classList.contains('btn-input')) return;

    const value = target.textContent;

    // Очистка всего ввода
    if (target.classList.contains('delete-all-btn')) {
        outerInput.value = '0';
        return;
    }

    // Удаление последнего символа
    if (target.classList.contains('delete-btn')) {
        if (outerInput.value.length === 1 && outerInput.value === '0') {
            return;
        } else {
            outerInput.value = outerInput.value.slice(0, -1);
            if (outerInput.value.length === 0) {
                outerInput.value = '0';
            }
            return;
        }      
    }

    // Вычисление результата
    if (target.classList.contains('equal-btn')) {
        try {
            const expression = outerInput.value
                .replace(/÷/g, '/')
                .replace(/x/g, '*');

            outerInput.value = evaluate(expression).toFixed(2); 
        } catch {
            outerInput.value = 'Error';
        }
        return;
    }

    // Обработка операций sin, cos, tan, x², √
    if (['x²', '√', 'sin', 'cos', 'tan'].includes(value)) {
        const currentValue = outerInput.value.split(/[\+\-\x\÷]/).pop(); // Получаем последнее число в выражении
        if (currentValue.length > 0) {
            outerInput.value = outerInput.value.slice(0, -currentValue.length); // Удаляем последнее число из выражения
        }

        switch (value) {
            case 'x²':
                outerInput.value += `${currentValue}^2`; // Добавляем возведение в квадрат
                break;
            case '√':
                outerInput.value += `sqrt(${currentValue})`; // Добавляем квадратный корень
                break;
            case 'sin':
                outerInput.value += `sin(${currentValue})`; // Добавляем синус
                break;
            case 'cos':
                outerInput.value += `cos(${currentValue})`; // Добавляем косинус
                break;
            case 'tan':
                outerInput.value += `tan(${currentValue})`; // Добавляем тангенс
                break;
        }
        return;
    }
    if (outerInput.value === '0' && outerInput.value.length === 1 && !isNaN(parseFloat(value))) {
        outerInput.value = '';
    }
    outerInput.value += value;
});