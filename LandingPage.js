const images = document.querySelectorAll('.slider-image');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const images2 = document.querySelectorAll('.slider-image-2');
const prevBtn2 = document.getElementById('prev-btn-2');
const nextBtn2 = document.getElementById('next-btn-2');

let currentIndex = 0;

// 3. Function to show the correct image
function showImage(index) {
    // First, remove 'active' class from all images
    images.forEach(img => img.classList.remove('active'));
    // Then, add 'active' class to the one we want to show
    images[index].classList.add('active');
}

function showImage2(index) {
    images2.forEach(img => img.classList.remove('active'));
    images2[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    // Move to the next index, or loop back to 0 if at the end
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    // Just logging the current index to the console to check if the function is working
    console.log(currentIndex);
})

prevBtn.addEventListener('click', () => {
    // Move to the previous index, or loop to the end if at the beginning
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    console.log(currentIndex);
})

nextBtn2.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images2.length;
    showImage2(currentIndex);
})

prevBtn2.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images2.length) % images2.length;
    showImage2(currentIndex);
})
