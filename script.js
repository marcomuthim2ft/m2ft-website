// ========================================
// M2FT - Main JavaScript
// ========================================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });
    }
});

// Video Slider
class VideoSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.track = this.slider.querySelector('.slider-track');
        this.slides = this.slider.querySelectorAll('.slider-item');
        this.videos = this.slider.querySelectorAll('video');
        this.prevBtn = this.slider.querySelector('.prev');
        this.nextBtn = this.slider.querySelector('.next');
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        
        this.init();
    }
    
    init() {
        // Create dots
        this.createDots();
        
        // Event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Videos are muted and paused by default
        // Users must manually play
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = this.dotsContainer.querySelectorAll('.dot');
    }
    
    updateDots() {
        if (!this.dots) return;
        
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    goToSlide(index) {
        // Pause current video
        if (this.videos[this.currentIndex]) {
            this.videos[this.currentIndex].pause();
        }
        
        this.currentIndex = index;
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateDots();
        
        // Pause new video (user must manually play)
        if (this.videos[this.currentIndex]) {
            this.videos[this.currentIndex].pause();
        }
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.slideCount;
        this.goToSlide(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.goToSlide(prevIndex);
    }
}

// Initialize video slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const sliderElement = document.querySelector('.video-slider');
    if (sliderElement) {
        new VideoSlider(sliderElement);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add active state to navigation based on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Pro Players Slider
class ProPlayersSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.track = this.slider.querySelector('.pro-slider-track');
        this.cards = this.slider.querySelectorAll('.pro-player-card');
        this.prevBtn = this.slider.querySelector('.pro-prev');
        this.nextBtn = this.slider.querySelector('.pro-next');
        
        this.currentIndex = 0;
        this.cardCount = this.cards.length;
        
        this.init();
    }
    
    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Auto-advance every 8 seconds
        setInterval(() => this.next(), 8000);
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.cardCount) % this.cardCount;
        this.updateSlider();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cardCount;
        this.updateSlider();
    }
    
    updateSlider() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
    }
}

// Initialize Pro Players Slider
document.addEventListener('DOMContentLoaded', function() {
    const proSlider = document.querySelector('.pro-players-slider');
    if (proSlider) {
        new ProPlayersSlider(proSlider);
    }
});

// Form validation (for contact page)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const message = form.querySelector('textarea[name="message"]');
        
        let isValid = true;
        
        // Reset errors
        form.querySelectorAll('.error').forEach(el => el.remove());
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid - you can submit or handle as needed
            alert('Thank you! Your message has been sent. We will get back to you shortly.');
            form.reset();
        }
    });
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = '#ff4444';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '0.5rem';
    error.textContent = message;
    input.parentElement.appendChild(error);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize form validation if contact form exists
document.addEventListener('DOMContentLoaded', function() {
    validateForm('contactForm');
});

// Fitness Video Slider (M2 Fitness page)
let fitnessCurrentSlide = 0;

function moveFitnessSlide(direction) {
    const track = document.getElementById('fitnessSliderTrack');
    const slides = track.querySelectorAll('.slider-item');
    const dots = document.getElementById('fitnessDots').querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    // Pause current video
    const currentVideo = slides[fitnessCurrentSlide].querySelector('video');
    if (currentVideo) currentVideo.pause();
    
    // Update slide index
    fitnessCurrentSlide = (fitnessCurrentSlide + direction + totalSlides) % totalSlides;
    
    // Move slider
    const offset = -fitnessCurrentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === fitnessCurrentSlide);
    });
}

// Initialize Fitness Slider (M2 Fitness page)
document.addEventListener('DOMContentLoaded', function() {
    const fitnessTrack = document.getElementById('fitnessSliderTrack');
    if (!fitnessTrack) return;
    
    const slides = fitnessTrack.querySelectorAll('.slider-item');
    const dotsContainer = document.getElementById('fitnessDots');
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            const track = document.getElementById('fitnessSliderTrack');
            const currentVideo = track.querySelectorAll('.slider-item')[fitnessCurrentSlide].querySelector('video');
            if (currentVideo) currentVideo.pause();
            
            fitnessCurrentSlide = index;
            const offset = -fitnessCurrentSlide * 100;
            track.style.transform = `translateX(${offset}%)`;
            
            document.getElementById('fitnessDots').querySelectorAll('.dot').forEach((d, i) => {
                d.classList.toggle('active', i === fitnessCurrentSlide);
            });
        });
        dotsContainer.appendChild(dot);
    });
    
    // Auto-advance every 10 seconds
    setInterval(() => {
        moveFitnessSlide(1);
    }, 10000);
});

// Home Fitness Video Slider (Homepage)
let homeFitnessCurrentSlide = 0;

function moveHomeFitnessSlide(direction) {
    const track = document.getElementById('homeFitnessSliderTrack');
    if (!track) return;
    
    const slides = track.querySelectorAll('.slider-item');
    const dots = document.getElementById('homeFitnessDots').querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    // Pause current video
    const currentVideo = slides[homeFitnessCurrentSlide].querySelector('video');
    if (currentVideo) currentVideo.pause();
    
    // Update slide index
    homeFitnessCurrentSlide = (homeFitnessCurrentSlide + direction + totalSlides) % totalSlides;
    
    // Move slider
    const offset = -homeFitnessCurrentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === homeFitnessCurrentSlide);
    });
}

// Initialize Home Fitness Slider
document.addEventListener('DOMContentLoaded', function() {
    const homeFitnessTrack = document.getElementById('homeFitnessSliderTrack');
    if (!homeFitnessTrack) return;
    
    const slides = homeFitnessTrack.querySelectorAll('.slider-item');
    const dotsContainer = document.getElementById('homeFitnessDots');
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            const track = document.getElementById('homeFitnessSliderTrack');
            const currentVideo = track.querySelectorAll('.slider-item')[homeFitnessCurrentSlide].querySelector('video');
            if (currentVideo) currentVideo.pause();
            
            homeFitnessCurrentSlide = index;
            const offset = -homeFitnessCurrentSlide * 100;
            track.style.transform = `translateX(${offset}%)`;
            
            document.getElementById('homeFitnessDots').querySelectorAll('.dot').forEach((d, i) => {
                d.classList.toggle('active', i === homeFitnessCurrentSlide);
            });
        });
        dotsContainer.appendChild(dot);
    });
    
    // Auto-advance every 10 seconds
    setInterval(() => {
        moveHomeFitnessSlide(1);
    }, 10000);
});

// Football Page Video Slider (M2 Football page)
let footballPageCurrentSlide = 0;

function moveFootballPageSlide(direction) {
    const track = document.getElementById('footballPageSliderTrack');
    if (!track) return;
    
    const slides = track.querySelectorAll('.slider-item');
    const dots = document.getElementById('footballPageDots').querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    // Pause current video
    const currentVideo = slides[footballPageCurrentSlide].querySelector('video');
    if (currentVideo) currentVideo.pause();
    
    // Update slide index
    footballPageCurrentSlide = (footballPageCurrentSlide + direction + totalSlides) % totalSlides;
    
    // Move slider
    const offset = -footballPageCurrentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === footballPageCurrentSlide);
    });
}

// Initialize Football Page Slider
document.addEventListener('DOMContentLoaded', function() {
    const footballPageTrack = document.getElementById('footballPageSliderTrack');
    if (!footballPageTrack) return;
    
    const slides = footballPageTrack.querySelectorAll('.slider-item');
    const dotsContainer = document.getElementById('footballPageDots');
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            const track = document.getElementById('footballPageSliderTrack');
            const currentVideo = track.querySelectorAll('.slider-item')[footballPageCurrentSlide].querySelector('video');
            if (currentVideo) currentVideo.pause();
            
            footballPageCurrentSlide = index;
            const offset = -footballPageCurrentSlide * 100;
            track.style.transform = `translateX(${offset}%)`;
            
            document.getElementById('footballPageDots').querySelectorAll('.dot').forEach((d, i) => {
                d.classList.toggle('active', i === footballPageCurrentSlide);
            });
        });
        dotsContainer.appendChild(dot);
    });
    
    // Auto-advance every 10 seconds
    setInterval(() => {
        moveFootballPageSlide(1);
    }, 10000);
});



