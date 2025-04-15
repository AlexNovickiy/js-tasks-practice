import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputAmount = document.getElementById('amount');
const slider = document.getElementById('slider');
const checkboxNumbers = document.querySelector('.checkbox-numbers');
const checkboxSymbols = document.querySelector('.checkbox-symbols');
const generateButton = document.querySelector('.btn-generate');
const passwordOutput = document.querySelector('.password-input');
const copyButton = document.querySelector('.btn-copy-password');

inputAmount.addEventListener('input', () => {
    slider.value = inputAmount.value;
});

slider.addEventListener('input', () => {
    inputAmount.value = slider.value;
    const min = slider.min;
    const max = slider.max;
    const value = slider.value;
    const valuePercent = `${100 - ((max - value) / (max - min)) * 100}%`;
    slider.style.backgroundSize = `${valuePercent} 100%`;
    slider.style.backgroundImage = `linear-gradient(to right, #801212 ${valuePercent},rgb(238, 4, 4) ${valuePercent})`;
});

generateButton.addEventListener('click', () => {
    if(checkboxNumbers.checked && checkboxSymbols.checked) {
        passwordOutput.value = generatePassword(inputAmount.value, true, true);
    } else if(checkboxNumbers.checked) {
        passwordOutput.value = generatePassword(inputAmount.value, true, false);
    } else if(checkboxSymbols.checked) {
        passwordOutput.value = generatePassword(inputAmount.value, false, true);
    } else {
        passwordOutput.value = generatePassword(inputAmount.value, false, false);
    }

    copyButton.classList.remove('visually-hidden');
});

// Function to generate a random password based on the specified criteria
// Parameters: length (number), includeNumbers (boolean), includeSymbols (boolean)

function generatePassword(length, includeNumbers, includeSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbersChars = '0123456789';
    const symbolsChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characters = lowercaseChars + uppercaseChars;
    
    if (includeNumbers) {
        characters += numbersChars;
    }
    
    if (includeSymbols) {
        characters += symbolsChars;
    }
    
    let password = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

copyButton.addEventListener('click', async () => {
    const password = passwordOutput.value;

    if (password) {
        try {
            await navigator.clipboard.writeText(password);
            iziToast.success({
                title: 'Success',
                message: 'Password copied to clipboard!',
                position: 'topRight',
                timeout: 3000,
                transitionIn: 'fadeInDown',
                transitionOut: 'fadeOutUp',
            });
            copyButton.classList.add('visually-hidden');
        }
        catch (err) {
            iziToast.error({
                title: 'Error',
                message: 'Failed to copy password!',
                position: 'topRight',
                timeout: 3000,
                transitionIn: 'fadeInDown',
                transitionOut: 'fadeOutUp',
            });
        }
    } else if (password === '') {
        iziToast.warning({
            title: 'Warning',
            message: 'No password generated!',
            position: 'topRight',
            timeout: 3000,
            transitionIn: 'fadeInDown',
            transitionOut: 'fadeOutUp',
        });
    }
});

