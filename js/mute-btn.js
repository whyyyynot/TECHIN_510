// Mute/Unmute button logic for hero video (independent)
document.addEventListener('DOMContentLoaded', () => {
    const muteBtn = document.getElementById('mute-btn');
    const muteIcon = document.getElementById('mute-icon');
    const heroVideo = document.getElementById('hero-video');
    // Add a flag to track if the mute button was used
    window.muteBtnUsed = false; // Expose globally if needed by other scripts
    if (muteBtn && muteIcon && heroVideo) {
        function updateMuteIcon() {
            muteIcon.src = heroVideo.muted ? 'assets/volume_mute.svg' : 'assets/volume_up.svg';
            muteIcon.alt = heroVideo.muted ? 'Muted' : 'Unmuted';
        }
        muteBtn.addEventListener('click', () => {
            heroVideo.muted = !heroVideo.muted;
            updateMuteIcon();
            window.muteBtnUsed = true; // Set flag when mute button is used
            if (!heroVideo.muted) heroVideo.play();
        });
        updateMuteIcon();
    }
    // Ensure video tries to play on load (muted, for autoplay)
    if (heroVideo) {
        heroVideo.play().catch(() => {});
        // Unmute and play after first user interaction
        function enableSound() {
            heroVideo.muted = false;
            heroVideo.volume = 1.0;
            heroVideo.play();
            window.removeEventListener('click', enableSound);
            window.removeEventListener('keydown', enableSound);
        }
        window.addEventListener('click', enableSound);
        window.addEventListener('keydown', enableSound);
    }
}); 