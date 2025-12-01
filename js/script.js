function showImage(src) {
  document.getElementById('modal-img').src = src;
  document.getElementById('modal').style.display = 'flex';
}


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });

        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

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

function sortRecipes(grid, sortBy) {

    const recipes = Array.from(grid.children);
    

    recipes.sort((a, b) => {
        const aValue = parseFloat(a.getAttribute(`data-${sortBy}`));
        const bValue = parseFloat(b.getAttribute(`data-${sortBy}`));
        return aValue - bValue; // Low to high
    });
    
    grid.innerHTML = '';

    recipes.forEach(recipe => {
        grid.appendChild(recipe);
    });


    console.log(`Sorted by ${sortBy}`);
}


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


function updateActiveButton(activeBtn) {

    const sortButtons = activeBtn.parentElement.querySelectorAll('.btn-sort');

    sortButtons.forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });

    activeBtn.style.backgroundColor = 'var(--primary-color)';
    activeBtn.style.color = 'white';
}


