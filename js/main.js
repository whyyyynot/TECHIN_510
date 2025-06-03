// Main JavaScript file for the Porsche 911 Evolution website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    initHeroSection();
    initTimeline();
    initEngineSounds();
    initBuildGame();
    initGenerator();
    
    // Add smooth scrolling
    initSmoothScrolling();
    setupHeroVideoSoundTrigger();

    // Overview floating button and panel logic
    const overviewBtn = document.getElementById('overview-btn');
    const overviewPanel = document.getElementById('overview-panel');
    let overviewPanelTimeout;
    if (overviewBtn && overviewPanel) {
        // Toggle panel on click
        overviewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            overviewPanel.classList.toggle('open');
        });
        // Show panel on hover (desktop)
        overviewBtn.addEventListener('mouseenter', () => {
            clearTimeout(overviewPanelTimeout);
            overviewPanel.classList.add('open');
        });
        overviewBtn.addEventListener('mouseleave', () => {
            overviewPanelTimeout = setTimeout(() => overviewPanel.classList.remove('open'), 300);
        });
        overviewPanel.addEventListener('mouseenter', () => {
            clearTimeout(overviewPanelTimeout);
        });
        overviewPanel.addEventListener('mouseleave', () => {
            overviewPanelTimeout = setTimeout(() => overviewPanel.classList.remove('open'), 300);
        });
        // Close panel on link click
        overviewPanel.querySelectorAll('.overview-link').forEach(link => {
            link.addEventListener('click', () => {
                overviewPanel.classList.remove('open');
            });
        });
        // Close panel on outside click
        document.addEventListener('click', (e) => {
            if (!overviewPanel.contains(e.target) && !overviewBtn.contains(e.target)) {
                overviewPanel.classList.remove('open');
            }
        });
    }

    // Sticky button scroll logic
    function handleStickyBtns() {
        const muteBtn = document.getElementById('mute-btn');
        const overviewBtn = document.getElementById('overview-btn');
        if (window.scrollY > 100) {
            muteBtn.classList.add('sticky-btn');
            overviewBtn.classList.add('sticky-btn');
        } else {
            muteBtn.classList.remove('sticky-btn');
            overviewBtn.classList.remove('sticky-btn');
        }
    }
    window.addEventListener('scroll', handleStickyBtns);
    handleStickyBtns(); // Run on load
});

// Hero Section
function initHeroSection() {
    const heroSection = document.querySelector('.hero-section');
    
    // Add parallax effect
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
}

// Timeline Section
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    
    // Add intersection observer for timeline items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// Engine Sounds Section
function initEngineSounds() {
    const yearSlider = document.querySelector('.year-slider');
    const currentYear = document.querySelector('.current-year');
    const engineAudio = document.getElementById('engine-audio');
    
    // Engine sound mapping
    const engineSounds = {
        '1963': 'assets/audio/engine-1963.mp3',
        '1973': 'assets/audio/engine-1973.mp3',
        '1989': 'assets/audio/engine-1989.mp3',
        '1993': 'assets/audio/engine-1993.mp3',
        '1997': 'assets/audio/engine-1997.mp3',
        '2004': 'assets/audio/engine-2004.mp3',
        '2011': 'assets/audio/engine-2011.mp3',
        '2019': 'assets/audio/engine-2019.mp3'
    };
    
    yearSlider.addEventListener('input', (e) => {
        const year = e.target.value;
        currentYear.textContent = year;
        
        // Find the closest available year
        const availableYears = Object.keys(engineSounds).map(Number);
        const closestYear = availableYears.reduce((prev, curr) => {
            return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev;
        });
        
        // Update audio source
        if (engineSounds[closestYear]) {
            engineAudio.src = engineSounds[closestYear];
            engineAudio.play();
        }
    });
}

// Build Game Section
function initBuildGame() {
    const gameContainer = document.querySelector('.game-container');
    
    // Add drag and drop functionality
    const partItems = document.querySelectorAll('.part-item');
    partItems.forEach(item => {
        item.setAttribute('draggable', true);
        
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.dataset.partType);
        });
    });
    
    const previewArea = document.querySelector('.preview-area');
    previewArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    previewArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const partType = e.dataTransfer.getData('text/plain');
        // Handle part placement
    });
}

// Generator Section
function initGenerator() {
    const generatorContainer = document.querySelector('.generator-container');
    const shareButton = document.querySelector('.share-button');
    
    shareButton.addEventListener('click', () => {
        // Generate final image and description
        generateAndShare();
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enable hero video sound when user is in the first section
function enableHeroVideoSound() {
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.muted = false;
        heroVideo.volume = 1.0;
        heroVideo.play();
    }
}

// Listen for user interaction to enable sound (required by browsers)
function setupHeroVideoSoundTrigger() {
    let soundEnabled = false;
    function tryEnableSound() {
        if (soundEnabled) return;
        // Only enable if user is at the hero section (top of page)
        // Only unmute if muteBtnUsed is false (now from window)
        if (window.scrollY < window.innerHeight / 2 && !window.muteBtnUsed) {
            enableHeroVideoSound();
            soundEnabled = true;
            // Remove listeners after enabling
            window.removeEventListener('click', tryEnableSound);
            window.removeEventListener('keydown', tryEnableSound);
        } else if (window.scrollY < window.innerHeight / 2) {
            // Remove listeners even if not enabling sound, to avoid repeated checks
            soundEnabled = true;
            window.removeEventListener('click', tryEnableSound);
            window.removeEventListener('keydown', tryEnableSound);
        }
    }
    window.addEventListener('click', tryEnableSound);
    window.addEventListener('keydown', tryEnableSound);
} 