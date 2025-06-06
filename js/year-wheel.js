const years = [1963, 1973, 1989, 1993, 1997, 2004, 2011, 2019];
// Placeholder timestamps (in seconds) for each year in evolution.mp4
const yearTimestamps = {
    1963: 5,
    1973: 15,
    1989: 25,
    1993: 35,
    1997: 45,
    2004: 55,
    2011: 65,
    2019: 75
};

const yearWheel = document.getElementById('year-wheel');
const yearVideo = document.getElementById('year-video');
const videoSource = 'assets/Evolution.mp4';

// Function to create and append year elements
function createYearElements() {
    years.forEach(year => {
        const yearElement = document.createElement('div');
        yearElement.classList.add('year-wheel-year');
        yearElement.textContent = year;
        yearElement.dataset.year = year; // Store year as data attribute
        
        yearElement.addEventListener('click', () => {
            // Remove 'active' class from all years
            document.querySelectorAll('.year-wheel-year').forEach(el => {
                el.classList.remove('active');
            });
            
            // Add 'active' class to the clicked year
            yearElement.classList.add('active');
            
            // Seek video to the corresponding timestamp
            seekVideoToYear(year);
            
            // Scroll the clicked year into view
            yearElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
        
        yearWheel.appendChild(yearElement);
    });
}

// Function to seek video to the timestamp for the given year
function seekVideoToYear(year) {
    const timestamp = yearTimestamps[year];
    if (yearVideo && timestamp !== undefined) {
        // Ensure the video source is set
        if (yearVideo.src !== videoSource) {
             yearVideo.src = videoSource;
             // Load the video to make seeking possible immediately
             yearVideo.load();
        }
       
        // Wait for metadata to load before seeking
        yearVideo.onloadedmetadata = () => {
             yearVideo.currentTime = timestamp;
             yearVideo.play(); // Autoplay from the seeked position
        };

         // If metadata is already loaded, seek immediately
        if (yearVideo.readyState >= yearVideo.HAVE_METADATA) {
             yearVideo.currentTime = timestamp;
             yearVideo.play();
        }
    }
}

// Initialize the year wheel on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (yearWheel && yearVideo) {
        createYearElements();
        
        // Select the first year by default and seek the video
        const firstYearElement = yearWheel.querySelector('.year-wheel-year');
        if (firstYearElement) {
            firstYearElement.classList.add('active');
            seekVideoToYear(firstYearElement.dataset.year);
            // Scroll the first year into view on load
            firstYearElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
}); 