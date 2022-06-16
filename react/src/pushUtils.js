const publicVapidKey =
  "BK1I6nWP3FykTf9aWN30lTIskD4yeTUpa5L9kTIfs9ZA68ko4WtjD2rQ75IAfWSzFx3PiJtPdZG_TjbtD0NBTY8";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Register SW, Register Push, Send Push

async function registerPush(reg) {
  console.log("Service Worker Registered...");

  // Register push
  console.log("Registering Push ...");
  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("Push Registered ...");

  // Send Push Notification
  console.log("Sending Push ...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Push send...");
}

export async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker
    .register("/worker.js", {
      scope: "/",
    })
    .then(async (reg) => {
      if (reg.installing) {
        console.log("Service worker installing");
        await send();
      } else if (reg.waiting) {
        console.log("Service worker installed");
        await send();
      } else if (reg.active) {
        console.log("Service worker active");
        registerPush(reg);
      }
    });
}
