let parsedGolf = 0;
let parsedClickerCost = 10;
let clicksPerSecond = 0;
let parsedLevel = 1;


document.querySelector('.golf-image').addEventListener('click', incrementGolf);
document.querySelector('.upgrade-img').addEventListener('click', buyClicker);

function incrementGolf() {
    parsedGolf += 1;
    parsedGolf = Math.floor(parsedGolf);
    document.querySelector('.golf-cost').textContent = parsedGolf;
}

function buyClicker() {
    if (parsedGolf >= parsedClickerCost) {
        parsedGolf -= parsedClickerCost;
        document.querySelector('.golf-cost').textContent = parsedGolf;

        parsedClickerCost = Math.floor(parsedClickerCost * 1.2);
        document.querySelector('.clicker-cost').textContent = parsedClickerCost;

        // Tarkista, onko pelaaja saavuttanut uuden tason
        if (parsedLevel === 1 && parsedGolf >= 10 ){
            parsedLevel = 2;
            document.querySelector('.level').textContent = parsedLevel;
        }else if (parsedLevel === 2 && parsedGolf >= 100) {
            parsedLevel = 3;
            document.querySelector('.level').textContent = parsedLevel;
        }else if (parsedLevel === 3 && parsedGolf >= 500) {
            parsedLevel = 4;
            document.querySelector('.level').textContent = parsedLevel;
        }else if (parsedLevel === 4 && parsedGolf >= 1000) {
            parsedLevel = 5;
            document.querySelector('.level').textContent = parsedLevel;
        }
    }
}

function autoClicker() {
    parsedGolf += clicksPerSecond;
    document.querySelector('.golf-cost').textContent = parsedGolf;
}

// Lisää automaattiset klikkaukset
setInterval(autoClicker, 500);

// Klikkauskuvaan liittyvä logiikka
const clickerImg = document.querySelector('.upgrade-img');

clickerImg.addEventListener('click', () => {
    if (parsedGolf >= 10) {
        parsedGolf -= 10;
        clicksPerSecond += 1;
    }
});

document.querySelector('.golf-image').addEventListener('click', createSmallBall);

function createSmallBall(e) {
    // pieni golfpallo
    const smallBall = document.createElement('div');
    smallBall.className = 'ball';

    // Aseta sijainti
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    smallBall.style.left = mouseX + 'px'; // Sijainti hiiren x-koordinaatin mukaan
    smallBall.style.top = mouseY + 'px';  // Sijainti hiiren y-koordinaatin mukaan

    // Lisää pieni golfpallo sivulle
    document.querySelector('.ball-container').appendChild(smallBall);

    // Aseta aika pienille golfpallon animaatiolle
    let yPos = mouseY;
    const animateSmallBall = () => {
        yPos -= 4; // Liikkuu ylöspäin
        smallBall.style.top = yPos + 'px';

        if (yPos > -window.innerHeight) {
            requestAnimationFrame(animateSmallBall); // Jatka animaatiota, kunnes pallot ovat sivun yläreunassa
        } else {
            smallBall.remove(); // Poista pieni golfpallo animaation lopussa
        }
    };
    animateSmallBall();
}

