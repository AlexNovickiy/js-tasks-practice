const words = ["Тут ми прокачуємо", "JavaScript", "CSS", "HTML"];
const typewritterBox = document.querySelector(".typewritter-box");

// Анимация мигающей черточки
const blinkingCaret = `<span class="caret">|</span>`;

// Первый вариант: Полное слово, затем следующее посимвольно
function typeWordsFullThenNext(words, element) {
    let wordIndex = 1; // Начинаем со второго элемента
    let firstWordPrinted = false;

    function typeWord() {
        if (!firstWordPrinted) {
            // Печатаем первый элемент и оставляем его
            const firstWord = words[0];
            element.innerHTML = `<span style="color: white;">${firstWord}</span>`;
            firstWordPrinted = true;
            setTimeout(typeWord, 1000); // Задержка перед началом печати остальных слов
            return;
        }

        const word = words[wordIndex];
        let charIndex = 0;

        function typeChar() {
            if (charIndex <= word.length) {
                element.innerHTML =
                    `<span style="color: white;">${words[0]} </span>` +
                    `<span style="color: orange;">${word.slice(0, charIndex)}</span>` +
                    blinkingCaret;
                charIndex++;
                setTimeout(typeChar, 100); // Скорость печати
            } else {
                wordIndex++;
                if (wordIndex === words.length) {
                    // Удаляем первый элемент и начинаем заново
                    setTimeout(() => {
                        element.innerHTML = ""; // Удаляем всё
                        wordIndex = 1; // Сбрасываем индекс
                        firstWordPrinted = false; // Сбрасываем флаг
                        typeWord();
                    }, 1000);
                } else {
                    setTimeout(typeWord, 1000); // Задержка перед следующим словом
                }
            }
        }

        typeChar();
    }

    typeWord();
}

// Второй вариант: Печать слова, затем удаление, затем следующее слово
function typeWordsWithDelete(words, element) {
    let wordIndex = 1; // Начинаем со второго элемента
    let firstWordPrinted = false;

    function typeWord() {
        if (!firstWordPrinted) {
            // Печатаем первый элемент и оставляем его
            const firstWord = words[0];
            element.innerHTML = `<span style="color: white;">${firstWord}</span>`;
            firstWordPrinted = true;
            setTimeout(typeWord, 1000); // Задержка перед началом печати остальных слов
            return;
        }

        const word = words[wordIndex];
        let charIndex = 0;

        function typeChar() {
            if (charIndex <= word.length) {
                element.innerHTML =
                    `<span style="color: white;">${words[0]} </span>` +
                    `<span style="color: orange;">${word.slice(0, charIndex)}</span>` +
                    blinkingCaret;
                charIndex++;
                setTimeout(typeChar, 100); // Скорость печати
            } else {
                setTimeout(deleteWord, 1000); // Задержка перед удалением
            }
        }

        function deleteWord() {
            if (charIndex >= 0) {
                element.innerHTML =
                    `<span style="color: white;">${words[0]} </span>` +
                    `<span style="color: orange;">${word.slice(0, charIndex)}</span>` +
                    blinkingCaret;
                charIndex--;
                setTimeout(deleteWord, 100); // Скорость удаления
            } else {
                wordIndex++;
                if (wordIndex === words.length) {
                    // Удаляем первый элемент и начинаем заново
                    setTimeout(() => {
                        element.innerHTML = ""; // Удаляем всё
                        wordIndex = 1; // Сбрасываем индекс
                        firstWordPrinted = false; // Сбрасываем флаг
                        typeWord();
                    }, 1000);
                } else {
                    setTimeout(typeWord, 500); // Задержка перед следующим словом
                }
            }
        }

        typeChar();
    }

    typeWord();
}

// Запуск двух вариантов
const typewritterBox1 = document.createElement("div");
typewritterBox1.classList.add("typewritter-box-text");
typewritterBox.appendChild(typewritterBox1);
typeWordsFullThenNext(words, typewritterBox1);

const typewritterBox2 = document.createElement("div");
typewritterBox2.classList.add("typewritter-box-text");
typewritterBox.appendChild(typewritterBox2);
typeWordsWithDelete(words, typewritterBox2);