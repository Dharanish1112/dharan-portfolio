/* ========================================
   DHARANISH S — PORTFOLIO JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Loading Screen ----
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2200);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 3000);

    // ---- Custom Cursor ----
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .service-card, .skill-category, .stat-card, .float-tag, input, textarea');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hover');
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hover');
            ring.classList.remove('hover');
        });
    });

    // ---- Navbar Scroll ----
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Sticky effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link detection
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 200;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ---- Mobile Menu ----
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    navToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('active', menuOpen);
        navToggle.classList.toggle('active', menuOpen);
    });

    document.querySelectorAll('.mobile-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // ---- Smooth Scrolling ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Message Sent! ✓</span>';
        btn.style.background = 'var(--green)';
        btn.style.color = '#000';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });

    // ---- Floating Tags Parallax on Scroll ----
    const floatingTags = document.querySelectorAll('.float-tag');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        floatingTags.forEach((tag, i) => {
            const speed = 0.02 + (i * 0.01);
            const y = Math.sin(scrollY * speed + i) * 8;
            tag.style.marginTop = y + 'px';
        });
    });

    // ---- Hero Stage Scroll Parallax ----
    const heroBar  = document.querySelector('.hero-platform-bar');
    const heroCone = document.querySelector('.hero-platform-glow');
    const heroName = document.querySelector('.hero-new-name');
    const heroRole = document.querySelector('.hero-new-role');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            const progress = scrollY / window.innerHeight;

            if (heroBar)  heroBar.style.transform  = `scaleX(1) translateY(${-scrollY * 0.25}px)`;
            if (heroCone) heroCone.style.transform = `scaleX(1) scaleY(${1 - progress * 0.4}) translateY(${-scrollY * 0.18}px)`;

            if (heroName) {
                heroName.style.opacity   = `${1 - progress * 2}`;
                heroName.style.transform = `translateY(${-scrollY * 0.15}px)`;
            }
            if (heroRole) {
                heroRole.style.opacity   = `${1 - progress * 2.2}`;
                heroRole.style.transform = `translateY(${-scrollY * 0.12}px)`;
            }
        }
    });


    const uiuxTabs = document.querySelectorAll('.uiux-tab');
    const uiuxCards = document.querySelectorAll('.uiux-card');

    uiuxTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            uiuxTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            uiuxCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                if (match) {
                    card.style.opacity = '1';
                    card.style.transform = '';
                    card.style.pointerEvents = '';
                } else {
                    card.style.opacity = '0.2';
                    card.style.transform = 'scale(0.97)';
                    card.style.pointerEvents = 'none';
                }
            });
        });
    });

    // ---- Cursor hover for UI/UX cards ----
    document.querySelectorAll('.uiux-card, .uiux-btn-primary, .uiux-tab').forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hover');
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hover');
            ring.classList.remove('hover');
        });
    });

    // ---- Tilt effect for UI/UX cards ----
    document.querySelectorAll('.uiux-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = (y - cy) / 25;
            const rotY = (cx - x) / 25;
            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    // ---- Tilt Effect on Project Cards ----
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.01)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ---- Typed effect for hero intro (subtle) ----
    const heroIntro = document.querySelector('.hero-intro');
    if (heroIntro) {
        const text = heroIntro.textContent;
        heroIntro.textContent = '';
        heroIntro.style.opacity = '1';
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                heroIntro.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 40);
            }
        }
        setTimeout(typeChar, 2400); // after loader
    }

    // ---- Counter Animation for Stats ----
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const num = parseInt(text);
                if (!isNaN(num) && num > 0) {
                    let current = 0;
                    const increment = Math.ceil(num / 30);
                    const suffix = text.replace(/[0-9]/g, '');
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            current = num;
                            clearInterval(timer);
                        }
                        el.textContent = current + suffix;
                    }, 40);
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
});
