// M2 AI Coach Landing Page JavaScript
// Handles waitlist form submission, FAQ interactions, and smooth scrolling

document.addEventListener('DOMContentLoaded', function() {
    
    // ======================
    // Smooth Scrolling
    // ======================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ======================
    // FAQ Accordion
    // ======================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    
    // ======================
    // Waitlist Form Handling
    // ======================
    const waitlistForm = document.getElementById('waitlistForm');
    const successMessage = document.getElementById('successMessage');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            // Basic validation before Netlify submission
            const firstName = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim();
            const interest = document.getElementById('interest').value;
            const ageGroup = document.getElementById('ageGroup').value;
            const consent = document.getElementById('consent').checked;
            
            // Check required fields
            if (!firstName || !email || !interest || !ageGroup) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
            
            if (!consent) {
                e.preventDefault();
                alert('Please confirm that you would like to receive updates from M2.');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }
            
            // If validation passes, let Netlify handle the submission
            // Netlify will automatically redirect to a success page
            // Or you can add action="/thank-you" to redirect to a custom page
            
            // Disable submit button to prevent double submission
            const submitBtn = waitlistForm.querySelector('.form-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            // Let the form submit naturally (Netlify will handle it)
            return true;
        });
    }
    
    
    // ======================
    // Store Waitlist Data in localStorage
    // ======================
    function storeWaitlistData(data) {
        try {
            // Get existing waitlist data
            let waitlistData = JSON.parse(localStorage.getItem('m2_ai_coach_waitlist') || '[]');
            
            // Add new submission
            waitlistData.push(data);
            
            // Store back in localStorage
            localStorage.setItem('m2_ai_coach_waitlist', JSON.stringify(waitlistData));
            
            console.log('✓ Waitlist data stored successfully');
            console.log('Total submissions:', waitlistData.length);
            
        } catch (error) {
            console.error('Error storing waitlist data:', error);
        }
    }
    
    
    // ======================
    // Mobile Menu Toggle (if implemented)
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle mobile menu display
            if (navLinksContainer.style.display === 'flex') {
                navLinksContainer.style.display = 'none';
            } else {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '100%';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.right = '0';
                navLinksContainer.style.background = 'rgba(18, 18, 26, 0.98)';
                navLinksContainer.style.padding = '2rem';
                navLinksContainer.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
            }
        });
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    navLinksContainer.style.display = 'none';
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && window.innerWidth < 768) {
                navLinksContainer.style.display = 'none';
            }
        });
    }
    
    
    // ======================
    // Scroll-based Animations (Optional)
    // ======================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    
    // ======================
    // Form Field Enhancements
    // ======================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check on load if field has value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    
    // ======================
    // Console Welcome Message
    // ======================
    console.log('%c🚀 Welcome to The M2 AI Coach Landing Page', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
    console.log('%cBuilt by Marco Muthi', 'font-size: 14px; color: #888;');
    console.log('%cJoin the early access list: https://yourdomain.com/m2-ai-coach.html#waitlist', 'font-size: 12px; color: #0066ff;');
    
    
    // ======================
    // Analytics Helper (Optional - for future integration)
    // ======================
    function trackEvent(eventName, eventData) {
        // TODO: Integrate with Google Analytics, Mixpanel, or other analytics service
        console.log('Event:', eventName, eventData);
        
        // Example Google Analytics integration:
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
        */
    }
    
    // Track page sections viewed
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                trackEvent('section_viewed', {
                    section: sectionId,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        if (section.id) {
            sectionObserver.observe(section);
        }
    });
    
    
    // ======================
    // Keyboard Navigation Enhancement
    // ======================
    document.addEventListener('keydown', function(e) {
        // Press 'Escape' to close FAQ items
        if (e.key === 'Escape') {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    
    // ======================
    // Form Auto-save (Optional - saves draft in localStorage)
    // ======================
    const formFields = waitlistForm ? waitlistForm.querySelectorAll('input, select, textarea') : [];
    
    formFields.forEach(field => {
        // Load saved value on page load
        const savedValue = localStorage.getItem('draft_' + field.id);
        if (savedValue && field.type !== 'checkbox') {
            field.value = savedValue;
        } else if (savedValue && field.type === 'checkbox') {
            field.checked = savedValue === 'true';
        }
        
        // Save on input
        field.addEventListener('input', function() {
            if (field.type === 'checkbox') {
                localStorage.setItem('draft_' + field.id, field.checked);
            } else {
                localStorage.setItem('draft_' + field.id, field.value);
            }
        });
    });
    
    // Clear draft after successful submission
    waitlistForm?.addEventListener('submit', function() {
        formFields.forEach(field => {
            localStorage.removeItem('draft_' + field.id);
        });
    });
    
});


// ======================
// Utility Functions
// ======================

// Check if email already exists in waitlist
function isEmailAlreadySubmitted(email) {
    try {
        const waitlistData = JSON.parse(localStorage.getItem('m2_ai_coach_waitlist') || '[]');
        return waitlistData.some(entry => entry.email.toLowerCase() === email.toLowerCase());
    } catch (error) {
        return false;
    }
}

// Get all waitlist submissions (for admin purposes)
function getWaitlistData() {
    try {
        return JSON.parse(localStorage.getItem('m2_ai_coach_waitlist') || '[]');
    } catch (error) {
        console.error('Error retrieving waitlist data:', error);
        return [];
    }
}

// Export waitlist data as CSV (for admin purposes - call from console)
function exportWaitlistCSV() {
    const data = getWaitlistData();
    
    if (data.length === 0) {
        console.log('No waitlist data to export');
        return;
    }
    
    // Create CSV headers
    const headers = ['First Name', 'Email', 'Interest', 'Age Group', 'Goal', 'Timestamp'];
    const csvRows = [headers.join(',')];
    
    // Add data rows
    data.forEach(entry => {
        const row = [
            entry.firstName,
            entry.email,
            entry.interest,
            entry.ageGroup,
            entry.goal || '',
            entry.timestamp
        ];
        csvRows.push(row.join(','));
    });
    
    // Create downloadable file
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'm2-ai-coach-waitlist-' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log('✓ Waitlist CSV exported successfully');
}

// Clear all waitlist data (use with caution!)
function clearWaitlistData() {
    if (confirm('Are you sure you want to clear all waitlist data? This cannot be undone.')) {
        localStorage.removeItem('m2_ai_coach_waitlist');
        console.log('✓ Waitlist data cleared');
    }
}

// Make utility functions available globally for console access
window.m2AICoach = {
    getWaitlistData,
    exportWaitlistCSV,
    clearWaitlistData,
    isEmailAlreadySubmitted
};