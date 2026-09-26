// ==========================================
// CONFIGURAÇÃO DAS SEMANAS
// ==========================================

const weeks = [
    {
        number: 1,
        date: "2026-09-27T00:00:00-03:00",
        image: "imagens/foto-01.png",
        phrase: "E então? Algum palpite? kkkkk",
        fact: "Uma coisa que você provavelmente vai perceber sobre mim: eu gosto bastante de música kkkkk"
    },

    {
        number: 2,
        date: "2026-10-04T00:00:00-03:00",
        image: "imagens/foto-02.png",
        phrase: "Ainda está difícil descobrir? 👀",
        fact: "Eu gosto muito de aprender coisas novas, principalmente quando posso descobrir sozinho como elas funcionam."
    },

    {
        number: 3,
        date: "2026-10-11T00:00:00-03:00",
        image: "imagens/foto-03.png",
        phrase: "Talvez agora tenha ficado um pouquinho mais fácil...",
        fact: "Uma coisa meio minha é que, quando alguma coisa dá problema, eu gosto de tentar descobrir o que aconteceu antes de simplesmente deixar pra lá quase paranoico dependendo da situação, gosto de compreender"
    },

    {
        number: 4,
        date: "2026-10-18T00:00:00-03:00",
        image: "imagens/foto-04.png",
        phrase: "Está começando a fazer sentido? kkkkk",
        fact: "Eu gosto de tirar e editar fotos, geralmente da natureza (às vezes fico horas editando fotos kkkkk)"
    },

    {
        number: 5,
        date: "2026-10-25T00:00:00-03:00",
        image: "imagens/foto-05.png",
        phrase: "Agora dá pra saber o que é kkkkk",
        fact: "Muitas coisas que eu sei fazer hoje eu aprendi simplesmente procurando ou fuçando até conseguir"
    },

    {
        number: 6,
        date: "2026-11-01T00:00:00-03:00",
        image: "imagens/foto-06.png",
        phrase: "Acho que já ficou impossível não ter uma ideia 👀",
        fact: "Eu gosto de criar coisas do zero, mesmo quando no começo eu ainda não faço ideia de como fazer"
    },

    {
        number: 7,
        date: "2026-11-08T00:00:00-03:00",
        image: "imagens/foto-07.png",
        phrase: "Estamos chegando perto...",
        fact: "Eu gosto quando consigo aprender alguma coisa que antes parecia complicada"
    },

    {
        number: 8,
        date: "2026-11-15T00:00:00-03:00",
        image: "imagens/foto-08.png",
        phrase: "Pelo menos finge que ainda não descobriu kkkkkk",
        fact: "Eu rio de tudo kkkkk, quando estou nervoso, feliz, às vezes até em péssimos momentos até mesmo por mensagens kkkk deu pra perceber eu acho, espero que isso não seja incômodo kkkkk"
    },

    {
        number: 9,
        date: "2026-11-22T00:00:00-03:00",
        image: "imagens/foto-09.png",
        phrase: "Agora falta pouco...",
        fact: "Além do curso de inglês, eu já participei de um projeto de iniciação científica e fui medalhista de olimpiadas do estado de São Paulo 3x (não é muita coisa), pode não ser muita coisa, mas são conquistas que fico bem feliz de ter feito parte e gostaria de compartilhar kkkkk"
    },

    {
        number: 10,
        date: "2026-11-29T00:00:00-03:00",
        image: "imagens/foto-10.png",
        phrase: "Agora com certeza deu pra perceber 😊",
        fact: "Essa surpresa começou como uma ideia e acabou ficando muito maior do que eu imaginava kkkkkk"
    },

    {
        number: 11,
        date: "2026-12-06T00:00:00-03:00",
        image: "imagens/foto-11.png",
        phrase: "Última antes do GRANDE dia!",
        fact: "Esse presente eu pensei em te dar no momento que vi você dizer que gostava da cor verde mas não tinha muita roupa que poderia vestir então quis te dar esse presente, espero que possa ser especial pra você!"
    }
];


// ==========================================
// DATA DA REVELAÇÃO FINAL
// ==========================================

const finalRevealDate = new Date("2026-12-13T00:00:00-03:00");


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const gallery = document.getElementById("gallery");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const weeklyTitle = document.getElementById("weeklyTitle");
const weeklyFact = document.getElementById("weeklyFact");
const weeklyNumber = document.getElementById("weeklyNumber");

const finalText = document.getElementById("finalText");
const revealButton = document.getElementById("revealButton");


// ==========================================
// DESCOBRE QUAL SEMANA ESTÁ LIBERADA
// ==========================================

function getCurrentWeek() {
    const now = new Date();

    let currentWeek = 0;

    weeks.forEach((week) => {
        const weekDate = new Date(week.date);

        if (now >= weekDate) {
            currentWeek = week.number;
        }
    });

    return currentWeek;
}


// ==========================================
// FORMATA DATA
// ==========================================

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit"
    });
}


// ==========================================
// CRIA A GALERIA
// ==========================================

function createGallery() {

    const currentWeek = getCurrentWeek();

    gallery.innerHTML = "";

    weeks.forEach((week) => {

        const isUnlocked = week.number <= currentWeek;

        const card = document.createElement("article");

        card.className = isUnlocked
            ? "gallery-card unlocked"
            : "gallery-card locked";


        // ==================================
        // CARD BLOQUEADO
        // ==================================

        if (!isUnlocked) {

            card.innerHTML = `
                <div class="locked-image">

                    <div class="question-mark">
                        ?
                    </div>

                    <span class="week-label">
                        SEMANA ${String(week.number).padStart(2, "0")}
                    </span>

                </div>

                <div class="card-info">

                    <span class="card-date">
                        Disponível em ${formatDate(week.date)}
                    </span>

                    <h3>
                        Ainda não...
                    </h3>

                </div>
            `;

        }


        // ==================================
        // CARD DESBLOQUEADO
        // ==================================

        else {

            card.innerHTML = `
                <div class="image-wrapper">

                    <img
                        src="${week.image}"
                        alt="Imagem da semana ${week.number}"
                        draggable="false"
                    >

                    <span class="week-label">
                        SEMANA ${String(week.number).padStart(2, "0")}
                    </span>

                </div>

                <div class="card-info">

                    <span class="card-date">
                        ${formatDate(week.date)}
                    </span>

                    <h3>
                        ${week.phrase}
                    </h3>

                </div>
            `;
        }

        gallery.appendChild(card);
    });
}


// ==========================================
// ATUALIZA A FRASE SOBRE MIM
// ==========================================

function updateWeeklyFact() {

    const currentWeek = getCurrentWeek();

    if (currentWeek === 0) {

        weeklyNumber.textContent = "EM BREVE";

        weeklyTitle.textContent = "Uma coisa sobre mim";

        weeklyFact.textContent =
            "A cada semana, você vai descobrir um pouquinho mais sobre mim.";

        return;
    }

    const currentData = weeks[currentWeek - 1];

    weeklyNumber.textContent =
        `SEMANA ${String(currentWeek).padStart(2, "0")}`;

    weeklyTitle.textContent =
        "Uma coisa sobre mim";

    weeklyFact.textContent =
        currentData.fact;
}


// ==========================================
// ATUALIZA CONTAGEM REGRESSIVA
// ==========================================

function updateCountdown() {

    const now = new Date();

    let nextDate = null;


    // Procura a próxima semana ainda bloqueada
    for (const week of weeks) {

        const weekDate = new Date(week.date);

        if (now < weekDate) {

            nextDate = weekDate;

            break;
        }
    }


    // Se todas as imagens já foram liberadas,
    // conta até a revelação final.

    if (!nextDate) {
        nextDate = finalRevealDate;
    }


    const difference = nextDate - now;


    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        createGallery();
        updateWeeklyFact();

        return;
    }


    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


// ==========================================
// REVELAÇÃO FINAL
// ==========================================

function updateFinalReveal() {

    const now = new Date();

    if (now >= finalRevealDate) {

        revealButton.disabled = false;

        revealButton.textContent =
            "Revelar surpresa";

        finalText.textContent =
            "Depois de tantas semanas, finalmente chegou o momento.";

    } else {

        revealButton.disabled = true;

        revealButton.textContent =
            "Ainda não...";

        finalText.textContent =
            "A última parte dessa surpresa ainda está esperando o momento certo.";
    }
}


// ==========================================
// BOTÃO DA REVELAÇÃO
// ==========================================

revealButton.addEventListener("click", () => {

    const now = new Date();

    if (now < finalRevealDate) {
        return;
    }

    finalText.innerHTML = `
        <strong>
            Finalmente. 💚
        </strong>
        <br><br>
        Espero que essa pequena surpresa tenha valido a espera.
    `;

    revealButton.style.display = "none";
});


// ==========================================
// PROTEÇÃO SIMPLES DAS IMAGENS
// ==========================================

document.addEventListener("contextmenu", (event) => {

    if (event.target.tagName === "IMG") {
        event.preventDefault();
    }

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

createGallery();
updateWeeklyFact();
updateCountdown();
updateFinalReveal();


// Atualiza o relógio

setInterval(() => {

    updateCountdown();
    updateFinalReveal();

}, 1000);
