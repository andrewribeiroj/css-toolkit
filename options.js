document.body.onload = function () {

    let hyperlinkCheckboxes = document.getElementsByClassName("hyperlinkCheckbox");

    for (var i = 0; i < hyperlinkCheckboxes.length; i++) {
        let key = hyperlinkCheckboxes[i].id;

        chrome.storage.sync.get(key, function (data) {
            var element = document.getElementById(key);

            if (data[key] === undefined) {
                chrome.storage.sync.set({ [key]: 0 }, function () {
                    element.checked = false;
                });
            } else {
                if (data[key] === 0) {
                    element.checked = false;
                } else {
                    element.checked = true;

                    switch (key) {
                        case "uppercase":
                            document.getElementById("hyperlinkPreview").innerHTML = document.getElementById("hyperlinkPreview").innerHTML.toUpperCase();
                            break;
                        case "bold":
                            document.getElementById("hyperlinkPreview").style.fontWeight = "bold";
                            break;
                        case "italic":
                            document.getElementById("hyperlinkPreview").style.fontStyle = "italic";
                            break;
                    }
                }
            }
        });
    }
}

document.getElementById("save").addEventListener('click', function () {
    let hyperlinkCheckboxes = document.getElementsByClassName("hyperlinkCheckbox");

    for (var i = 0; i < hyperlinkCheckboxes.length; i++) {
        let key = hyperlinkCheckboxes[i].id;

        if (hyperlinkCheckboxes[i].checked) {
            chrome.storage.sync.set({ [key]: 1 }, function () {
                document.getElementById(key).checked = true;
            });
        } else {
            chrome.storage.sync.set({ [key]: 0 }, function () {
                document.getElementById(key).checked = false;
            });
        }
    }

    location.reload();
})

document.getElementById("reset").onclick = function () {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
        alert('Settings cleared!');
    });
    chrome.storage.sync.clear();

    location.reload();
}