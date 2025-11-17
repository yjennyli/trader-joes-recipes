// ===================================
// Hamburger Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Accessibility: Update aria-expanded
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ===================================
    // Sorting Functionality for Meals Page
    // ===================================
    const mealsGrid = document.getElementById('meals-grid');
    const sortCaloriesBtn = document.getElementById('sort-calories');
    const sortPriceBtn = document.getElementById('sort-price');
    const resetSortBtn = document.getElementById('reset-sort');

    if (mealsGrid) {
        // Store original order
        const originalOrder = Array.from(mealsGrid.children);

        // Sort by calories (low to high)
        if (sortCaloriesBtn) {
            sortCaloriesBtn.addEventListener('click', function() {
                sortRecipes(mealsGrid, 'calories');
                updateActiveButton(this);
            });
        }

        // Sort by price (low to high)
        if (sortPriceBtn) {
            sortPriceBtn.addEventListener('click', function() {
                sortRecipes(mealsGrid, 'price');
                updateActiveButton(this);
            });
        }

        // Reset to original order
        if (resetSortBtn) {
            resetSortBtn.addEventListener('click', function() {
                resetRecipes(mealsGrid, originalOrder);
                updateActiveButton(this);
            });
        }
    }

    // ===================================
    // Sorting Functionality for Snacks Page
    // ===================================
    const snacksGrid = document.getElementById('snacks-grid');
    const sortCaloriesSnacksBtn = document.getElementById('sort-calories-snacks');
    const sortPriceSnacksBtn = document.getElementById('sort-price-snacks');
    const resetSortSnacksBtn = document.getElementById('reset-sort-snacks');

    if (snacksGrid) {
        // Store original order
        const originalOrderSnacks = Array.from(snacksGrid.children);

        // Sort by calories (low to high)
        if (sortCaloriesSnacksBtn) {
            sortCaloriesSnacksBtn.addEventListener('click', function() {
                sortRecipes(snacksGrid, 'calories');
                updateActiveButton(this);
            });
        }

        // Sort by price (low to high)
        if (sortPriceSnacksBtn) {
            sortPriceSnacksBtn.addEventListener('click', function() {
                sortRecipes(snacksGrid, 'price');
                updateActiveButton(this);
            });
        }

        // Reset to original order
        if (resetSortSnacksBtn) {
            resetSortSnacksBtn.addEventListener('click', function() {
                resetRecipes(snacksGrid, originalOrderSnacks);
                updateActiveButton(this);
            });
        }
    }
});

// ===================================
// Helper Function: Sort Recipes
// ===================================
function sortRecipes(grid, sortBy) {
    // Get all recipe cards
    const recipes = Array.from(grid.children);
    
    // Sort based on the specified attribute
    recipes.sort((a, b) => {
        const aValue = parseFloat(a.getAttribute(`data-${sortBy}`));
        const bValue = parseFloat(b.getAttribute(`data-${sortBy}`));
        return aValue - bValue; // Low to high
    });
    
    // Clear the grid
    grid.innerHTML = '';
    
    // Append sorted recipes
    recipes.forEach(recipe => {
        grid.appendChild(recipe);
    });

    // Log to console (for debugging)
    console.log(`Sorted by ${sortBy}`);
}

// ===================================
// Helper Function: Reset Recipes to Original Order
// ===================================
function resetRecipes(grid, originalOrder) {
    // Clear the grid
    grid.innerHTML = '';
    
    // Append recipes in original order
    originalOrder.forEach(recipe => {
        grid.appendChild(recipe);
    });

    // Log to console (for debugging)
    console.log('Reset to original order');
}

// ===================================
// Helper Function: Update Active Button Styling
// ===================================
function updateActiveButton(activeBtn) {
    // Get all sort buttons in the same section
    const sortButtons = activeBtn.parentElement.querySelectorAll('.btn-sort');
    
    // Remove active class from all buttons
    sortButtons.forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });
    
    // Add active styling to clicked button
    activeBtn.style.backgroundColor = 'var(--primary-color)';
    activeBtn.style.color = 'white';
}

// ===================================
// Optional: Smooth Scroll for Skip Link
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Set focus for accessibility
            target.focus();
        }
    });
});

// ===================================
// Optional: Lazy Loading for Images (Performance)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
