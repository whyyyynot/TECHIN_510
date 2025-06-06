document.addEventListener('DOMContentLoaded', () => {
    const muteButton = document.getElementById('mute-btn');
    const muteIcon = document.getElementById('mute-icon');
    const heroVideo = document.getElementById('hero-video');

    if (!muteButton || !muteIcon || !heroVideo) {
        console.error('Mute button, mute icon, or hero video not found!');
        return;
    }

    const volumeUpIcon = 'assets/volume_up.svg';
    const volumeMuteIcon = 'assets/volume_mute.svg';

    // Function to update the icon based on video muted state
    function updateMuteButtonIcon() {
        if (heroVideo.muted) {
            muteIcon.src = volumeMuteIcon;
            muteIcon.alt = 'Unmute Video';
        } else {
            muteIcon.src = volumeUpIcon;
            muteIcon.alt = 'Mute Video';
        }
    }

    // Set initial icon state
    updateMuteButtonIcon();

    // Add click event listener to the button to toggle mute and update icon
    muteButton.addEventListener('click', () => {
        heroVideo.muted = !heroVideo.muted;
    });

    // Update icon if the video's muted state changes (e.g., by clicking the button)
    heroVideo.addEventListener('volumechange', updateMuteButtonIcon);
}); 