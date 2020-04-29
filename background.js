const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/704836664803065956/YdhGtu4Xi04TsrlSnnVi6rM9NzF5pHlUiYO4Zk3fdGcn_s5PRnHFwzpqCcliD4b6J_c9';

function webhookMsg(msg) {
  fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: msg }) });
}

let lmao;

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.getSelected(null, function (tab) {
    try {
      lmao = setInterval(() => {
        chrome.tabs.executeScript(tab.id, { file: "watch.js" });
      }, 3000);
    } catch (e) {
      clearInterval(lmao);
    }
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "hello") {
    chrome.tabs.executeScript(sender.tab.id, { file: "checkout.js" });
    clearInterval(lmao);
  }
  if (request.greeting == "how are you?") {
    chrome.tabs.executeScript(sender.tab.id, { file: "buy.js" });
    webhookMsg('STATUS: in cart!');
  }
  if (request.greeting == "goodbye") {
    chrome.tabs.executeScript(sender.tab.id, { file: "checkout.js" });
    webhookMsg('STATUS: Bought! Yay!');
    clearInterval(lmao);
  }
});
