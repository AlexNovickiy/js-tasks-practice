import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form-life-calculator');
const listIems = form.querySelector('.results');

let colors;
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

form.addEventListener('submit', handleFormSubmit);

const validations = [
  {
    condition: (year, month, day) => !year || !month || !day,
    message: 'Please fill in all fields',
  },
  {
    condition: (year, month, day) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const currentDay = new Date().getDate();

      if (year > currentYear) return true;
      if (year === currentYear && month > currentMonth) return true;
      if (year === currentYear && month === currentMonth && day > currentDay)
        return true;
      if (year < 1900) return true;
      return false;
    },
    message: 'Please enter a valid date that is not in the future',
  },
  {
    condition: (_, month) => month < 1 || month > 12,
    message: 'Please enter a valid month',
  },
  {
    condition: (_, __, day) => day < 1 || day > 31,
    message: 'Please enter a valid day',
  },
];

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.currentTarget));

  for (const { condition, message } of validations) {
    if (
      condition(+formData.inputYear, +formData.inputMonth, +formData.inputDay)
    ) {
      iziToast.error({
        title: 'Error',
        message,
        position: 'topRight',
        messageColor: '#fff',
        titleColor: '#fff',
        backgroundColor: '#ff0000',
      });
      clearInterval(intervalId);
      listIems.innerHTML = '';
      return;
    }
  }

  const birthDate = new Date(
    formData.inputYear,
    formData.inputMonth - 1,
    formData.inputDay
  );

  colors = {
    years: getRandomHexColor(),
    days: getRandomHexColor(),
    hours: getRandomHexColor(),
    minutes: getRandomHexColor(),
    seconds: getRandomHexColor(),
  };

  updateTimeLived(birthDate);
  intervalId = setInterval(() => updateTimeLived(birthDate), 1000);
}

function updateTimeLived(birthDate) {
  const currentDate = new Date();
  const timeDifference = currentDate - birthDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365.25);

  listIems.innerHTML = `<li class="item-results">
                  <span>Вам</span>
                  <span class="result-years span-output-values" style="color: ${colors.years}">${years}</span> років
                </li>
                <li class="item-results">
                  <span>Ви прожили</span>
                  <span class="result-days span-output-values" style="color: ${colors.days}">${days}</span> днів
                </li>
                <li class="item-results">
                  <span class="title-before-times">Або</span>
                  <span class="result-hours span-output-values" style="color: ${colors.hours}">${hours}</span> годин
                </li>
                <li class="item-results">
                  <span class="title-before-times">Або</span>
                  <span class="result-minutes span-output-values" style="color: ${colors.minutes}">${minutes}</span> хвилин
                </li>
                <li class="item-results">
                  <span class="title-before-times">Або</span>
                  <span class="result-seconds span-output-values" style="color: ${colors.seconds}">${seconds}</span> секунд
                </li>`;
}
