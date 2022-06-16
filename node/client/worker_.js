console.log("Service Worker Loader...");

window.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Received... toto");
  window.registration.showNotification(data.title, {
    body: "Notified by Me",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
});
