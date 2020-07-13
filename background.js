browser.contextMenus.create({
  id: "unload-tab",
  title: "Unload Tab",
  contexts: ["tab"]
});

var upid = 0;

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "unload-tab") {
    let active = browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      if (tabs[0].id == tab.id){
      let next = browser.tabs.query({index:tabs[0].index + 1, currentWindow: true}).then((tab2) => {
        var ind = tab2[0].id
        var updating = browser.tabs.update(ind, { active: true }).then((done) => {
          browser.tabs.discard(tab.id);
        })
      })
      } else {
        browser.tabs.discard(tab.id);
      }
    })
  }
});

browser.commands.onCommand.addListener(function(command) {
  if (command == "unload-tab-c") {
    let active = browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
      let next = browser.tabs.query({index:tabs[0].index + 1, currentWindow: true}).then((tab2) => {
        var ind = tab2[0].id
        var updating = browser.tabs.update(ind, { active: true }).then((done) => {
          browser.tabs.discard(tabs[0].id);
        })
      })
    })
  }
});

