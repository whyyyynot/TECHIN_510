// Timeline data for Porsche 911 generations
const timelineData = [
    {
        year: "1963",
        title: "Original 911",
        description: "The first Porsche 911 was introduced at the Frankfurt Motor Show. It featured a 2.0L flat-six engine producing 130 horsepower.",
        image: "assets/images/911-1963.jpg"
    },
    {
        year: "1973",
        title: "G-Series",
        description: "Introduction of the G-Series with impact bumpers and improved safety features. The Carrera RS 2.7 became an instant classic.",
        image: "assets/images/911-1973.jpg"
    },
    {
        year: "1989",
        title: "964 Series",
        description: "The 964 introduced all-wheel drive and modernized the 911 with a more aerodynamic design and improved technology.",
        image: "assets/images/911-1989.jpg"
    },
    {
        year: "1993",
        title: "993 Series",
        description: "The last air-cooled 911, featuring a more modern design and improved handling characteristics.",
        image: "assets/images/911-1993.jpg"
    },
    {
        year: "1997",
        title: "996 Series",
        description: "First water-cooled 911 with a completely new design, including the controversial 'fried egg' headlights.",
        image: "assets/images/911-1997.jpg"
    },
    {
        year: "2004",
        title: "997 Series",
        description: "Return to round headlights and improved interior quality. The GT3 and Turbo models set new performance benchmarks.",
        image: "assets/images/911-2004.jpg"
    },
    {
        year: "2011",
        title: "991 Series",
        description: "Larger dimensions and improved aerodynamics. Introduction of electric power steering and PDK transmission.",
        image: "assets/images/911-2011.jpg"
    },
    {
        year: "2019",
        title: "992 Series",
        description: "Current generation featuring digital cockpit, hybrid technology, and enhanced performance capabilities.",
        image: "assets/images/911-2019.jpg"
    }
];

// Initialize the timeline
function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-year">${item.year}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <img src="${item.image}" alt="${item.title}" class="timeline-image">
                <p class="timeline-description">${item.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Add scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}); 