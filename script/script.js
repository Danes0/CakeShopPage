// Add event listener when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select necessary DOM elements
    const subscribeButton = document.querySelector('button[name="subscribe"]');
    const customPopup = document.getElementById('customPopup');
    const closePopupButton = document.querySelector('.custom-popup-close');
    const hero1 = document.getElementById('hero1');
    const hero2 = document.getElementById('hero2');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const pagination = document.querySelector('.pagination');
    const hImageContainer = document.querySelector('.hImage');
    // Selecting menu items and navigation
    const bar = document.getElementById('bar'); // Menu button
    const close = document.getElementById('close'); // Close menu button
    const nav = document.getElementById('navbar'); // Navigation menu

    // Add events to the menu
    if (bar){
        bar.addEventListener('click', () => {
            // Add "active" class to menu when clicking menu button
            nav.classList.add('active');
        })
    }
    if (close){
        close.addEventListener('click', () => {
            // Remove "active" class from menu when clicking close button
            nav.classList.remove('active');
        })
    }

    // Initialize variables
    let currentHero = 1;
    let intervalId;

    // Show custom popup
    function showCustomPopup() {
        customPopup.style.display = 'block';
    }

    // Close custom popup
    function closeCustomPopup() {
        customPopup.style.display = 'none';
    }

    // Add event listener for subscribe button
    subscribeButton.addEventListener('click', function (event) {
        event.preventDefault();
        showCustomPopup();
    });

    // Add event listener for close button in custom popup
    closePopupButton.onclick = function () {
        closeCustomPopup();
    };

    // Close custom popup when clicking outside
    window.onclick = function (event) {
        if (event.target == customPopup) {
            closeCustomPopup();
        }
    };

    // Change banners function
    function cambiarBanner() {
        hero1.style.display = currentHero === 1 ? 'block' : 'none';
        hero2.style.display = currentHero === 2 ? 'block' : 'none';
        currentHero = currentHero === 1 ? 2 : 1;
        updatePagination();
    }

    // Start interval to change banners every 7 seconds
    function startInterval() {
        intervalId = setInterval(cambiarBanner, 7000);
    }

    // Pause interval when clicking navigation buttons
    function pauseInterval() {
        clearInterval(intervalId);
    }

    // Handle click events for prev and next buttons
    function handleButtonClick() {
        pauseInterval();
        cambiarBanner();
        startInterval();
    }

    // Create pagination dots
    function createPagination() {
        for (let i = 1; i <= 2; i++) {
            const dot = document.createElement('span');
            dot.classList.add('pagination-dot');
            dot.addEventListener('click', function () {
                pauseInterval();
                currentHero = i;
                cambiarBanner();
                startInterval();
            });
            pagination.appendChild(dot);
        }
    }

    // Update pagination dots
    function updatePagination() {
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if (index + 1 === currentHero) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Add event listeners for navigation buttons
    prevButton.addEventListener('click', handleButtonClick);
    nextButton.addEventListener('click', handleButtonClick);

    // Start interval and create pagination when the page is loaded
    startInterval();
    createPagination();

    // Select the main image and hover image within the container
    const mainImage = hImageContainer.querySelector('img:not(.hover-img)');
    const hoverImage = hImageContainer.querySelector('.hover-img');

    // Add event listener for mouseover
    hImageContainer.addEventListener('mouseover', () => {
        if (mainImage && hoverImage) {
            mainImage.style.display = 'none'; // Hide the main image
            hoverImage.style.display = 'block'; // Show the hover image
        }
    });

    // Add event listener for mouseout
    hImageContainer.addEventListener('mouseout', () => {
        if (mainImage && hoverImage) {
            mainImage.style.display = 'block'; // Show the main image
            hoverImage.style.display = 'none'; // Hide the hover image
        }
    });
});