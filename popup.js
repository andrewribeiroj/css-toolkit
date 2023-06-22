var button = document.getElementById('get');
var div = document.getElementById('url');

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
                    document.getElementById('getHyperLink').classList.remove('btn-primary');
                    document.getElementById('getHyperLink').classList.add('btn-success');
                    document.getElementById('getHyperLinkIcon').classList.remove('bi-clipboard');
                    document.getElementById('getHyperLinkIcon').classList.add('bi-clipboard-check');

                    setTimeout(() => {
                        document.getElementById('getHyperLink').classList.remove('btn-success');
                        document.getElementById('getHyperLink').classList.add('btn-primary');
                        document.getElementById('getHyperLinkIcon').classList.remove('bi-clipboard-check');
                        document.getElementById('getHyperLinkIcon').classList.add('bi-clipboard');
                    }, 2000);
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
                    document.getElementById('getUrl').classList.remove('btn-primary');
                    document.getElementById('getUrl').classList.add('btn-success');
                    document.getElementById('getUrlIcon').classList.remove('bi-clipboard');
                    document.getElementById('getUrlIcon').classList.add('bi-clipboard-check');

                    setTimeout(() => {
                        document.getElementById('getUrl').classList.remove('btn-success');
                        document.getElementById('getUrl').classList.add('btn-primary');
                        document.getElementById('getUrlIcon').classList.remove('bi-clipboard-check');
                        document.getElementById('getUrlIcon').classList.add('bi-clipboard');
                    }, 2000);
                },
                () => { }
            );
        });
    });
}