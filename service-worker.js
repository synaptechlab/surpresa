self.addEventListener("push", event => {

    let data = {
        title: "Tem novidade 👀",
        body: "Tem uma nova parte da surpresa esperando por você!"
    };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (error) {
            console.error("Erro ao ler payload:", error);
        }
    }

    const title = data.title || "Tem novidade 👀";

    const options = {
        body: data.body || "Tem uma nova parte da surpresa esperando por você!",
        icon: "/favicon.png",
        badge: "/favicon.png",
        tag: "surpresa-semanal",
        renotify: true,
        requireInteraction: false,
        data: {
            url: "/"
        }
    };

    event.waitUntil(
        self.registration.showNotification(
            title,
            options
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

            if (clients.openWindow) {
                return clients.openWindow("/");
            }

        })
    );

});
