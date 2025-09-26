// ENTRANCE SA BAYLEHAN SA AKONG WEBSAYT
document.addEventListener('DOMContentLoaded', () => {
    // trigger entrance once
    const site = document.querySelector('.site-container');
    if (site) {
        requestAnimationFrame(() => {
            setTimeout(() => site.classList.add('animate'), 60);
        });
    }

    // Typewriter setup
    const typeEl = document.getElementById('typewriter');
    if (typeEl) {
        const acceptsReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const roles = [
            'Back End Developer',
            'Front End Developer',
            'UI/UX Designer',
            'System Architecture',
            'Senior Developer',
            'Game Developer',
            'Cyber Security'
        ]; //GIKUHA ra nakos youtube para sa typewriter effect
        if (!acceptsReduced) {
            let index = 0, char = 0, deleting = false;
            const typeSpeed = 80;
            const deleteSpeed = 40;
            const pause = 1400;

            const step = () => {
                const current = roles[index];
                if (!deleting) {
                    typeEl.textContent = current.slice(0, ++char);
                    if (char === current.length) {
                        deleting = true;
                        setTimeout(step, pause);
                        return;
                    }
                    setTimeout(step, typeSpeed);
                } else {
                    typeEl.textContent = current.slice(0, --char);
                    if (char === 0) {
                        deleting = false;
                        index = (index + 1) % roles.length;
                        setTimeout(step, 220);
                        return;
                    }
                    setTimeout(step, deleteSpeed);
                }
            };

            setTimeout(step, 700);
        } else {

            typeEl.textContent = roles[0];
        }
    }


    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {

        hamburger.setAttribute('aria-expanded', hamburger.getAttribute('aria-expanded') || 'false');
        if (!hamburger.hasAttribute('aria-controls')) hamburger.setAttribute('aria-controls', 'navMenu');
        hamburger.tabIndex = 0;
    }

    if (hamburger && navMenu) {

        navMenu.setAttribute('role', navMenu.getAttribute('role') || 'navigation');
        navMenu.setAttribute('aria-hidden', 'true');

        const firstLink = () => navMenu.querySelector('.nav-link');

        // accept focusHint: when true, move focus to first link after opening
        const openNav = (focusHint = false) => {
            navMenu.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            navMenu.setAttribute('aria-hidden', 'false');
            if (focusHint) {
                const first = firstLink();
                if (first) first.focus();
            }
        };

        // closeNav optionally returns focus to hamburger (default true)
        const closeNav = (returnFocus = true) => {
            navMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            if (returnFocus) hamburger.focus();
        };

        const toggleNav = (focusHint = false) => {
            const isOpen = navMenu.classList.contains('open');
            if (isOpen) closeNav(true);
            else openNav(focusHint);
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            // mouse click: open/close without forcing focus into nav
            toggleNav(false);
        });
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // keyboard activation: move focus to first link for accessibility
                toggleNav(true);
            } else if (e.key === 'ArrowDown') {

                e.preventDefault();
                openNav(true);
            }
        });

        // Handle in-page hash links reliably: only intercept on mobile / when overlay is open.
        const navLinks = Array.from(navMenu.querySelectorAll('a[href^="#"]'));
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href || !href.startsWith('#')) return;
                const id = href.slice(1);
                const target = document.getElementById(id);
                if (!target) return;

                // Only intercept navigation when the mobile overlay is active or on small screens.
                const isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
                if (!isSmallScreen && !navMenu.classList.contains('open')) {
                    // Desktop: allow default anchor behavior
                    return;
                }

                e.preventDefault();
                // close overlay/menu (don't force focus back — user is navigating)
                closeNav(false);

                const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                // allow the close animation to finish, then scroll with appropriate offset
                setTimeout(() => {
                    // only subtract header height if header is fixed
                    const headerEl = document.querySelector('.header');
                    let headerOffset = 0;
                    if (headerEl) {
                        const headerPos = getComputedStyle(headerEl).position;
                        if (headerPos === 'fixed' || headerPos === 'sticky') {
                            headerOffset = Math.ceil(headerEl.getBoundingClientRect().height);
                        }
                    }
                    const rect = target.getBoundingClientRect();
                    const targetY = rect.top + window.pageYOffset - headerOffset - 8;
                    try {
                        window.scrollTo({ top: targetY, behavior: prefersReduced ? 'auto' : 'smooth' });
                    } catch (err) {
                        window.location.hash = `#${id}`;
                    }
                }, 180);
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('open')) {
                    closeNav();
                }
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                if (navMenu.classList.contains('open')) {
                    closeNav();
                }
            }
        });


        const observer = new MutationObserver(() => {
            const isOpen = navMenu.classList.contains('open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
            navMenu.setAttribute('aria-hidden', String(!isOpen));
        });
        observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
    }


    // Reusable glassy cycle function
    function startGlassyCycle(selector = '.glassy', intervalMs = 2000) {
        const items = Array.from(document.querySelectorAll(selector)).filter(Boolean);
        if (!items.length) return null;

        if (window.__glassyInterval) {
            clearInterval(window.__glassyInterval);
            window.__glassyInterval = null;
        }

        let idx = -1;
        const activate = (i) => {

            items.forEach(el => el.classList.remove('glassy-active'));

            const target = items[i];
            if (target) {
                // force reflow
                void target.offsetWidth;
                target.classList.add('glassy-active');
            }
        };

        const step = () => {
            idx = (idx + 1) % items.length;
            activate(idx);
        };


        step();
        window.__glassyInterval = setInterval(step, intervalMs);

        // pause/resume handlers (unchanged behavior)
        items.forEach((el, i) => {
            let hoverTimeout = null;
            el.addEventListener('mouseenter', () => {
                if (window.__glassyInterval) clearInterval(window.__glassyInterval);
                items.forEach(it => it.classList.remove('glassy-active'));

                void el.offsetWidth;
                el.classList.add('glassy-active');
                if (hoverTimeout) clearTimeout(hoverTimeout);
            });
            el.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    if (window.__glassyInterval) clearInterval(window.__glassyInterval);
                    idx = i;
                    window.__glassyInterval = setInterval(step, intervalMs);
                }, 300);
            });
            el.addEventListener('focus', () => {
                if (window.__glassyInterval) clearInterval(window.__glassyInterval);
                items.forEach(it => it.classList.remove('glassy-active'));
                void el.offsetWidth;
                el.classList.add('glassy-active');
            });
            el.addEventListener('blur', () => {
                if (window.__glassyInterval) clearInterval(window.__glassyInterval);
                idx = i;
                window.__glassyInterval = setInterval(step, intervalMs);
            });
        });

        return {
            stop() {
                if (window.__glassyInterval) {
                    clearInterval(window.__glassyInterval);
                    window.__glassyInterval = null;
                }
                items.forEach(it => it.classList.remove('glassy-active'));
            }
        };
    }

    startGlassyCycle('.glassy', 2000);
});


let resizeTimer = null;
window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        resizeTimer = null;
    }, 200);
});
