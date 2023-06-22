var button = document.getElementById('get');
var div = document.getElementById('url');

window.onload = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let result;
    try {
        [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => getSelection().toString()
        });
        try {
            document.getElementById('selectedText').value = result;
        } catch (e) {
            console.log(e);
        };
    } catch (e) {
        console.log(e);
    };
}

document.getElementById('getHyperLink').onclick = function () {
    chrome.storage.sync.get(null, function (data) {
        var settings = data;
        var keys = Object.keys(data);

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log(settings)
            var activeTab = tabs[0];
            var url = activeTab.url;
            var title = activeTab.title;
            var html = '<a href="' + url + '">' + title + '</a>';

            keys.forEach(key => {
                switch (key) {
                    case "uppercase":
                        if (settings[key] === 1)
                            html = html.toUpperCase();
                        break;
                    case "bold":
                        if (settings[key] === 1)
                            html = '<b>' + html + '</b>';
                        break;
                    case "italic":
                        if (settings[key] === 1)
                            html = '<i>' + html + '</i>';
                        break;
                }
            });

            const blobTitle = new Blob([title], { type: "text/plain" });
            const blobLink = new Blob([html], { type: "text/html" });

            const data = [new ClipboardItem({
                ["text/plain"]: blobTitle,
                ["text/html"]: blobLink,
            })];

            navigator.clipboard.write(data).then(
                () => {
                    console.log("Successfully copied to clipboard!");
                    successMessage('getHyperLink', 'getHyperLinkIcon');
                },
                () => { }
            );
        });
    });
}

document.getElementById('getUrl').onclick = function () {
    chrome.storage.sync.get(null, function (data) {
        var settings = data;
        var keys = Object.keys(data);

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log(settings)
            var activeTab = tabs[0];
            var url = activeTab.url;
            var html = '<a href="' + url + '">' + url + '</a>';

            keys.forEach(key => {
                switch (key) {
                    case "uppercase":
                        if (settings[key] === 1)
                            html = html.toUpperCase();
                        break;
                    case "bold":
                        if (settings[key] === 1)
                            html = '<b>' + html + '</b>';
                        break;
                    case "italic":
                        if (settings[key] === 1)
                            html = '<i>' + html + '</i>';
                        break;
                }
            });

            const blobTitle = new Blob([url], { type: "text/plain" });
            const blobLink = new Blob([html], { type: "text/html" });

            const data = [new ClipboardItem({
                ["text/plain"]: blobTitle,
                ["text/html"]: blobLink,
            })];

            navigator.clipboard.write(data).then(
                () => {
                    console.log("Successfully copied to clipboard!");
                    successMessage('getUrl', 'getUrlIcon');
                },
                () => { }
            );
        });
    });
}

function successMessage(button, icon) {
    document.getElementById(button).classList.remove('btn-primary');
    document.getElementById(button).classList.add('btn-success');
    document.getElementById(icon).classList.remove('bi-clipboard');
    document.getElementById(icon).classList.add('bi-clipboard-check');

    document.getElementById('success-message').classList.remove('collapse');
    document.getElementById('success-message').classList.add('collapse.show');

    setTimeout(() => {
        document.getElementById(button).classList.remove('btn-success');
        document.getElementById(button).classList.add('btn-primary');
        document.getElementById(icon).classList.remove('bi-clipboard-check');
        document.getElementById(icon).classList.add('bi-clipboard');

        document.getElementById('success-message').classList.remove('collapse.show');
        document.getElementById('success-message').classList.add('collapse');
    }, 2000);
}