const buttons = document.querySelectorAll('.sound-button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Отримуємо значення data-sound aтрибута
        const soundName = button.getAttribute('data-sound');
        
        // Створюємо об'єкт Audio і вказуємо шлях до файлу
        
        try {
            const audio = new Audio(`./audio/${soundName}.mp3`);
        } catch (error) {
            console.error('Error loading audio file:', error);
            return; // Виходимо з функції, якщо не вдалося завантажити файл
        }
        
        // Відтворюємо звук
        try {
            audio.play();
        } catch (error) {
            console.error('Error playing audio:', error);
        }

        // Додаємо анімацію кліка
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 200); // Видаляємо клас після завершення анімації
    });
});
