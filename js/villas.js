// ============================================
// VILLAS PAGE - SPECIFIC SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initFilterTabs();
    initDropdowns();
    initViewToggle();
    initFavorites();
    initLoadMore();
    initCardAnimations();
});

// Filter Tabs
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.villa-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Filter cards with animation
            cards.forEach((card, index) => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hiding');
                    card.classList.add('showing');
                    card.style.animationDelay = `${index * 0.1}s`;
                } else {
                    card.classList.add('hiding');
                    card.classList.remove('showing');
                }
            });
        });
    });
}

// Dropdown Menus
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.filter-dropdown');

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.filter-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });

    // Handle dropdown item selection
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const trigger = this.closest('.filter-dropdown').querySelector('.dropdown-trigger span');
            trigger.textContent = this.textContent;
        });
    });
}

// View Toggle (Grid/List)
function initViewToggle() {
    const toggle = document.querySelector('.view-toggle');
    const gridIcon = document.querySelector('.grid-icon');
    const listIcon = document.querySelector('.list-icon');
    const grid = document.querySelector('.masonry-grid');

    if (!toggle) return;

    toggle.addEventListener('click', function() {
        gridIcon.classList.toggle('active');
        listIcon.classList.toggle('active');
        grid.classList.toggle('list-view');
    });
}

// Favorites
function initFavorites() {
    const favoriteButtons = document.querySelectorAll('.villa-favorite');

    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('favorited');
            
            const svg = this.querySelector('svg');
            if (this.classList.contains('favorited')) {
                svg.style.fill = 'currentColor';
                this.style.background = 'var(--gold)';
                this.style.color = 'var(--black)';
            } else {
                svg.style.fill = 'none';
                this.style.background = 'rgba(0, 0, 0, 0.5)';
                this.style.color = 'var(--white)';
            }
        });
    });
}

// Load More
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more');
    const resultsCount = document.querySelector('.results-count');
    let visibleCount = 8;
    const totalCount = 48;

    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more cards
        visibleCount = Math.min(visibleCount + 4, totalCount);
        
        // Update count text
        resultsCount.textContent = `Showing ${visibleCount} of ${totalCount} properties`;
        
        // Hide button if all loaded
        if (visibleCount >= totalCount) {
            loadMoreBtn.style.display = 'none';
        }

        // Add loading animation
        this.classList.add('loading');
        setTimeout(() => {
            this.classList.remove('loading');
        }, 1000);
    });
}

// Card Hover Animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.villa-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Tilt effect on hover
            this.addEventListener('mousemove', handleTilt);
        });

        card.addEventListener('mouseleave', function() {
            this.removeEventListener('mousemove', handleTilt);
            this.style.transform = '';
        });
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
}

// Intersection Observer for card reveal
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('showing');
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.villa-card').forEach(card => {
    cardObserver.observe(card);
});
