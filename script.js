// ==========================================
// CONFIGURAÇÃO DAS SEMANAS
// ==========================================

const weeks = [
    {
        number: 1,
        date: "2026-09-27T00:00:00-03:00",
        image: "imagens/1.png",
        phrase: "E então? Algum palpite? kkkkk",
        fact: "Uma coisa que você provavelmente vai perceber sobre mim: eu gosto bastante de música kkkkk",
        lockedPhrase: "Ainda tem tempo..."
    },

    {
        number: 2,
        date: "2026-10-04T00:00:00-03:00",
        image: "imagens/2.png",
        phrase: "Ainda está difícil descobrir? 👀",
        fact: "Eu gosto muito de aprender coisas novas, principalmente quando posso descobrir sozinho como elas funcionam",
        lockedPhrase: "Ainda não..."
    },

    {
        number: 3,
        date: "2026-10-11T00:00:00-03:00",
        image: "imagens/3.png",
        phrase: "Talvez dê pra começar a pensar em algo...",
        fact: "Uma coisa meio minha é que, quando alguma coisa dá problema, eu gosto de tentar descobrir o que aconteceu antes de simplesmente deixar pra lá quase paranoico dependendo da situação, gosto de compreender",
        lockedPhrase: "Passem logo semanas 😭"
    },

    {
        number: 4,
        date: "2026-10-18T00:00:00-03:00",
        image: "imagens/4.png",
        phrase: "Está começando a fazer sentido? kkkkk",
        fact: "Eu gosto de tirar e editar fotos, geralmente da natureza (às vezes fico horas editando fotos kkkkk)",
        lockedPhrase: "Ainda tem 7 semanas..."
    },

    {
        number: 5,
        date: "2026-10-25T00:00:00-03:00",
        image: "imagens/5.png",
        phrase: "Dá pra ter um palpite melhor kkkkk",
        fact: "Muitas coisas que eu sei fazer hoje eu aprendi simplesmente procurando ou fuçando até conseguir",
        lockedPhrase: "Quase meio caminho andado!"
    },

    {
        number: 6,
        date: "2026-11-01T00:00:00-03:00",
        image: "imagens/6.png",
        phrase: "Acho que já ficou impossível não ter uma ideia 👀",
        fact: "Eu gosto de criar coisas do zero, mesmo quando no começo eu ainda não faço ideia de como fazer",
        lockedPhrase: "A ansiedade deve estar sufocando kkkk"
    },

    {
        number: 7,
        date: "2026-11-08T00:00:00-03:00",
        image: "imagens/7.png",
        phrase: "Estamos chegando perto...",
        fact: "Eu gosto quando consigo aprender alguma coisa que antes parecia complicada",
        lockedPhrase: "4 semanas!"
    },

    {
        number: 8,
        date: "2026-11-15T00:00:00-03:00",
        image: "imagens/8.png",
        phrase: "Pelo menos finge que ainda não descobriu kkkkkk",
        fact: "Eu rio de tudo kkkkk, quando estou nervoso, feliz, às vezes até em péssimos momentos até mesmo por mensagens kkkk deu pra perceber eu acho, espero que isso não seja incômodo kkkkk",
        lockedPhrase: "Falta pouco!"
    },

    {
        number: 9,
        date: "2026-11-22T00:00:00-03:00",
        image: "imagens/9.png",
        phrase: "Agora falta pouco...",
        fact: "Além do curso de inglês, eu já participei de um projeto de iniciação científica e fui medalhista de olimpiadas do estado de São Paulo 3x (não é muita coisa), pode não ser muita coisa, mas são conquistas que fico bem feliz de ter feito parte e gostaria de compartilhar kkkkk",
        lockedPhrase: "Tá perto!"
    },

    {
        number: 10,
        date: "2026-11-29T00:00:00-03:00",
        image: "imagens/10.png",
        phrase: "Com certeza dá pra saber kkkkk 😊",
        fact: "Essa surpresa começou como uma ideia e acabou ficando muito maior do que eu imaginava kkkkkk",
        lockedPhrase: "Só mais 2 semanas!"
    },

    {
        number: 11,
        date: "2026-12-06T00:00:00-03:00",
        image: "imagens/11.png",
        phrase: "Última antes do GRANDE dia!",
        fact: "O fato de hoje é: devo estar mais ansioso que você pra esse presente chegar kkkkk",
        lockedPhrase: "Última semana!!!!"
    },

    {
        number: 12,
        date: "2026-12-13T00:00:00-03:00",
        image: "imagens/12.png",
        phrase: "Chegou o grande dia! 😁",
        fact: "Esse presente eu pensei em te dar no momento que vi você dizer que gostava da cor verde mas não tinha muita roupa que poderia vestir então quis te dar esse presente, espero que possa ser especial pra você!",
        lockedPhrase: "Chegou o grande dia! Dica para o momento certo: a caixa com doces não é pesada desse jeito kkkk"
    }
];


// ==========================================
// DATA DA REVELAÇÃO FINAL
// ==========================================

const finalRevealDate =
    new Date("2026-12-13T00:00:00-03:00");


// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const gallery =
    document.getElementById("gallery");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const weeklyTitle =
    document.getElementById("weeklyTitle");

const weeklyFact =
    document.getElementById("weeklyFact");

const weeklyNumber =
    document.getElementById("weeklyNumber");

const finalText =
    document.getElementById("finalText");

const revealButton =
    document.getElementById("revealButton");

const aboutSection =
    document.querySelector(".about-section");


// ==========================================
// DESCOBRE QUAL SEMANA ESTÁ LIBERADA
// ==========================================

function getCurrentWeek() {

    const now = new Date();

    let currentWeek = 0;

    weeks.forEach((week) => {

        const weekDate =
            new Date(week.date);

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

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit"
        }
    );
}


// ==========================================
// CRIA A GALERIA
// ==========================================

function createGallery() {

    const currentWeek =
        getCurrentWeek();

    gallery.innerHTML = "";

    weeks.forEach((week) => {

        // A semana 12 é a revelação final.
        // Ela não aparece como card na galeria.

        if (week.number === 12) {
            return;
        }

        const isUnlocked =
            week.number <= currentWeek;

        const card =
            document.createElement("article");

        card.className =
            isUnlocked
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
                        ${week.lockedPhrase}
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

    const currentWeek =
        getCurrentWeek();


    // No dia da revelação final,
    // não mostra a curiosidade da semana 12.

    if (currentWeek >= 12) {

        if (aboutSection) {
            aboutSection.style.display = "none";
        }

        return;
    }


    // Garante que a seção esteja visível
    // antes da semana 12.

    if (aboutSection) {
        aboutSection.style.display = "";
    }


    if (currentWeek === 0) {

        weeklyNumber.textContent =
            "EM BREVE";

        weeklyTitle.textContent =
            "Uma coisa sobre mim";

        weeklyFact.textContent =
            "A cada semana, você vai descobrir um pouquinho mais sobre mim.";

        return;
    }


    const currentData =
        weeks[currentWeek - 1];


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

    const now =
        new Date();

    let nextDate = null;


    // Procura a próxima semana ainda bloqueada

    for (const week of weeks) {

        const weekDate =
            new Date(week.date);

        if (now < weekDate) {

            nextDate =
                weekDate;

            break;
        }
    }


    // Se todas as imagens já foram liberadas,
    // conta até a revelação final.

    if (!nextDate) {

        nextDate =
            finalRevealDate;
    }


    const difference =
        nextDate - now;


    if (difference <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        createGallery();
        updateWeeklyFact();

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
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

    const now =
        new Date();


    if (now >= finalRevealDate) {

        revealButton.disabled =
            false;

        revealButton.textContent =
            "Revelar surpresa";

        finalText.textContent =
            "Depois de tantas semanas, finalmente chegou o momento!";

    } else {

        revealButton.disabled =
            true;

        revealButton.textContent =
            "Aguenta aí!";

        finalText.textContent =
            "A última parte dessa surpresa ainda está esperando o momento certo";
    }
}


// ==========================================
// BOTÃO DA REVELAÇÃO
// ==========================================

revealButton.addEventListener(
    "click",
    () => {

        const now =
            new Date();

        if (now < finalRevealDate) {
            return;
        }


        const finalData =
            weeks.find(
                (week) =>
                    week.number === 12
            );


        let finalImage =
            document.getElementById(
                "finalImage"
            );


        if (!finalImage && finalData) {

            finalImage =
                document.createElement("img");

            finalImage.id =
                "finalImage";

            finalImage.src =
                finalData.image;

            finalImage.alt =
                "Revelação final";

            finalImage.draggable =
                false;

            finalImage.style.display =
                "block";

            finalImage.style.width =
                "100%";

            finalImage.style.maxWidth =
                "900px";

            finalImage.style.height =
                "auto";

            finalImage.style.margin =
                "30px auto";

            finalImage.style.borderRadius =
                "16px";

            finalImage.style.userSelect =
                "none";

            finalImage.style.webkitUserSelect =
                "none";

            finalImage.style.boxShadow =
                "0 15px 40px rgba(0, 0, 0, 0.25)";


            finalText.parentNode.insertBefore(
                finalImage,
                finalText
            );
        }


        finalText.innerHTML = `
            <strong>
                Finalmente!
            </strong>

            <br><br>

            Espero que essa pequena surpresa tenha valido a espera!
        `;


        revealButton.style.display =
            "none";
    }
);


// ==========================================
// PROTEÇÃO SIMPLES DAS IMAGENS
// ==========================================

document.addEventListener(
    "contextmenu",
    (event) => {

        if (event.target.tagName === "IMG") {
            event.preventDefault();
        }

    }
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

createGallery();

updateWeeklyFact();

updateCountdown();

updateFinalReveal();


// ==========================================
// ATUALIZA O RELÓGIO
// ==========================================

setInterval(
    () => {

        updateCountdown();

        updateFinalReveal();

    },
    1000
);


// ==========================================
// CONVERSÃO DA CHAVE VAPID
// ==========================================

function urlBase64ToUint8Array(
    base64String
) {

    const padding =
        "=".repeat(
            (4 - base64String.length % 4) % 4
        );

    const base64 =
        (base64String + padding)
            .replace(/-/g, "+")
            .replace(/_/g, "/");

    const rawData =
        window.atob(base64);

    return Uint8Array.from(
        [...rawData].map(
            char =>
                char.charCodeAt(0)
        )
    );
}


// ==========================================
// ATIVAÇÃO DAS NOTIFICAÇÕES
// ==========================================

async function ativarNotificacoes() {

    try {

        if (!("Notification" in window)) {

            console.log(
                "Este navegador não suporta notificações."
            );

            return;
        }


        if (!("serviceWorker" in navigator)) {

            console.log(
                "Este navegador não suporta Service Worker."
            );

            return;
        }


        const permission =
            await Notification.requestPermission();


        if (permission !== "granted") {

            console.log(
                "Permissão para notificações negada."
            );

            return;
        }


        const registration =
            await navigator.serviceWorker.register(
                "/service-worker.js"
            );


        const response =
            await fetch(
                "/api/vapid-public-key"
            );


        if (!response.ok) {

            throw new Error(
                "Não foi possível obter a chave VAPID."
            );
        }


        const { publicKey } =
            await response.json();


        const applicationServerKey =
            urlBase64ToUint8Array(
                publicKey
            );


        const subscription =
            await registration.pushManager.subscribe({

                userVisibleOnly: true,

                applicationServerKey

            });


        const subscribeResponse =
            await fetch(
                "/api/subscribe",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            subscription
                        )

                }
            );


        if (!subscribeResponse.ok) {

            throw new Error(
                "Não foi possível salvar a inscrição."
            );
        }


        console.log(
            "Notificações ativadas com sucesso!"
        );

    } catch (error) {

        console.error(
            "Erro ao ativar notificações:",
            error
        );

    }
}


// ==========================================
// BOTÃO DE NOTIFICAÇÕES
// ==========================================

const notificationButton =
    document.getElementById(
        "notificationButton"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        async () => {

            await ativarNotificacoes();

            if (
                Notification.permission ===
                "granted"
            ) {

                notificationButton.textContent =
                    "🔔 Notificações ativadas!";

                notificationButton.disabled =
                    true;
            }

        }
    );
}
// ==========================================
// SENHA DE ACESSO
// ==========================================

const passwordInput =
    document.getElementById("passwordInput");

const passwordButton =
    document.getElementById("passwordButton");

const passwordMessage =
    document.getElementById("passwordMessage");

const passwordScreen =
    document.getElementById("passwordScreen");

const siteContent =
    document.getElementById("siteContent");


passwordButton.addEventListener(
    "click",
    () => {

        const senha =
            passwordInput.value;


        if (senha === "080826") {

            passwordScreen.style.display =
                "none";

            siteContent.style.display =
                "block";

        } else {

            passwordMessage.textContent =
                "Senha incorreta!";

            passwordInput.value =
                "";

            passwordInput.focus();

        }

    }
);
