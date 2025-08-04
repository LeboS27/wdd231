document.addEventListener('DOMContentLoaded', () => {
    // --- NAVIGATION TOGGLE ---
    const nav = document.querySelector('nav ul');
    const toggleBtn = document.createElement('button');
    toggleBtn.setAttribute('aria-label', 'Toggle menu');
    toggleBtn.classList.add('nav-toggle');
    toggleBtn.innerHTML = '&#9776;'; // Hamburger icon
    nav.parentNode.insertBefore(toggleBtn, nav);

    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true' || false;
        toggleBtn.setAttribute('aria-expanded', !expanded);
    });

    // --- VISIT MESSAGE ---
    const visitMessageEl = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('mvuraLastVisit');
    const now = Date.now();

    if (visitMessageEl) {
        if (lastVisit) {
            const daysAgo = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
            visitMessageEl.textContent = `Welcome back! Your last visit was ${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago.`;
        } else {
            visitMessageEl.textContent = 'Welcome to MvuraEye! Thanks for visiting for the first time.';
        }
    }

    localStorage.setItem('mvuraLastVisit', now);

    // --- MODAL DIALOG SETUP ---
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloseBtns = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('open');
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('open');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Close modal on overlay click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // --- ASYNC FETCH FUNCTION WITH ERROR HANDLING ---
    async function fetchJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }

    // Expose fetchJSON globally for other scripts
    window.fetchJSON = fetchJSON;

    // --- TEMPLATE RENDER HELPER ---
    // Usage example:
    // const html = renderTemplate(`<li>${item.name} - ${item.value}</li>`, item);
    function renderTemplate(template, data) {
        return template.replace(/\${(.*?)}/g, (_, key) => data[key.trim()] || '');
    }

    window.renderTemplate = renderTemplate;

    // --- EVENT DELEGATION EXAMPLE ---
    document.body.addEventListener('click', event => {
        if (event.target.matches('.dynamic-button')) {
            alert('You clicked a dynamic button!');
        }
    });
});
