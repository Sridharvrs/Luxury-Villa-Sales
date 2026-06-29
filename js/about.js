// ============================================
// ABOUT PAGE - SPECIFIC SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initTimelineAnimation();
    initParallaxImages();
    initStatCounters();
    initSmoothScroll();
});

// Timeline Animation on Scroll
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Parallax effect for images
function initParallaxImages() {
    const heroImage = document.querySelector('.hero-image');
    const stackImages = document.querySelectorAll('.stack-image');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.2}px)`;
        }

        stackImages.forEach((img, index) => {
            const speed = 0.05 * (index + 1);
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });
}

// Stat Counters
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-block .stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateNumber(entry.target, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target, duration) {
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    const stepDuration = duration / steps;

    const counter = setInterval(() => {
        current += stepValue;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepDuration);
}

// Smooth scroll for scroll-down indicator
function initSmoothScroll() {
    const scrollDown = document.querySelector('.scroll-down');
    const storySection = document.querySelector('.story-section');

    if (scrollDown && storySection) {
        scrollDown.addEventListener('click', () => {
            storySection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Image reveal on scroll
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            imageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.stack-image, .team-image').forEach(img => {
    imageObserver.observe(img);
});
