async function getSelectedText(tab, elementId) {
    let result;
    try {
        [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => getSelection().toString()
        });
        try {
            document.getElementById(elementId).value = result;
            return result;
        } catch (e) {
            console.log(e);
        };
    } catch (e) {
        console.log(e);
    };
}