let resumeData = {};
const EN = 'en';
const FR = 'fr';
const ES = 'es';
const ACTIVE_LANGS = [EN, FR];
let currentLang = EN;

async function loadResume() {
    const response = await fetch('./data.json');
    resumeData = await response.json();
    render();
}

function render() {
    const lang = resumeData[currentLang];
    

    document.getElementById('download-resume').innerText = lang.download_resume;
    document.getElementById('subtitle').innerText = lang.subtitle;
    document.getElementById('exp-title').innerText = lang.experience_title;

    // Render Experience
    const expList = document.getElementById('experience-list');
    expList.innerHTML = lang.jobs.map(job => `
        <div class="job">
            <h3>${job.title}</h3>
            <p>${job.subtitle}</p>
            <p>${job.description}</p>
            <ul>${job.bullet_points.map(d => `<li>${d}</li>`).join('')}</ul>
            <p><strong>${job.tech_stack_title}:</strong> ${job.tech_stack.join(', ')}.</p>
        </div>
    `).join('');

    // Render Aside
    const aside = document.getElementById('aside');
    aside.innerHTML = lang.aside_elements.map(element => `
        <h2>${element.title}</h2>
        <ul>${element.items.map(item => `<li>${item}</li>`).join('')}</ul>
    `).join('');
}

// Set active language button
function setActiveLang(activeId) {
    ACTIVE_LANGS.map(lang => `lang-toggle-${lang}`)
        .forEach(id => document.getElementById(id).classList.remove('active'));
    document.getElementById(activeId).classList.add('active');
}

// Language Toggles
ACTIVE_LANGS.forEach(lang => {
    let btnId = `lang-toggle-${lang}`;
    let btn = document.getElementById(btnId);
    if (btn) {
        btn.onclick = () => {
            currentLang = lang;
            setActiveLang(btnId);
            render();
        };
    }
});

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.onclick = () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.innerText = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.innerText = '☀️';
    }
};

// Download Resume
const downloadBtn = document.getElementById('download-resume');
downloadBtn.onclick = () => {
    let filePath = currentLang === EN ?
        'assets/Resume Rubén Buelvas EN.pdf' :
        'assets/CV Rubén Buelvas FR.pdf';
    window.open(filePath, '_blank');
};

loadResume();
setActiveLang('lang-toggle-en');