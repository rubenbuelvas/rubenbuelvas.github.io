let resumeData = {};
const EN = 'en';
const FR = 'fr';
const ES = 'es';
let currentLang = EN;

async function loadResume() {
    const response = await fetch('./data.json');
    resumeData = await response.json();
    render();
}

function render() {
    const lang = resumeData[currentLang];
    
    document.getElementById('subtitle').innerText = lang.subtitle;
    document.getElementById('exp-title').innerText = lang.experience_title;
    document.getElementById('skills-title').innerText = lang.skills_title;

    // Render Experience
    const expList = document.getElementById('experience-list');
    expList.innerHTML = lang.jobs.map(job => `
        <div class="job">
            <h3>${job.title}</h3>
            <p>${job.subtitle}</p>
            <p>${job.description}</p>
            <ul>${job.desc.map(d => `<li>${d}</li>`).join('')}</ul>
            <p><strong>${job.tech_stack_title}:</strong> ${job.tech_stack.join(', ')}.</p>
        </div>
    `).join('');

    // Render Skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = lang.skills.map(s => `<li>${s}</li>`).join('');
}

// Language Toggles
document.getElementById('lang-toggle-en').onclick = () => {
    currentLang = EN;
    render();
};

document.getElementById('lang-toggle-fr').onclick = () => {
    currentLang = FR;
    render();
};

document.getElementById('lang-toggle-es').onclick = () => {
    currentLang = ES;
    render();
};

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

loadResume();