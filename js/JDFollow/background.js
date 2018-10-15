chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.cmd) {
        case "follow":
            if (message.tabId) {
                chrome.tabs.update(message.tabId, {
                    url: message.url,
                    selected: false
                }, function(tab) {
                    sendResponse({tabId: tab.id});
                });
            } else {
                chrome.tabs.create({
                    url: message.url,
                    selected: false
                }, function(tab) {
                    sendResponse({tabId: tab.id});
                });                
            }
            return true;
        break;

        default:
        break;
    }
});