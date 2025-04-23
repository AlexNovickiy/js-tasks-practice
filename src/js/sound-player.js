import workIt from '/audio/work-it.mp3';
import makeIt from '/audio/make-it.mp3';
import doIt from '/audio/do-it.mp3';
import makesUs from '/audio/makes-us.mp3';
import harder from '/audio/harder.mp3';
import better from '/audio/better.mp3';
import faster from '/audio/faster.mp3';
import stronger from '/audio/stronger.mp3';
import moreThan from '/audio/more-than.mp3';
import hour from '/audio/hour.mp3';
import our from '/audio/our.mp3';
import never from '/audio/never.mp3';
import ever from '/audio/ever.mp3';
import after from '/audio/after.mp3';
import workIs from '/audio/work-is.mp3';
import over from '/audio/over.mp3';

const audioMap = {
    'work-it': workIt,
    'make-it': makeIt,
    'do-it': doIt,
    'makes-us': makesUs,
    'harder': harder,
    'better': better,
    'faster': faster,
    'stronger': stronger,
    'more-than': moreThan,
    'hour': hour,
    'our': our,
    'never': never,
    'ever': ever,
    'after': after,
    'work-is': workIs,
    'over': over,
};

const buttons = document.querySelectorAll('.sound-button');

buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
        const soundName = e.target.getAttribute('data-sound');
        const audio = new Audio(audioMap[soundName]);
        audio.play();

        // Додаємо анімацію кліка
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 200); // Видаляємо клас після завершення анімації
    });
});
