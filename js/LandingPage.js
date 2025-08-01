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
    }, 1); // Update every 100ms
});

//let cartItems = []; 

// Version 2: Cart has items

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

// Call the function on page load to set the initial state
document.addEventListener('DOMContentLoaded', updateCartPreview);

const images = document.querySelectorAll('.slider-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const images2 = document.querySelectorAll('.slider-image-2');
const prevBtn2 = document.getElementById('prev-btn-2');
const nextBtn2 = document.getElementById('next-btn-2');

let currentIndex = 0;
let slideInterval;
let slideInterval2;

// 3. Function to show the correct image
function showImage(index) {
    // First, remove 'active' class from all images
    images.forEach(img => img.classList.remove('active'));
    // Then, add 'active' class to the one we want to show
    images[index].classList.add('active');
}
function showImage2(index){
    images2.forEach(img => img.classList.remove('active'));
    images2[index].classList.add('active')
}


function autoSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function autoslide2(){
    currentIndex = (currentIndex + 1) % images2.length;
    showImage2(currentIndex);
}

function startSlideTimer() {
    // Stop any existing timer before starting a new one
    clearInterval(slideInterval);
    // Set the interval to call autoSlide every 2.5 seconds (2500 milliseconds)
    slideInterval = setInterval(autoSlide, 2500);
}

function startSlideTimer2(){
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
        // If the element is intersecting the viewport
        if (entry.isIntersecting) {
                // Add the 'show' class to make it visible
            entry.target.classList.add('show');
                // Stop observing the element so the animation doesn't repeat
            observer.unobserve(entry.target);
            }
        });
    }, {
        // Trigger the animation when the element is 15% visible
        threshold: 0.30
});

// Tell the observer to watch each of the animated elements
animatedElements.forEach(el => observer.observe(el));
animatedGrid.forEach(el => observer.observe(el));


const transitionLinks = document.querySelectorAll('a[href="ShopPage.html"]');
const overlay = document.getElementById('page-transition-overlay');

transitionLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // 1. Prevent the link from navigating immediately
        event.preventDefault();
        const destination = this.href;

        // 2. Add the animation class to the overlay
        overlay.classList.add('circle-in-animation');

        // 3. Wait for the animation to finish, then go to the new page
        setTimeout(() => {
            window.location = destination;
        }, 700); // Must match the animation duration in CSS
    });
});