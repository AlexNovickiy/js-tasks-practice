const buttons = document.querySelectorAll('.sound-button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Отримуємо значення data-sound aтрибута
        const soundName = button.getAttribute('data-sound');
        
        // Створюємо об'єкт Audio і вказуємо шлях до файлу
        
        const audio = new Audio(`/audio/${soundName}.mp3`);
        
        // Відтворюємо звук
        audio.play();

        // Додаємо анімацію кліка
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 200); // Видаляємо клас після завершення анімації
    });
});
