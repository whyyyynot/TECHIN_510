document.addEventListener('DOMContentLoaded', () => {
    const muteButton = document.getElementById('mute-btn');
    const overviewButton = document.getElementById('overview-btn');

    if (!muteButton || !overviewButton) {
        console.error('Mute button or Overview button not found!');
        return;
    }

    // Define the scroll threshold (in pixels) before the buttons become sticky
    const stickyThreshold = 100; // Adjust this value as needed

    function handleScroll() {
        if (window.scrollY > stickyThreshold) {
            muteButton.classList.add('sticky-btn');
            overviewButton.classList.add('sticky-btn');
        } else {
            muteButton.classList.remove('sticky-btn');
            overviewButton.classList.remove('sticky-btn');
        }
    }

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Call the function once on load to set the initial state
    handleScroll();
}); 