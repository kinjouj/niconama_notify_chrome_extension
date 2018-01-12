import "babel-polyfill";

const SYNC_INTERVAL = 10;
const URL = "http://live.nicovideo.jp/api/relive/notifybox.content";

function sync() {
  return fetch(URL, { credentials: "include" }).then(async response => {
    const json = await response.json();
    const data = json.data;
    const notifyboxes = data.notifybox_content;
    return notifyboxes;
  });
}

function updateBadgeFromLength(len) {
  chrome.browserAction.setBadgeText({ text: String(len) });
  chrome.browserAction.setBadgeBackgroundColor({ color: len > 0 ? "#F00" : "#00F" });
}

function openWindow(notifyboxes) {
  if (notifyboxes.length <= 0) {
    return;
  }

  let width = 700, height = 700
  let left = window.screen.availLeft + window.screen.availWidth / 2 - width / 2;
  let top = window.screen.availTop + window.screen.availHeight / 2 - height / 2;

  chrome.windows.create(
    {
      "url": "index.html",
      "left": Math.floor(left),
      "top": Math.floor(top),
      "width": width,
      "height": height
    },
    (w) => {
      chrome.tabs.query({ active: true, windowId: w.id }, tabs => {
        const tab = tabs.shift();
        setTimeout(() => chrome.tabs.sendMessage(tab.id, notifyboxes), 3000);
      });
    }
  );
}

chrome.browserAction.onClicked.addListener(() => {
  sync().then(notifyboxes => {
    openWindow(notifyboxes);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  sync().then(notifyboxes => {
    updateBadgeFromLength(notifyboxes.length);
  });
});
chrome.alarms.create("niconama-notify", { periodInMinutes: SYNC_INTERVAL });
sync().then(notifyboxes => {
  updateBadgeFromLength(notifyboxes.length);
});
