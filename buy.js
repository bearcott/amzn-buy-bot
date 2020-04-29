window.addEventListener('load', () => {
  const lmao = setInterval(() => {
    try {
      document.querySelectorAll('input[name="placeYourOrder1"]')[0].click();
      chrome.runtime.sendMessage({ greeting: "goodbye" }, function (response) { });
      clearInterval(lmao);
    } catch (e) { }
  }, 100);
});