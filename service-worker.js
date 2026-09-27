self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        clients.claim()
    );
});


self.addEventListener("push", event => {

    console.log("PUSH RECEBIDO PELO SERVICE WORKER");

    let data = {
        title: "Tem novidade 👀",
        body: "Tem uma nova parte da surpresa esperando por você!"
    };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (error) {
            console.error("Erro ao interpretar o push:", error);
        }
    }

    event.waitUntil(
        self.registration.showNotification(
            data.title || "Tem novidade 👀",
            {
                body:
                    data.body ||
                    "Tem uma nova parte da surpresa esperando por você!",

                icon: "/favicon.png",
                badge: "/favicon.png",

                tag: "surpresa-semanal",

                data: {
                    url: "/"
                }
            }
        )
    );

});


self.addEventListener("notificationclick", event => {

    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(clientList => {

            for (const client of clientList) {

                if ("focus" in client) {
                    return client.focus();
                }

            }

            return clients.openWindow("/");
        })
    );

});