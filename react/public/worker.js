console.log("Service Worker Loader...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Received... kiki");
  self.registration.showNotification(data.title, {
    body: "Notified by Me 2 ",
    icon: "https://image.ibb.co/frYOFd/tmlogo.png",
  });
});
