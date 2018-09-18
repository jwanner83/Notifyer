browser.browserAction.onClicked.addListener(tab => {
  let createData = {
    type: "detached_panel",
    url: "index.html",
    width: 275,
    height: 475
  };
  let creating = browser.windows.create(createData);
});