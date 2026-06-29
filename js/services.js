// ============================================
// SERVICES PAGE - SPECIFIC SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initAccordion();
    initIconAnimations();
    initProcessAnimation();
    initPatternHover();
});

// Accordion Functionality
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(i => {
                i.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Open first item by default
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
}

// Icon Animations on Scroll
function initIconAnimations() {
    const serviceIcons = document.querySelectorAll('.service-icon');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    serviceIcons.forEach(icon => observer.observe(icon));
}

// Process Steps Animation
function initProcessAnimation() {
    const steps = document.querySelectorAll('.process-step');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 200);
            }
        });
    }, observerOptions);

    steps.forEach(step => observer.observe(step));
}

// Pattern Grid Hover Effect
function initPatternHover() {
    const patternSpans = document.querySelectorAll('.pattern-grid span');

    patternSpans.forEach((span, index) => {
        span.addEventListener('mouseenter', () => {
            // Ripple effect on hover
            const neighbors = getNeighbors(index, 5, patternSpans.length);
            neighbors.forEach((neighborIndex, i) => {
                if (patternSpans[neighborIndex]) {
                    setTimeout(() => {
                        patternSpans[neighborIndex].style.background = 'rgba(0, 0, 0, 0.06)';
                        setTimeout(() => {
                            patternSpans[neighborIndex].style.background = '';
                        }, 300);
                    }, i * 50);
                }
            });
        });
    });
}

function getNeighbors(index, cols, total) {
    const neighbors = [];
    const row = Math.floor(index / cols);
    const col = index % cols;

    // Get surrounding cells
    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            const neighborIndex = r * cols + c;
            if (neighborIndex >= 0 && neighborIndex < total && neighborIndex !== index) {
                neighbors.push(neighborIndex);
            }
        }
    }

    return neighbors;
}

// Smooth scroll to accordion item when opened
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const item = this.closest('.accordion-item');
        setTimeout(() => {
            if (item.classList.contains('active')) {
                const headerOffset = 150;
                const elementPosition = item.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    });
});
