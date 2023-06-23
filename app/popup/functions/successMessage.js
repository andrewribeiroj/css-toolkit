export function successMessage(button, icon) {
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