
window.addEventListener('load', doit);
function doit() {
  const cart = document.getElementById('olpOfferListColumn').querySelectorAll('input[name="submit.addToCart"]')[0];
  console.log('checking...')
  if (!cart) {
    window.location.reload();
    return;
  }
  cart.click();
  const title = document.querySelectorAll('h1[role="main"]')[0].innerText;
  window.addEventListener('unload', () => {
    chrome.runtime.sendMessage({ greeting: "hello", title }, function (response) { });
  })
};
doit();