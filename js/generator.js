// Generator functionality for the final composite image

// Canvas setup
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Initialize the generator
function initGenerator() {
    const generatorContainer = document.querySelector('.generator-container');
    const finalPreview = document.querySelector('.final-preview');
    
    // Add canvas to the preview area
    finalPreview.appendChild(canvas);
    
    // Add event listener for the share button
    const shareButton = document.querySelector('.share-button');
    shareButton.addEventListener('click', generateAndShare);
}

// Generate the final composite image
function generateComposite() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw base car image
    const baseImage = new Image();
    baseImage.src = 'assets/images/base-car.jpg';
    
    return new Promise((resolve) => {
        baseImage.onload = () => {
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            
            // Draw selected parts
            Object.values(currentSelection).forEach(part => {
                if (part) {
                    const partImage = new Image();
                    partImage.src = part.image;
                    partImage.onload = () => {
                        // Position and draw the part
                        // This would need to be adjusted based on the specific part type
                        ctx.drawImage(partImage, 0, 0, canvas.width, canvas.height);
                    };
                }
            });
            
            resolve(canvas.toDataURL('image/png'));
        };
    });
}

// Generate and share the final image
async function generateAndShare() {
    try {
        const imageData = await generateComposite();
        const description = generateDescription();
        
        // Create a download link
        const link = document.createElement('a');
        link.download = 'custom-porsche-911.png';
        link.href = imageData;
        link.click();
        
        // Update the description
        document.querySelector('.description').textContent = description;
        
        // Here you could add social media sharing functionality
        console.log('Image generated and description updated');
    } catch (error) {
        console.error('Error generating composite:', error);
    }
}

// Generate a creative description
function generateDescription() {
    const parts = Object.values(currentSelection).filter(part => part !== null);
    if (parts.length === 0) return "No parts selected";
    
    const years = parts.map(part => part.year);
    const uniqueYears = [...new Set(years)];
    
    const descriptions = [
        `A visionary blend of ${uniqueYears.join(' and ')} Porsche 911 design elements`,
        `Where ${uniqueYears.join(' meets ')} in perfect harmony`,
        `A time-traveling 911 combining the best of ${uniqueYears.join(', ')}`,
        `The ultimate Porsche 911 evolution from ${uniqueYears.join(' to ')}`,
        `A masterpiece merging ${uniqueYears.join(' and ')} Porsche design philosophy`
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
} 