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