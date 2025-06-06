// JavaScript for the Overview Button and Panel hover functionality

document.addEventListener('DOMContentLoaded', () => {
    // Get references to the button and the panel
    const overviewButton = document.getElementById('overview-btn');
    const overviewPanel = document.querySelector('.overview-menu-panel');

    // Exit if elements are not found (check console for this error)
    if (!overviewButton || !overviewPanel) {
        console.error('Overview button (#overview-btn) or Overview panel (.overview-menu-panel) not found.');
        return;
    }

    let panelHideTimeout; // To manage the delay before hiding the panel

    // --- Event Listeners ---

    // Show panel when mouse enters the button area
    overviewButton.addEventListener('mouseenter', () => {
        clearTimeout(panelHideTimeout); // Cancel any pending hide operations
        overviewPanel.classList.add('open');
    });

    // Hide panel when mouse leaves the button area (with a slight delay)
    overviewButton.addEventListener('mouseleave', () => {
        // Start a timer to hide the panel
        // This delay allows moving the mouse from the button to the panel
        panelHideTimeout = setTimeout(() => {
            overviewPanel.classList.remove('open');
        }, 100); // Adjust delay as needed (milliseconds)
    });

    // Prevent panel from hiding when mouse enters the panel area (cancel pending hide)
    overviewPanel.addEventListener('mouseenter', () => {
        clearTimeout(panelHideTimeout); // Cancel the hide timer
        overviewPanel.classList.add('open'); // Ensure it stays open
    });

    // Hide panel when mouse leaves the panel area (with the same slight delay)
    overviewPanel.addEventListener('mouseleave', () => {
         panelHideTimeout = setTimeout(() => {
            overviewPanel.classList.remove('open');
        }, 100); // Must match the button mouseleave delay
    });

    // Optional: Hide the panel if user clicks anywhere outside the button or panel
    // document.addEventListener('click', (event) => {
    //     if (!overviewButton.contains(event.target) && !overviewPanel.contains(event.target)) {
    //         overviewPanel.classList.remove('open');
    //     }
    // });
}); 