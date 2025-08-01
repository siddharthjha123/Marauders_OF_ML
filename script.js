// Loading Screen Functionality
window.addEventListener('load', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Loading counter animation
    let currentPercentage = 0;
    const targetPercentage = 100;
    const percentageElement = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        currentPercentage += Math.random() * 3 + 1; // Random increment between 1-4
        
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearInterval(loadingInterval);
            
            // Hide loading screen after reaching 100%
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-out';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.classList.remove('loading');
                }, 500);
            }, 800); // Wait a bit at 100% before hiding
        }
        
        percentageElement.textContent = Math.floor(currentPercentage);
    }, 100); // Update every 100ms
});

// ... existing code ...
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchIcon = document.querySelector('.search-container i');
    
    searchIcon.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
            performSearch(searchInput.value);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            performSearch(searchInput.value);
        }
    });
    
    function performSearch(query) {
        // In a real application, this would send the search query to a server
        console.log('Searching for:', query);
        // For demo purposes, just alert the search term
        alert('Search functionality would search for: ' + query);
    }
    
    // Cart functionality (simplified for demo)
    const cartIcon = document.querySelector('.cart-icon');
    
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Shopping cart would open here');
    });
    
    // Shop All button
    const shopAllBtn = document.querySelector('.btn-primary');
    
    shopAllBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('This would navigate to the shop page');
    });
    
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});