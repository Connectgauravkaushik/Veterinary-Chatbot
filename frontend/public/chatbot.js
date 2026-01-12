(function () {
  if (window.__VETBOT__) return;
  window.__VETBOT__ = true;

  function createIframe() {
    const iframe = document.createElement("iframe");
    iframe.src = "https://cheerful-snickerdoodle-caafdf.netlify.app/";
    iframe.id = "vetbot-iframe";

    iframe.style.position = "fixed";
    iframe.style.bottom = "16px";
    iframe.style.right = "16px";
    iframe.style.width = "480px";
    iframe.style.height = "620px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "16px";
    iframe.style.zIndex = "999999";
    iframe.style.background = "transparent";

    // Mobile friendly
    if (window.innerWidth < 500) {
      iframe.style.width = "95vw";
      iframe.style.height = "90vh";
      iframe.style.right = "2.5vw";
      iframe.style.bottom = "5vh";
    }

    document.body.appendChild(iframe);

    iframe.onload = () => {
      if (window.VetChatbotConfig) {
        iframe.contentWindow.postMessage(
          { type: "VET_CONTEXT", data: window.VetChatbotConfig },
          "*"
        );
      }
    };
  }

  if (document.readyState === "complete") {
    createIframe();
  } else {
    window.addEventListener("load", createIframe);
  }
})();
