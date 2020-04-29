window.addEventListener('load', () => {
  const lmao = setInterval(() => {
    try {
      document.getElementById('hlb-ptc-btn-native').click();
      clearInterval(lmao);
    } catch (e) { }
  }, 100);
  window.addEventListener('unload', () => {
    chrome.runtime.sendMessage({ greeting: "how are you?" }, function (response) { });
  })
});