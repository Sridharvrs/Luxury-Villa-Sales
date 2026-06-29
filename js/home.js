// ============================================
// HOME PAGE - SPECIFIC SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    initStatCounters();
    initTestimonialSlider();
    initParallaxEffects();
});

// Hero Animations
function initHeroAnimations() {
    // Add loaded class to body after animations complete
    setTimeout(() => {
        document.body.classList.add('hero-loaded');
    }, 2000);
}

// Stat Counters Animation
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, target) {
    const duration = 2000;
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

// Testimonial Slider
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');
    const dots = document.querySelectorAll('.dot');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 3;
    }

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 40; // Including gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateSlider();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Update on resize
    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        updateSlider();
    });

    // Auto-play
    let autoplayInterval = setInterval(() => {
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateSlider();
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateSlider();
        }, 5000);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const heroVideo = document.querySelector('.hero-video');
    const floatingShapes = document.querySelectorAll('.float-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Video parallax
        if (heroVideo) {
            heroVideo.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }
        
        // Floating shapes parallax
        floatingShapes.forEach((shape, index) => {
            const speed = 0.1 * (index + 1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Mouse move parallax for floating elements
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        floatingShapes.forEach((shape, index) => {
            const speed = 20 * (index + 1);
            shape.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });
}

// Smooth Scroll Enhancement
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    const featuredSection = document.querySelector('.featured-section');
    if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
});
