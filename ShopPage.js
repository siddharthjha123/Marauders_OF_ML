
window.addEventListener('load', () => {
    const overlay = document.getElementById('page-transition-overlay');
    // Add the class to play the reveal animation
    overlay.classList.add('circle-out-animation');
});



document.addEventListener('DOMContentLoaded', () => {

    // 1. Hardcoded product data
    const products = [
        { id: 1, name: "Men's Winter Jacket", price: 99, category: "jackets", imageUrl: "images/product1.jpg" },
        { id: 2, name: "Graphic T-Shirt", price: 29, category: "t-shirts", imageUrl: "images/product2.jpg" },
        { id: 3, name: "Cozy Hoodie", price: 59, category: "sweatshirts", imageUrl: "images/product3.jpg" },
        { id: 4, name: "Leather Bomber Jacket", price: 149, category: "jackets", imageUrl: "images/product4.jpg" },
        { id: 5, name: "Fleece Sweatshirt", price: 49, category: "sweatshirts", imageUrl: "images/product5.jpg" },
        { id: 6, name: "Plain Cotton T-Shirt", price: 19, category: "t-shirts", imageUrl: "images/product6.jpg" }
    ];

    // 2. Get references to DOM elements
    const productGrid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const checkboxes = document.querySelectorAll('.category-checkbox');

    // 3. Function to render products to the grid
    function renderProducts(productsToRender) {
        // Clear the existing grid content
        productGrid.innerHTML = '';

        // If no products, show a message
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p>No products match your filter.</p>';
            productCount.textContent = 'Showing 0 Products';
            return;
        }

        // Create and append a card for each product
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
            `;
            productGrid.appendChild(productCard);
        });

        // Update the product count
        productCount.textContent = `Showing ${productsToRender.length} Products`;
    }

    // 4. Function to get selected categories and filter products
    function filterProducts() {
        const selectedCategories = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedCategories.push(checkbox.value);
            }
        });

        let filteredProducts;

        // If "all" is selected or no category is selected, show all products
        if (selectedCategories.includes('all') || selectedCategories.length === 0) {
            filteredProducts = products;
        } else {
            // Filter products based on the selected categories
            filteredProducts = products.filter(product => selectedCategories.includes(product.category));
        }

        renderProducts(filteredProducts);
    }

    // 5. Add event listeners to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // 6. Initial render on page load
    filterProducts();
});

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
