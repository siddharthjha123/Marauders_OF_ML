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
animatedGrid.forEach(el => observer.observe(el))
