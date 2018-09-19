chrome.browserAction.onClicked.addListener(tab => {
  chrome.windows.create({
    type: "popup",
    focused: true,
    url: chrome.runtime.getURL("index.html"),
    width: 280,
    height: 425
  });
});