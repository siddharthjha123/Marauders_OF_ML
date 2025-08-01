window.addEventListener('load', function() {
    // Adding loading class to body
    document.body.classList.add('loading');

    // This is counter animation
    let currentPercentage = 0;
    const targetPercentage = 100;
    const percentageElement = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');

    // Simulating the loading progress as per element requirements
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
            }, 800);
        }

        percentageElement.textContent = Math.floor(currentPercentage);
    }, 50); // Updating every 50 ms
});

let cartItems = [];


function updateCartPreview() {
    const cartPreviewContent = document.getElementById('cart-preview-content');
    const cartCount = document.querySelector('.cart-count');

    // Clear previous content
    cartPreviewContent.innerHTML = '';

    if (cartItems.length === 0) {
        // If cart is empty
        cartPreviewContent.innerHTML = '<p>Your Cart is empty</p>';
        cartCount.textContent = '0';
    } else {
        // If cart has items
        let totalCount = 0;
        cartItems.forEach(item => {
            totalCount += item.quantity;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-preview-item';
            itemElement.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <div>
                    <div>${item.name}</div>
                    <div>Qty: ${item.quantity}</div>
                </div>
            `;
            cartPreviewContent.appendChild(itemElement);
        });
        cartCount.textContent = totalCount;
    }
}

// Calling the function on page load to set the initial state
document.addEventListener('DOMContentLoaded', updateCartPreview);
// This the mobile sidebar logic
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const closeBtn = document.getElementById('close-sidebar-btn');

    // Open sidebar
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.add('is-open');
        });
    }

    // Close sidebar
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('is-open');
        });
    }
});

const images = document.querySelectorAll('.slider-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const images2 = document.querySelectorAll('.slider-image-2');
const prevBtn2 = document.getElementById('prev-btn-2');
const nextBtn2 = document.getElementById('next-btn-2');

let currentIndex = 0;
let slideInterval;
let slideInterval2;

// Function to show the correct image
function showImage(index) {
    // First, remove 'active' class from all images
    images.forEach(img => img.classList.remove('active'));
    // Then, add 'active' class to the one we want to show
    images[index].classList.add('active');
}

function showImage2(index) {
    images2.forEach(img => img.classList.remove('active'));
    images2[index].classList.add('active')
}

function autoSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function autoslide2() {
    currentIndex = (currentIndex + 1) % images2.length;
    showImage2(currentIndex);
}

function startSlideTimer() {
    // Stop any existing timer before starting a new one
    clearInterval(slideInterval);
    // Set the interval to call autoSlide every 2.5 seconds (2500 milliseconds)
    slideInterval = setInterval(autoSlide, 2500);
}

function startSlideTimer2() {
    clearInterval(slideInterval2);
    slideInterval2 = setInterval(autoslide2, 2500);
}

nextBtn.addEventListener('click', () => {
    autoSlide();
    startSlideTimer();
})

prevBtn.addEventListener('click', () => {
    // Move to the previous index, or loop to the end if at the beginning
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    startSlideTimer();
})

nextBtn2.addEventListener('click', () => {
    autoslide2();
    startSlideTimer2();
})

prevBtn2.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images2.length) % images2.length;
    showImage2(currentIndex);
    startSlideTimer2();
})

startSlideTimer();
startSlideTimer2();

const animatedElements = document.querySelectorAll('.fade-in-element');
const animatedGrid = document.querySelectorAll('.fade-in-grid');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, {
    // Trigger the animation when the element is 30% visible
    threshold: 0.30
});

// Tell the observer to watch each of the animated elements
animatedElements.forEach(el => observer.observe(el));
animatedGrid.forEach(el => observer.observe(el));


const transitionLinks = document.querySelectorAll('a[href="ShopPage.html"]');
const overlay = document.getElementById('page-transition-overlay');

transitionLinks.forEach(link => {
    link.addEventListener('click', function(event) {
    
        event.preventDefault();
        const destination = this.href;

        overlay.classList.add('circle-in-animation');

        setTimeout(() => {
            window.location = destination;
        }, 700); 
    });
});