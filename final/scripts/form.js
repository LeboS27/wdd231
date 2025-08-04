// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Load saved values from localStorage
    if (localStorage.getItem('mvuraName')) {
        nameInput.value = localStorage.getItem('mvuraName');
    }
    if (localStorage.getItem('mvuraEmail')) {
        emailInput.value = localStorage.getItem('mvuraEmail');
    }

    // Save input values to localStorage on change
    nameInput.addEventListener('input', () => {
        localStorage.setItem('mvuraName', nameInput.value);
    });

    emailInput.addEventListener('input', () => {
        localStorage.setItem('mvuraEmail', emailInput.value);
    });
});
