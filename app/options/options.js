document.body.onload = function () {

    let hyperlinkCheckboxes = document.getElementsByClassName("hyperlinkCheckbox");

    for (var i = 0; i < hyperlinkCheckboxes.length; i++) {
        let key = hyperlinkCheckboxes[i].id;

        chrome.storage.sync.get(key, function (data) {
            var element = document.getElementById(key);
            console.log(key, data[key])

            if (data[key] === undefined) {
                if (key !== "enableHyperLink"){
                    chrome.storage.sync.set({ [key]: 0 }, function () {
                        element.checked = false;
                    });
                } else {
                    chrome.storage.sync.set({ [key]: 1 }, function () {
                        element.checked = true;
                    });
                }
                window.location.reload();
            } else {
                if (data[key] === 0) {
                    element.checked = false;

                    if(key === "enableHyperLink" || key === "enableDomain") {
                        disableSession(key+"Session");
                    }
                } else {
                    element.checked = true;

                    if(key === "enableHyperLink" || key === "enableDomain") {
                        enableSession(key);
                    }

                    switch (key) {
                        case "uppercase":
                            document.getElementById("hyperlinkPreviewText").innerHTML = document.getElementById("hyperlinkPreviewText").innerHTML.toUpperCase();
                            break;
                        case "bold":
                            document.getElementById("hyperlinkPreviewText").style.fontWeight = "bold";
                            break;
                        case "italic":
                            document.getElementById("hyperlinkPreviewText").style.fontStyle = "italic";
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

function enableSession(id) {
    document.getElementById(id).style.opacity = "1";
}

function disableSession(id) {
    document.getElementById(id).style.opacity = "0.5";
}