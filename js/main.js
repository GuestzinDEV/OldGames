// DICIONÁRIO COMPLETO DE IDIOMAS (Com a nova categoria inclusa)
const translations = {
    EN: {
        disclaimer: "This website is a gaming site that contains games from third-party developers or some browser games created by Old Studio Games. The target audience of the site is children and teenagers. This website complies with key security regulations such as the Brazilian Digital Statute for Children and Adolescents (ECA Digital) and COPPA (Children's Online Privacy Protection Act), Because this site does not contain loot boxes, online gambling, and does not have an open chat directly on the website.",
        continueBtn: "Continue",
        nickWarning: "Choose your name (it is recommended that you do not use real names or names that contain personal information).",
        setNickBtn: "Set Nickname",
        visits: "Website visits: ",
        online: "People online now: ",
        thirdParty: "Main third-party games:",
        pcOnlyGames: "Third-party games (working only on PC):",
        internal: "Top games from Old Studio Web:",
        comingSoon: "Coming Soon...",
        execDev: "Executive Developer:",
        creativeDev: "Creative Developers:",
        discordBtn: "Join our Discord"
    },
    PT: {
        disclaimer: "Este site é um portal de jogos que contém títulos de desenvolvedores terceiros ou jogos de navegador criados pela Old Studio Games. O público-alvo são crianças e adolescentes. O site está em conformidade com regulamentações de segurança fundamentais, como o Estatuto da Criança e do Adolescente Digital (ECA Digital) do Brasil e a COPPA (Lei de Proteção da Privacidade Online das Crianças), visto que não contém loot boxes, apostas online ou chats abertos diretamente na página.",
        continueBtn: "Progredir",
        nickWarning: "Escolha o seu nome (recomenda-se não utilizar nomes reais ou dados pessoais).",
        setNickBtn: "Definir Nickname",
        visits: "Visitas ao site: ",
        online: "Pessoas online agora: ",
        thirdParty: "Principais jogos de terceiros:",
        pcOnlyGames: "Jogos de terceiros (funcionando apenas no PC):",
        internal: "Melhores jogos da Old Studio Web:",
        comingSoon: "Em breve...",
        execDev: "Desenvolvedor Executivo:",
        creativeDev: "Desenvolvedores Criativos:",
        discordBtn: "Entrar no Discord"
    },
    ES: {
        disclaimer: "Este sitio web es un portal de juegos que contiene títulos de terceros o juegos de navegador creados por Old Studio Games. El público objetivo son niños y adolescentes. Cumple con las normativas de segurança clave como el Estatuto Digital del Niño y del Adolescente (ECA Digital) de Brasil y COPPA (Ley de Protección de la Privacidad Infantil en Línea), ya que no contiene cajas de botín, apuestas en línea ni chats abiertos.",
        continueBtn: "Continuar",
        nickWarning: "Elige teu nombre (se recomienda no usar nombres reales ni información personal).",
        setNickBtn: "Establecer Nickname",
        visits: "Visitas al sitio web: ",
        online: "Personas en línea agora: ",
        thirdParty: "Principais juegos de terceros:",
        pcOnlyGames: "Juegos de terceros (funcionando solo en PC):",
        internal: "Mejores juegos de Old Studio Web:",
        comingSoon: "Próximamente...",
        execDev: "Desarrollador Ejecutivo:",
        creativeDev: "Desarrolladores Creativos:",
        discordBtn: "Unirse a Discord"
    },
    RU: {
        disclaimer: "Этот веб-сайт представляет собой игровой портал, содержащий игры от сторонних разработчиков или некоторые браузерные игры, созданные Old Studio Games. Целевая аудитория — дети и подростки. Сайт соответствует ключевым правилам безопасности, таким как Бразильский цифровой статус детей и подростков (ECA Digital) и COPPA (Закон о защите конфиденциальности детей в Интернете), так как не содержит лутбоксов, азартных игр и открытых чатов.",
        continueBtn: "Продолжить",
        nickWarning: "Выберите имя (рекомендуется не использовать реальные имена или личные данные).",
        setNickBtn: "Установить никнейм",
        visits: "Визитов на сайт: ",
        online: "Людей онлайн: ",
        thirdParty: "Основные сторонние игры:",
        pcOnlyGames: "Сторонние игры (работают только на ПК):",
        internal: "Лучшие игры от Old Studio Web:",
        comingSoon: "Скоро...",
        execDev: "Исполнительный разработчик:",
        creativeDev: "Креативные разработчики:",
        discordBtn: "Наш Discord сервер"
    }
};

// CONTROLE DE FLUXO E VARIÁVEIS LOCAIS
let currentLang = localStorage.getItem('site_lang') || 'EN';
let totalPlayTime = parseInt(localStorage.getItem('total_play_time')) || 0;
let userNickname = localStorage.getItem('user_nickname') || '';

// DOM Elements
const disclaimerScreen = document.getElementById('disclaimer-screen');
const nicknameScreen = document.getElementById('nickname-screen');
const mainInterface = document.getElementById('main-interface');
const nicknameInput = document.getElementById('nickname-input');
const btnSetNickname = document.getElementById('btn-set-nickname');
const displayNickname = document.getElementById('display-nickname');
const playtimeCounter = document.getElementById('playtime-counter');
const langSelect = document.getElementById('lang-select');

// INICIALIZAÇÃO DA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    langSelect.value = currentLang;
    applyTranslations(currentLang);
    mockOnlineCounter();
    handleStaticVisitsCounter();

    if (userNickname) {
        disclaimerScreen.classList.remove('active');
        nicknameScreen.classList.remove('active');
        mainInterface.classList.remove('hidden');
        displayNickname.innerText = userNickname;
        startPlaytimeTracker();
    } else {
        disclaimerScreen.classList.add('active');
    }
});

// EVENTO: Botão avançar do Aviso Inicial
document.getElementById('btn-accept-disclaimer').addEventListener('click', () => {
    disclaimerScreen.classList.remove('active');
    nicknameScreen.classList.add('active');
});

// EVENTO: Validação em tempo real do Input de Nickname
nicknameInput.addEventListener('input', () => {
    if (nicknameInput.value.trim().length > 0) {
        btnSetNickname.classList.remove('disabled');
        btnSetNickname.disabled = false;
    } else {
        btnSetNickname.classList.add('disabled');
        btnSetNickname.disabled = true;
    }
});

// EVENTO: Salvar Nickname e entrar no menu principal
btnSetNickname.addEventListener('click', () => {
    const nick = nicknameInput.value.trim();
    if (nick) {
        userNickname = nick;
        localStorage.setItem('user_nickname', nick);
        displayNickname.innerText = nick;
        nicknameScreen.classList.remove('active');
        mainInterface.classList.remove('hidden');
        startPlaytimeTracker();
    }
});

// EVENTO: Troca Global Dinâmica de Idiomas
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('site_lang', currentLang);
    applyTranslations(currentLang);
});

// FUNÇÃO PARA APLICAR AS TRADUÇÕES NA TELA
function applyTranslations(lang) {
    const t = translations[lang];
    document.getElementById('disclaimer-text').innerText = t.disclaimer;
    document.getElementById('btn-accept-disclaimer').innerText = t.continueBtn;
    document.getElementById('nickname-warning').innerText = t.nickWarning;
    document.getElementById('btn-set-nickname').innerText = t.setNickBtn;
    document.getElementById('title-third-party').innerText = t.thirdParty;
    document.getElementById('title-pc-only').innerText = t.pcOnlyGames;
    document.getElementById('title-internal').innerText = t.internal;
    document.getElementById('coming-soon').innerText = t.comingSoon;
    document.getElementById('grid-exec') ? document.getElementById('grid-exec').innerText = t.execDev : null; 
    document.getElementById('cred-exec').innerText = t.execDev;
    document.getElementById('cred-creative').innerText = t.creativeDev;
    document.querySelector('.discord-btn').innerText = t.discordBtn;
    
    updateVisitsUI();
}

// RASTREADOR DE TEMPO DE JOGO EM TEMPO REAL
function startPlaytimeTracker() {
    setInterval(() => {
        totalPlayTime++;
        localStorage.setItem('total_play_time', totalPlayTime);
        formatPlaytimeDisplay(totalPlayTime);
    }, 1000);
}

function formatPlaytimeDisplay(totalSeconds) {
    const days = Math.floor(totalSeconds / (3600 * 24));
    totalSeconds %= (3600 * 24);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const pad = num => String(num).padStart(2, '0');
    playtimeCounter.innerText = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

// CONTROLADORES DE IFRAME (Abre os links externos em nova aba como configurado anteriormente)
function openGame(url) {
    window.open(url, '_blank');
}

function closeGame() {
    const modal = document.getElementById('game-container-modal');
    const iframe = document.getElementById('game-iframe');
    iframe.src = "";
    modal.classList.add('hidden');
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
}

function toggleFullscreen() {
    const modal = document.getElementById('game-container-modal');
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(err => {
            console.error(`Erro ao ativar tela cheia: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// CONTADOR DE VISITAS ADAPTADO PARA SITE ESTÁTICO (GitHub Pages)
let globalVisits = 0;

function handleStaticVisitsCounter() {
    // Carrega um número base inicial persistente ou gera um aleatório alto para dar robustez ao site
    let savedVisits = parseInt(localStorage.getItem('static_visits_count'));
    
    if (!savedVisits) {
        savedVisits = Math.floor(Math.random() * 400) + 1250; // Começa com um número alto e realista
    }
    
    savedVisits += 1; // Incrementa a cada carregamento/atualização de página
    localStorage.setItem('static_visits_count', savedVisits);
    globalVisits = savedVisits;
    updateVisitsUI();
}

function updateVisitsUI() {
    const t = translations[currentLang];
    document.getElementById('stat-visits').innerText = `${t.visits}${globalVisits}`;
}

function mockOnlineCounter() {
    const onlineEl = document.getElementById('stat-online');
    setInterval(() => {
        const t = translations[currentLang];
        const baseOnline = Math.floor(Math.random() * 5) + 3; 
        onlineEl.innerText = `${t.online}${baseOnline}`;
    }, 4000);
}
