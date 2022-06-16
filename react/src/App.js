import React from "react";
import * as pushUtils from "./pushUtils";

// window.addEventListener("push", (e) => {
//   const data = e.data.json();
//   console.log("  ... bibi");
//   window.registration.showNotification(data.title, {
//     body: "Notified by Me",
//     icon: "http://image.ibb.co/frYOFd/tmlogo.png",
//   });
// });

function handleSend() {
  if ("serviceWorker" in navigator) {
    pushUtils.send().catch((err) => console.error(err));
  }
}

function App() {
  // Check for service worker

  return (
    <div className="App">
      <button onClick={handleSend}> send </button>
    </div>
  );
}

export default App;
