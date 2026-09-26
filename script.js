/*
==================================================
CONFIGURAÇÃO
==================================================
*/

const START_DATE = new Date("2026-09-27T00:00:00-03:00");

const FINAL_DATE = new Date("2026-12-13T00:00:00-03:00");

const TOTAL_WEEKS = 11;


/*
==================================================
DADOS DAS SEMANAS
==================================================
*/

const weeks = [

    {
        number: 1,
        date: "2026-09-27T00:00:00-03:00",
        blur: 100,
        image: "imagens/foto-01.jpg",
        phrase: "E então? Algum palpite? kkkkk",
        fact: "Eu tenho uma facilidade absurda para ficar horas ouvindo música."
    },

    {
        number: 2,
        date: "2026-10-04T00:00:00-03:00",
        blur: 97,
        image: "imagens/foto-02.jpg",
        phrase: "Ainda está difícil descobrir, eu sei kkkkk",
        fact: "Eu sou bem eclético com música. Se eu gostar, entrou na playlist."
    },

    {
        number: 3,
        date: "2026-10-11T00:00:00-03:00",
        blur: 93,
        image: "imagens/foto-03.jpg",
        phrase: "Talvez agora tenha ficado um pouquinho mais fácil...",
        fact: "Eu gosto bastante de tecnologia e sempre acabo inventando algum projeto."
    },

    {
        number: 4,
        date: "2026-10-18T00:00:00-03:00",
        blur: 87,
        image: "imagens/foto-04.jpg",
        phrase: "Já conseguiu imaginar o que é?",
        fact: "Eu gosto de aprender coisas novas, mesmo quando começo sem saber absolutamente nada."
    },

    {
        number: 5,
        date: "2026-10-25T00:00:00-03:00",
        blur: 78,
        image: "imagens/foto-05.jpg",
        phrase: "Agora dá pra saber o que é kkkkk",
        fact: "Às vezes eu começo um projeto só por curiosidade e, quando percebo, estou completamente envolvido."
    },

    {
        number: 6,
        date: "2026-11-01T00:00:00-03:00",
        blur: 67,
        image: "imagens/foto-06.jpg",
        phrase: "Tá começando a entregar demais...",
        fact: "Eu reparo muito nos pequenos detalhes das coisas."
    },

    {
        number: 7,
        date: "2026-11-08T00:00:00-03:00",
        blur: 55,
        image: "imagens/foto-07.jpg",
        phrase: "Se ainda não descobriu, eu não sei mais o que fazer 😭",
        fact: "Eu gosto de guardar momentos que foram importantes para mim."
    },

    {
        number: 8,
        date: "2026-11-15T00:00:00-03:00",
        blur: 42,
        image: "imagens/foto-08.jpg",
        phrase: "Tá chegando...",
        fact: "Eu posso parecer tranquilo, mas às vezes fico planejando tudo nos mínimos detalhes."
    },

    {
        number: 9,
        date: "2026-11-22T00:00:00-03:00",
        blur: 28,
        image: "imagens/foto-09.jpg",
        phrase: "Agora ficou praticamente impossível esconder.",
        fact: "Eu gosto quando consigo fazer alguma coisa pensando especialmente em alguém."
    },

    {
        number: 10,
        date: "2026-11-29T00:00:00-03:00",
        blur: 12,
        image: "imagens/foto-10.jpg",
        phrase: "Só mais um pouquinho...",
        fact: "Se você chegou até aqui, provavelmente já percebeu que eu planejei isso por um motivo."
    },

    {
        number: 11,
        date: "2026-12-06T00:00:00-03:00",
        blur: 0,
        image: "imagens/foto-11.jpg",
        phrase: "Pronto. Agora você já sabe.",
        fact: "E essa foi só a primeira parte da surpresa."
    }

];


/*
==================================================
ELEMENTOS
==================================================
*/

const gallery = document.getElementById("gallery");

const countdown = document.getElementById("countdown");

const weeklyFact = document.getElementById("weekly-fact");

const factText = document.getElementById("fact-text");

const finalSection = document.getElementById("final-section");

const revealButton = document.getElementById("reveal-button");

const finalMessage = document.getElementById("final-message");


/*
==================================================
DATA ATUAL
==================================================
*/

function getNow() {

    return new Date();

}


/*
==================================================
SEMANA ATUAL
==================================================
*/

function getCurrentWeek() {

    const now = getNow();

    let currentWeek = 0;

    for (const week of weeks) {

        const unlockDate = new Date(week.date);

        if (now >= unlockDate) {

            currentWeek = week.number;

        }

    }

    return currentWeek;

}


/*
==================================================
FORMATAR DATA
==================================================
*/

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("pt-BR", {

        day: "2-digit",

        month: "2-digit"

    });

}


/*
==================================================
CONVERTER BLUR
==================================================

CSS utiliza pixels para blur.
Aqui transformamos a porcentagem
em um valor visual adequado.

==================================================
*/

function getBlurPixels(percentage) {

    const maxBlur = 30;

    return (percentage / 100) * maxBlur;

}


/*
==================================================
CRIAR GALERIA
==================================================
*/

function createGallery() {

    const currentWeek = getCurrentWeek();

    gallery.innerHTML = "";

    weeks.forEach(week => {

        const card = document.createElement("article");

        card.className = "photo-card";

        const unlocked = currentWeek >= week.number;


        /*
        ------------------------------------------
        FOTO DESBLOQUEADA
        ------------------------------------------
        */

        if (unlocked) {

            card.classList.add("unlocked");

            card.innerHTML = `

                <div class="photo-wrapper">

                    <img
                        src="${week.image}"
                        alt="Foto da semana ${week.number}"
                        style="filter: blur(${getBlurPixels(week.blur)}px);"
                        draggable="false"
                    >

                    <div class="week-badge">
                        SEMANA ${String(week.number).padStart(2, "0")}
                    </div>

                    <div class="blur-badge">
                        ${week.blur}% de blur
                    </div>

                </div>

                <div class="card-content">

                    <p class="photo-phrase">
                        ${week.phrase}
                    </p>

                    <span class="card-date">
                        Revelada em ${formatDate(week.date)}
                    </span>

                </div>

            `;

        }


        /*
        ------------------------------------------
        FOTO BLOQUEADA
        ------------------------------------------
        */

        else {

            card.classList.add("locked");

            card.innerHTML = `

                <div class="locked-photo">

                    <span class="question-mark">
                        ?
                    </span>

                    <div class="lock-text">

                        <strong>
                            SEMANA ${String(week.number).padStart(2, "0")}
                        </strong>

                        <span>
                            Disponível em ${formatDate(week.date)}
                        </span>

                    </div>

                </div>

                <div class="card-content">

                    <p class="locked-message">
                        Essa pista ainda está escondida.
                    </p>

                </div>

            `;

        }


        gallery.appendChild(card);

    });

}


/*
==================================================
ATUALIZAR CURIOSIDADE
==================================================
*/

function updateWeeklyFact() {

    const currentWeek = getCurrentWeek();

    if (currentWeek === 0) {

        factText.textContent =
            "Antes da primeira revelação, fica só uma coisa sobre mim...";

        return;

    }


    const week = weeks[currentWeek - 1];

    if (!week) return;

    factText.textContent = week.fact;

}


/*
==================================================
CONTAGEM REGRESSIVA
==================================================
*/

function updateCountdown() {

    const now = getNow();

    const currentWeek = getCurrentWeek();


    /*
    ------------------------------------------
    ANTES DA PRIMEIRA SEMANA
    ------------------------------------------
    */

    if (currentWeek === 0) {

        const firstDate = new Date(weeks[0].date);

        updateTimer(firstDate, "A primeira revelação começa em");

        return;

    }


    /*
    ------------------------------------------
    ENTRE AS SEMANAS
    ------------------------------------------
    */

    if (currentWeek < TOTAL_WEEKS) {

        const nextWeek = weeks[currentWeek];

        const nextDate = new Date(nextWeek.date);

        updateTimer(nextDate, "Próxima revelação em");

        return;

    }


    /*
    ------------------------------------------
    TODAS AS FOTOS REVELADAS
    ------------------------------------------
    */

    if (now < FINAL_DATE) {

        updateTimer(
            FINAL_DATE,
            "A revelação final acontece em"
        );

        return;

    }


    /*
    ------------------------------------------
    DIA FINAL
    ------------------------------------------
    */

    countdown.textContent =
        "A surpresa finalmente chegou. ❤️";

}


/*
==================================================
ATUALIZAR TIMER
==================================================
*/

function updateTimer(targetDate, prefix) {

    const now = getNow();

    let remaining = targetDate.getTime() - now.getTime();

    if (remaining < 0) {

        remaining = 0;

    }


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
        `${prefix} ${days}d ${hours}h ${minutes}m ${seconds}s`;

}


/*
==================================================
SEÇÃO FINAL
==================================================
*/

function updateFinalSection() {

    const now = getNow();

    if (now >= FINAL_DATE) {

        finalSection.classList.add("available");

        return;

    }

    finalSection.classList.remove("available");

}


/*
==================================================
BOTÃO DA REVELAÇÃO
==================================================
*/

revealButton.addEventListener("click", () => {

    finalMessage.classList.add("show");

    revealButton.textContent =
        "Agora você sabe ❤️";

});


/*
==================================================
PROTEÇÃO DAS IMAGENS
==================================================
*/

document.addEventListener("contextmenu", event => {

    if (event.target.tagName === "IMG") {

        event.preventDefault();

    }

});


document.addEventListener("dragstart", event => {

    if (event.target.tagName === "IMG") {

        event.preventDefault();

    }

});


/*
==================================================
ATUALIZAÇÃO
==================================================
*/

function update() {

    createGallery();

    updateWeeklyFact();

    updateCountdown();

    updateFinalSection();

}


update();


setInterval(update, 1000);
