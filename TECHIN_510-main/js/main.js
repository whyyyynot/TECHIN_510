// Main JavaScript file for the Porsche 911 Evolution website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    initHeroSection();
    initTimeline();
    initEngineSounds();
    initBuildGame();
    initGenerator();
});

// Hero Section
function initHeroSection() {
    const heroSection = document.querySelector('.hero-section');
    // Add any hero section specific animations or interactions
}

// Timeline Section
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    // Timeline initialization logic will be in timeline.js
}

// Engine Sounds Section
function initEngineSounds() {
    const yearSlider = document.querySelector('.year-slider');
    const currentYear = document.querySelector('.current-year');
    const engineAudio = document.getElementById('engine-audio');

    yearSlider.addEventListener('input', (e) => {
        const year = e.target.value;
        currentYear.textContent = year;
        // Update audio source based on year
        // This will be implemented in the audio handling logic
    });
}

// Build Game Section
function initBuildGame() {
    const gameContainer = document.querySelector('.game-container');
    // Game initialization logic will be in game.js
}

// Generator Section
function initGenerator() {
    const generatorContainer = document.querySelector('.generator-container');
    const shareButton = document.querySelector('.share-button');

    shareButton.addEventListener('click', () => {
        // Implement share functionality
        console.log('Share functionality to be implemented');
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 