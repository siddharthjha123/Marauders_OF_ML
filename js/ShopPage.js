window.addEventListener('load', () => {
    const overlay = document.getElementById('page-transition-overlay');
    overlay.classList.add('circle-out-animation');
});
document.addEventListener('DOMContentLoaded', () => {

    let cartItems = [];
    let activeModalProduct = null;

    // 1. Hardcoded product data
    const products = [{
            id: 1,
            name: "Men's Winter Jacket",
            price: 99,
            category: "jackets",
            imageUrl: "images/product1.jpg",
            colors: ["Black", "Navy", "Olive"],
            description: "A warm, insulated winter jacket designed to withstand cold weather, featuring a water-resistant shell and multiple pockets."
        },
        {
            id: 2,
            name: "Graphic T-Shirt",
            price: 29,
            category: "t-shirts",
            imageUrl: "images/product2.jpg",
            colors: ["White", "Heather Grey"],
            description: "A soft, 100% cotton t-shirt with a unique, vintage-inspired graphic print on the front."
        },
        {
            id: 3,
            name: "Cozy Hoodie",
            price: 59,
            category: "sweatshirts",
            imageUrl: "images/product3.jpg",
            colors: ["Charcoal", "Maroon", "Forest Green"],
            description: "An ultra-soft fleece-lined hoodie, perfect for lounging or casual outings. Features a drawstring hood and a kangaroo pocket."
        },
        {
            id: 4,
            name: "Leather Bomber Jacket",
            price: 149,
            category: "jackets",
            imageUrl: "images/product4.jpg",
            colors: ["Brown", "Black"],
            description: "A timeless leather bomber jacket crafted from genuine lambskin, with ribbed cuffs and a classic silhouette."
        },
        {
            id: 5,
            name: "Fleece Sweatshirt",
            price: 49,
            category: "sweatshirts",
            imageUrl: "images/product5.jpg",
            colors: ["Grey", "Blue", "Red"],
            description: "A comfortable and lightweight fleece sweatshirt, ideal for layering. Features a classic crewneck design."
        },
        {
            id: 6,
            name: "Plain Cotton T-Shirt",
            price: 19,
            category: "t-shirts",
            imageUrl: "images/product6.jpg",
            colors: ["Black", "White", "Navy"],
            description: "An essential plain t-shirt made from premium Supima cotton for superior softness and durability."
        }
    ];

    // 2. Get references to DOM elements
    const productGrid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const checkboxes = document.querySelectorAll('.category-checkbox');
    const modal = document.getElementById('product-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const cartPreviewContent = document.getElementById('cart-preview-content');
    const cartCount = document.querySelector('.cart-count');

    function updateCartPreview() {
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
                        <div><p>${item.name}</p></div>
                        <div><p>Qty: ${item.quantity}</p></div>
                    </div>
                `;
                cartPreviewContent.appendChild(itemElement);
            });
            cartCount.textContent = totalCount;
        }
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
            productCard.setAttribute('data-product-id', product.id);
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>$${product.price}</p>
            `;

            productCard.addEventListener('click', () => {
                showProductDetail(product.id);
            });
            productGrid.appendChild(productCard);
        });

        // Update the product count
        productCount.textContent = `Showing ${productsToRender.length} Products`;
    }

    

    // 5. Add event listeners to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    

    // This function is to show card details
    function showProductDetail(productId) {
        // Find the product from our main array
        const product = products.find(p => p.id == productId);
        activeModalProduct = products.find(p => p.id == productId)
        if (!product) return;


        // Get modal elements
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalColors = document.getElementById('modal-colors');
        const modalPrice = document.getElementById('modal-price');

        // Populate the modal with product data
        modalImage.src = product.imageUrl;
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modalPrice.textContent = `$${product.price}`;

        // Create color swatches
        modalColors.innerHTML = ''; 
        product.colors.forEach((color, index) => {
            const li = document.createElement('li');
            li.style.backgroundColor = color;
            // Set the first color as active by default
            if (index === 0) {
                li.classList.add('active');
            }
            li.addEventListener('click', () => {
                // Remove active class from any previously selected color
                modalColors.querySelector('.active')?.classList.remove('active');
                // Add active class to the clicked one
                li.classList.add('active');
            });
            modalColors.appendChild(li);
        });

        // Show the modal
        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    addToCartBtn.addEventListener('click', () => {
        if (!activeModalProduct) return; 

        // Check if the item is already in the cart
        const existingItem = cartItems.find(item => item.id === activeModalProduct.id);

        if (existingItem) {
            // If it exists, just increase the quantity
            existingItem.quantity++;
        } else {
            // If it's a new item, add it to the cart array with a quantity of 1
            cartItems.push({
                ...activeModalProduct,
                quantity: 1
            });
        }

        // Refresh the cart preview to show the new item
        updateCartPreview();

        // Close the modal for a better user experience
        closeModal();
    });



    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // 6. Initial render on page load
    filterProducts();
    updateCartPreview();
});

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


animatedElements.forEach(el => observer.observe(el));
animatedGrid.forEach(el => observer.observe(el));