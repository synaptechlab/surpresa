/*
    CONFIGURAÇÃO
*/

const START_DATE = new Date("2026-09-19T00:00:00-03:00");

const TOTAL_WEEKS = 12;

const WEEK_DURATION = 7 * 24 * 60 * 60 * 1000;


/*
    ELEMENTOS
*/

const image = document.getElementById("surprise-image");
const overlay = document.getElementById("image-overlay");

const weekLabel = document.getElementById("week-label");
const progressBar = document.getElementById("progress-bar");
const countdown = document.getElementById("countdown");


/*
    CALCULAR SEMANA
*/

function getCurrentWeek() {

    const now = new Date();

    const elapsed = now.getTime() - START_DATE.getTime();

    if (elapsed < 0) {
        return 1;
    }

    const week = Math.floor(elapsed / WEEK_DURATION) + 1;

    return Math.min(week, TOTAL_WEEKS);
}


/*
    CALCULAR TEMPO ATÉ PRÓXIMA SEMANA
*/

function getTimeUntilNextWeek() {

    const now = new Date();

    const currentWeek = getCurrentWeek();

    const nextWeekDate =
        new Date(
            START_DATE.getTime() +
            currentWeek * WEEK_DURATION
        );

    return nextWeekDate.getTime() - now.getTime();
}


/*
    ATUALIZAR CONTAGEM
*/

function updateCountdown() {

    const currentWeek = getCurrentWeek();

    if (currentWeek >= TOTAL_WEEKS) {

        countdown.textContent =
            "A surpresa foi completamente revelada! 🎁";

        return;
    }

    const remaining = getTimeUntilNextWeek();

    const days = Math.floor(
        remaining / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (remaining / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (remaining / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (remaining / 1000) % 60
    );

    countdown.textContent =
        `Próxima revelação em ${days}d ${hours}h ${minutes}m ${seconds}s`;
}


/*
    ATUALIZAR IMAGEM
*/

function updateReveal() {

    const week = getCurrentWeek();

    weekLabel.textContent =
        `SEMANA ${week} DE ${TOTAL_WEEKS}`;


    /*
        Semana 1 = praticamente escondida
        Semana 12 = completamente revelada
    */

    const revealPercentage =
        ((week - 1) / (TOTAL_WEEKS - 1)) * 100;


    /*
        Quanto menor a semana,
        maior o desfoque.
    */

    const blurAmount =
        Math.max(0, 30 - revealPercentage * 0.30);


    image.style.filter =
        `blur(${blurAmount}px)`;

    image.style.transform =
        `scale(${1 + blurAmount / 100})`;


    /*
        Barra de progresso
    */

    progressBar.style.width =
        `${revealPercentage}%`;
}


/*
    BLOQUEAR INTERAÇÕES DE DOWNLOAD
*/

image.addEventListener(
    "contextmenu",
    event => event.preventDefault()
);

image.addEventListener(
    "dragstart",
    event => event.preventDefault()
);

image.addEventListener(
    "mousedown",
    event => {

        if (event.button === 2) {
            event.preventDefault();
        }

    }
);


/*
    INICIALIZAÇÃO
*/

function update() {

    updateReveal();
    updateCountdown();

}

update();


/*
    Atualizar a cada segundo
*/

setInterval(update, 1000);
