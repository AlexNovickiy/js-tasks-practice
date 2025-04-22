const container = document.querySelector('.snowfall-container');


const maxSnowflakes = 200; // Максимальное количество снежинок
const snowflakeSymbols = ['❄', '❅', '❆']; // Символы снежинок

// Функция для создания снежинки
function createSnowflake() {
  
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];


  const size = Math.random() * 20 + 20; // Размер от 20px до 40px
  snowflake.style.fontSize = `${size}px`;

  const startX = Math.random() * window.innerWidth;
  snowflake.style.left = `${startX}px`;

  // Случайная продолжительность анимации падения
  const fallDuration = Math.random() * 5 + 5; // От 5 до 10 секунд

  
  // Применяем объединенную анимацию
  snowflake.style.animation = `fallAndRotate ${fallDuration}s linear infinite`;


  container.appendChild(snowflake);

  // Удаляем снежинку после завершения анимации
  setTimeout(() => {
    snowflake.remove();
  }, fallDuration * 1000);
}

// Функция для запуска снегопада
function startSnowfall() {
  setInterval(() => {
    // Проверяем, чтобы количество снежинок не превышало максимальное
    if (container.childElementCount < maxSnowflakes) {
      createSnowflake();
    }
  }, 200); // Создаем снежинку каждые 200 мс
}

// Запускаем снегопад
startSnowfall();