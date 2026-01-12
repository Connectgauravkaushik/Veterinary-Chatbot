(function () {
  if (window.__VETBOT__) return;
  window.__VETBOT__ = true;

  const iframe = document.createElement("iframe");
  iframe.src = "https://YOUR-NETLIFY-SITE.netlify.app"; 
  iframe.style = `
    position:fixed;
    bottom:0;
    right:0;
    width:360px;
    height:480px;
    border:none;
    z-index:9999;
  `;

  document.body.appendChild(iframe);

  iframe.onload = () => {
    if (window.VetChatbotConfig) {
      iframe.contentWindow.postMessage(
        { type: "VET_CONTEXT", data: window.VetChatbotConfig },
        "*"
      );
    }
  };
})();
