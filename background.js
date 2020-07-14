browser.contextMenus.create({
  id: "discard-tab",
  title: "Discard Tab",
  contexts: ["tab"]
});

function discard_to_nearest(tab_to_discard) {
  browser.tabs.query({ active: false, currentWindow: true, discarded: false }).then((non_discarded_tabs) => {
    if (non_discarded_tabs.length == 0) {
      return;
    }

    var nearest_tab = non_discarded_tabs.reduce(function(prev, curr) {
      return (Math.abs(curr.index - tab_to_discard.index) < Math.abs(prev.index - tab_to_discard.index) ? curr : prev);
    });

    browser.tabs.update(nearest_tab.id, { active: true }).then((done) => {
      browser.tabs.discard(tab_to_discard.id);
    })
  });
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "discard-tab") {
    browser.tabs.query({ active: true, currentWindow: true }).then((current_tabs) => {
      if (current_tabs[0].id == tab.id) {
        discard_to_nearest(current_tabs[0]);
      } else {
        browser.tabs.discard(tab.id);
      }
    })
  }
});

browser.commands.onCommand.addListener(function(command) {
  if (command == "discard-tab-command") {
    browser.tabs.query({ active: true, currentWindow: true }).then((current_tabs) => {
      discard_to_nearest(current_tabs[0]);
    })
  }
});

