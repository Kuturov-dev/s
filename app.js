let ledStates = {
    led1: false,
    led2: false,
    led3: false,
    bedroom1: false,
    bedroom2: false,
    bedroom3: false,
    kitchen1: false,
    kitchen2: false,
    kitchen3: false,
    living1: false,
    living: false,
    living3: false
};

function loadSavedStates() {
    const savedStates = localStorage.getItem('ledStates');
    if (savedStates) {
        ledStates = JSON.parse(savedStates);
        updateAllLedStates();
    }
}

function saveStates() {
    localStorage.setItem('ledStates', JSON.stringify(ledStates));
}

function toggleLed(ledId) {
    ledStates[ledId] = !ledStates[ledId];
    updateLedState(ledId);
    saveStates();
}

function updateLedState(ledId) {
    const statusElement = document.getElementById(`${ledId}-status`);
    if (statusElement) {
        statusElement.textContent = ledStates[ledId] ? 'Pornit' : 'Oprit';
        statusElement.className = `led-status ${ledStates[ledId] ? 'on' : 'off'}`;
    }
}

function updateAllLedStates() {
    Object.keys(ledStates).forEach(ledId => {
        updateLedState(ledId);
    });
}

function updateDateTime() {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19).replace('T', ' ');
    document.getElementById('datetime').textContent = formatted;
}

function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { 
                value: 0.5,
                random: false
            },
            size: { 
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedStates();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    initializeParticles();
});

window.toggleLed = toggleLed;