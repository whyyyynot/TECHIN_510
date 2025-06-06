// Main JavaScript file for the Porsche 911 Evolution website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    initHeroSection();
    initTimeline();
    
    // Add smooth scrolling
    initSmoothScrolling();

    // Force scroll to top on page load to prevent browser restoring previous position
    // window.scrollTo(0, 0);
});

// Force scroll to top after the entire page has loaded (including resources)
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
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