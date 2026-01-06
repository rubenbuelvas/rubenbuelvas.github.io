// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.onclick = () => {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
};

// Language Toggle
const langBtn = document.getElementById('lang-toggle');
let currentLang = 'en';
langBtn.onclick = () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${currentLang}`);
    });
};