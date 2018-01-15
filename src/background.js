import "babel-polyfill";

const SYNC_INTERVAL = 10;
const URL = "http://live.nicovideo.jp/api/relive/notifybox.content";
const noop = () => {};

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
  if (notifyboxes.length <= 0)
    return;

  chrome.tabs.create({ url: "http://www.nicovideo.jp/my/live#ch" });
}

chrome.browserAction.onClicked.addListener(() => {
  sync().then(notifyboxes => {
    openWindow(notifyboxes);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  sync().then(notifyboxes => {
    updateBadgeFromLength(notifyboxes.length);
    /*
    for (var notify in notifyboxes) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon_niconico.png",
        title: "Live started",
        message: `${notify.title}`
      });
    }
    */
  });
});
chrome.alarms.create("niconama-notify", { periodInMinutes: SYNC_INTERVAL });
sync().then(notifyboxes => {
  updateBadgeFromLength(notifyboxes.length);
});
