console.log('Script loaded (Delegation & GSAP)');

function toggleMenu() {
    const navOverlay = document.getElementById('nav-overlay');
    if (!navOverlay) {
        console.error('Nav overlay not found');
        return;
    }

    const isActive = navOverlay.classList.contains('active');
    if (!isActive) {
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
        console.log('Menu Opened');

        // GSAP Animation for menu items
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.nav-link',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
            );
        }

    } else {
        navOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
        console.log('Menu Closed');
    }
}

// Global Event Delegation
document.addEventListener('click', (e) => {
    // Check if clicked element or its parent is the menu icon
    if (e.target.closest('.menu-icon')) {
        toggleMenu();
    }

    // Check if clicked element or its parent is the close icon
    if (e.target.closest('.close-icon')) {
        toggleMenu();
    }

    // Check if clicked element is a nav link (to close menu after selection)
    if (e.target.closest('.nav-link')) {
        const navOverlay = document.getElementById('nav-overlay');
        if (navOverlay) {
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// =========================================
// GSAP SCROLL ANIMATION SYSTEM
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initAnimations();
    } else {
        console.warn('GSAP or ScrollTrigger not loaded');
    }
});

function initAnimations() {
    // 1. Hero Animations (Load immediately)
    const heroElements = document.querySelectorAll('.hero-animate');
    if (heroElements.length > 0) {
        gsap.fromTo(heroElements,
            { y: 60, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out'
            }
        );
    }

    // 2. Scroll Reveal - Standard Fade Up
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        gsap.fromTo(el,
            { y: 50, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%', // Trigger when top of element hits 85% viewport height
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out'
            }
        );
    });

    // 3. Scroll Reveal - Slide Left
    const leftElements = document.querySelectorAll('.reveal-left');
    leftElements.forEach(el => {
        gsap.fromTo(el,
            { x: -50, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                x: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out'
            }
        );
    });

    // 4. Scroll Reveal - Slide Right
    const rightElements = document.querySelectorAll('.reveal-right');
    rightElements.forEach(el => {
        gsap.fromTo(el,
            { x: 50, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                x: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out'
            }
        );
    });

    // 5. Scroll Reveal - Zoom
    const zoomElements = document.querySelectorAll('.reveal-zoom');
    zoomElements.forEach(el => {
        gsap.fromTo(el,
            { scale: 0.9, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                scale: 1,
                autoAlpha: 1,
                duration: 1,
                ease: 'back.out(1.7)'
            }
        );
    });

    // 6. Staggered Lists (if any specific parent has .stagger-container)
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const children = container.children;
        gsap.fromTo(children,
            { y: 30, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            }
        );
    });
}
