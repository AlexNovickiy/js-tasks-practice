const buttons = document.querySelectorAll('.sound-button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Получаем значение data-sound
        const soundName = button.getAttribute('data-sound');
        
        // Создаем объект Audio и указываем путь к файлу
        const audio = new Audio(`audio/${soundName}.mp3`);
        
        // Воспроизводим звук
        audio.play();

        // Добавляем анимацию клика
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 200); // Удаляем класс после завершения анимации
    });
});
