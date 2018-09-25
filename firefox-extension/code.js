browser.browserAction.onClicked.addListener(tab => {
  let createData = {
    type: "detached_panel",
    url: "index.html",
    width: 280,
    height: 450
  };
  let creating = browser.windows.create(createData);
});