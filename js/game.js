// Game data for Porsche 911 parts
const gameData = {
    frontBumpers: [
        { year: "1963", image: "assets/images/parts/front-1963.jpg", label: "Original Front" },
        { year: "1973", image: "assets/images/parts/front-1973.jpg", label: "Impact Bumper" },
        { year: "1989", image: "assets/images/parts/front-1989.jpg", label: "964 Front" },
        { year: "2019", image: "assets/images/parts/front-2019.jpg", label: "Modern Front" }
    ],
    rearBumpers: [
        { year: "1963", image: "assets/images/parts/rear-1963.jpg", label: "Original Rear" },
        { year: "1973", image: "assets/images/parts/rear-1973.jpg", label: "Impact Rear" },
        { year: "1989", image: "assets/images/parts/rear-1989.jpg", label: "964 Rear" },
        { year: "2019", image: "assets/images/parts/rear-2019.jpg", label: "Modern Rear" }
    ],
    headlights: [
        { year: "1963", image: "assets/images/parts/headlights-1963.jpg", label: "Round Headlights" },
        { year: "1997", image: "assets/images/parts/headlights-1997.jpg", label: "Fried Egg" },
        { year: "2004", image: "assets/images/parts/headlights-2004.jpg", label: "Modern Round" },
        { year: "2019", image: "assets/images/parts/headlights-2019.jpg", label: "LED Headlights" }
    ],
    wheels: [
        { year: "1963", image: "assets/images/parts/wheels-1963.jpg", label: "Fuchs" },
        { year: "1989", image: "assets/images/parts/wheels-1989.jpg", label: "Cup Wheels" },
        { year: "2004", image: "assets/images/parts/wheels-2004.jpg", label: "Turbo Wheels" },
        { year: "2019", image: "assets/images/parts/wheels-2019.jpg", label: "Modern Design" }
    ]
};

// Current selection
let currentSelection = {
    frontBumper: null,
    rearBumper: null,
    headlights: null,
    wheels: null
};

// Initialize the game
function initBuildGame() {
    const partsSelection = document.querySelector('.parts-selection');
    const previewArea = document.querySelector('.preview-area');
    
    // Create part selection interface
    Object.keys(gameData).forEach(partType => {
        const partContainer = document.createElement('div');
        partContainer.className = 'part-container';
        
        const partTitle = document.createElement('h3');
        partTitle.textContent = partType.replace(/([A-Z])/g, ' $1').trim();
        partContainer.appendChild(partTitle);
        
        gameData[partType].forEach(part => {
            const partItem = document.createElement('div');
            partItem.className = 'part-item';
            partItem.dataset.partType = partType;
            partItem.dataset.year = part.year;
            
            partItem.innerHTML = `
                <img src="${part.image}" alt="${part.label}" class="part-image">
                <div class="part-label">${part.label}</div>
            `;
            
            partItem.addEventListener('click', () => selectPart(partType, part));
            partContainer.appendChild(partItem);
        });
        
        partsSelection.appendChild(partContainer);
    });
    
    // Initialize preview area
    previewArea.innerHTML = `
        <div class="preview-image" id="preview-image"></div>
        <div class="preview-description" id="preview-description"></div>
    `;
}

// Handle part selection
function selectPart(partType, part) {
    currentSelection[partType] = part;
    updatePreview();
}

// Update preview
function updatePreview() {
    const previewImage = document.getElementById('preview-image');
    const previewDescription = document.getElementById('preview-description');
    
    // Update selected parts styling
    document.querySelectorAll('.part-item').forEach(item => {
        item.classList.remove('selected');
        if (currentSelection[item.dataset.partType]?.year === item.dataset.year) {
            item.classList.add('selected');
        }
    });
    
    // Generate preview description
    const description = generateDescription();
    previewDescription.textContent = description;
}

// Generate description based on selected parts
function generateDescription() {
    const parts = Object.values(currentSelection).filter(part => part !== null);
    if (parts.length === 0) return "Select parts to build your custom 911";
    
    const years = parts.map(part => part.year);
    const uniqueYears = [...new Set(years)];
    
    if (uniqueYears.length === 1) {
        return `A pure ${uniqueYears[0]} Porsche 911 with all original parts`;
    } else {
        return `A custom Porsche 911 combining parts from ${uniqueYears.join(', ')}`;
    }
}

// Export/Share functionality
function shareCreation() {
    const description = generateDescription();
    // Implement sharing functionality
    console.log('Sharing:', description);
} 