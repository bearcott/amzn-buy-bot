const SRC_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/704836664803065956/YdhGtu4Xi04TsrlSnnVi6rM9NzF5pHlUiYO4Zk3fdGcn_s5PRnHFwzpqCcliD4b6J_c9';
const DEFAULT_DURATION = 3;

function webhookMsg(msg, url) {
  try {
    chrome.storage.sync.get('url',(data)=>{ 
      fetch(url || data.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: msg }) });
    });
  } catch(e) {}
}

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({duration: DEFAULT_DURATION}, function() { });
  chrome.storage.sync.set({startedTabs: []}, function() { });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({ }) ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// chrome.pageAction.onClicked.addListener(() => {
//   chrome.tabs.getSelected(null, function (tab) {
//     try {
//       lmao = setInterval(() => {
//         chrome.tabs.executeScript(tab.id, { file: "watch.js" });
//       }, 3000);
//     } catch (e) {
//       clearInterval(lmao);
//     }
//   });
// });

let lmao = [];

function stopTab(tabId) {
  const tab = lmao.find(x=>x.tab===tabId);
  if (!tab) return;
  lmao = lmao.filter(x=>x.tab!==tabId)
  clearInterval(tab.interval);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "get to work!") {
    stopTab(request.tabId);
  };
  if (request.greeting == "hey clown!") {
    try {
      chrome.storage.sync.get('duration',(data)=>{
        lmao.push({
          tab: request.tabId,
          interval: setInterval(() => {
            chrome.tabs.executeScript(request.tabId, { file: "watch.js" });
          }, data.duration*1000)
        });
      });
    } catch (e) {
      console.log(e);
      stopTab(request.tabId);
    }
  }
  if (request.greeting == "hello") {
    chrome.tabs.executeScript(sender.tab.id, { file: "checkout.js" });
    webhookMsg(`STATUS: ${request.title} is in stock!!`);
    webhookMsg(`STATUS: ${request.title} is in stock!!`, SRC_WEBHOOK_URL);
    stopTab(sender.tab.id);
  }
  if (request.greeting == "how are you?") {
    chrome.tabs.executeScript(sender.tab.id, { file: "buy.js" });
    webhookMsg('STATUS: Added to cart!');
  }
  if (request.greeting == "goodbye") {
    chrome.tabs.executeScript(sender.tab.id, { file: "checkout.js" });
    webhookMsg('STATUS: Bought! Yay!');
    stopTab(sender.tab.id);
  }
  sendResponse({});
  return true;
});
