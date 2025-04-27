import heart from '../img/heart.svg';

const stormOfHeartsContainer = document.querySelector('.storm-hearts-container');

// Функция троттлинга
function throttle(callback, delay) {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            callback(...args);
        }
    };
}

const createHeart = async (event) => {
    const heartElement = document.createElement('div');
    heartElement.classList.add('storm-heart');

    // Вставляем SVG в DOM
    const response = await fetch(heart);
    const svgContent = await response.text();
    heartElement.innerHTML = svgContent;
    const svg = heartElement.querySelector('svg');
    svg.classList.add('img-heart');

    const heartSize = Math.random() * 50 + 20; // Random size between 20 and 70
    svg.style.width = `${heartSize}px`;
    svg.style.height = `${heartSize}px`;

    heartElement.style.left = `${event.clientX}px`;
    heartElement.style.top = `${event.clientY}px`;

    heartElement.style.transform = `translate(-50%, -50%)`;

    const heartSpeed = Math.random() * 5 + 1; // Random speed between 1 and 3
    const heartAnimationFlightUp = `flightUp ${heartSpeed}s ease forwards`;
    heartElement.style.animation = `${heartAnimationFlightUp}, blinkColors ${heartSpeed}s linear infinite`;
    svg.style.animation = `blinkColors 0.8s linear infinite`;

    stormOfHeartsContainer.appendChild(heartElement);

    setTimeout(() => {
        heartElement.remove();
    }, heartSpeed * 1000);
};

// Применяем троттлинг к обработчику события
document.addEventListener('mousemove', throttle(createHeart, 1)); // Ограничиваем вызов до 1 раза в 100 мс