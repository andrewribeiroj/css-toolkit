document.body.onload = function () {

    let HyperlinkCheckboxes = document.getElementsByClassName("HyperlinkCheckbox");

    for (var i = 0; i < HyperlinkCheckboxes.length; i++) {
        let key = HyperlinkCheckboxes[i].id;

        chrome.storage.sync.get(key, function (data) {
            var element = document.getElementById(key);
            console.log(key, data[key])

            if (data[key] === undefined) {
                if (key !== "enableHyperlink"){
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

                    if(key === "enableHyperlink" || key === "enableDomain") {
                        disableSession(key+"Session");
                    }
                } else {
                    element.checked = true;

                    if(key === "enableHyperlink" || key === "enableDomain") {
                        enableSession(key);
                    }

                    switch (key) {
                        case "uppercase":
                            document.getElementById("HyperlinkPreviewText").innerHTML = document.getElementById("HyperlinkPreviewText").innerHTML.toUpperCase();
                            break;
                        case "bold":
                            document.getElementById("HyperlinkPreviewText").style.fontWeight = "bold";
                            break;
                        case "italic":
                            document.getElementById("HyperlinkPreviewText").style.fontStyle = "italic";
                            break;
                    }
                }
            }
        });
    }
}

document.getElementById("save").addEventListener('click', function () {
    let HyperlinkCheckboxes = document.getElementsByClassName("HyperlinkCheckbox");

    for (var i = 0; i < HyperlinkCheckboxes.length; i++) {
        let key = HyperlinkCheckboxes[i].id;

        if (HyperlinkCheckboxes[i].checked) {
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