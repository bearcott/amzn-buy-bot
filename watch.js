const haha = setInterval(() => {
  var list = document.getElementById('olpOfferListColumn');
  if (list.innerText === "Currently, there are no sellers that can deliver this item to your location.") {
    window.location.reload();
    clearInterval(haha);
    return;
  }
  const cart = document.getElementById('olpOfferListColumn').querySelectorAll('input[name="submit.addToCart"]')[0];
  console.log(cart);
  if (!cart) {
    return;
  }
  cart.click();
  window.addEventListener('unload', () => {
    chrome.runtime.sendMessage({ greeting: "hello" }, function (response) { });
  })
  clearInterval(haha);
}, 100);