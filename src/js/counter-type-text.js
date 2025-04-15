const input = document.querySelector('.textarea-input');
const counterWords = document.querySelector('.count-words');
const counterChars = document.querySelector('.count-characters');
const counterSymbols = document.querySelector('.count-symbols');

let numWords = 0;
let numChars = 0;
let numSymbols = 0;

const arraySymbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '{', '}', '[', ']', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '|', '\\', '`', '~', '«', '»', '“', '”', '‘', '’', '•', '…', '–', '—', '•', '·'];
input.addEventListener('input', () => {
    const inputValue = input.value.trim();
    numWords = inputValue === '' ? 0 : inputValue.split(/\s+/).length;
    numChars = inputValue.split(/\s+/).join('').length;
    numSymbols = inputValue.split('').filter((char) => arraySymbols.includes(char)).length;

    counterWords.textContent = numWords;
    counterChars.textContent = numChars;
    counterSymbols.textContent = numSymbols;
});