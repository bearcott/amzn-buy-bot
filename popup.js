let status = document.getElementById('status');
let test = document.getElementById('test');
let url = document.getElementById('url');
let duration = document.getElementById('duration');

let statusMsg = ['Start bot!', 'Stop bot!'];


chrome.storage.sync.get(['url','duration','startedTabs'],(data)=>{ 
  chrome.tabs.getSelected(null, function (tab) {
    status.innerText = statusMsg[data.startedTabs.includes(tab.id) ? 1 : 0];
    url.value = data.url;
    duration.value = data.duration;
  });
});

function webhookMsg(msg, url) {
  try {
    chrome.storage.sync.get('url',(data)=>{ 
      fetch(url || data.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: msg }) });
    });
  }catch(e) {}
}

let lmao;

url.onchange = function(element) {
  chrome.storage.sync.set({url:element.target.value}, (data)=>{ });
};
duration.onchange = function(element) {
  chrome.storage.sync.set({duration:element.target.value}, (data)=>{ });
};
test.onclick = function(element) {
  webhookMsg('STATUS: test message (webhook working)');
};

status.onclick = function(element) {
  chrome.storage.sync.get('startedTabs',(data)=>{
    chrome.tabs.getSelected(null, function (tab) {
      if (!data.startedTabs.includes(tab.id)) {
        chrome.storage.sync.set({startedTabs: [...data.startedTabs, tab.id] }, function() { }); 
        status.innerText = statusMsg[1];
        chrome.runtime.sendMessage({ greeting: "hey clown!", tabId: tab.id }, function (response) { });
      } else {
        chrome.storage.sync.set({startedTabs: data.startedTabs.filter(x=>x!==tab.id)}, function() { });
        status.innerText = statusMsg[0];
        chrome.runtime.sendMessage({ greeting: "get to work!", tabId: tab.id }, function (response) { });
      }
    })
  });
};

