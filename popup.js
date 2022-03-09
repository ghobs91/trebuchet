let bypass = document.getElementById("bypass");

bypass.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let url = tab.url;
  console.log("url", url);
  //chrome.storage.sync.set({ url });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: generateBypassLink,
    args: [url],
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function generateBypassLink(url) {
  let new_url = "http://archive.is/newest/"+url;
  window.open(new_url, "_blank");
}
