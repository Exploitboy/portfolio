/* =============================================
   Portfolio — Interactive Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll-triggered animations (IntersectionObserver) ----
    const animatedElements = document.querySelectorAll('[data-animate]');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for sibling elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 120);
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach(el => animationObserver.observe(el));


    // ---- Floating Nav — Active state tracking (scroll-based) ----
    const navLinks = document.querySelectorAll('.floating-nav__link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150; // offset for better accuracy
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Map process section to its nearest nav item (about)
        if (currentSection === 'process') currentSection = 'about';

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === currentSection);
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav(); // run once on load


    // ---- Smooth scroll for nav links ----
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ---- Hero typing effect ----
    const taglineEl = document.querySelector('.hero__highlight');
    if (taglineEl) {
        const phrases = ['Digital Experiences', 'Modern Interfaces', 'Beautiful Websites', 'Creative Solutions'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                taglineEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                taglineEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before next phrase
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start typing after hero animation completes
        setTimeout(typeEffect, 1500);
    }


    // ---- Parallax-ish scribble movement on scroll ----
    const scribbles = document.querySelectorAll('.hero__scribble');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        scribbles.forEach((scribble, i) => {
            const speed = (i + 1) * 0.15;
            scribble.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });


    // ---- Floating nav hide/show on scroll ----
    const floatingNav = document.getElementById('floatingNav');
    let lastScrollY = 0;
    let navHidden = false;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 400 && !navHidden) {
            floatingNav.style.transform = 'translateX(-50%) translateY(120px)';
            navHidden = true;
        } else if (currentScrollY < lastScrollY && navHidden) {
            floatingNav.style.transform = 'translateX(-50%) translateY(0)';
            navHidden = false;
        }

        lastScrollY = currentScrollY;
    }, { passive: true });


    // ---- Project card hover tilt effect ----
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });


    // ---- Stats counter animation ----
    const statNumbers = document.querySelectorAll('.stat__number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent);
                const suffix = el.textContent.replace(/[0-9]/g, '');
                let current = 0;
                const increment = Math.ceil(target / 40);
                const duration = 1500;
                const stepTime = duration / (target / increment);

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    el.textContent = current + suffix;
                }, stepTime);

                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

});
