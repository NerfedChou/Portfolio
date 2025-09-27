// ENTRANCE SA BAYLEHAN SA AKONG WEBSAYT
document.addEventListener('DOMContentLoaded', () => {
    // trigger entrance once
    const site = document.querySelector('.site-container');
    if (site) {
        requestAnimationFrame(() => {
            setTimeout(() => site.classList.add('animate'), 60);
        });
    }

    // one-time about overlay entrance (moved from inline about.html)
    (function aboutOverlayEntrance() {
        const overlay = document.getElementById('aboutHeroOverlay');
        const qt = document.querySelector('.about-hero-qt');
        if (!overlay && !qt) return;
        const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const revealOverlay = () => {
            if (overlay) overlay.classList.add('entrance');
        };

        if (reduced) {
            if (overlay) overlay.classList.add('entrance');
            if (qt) qt.classList.add('show');
            return;
        }

        requestAnimationFrame(() => {
            revealOverlay();

            // Wait until the overlay no longer has the transient "entrance" class
            // (which is removed later for cleanup). Polling is used to be robust
            // across browsers. Fallback after a max timeout so quote always appears.
            const MAX_WAIT = 1400; // safe upper bound
            const POLL_MS = 50;
            const start = performance.now();

            const checkAndShow = () => {
                const elapsed = performance.now() - start;
                // If overlay no longer carries the transient "entrance" class, reveal qt
                if (!overlay || !overlay.classList.contains('entrance')) {
                    if (qt) qt.classList.add('show');
                    return;
                }
                if (elapsed < MAX_WAIT) {
                    setTimeout(checkAndShow, POLL_MS);
                } else {
                    // fallback: reveal after max wait
                    if (qt) qt.classList.add('show');
                }
            };

            // start checking shortly after the entrance begins
            setTimeout(checkAndShow, 220);

            // keep transient overlay animation class for cleanup (unchanged behavior)
            setTimeout(() => {
                if (overlay) overlay.classList.remove('entrance');
            }, 1200);
        });
    })();

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

    // Reveal skill progress bars when they enter the viewport
    (function initSkillObserver() {
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const skills = Array.from(document.querySelectorAll('.skill'));
        if (!skills.length) return;

        // Fast path for reduced motion: reveal immediately without animation
        if (prefersReduced) {
            skills.forEach(skill => {
                const fill = skill.querySelector('.skill-fill');
                if (!fill) return;
                const percent = getComputedStyle(fill).getPropertyValue('--skill-percent').trim() || '0%';
                fill.style.width = percent;
                skill.classList.add('in-view');
            });
            return;
        }

        // IntersectionObserver to reveal fills when visible
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const skill = entry.target;
                const fill = skill.querySelector('.skill-fill');
                if (fill) {
                    const percent = getComputedStyle(fill).getPropertyValue('--skill-percent').trim() || '0%';
                    // set inline width to trigger transition reliably, and add class
                    fill.style.width = percent;
                    skill.classList.add('in-view');
                }
                obs.unobserve(skill); // reveal once
            });
        }, { threshold: 0.28 });

        skills.forEach(s => observer.observe(s));
    })();

    /* -------------------------------------------------------------
       Skill -> portrait panel wiring: show skill details in panel,
       fade portrait out, type description with cancellation, and
       switch between skills without closing the panel (works on touch).
       Reworked to use pointerover/pointerout with relatedTarget checks
       to avoid redundant retriggers when moving inside the same skill.
       ------------------------------------------------------------- */

    (function wireSkillPortrait() {
        const skillsContainer = document.querySelector('.skills');
        const skills = Array.from(document.querySelectorAll('.skill'));
        const portraitPanel = document.getElementById('portraitPanel');
        const panelTitle = document.getElementById('panelTitle');
        const panelDesc = document.getElementById('panelDesc');
        const aboutLeft = document.querySelector('.about-left');
        if (!skillsContainer || !skills.length || !portraitPanel || !panelDesc || !aboutLeft) return;

        let activeSkill = null;
        let hideTimer = null;
        const HIDE_DELAY = 160;
        let suppressDocumentClose = false;
        const SUPPRESS_MS = 420;

        // typing controller
        let currentTyper = null;
        function createTyper(el, speed = 36) {
            let cancelled = false;
            let timers = [];

            function clearAll() {
                timers.forEach(t => clearTimeout(t));
                timers = [];
            }
            function cancel() {
                cancelled = true;
                clearAll();
            }
            function type(text) {
                cancel();
                cancelled = false;
                el.textContent = '';
                let i = 0;
                return new Promise((resolve) => {
                    const tick = () => {
                        if (cancelled) { resolve(false); return; }
                        el.textContent = text.slice(0, ++i);
                        if (i < text.length) {
                            timers.push(setTimeout(tick, speed + (Math.random() * 40 - 20)));
                        } else {
                            resolve(true);
                        }
                    };
                    timers.push(setTimeout(tick, speed));
                });
            }
            return { type, cancel };
        }

        const typer = () => {
            if (currentTyper && currentTyper.cancel) currentTyper.cancel();
            currentTyper = createTyper(panelDesc, 36);
            return currentTyper;
        };

        const clearHideTimer = () => {
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = null;
            }
        };

        const setSuppress = (ms = SUPPRESS_MS) => {
            suppressDocumentClose = true;
            setTimeout(() => { suppressDocumentClose = false; }, ms);
        };

        // NOTE: showDetail now early-returns if the clicked/entered skill is already active
        async function showDetail(skillEl) {
            clearHideTimer();
            setSuppress();

            const label = (skillEl.querySelector('.skill-label') || { textContent: '' }).textContent.trim();
            const detail = skillEl.getAttribute('data-detail') || '';

            // Prevent redundant re-processing for the same active skill
            if (activeSkill === skillEl) return;

            // update title immediately and clear description before typing
            if (panelTitle) panelTitle.textContent = label;
            if (panelDesc) panelDesc.textContent = '';

            // set new active skill reference
            activeSkill = skillEl;

            const panelIsVisible = portraitPanel.classList.contains('visible');

            // add about-left active to dim portrait (CSS handles visual)
            aboutLeft.classList.add('active');

            if (panelIsVisible) {
                // quick switch while panel already open: cancel previous typing and type new content
                if (currentTyper && currentTyper.cancel) currentTyper.cancel();
                const t = typer();
                const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (prefersReduced) {
                    panelDesc.innerHTML = highlightFirstOccurrence(detail, label);
                } else {
                    await t.type(detail);
                    if (activeSkill === skillEl) panelDesc.innerHTML = highlightFirstOccurrence(detail, label);
                }
                return;
            }

            // Normal open sequence: reveal panel after slight delay, then type
            setTimeout(async () => {
                portraitPanel.classList.add('visible');
                await new Promise(res => setTimeout(res, 140));
                if (currentTyper && currentTyper.cancel) currentTyper.cancel();
                const t = typer();
                const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (prefersReduced) {
                    panelDesc.innerHTML = highlightFirstOccurrence(detail, label);
                } else {
                    await t.type(detail);
                    if (activeSkill === skillEl) panelDesc.innerHTML = highlightFirstOccurrence(detail, label);
                }
            }, 180);
        }

        function scheduleHide(skillEl) {
            clearHideTimer();
            hideTimer = setTimeout(() => {
                if (activeSkill === skillEl) hideDetail();
                hideTimer = null;
            }, HIDE_DELAY);
        }

        function hideDetail() {
            clearHideTimer();
            if (currentTyper && currentTyper.cancel) currentTyper.cancel();

            portraitPanel.classList.add('hiding');
            portraitPanel.classList.remove('visible');

            setTimeout(() => {
                portraitPanel.classList.remove('hiding');
                aboutLeft.classList.remove('active');
            }, 220);

            // remove pull from all skills when panel fully hides
            skills.forEach(s => s.classList.remove('pull'));
            activeSkill = null;
        }

        // pointerdown/click delegation so clicks on progress bar work
        skillsContainer.addEventListener('pointerdown', (e) => {
            const skill = e.target.closest('.skill');
            if (!skill) return;
            setSuppress();
        }, { passive: true });

        skillsContainer.addEventListener('click', (e) => {
            const skill = e.target.closest('.skill');
            if (!skill) return;
            e.stopPropagation();
            clearHideTimer();
            setSuppress();
            // clicking same active skill toggles off, otherwise switch to clicked skill
            if (activeSkill === skill) {
                hideDetail();
            } else {
                // ensure pull is applied immediately on click
                skills.forEach(s => s.classList.remove('pull'));
                skill.classList.add('pull');
                showDetail(skill);
            }
        });

        // --- Use pointerover/pointerout delegation to avoid redundant triggers ---
        skillsContainer.addEventListener('pointerover', (e) => {
            const skill = e.target.closest('.skill');
            if (!skill) return;
            // ignore when moving between elements within the same skill
            const from = e.relatedTarget;
            if (from && skill.contains(from)) return;

            // apply pull visual always on enter
            skills.forEach(s => s.classList.remove('pull'));
            skill.classList.add('pull');

            // only show detail if entering a different skill
            if (activeSkill !== skill) {
                showDetail(skill);
            }
        });

        skillsContainer.addEventListener('pointerout', (e) => {
            const skill = e.target.closest('.skill');
            if (!skill) return;
            // ignore when moving to elements inside the same skill
            const to = e.relatedTarget;
            if (to && skill.contains(to)) return;

            // schedule hide for this skill
            scheduleHide(skill);
            // remove pull as we leave
            skill.classList.remove('pull');
        });

        // keyboard: focus/blur still drive show/hide and pull
        skillsContainer.addEventListener('focusin', (e) => {
            const skill = e.target.closest('.skill');
            if (!skill) return;
            skills.forEach(s => s.classList.remove('pull'));
            skill.classList.add('pull');
            if (activeSkill !== skill) showDetail(skill);
        });

        skillsContainer.addEventListener('focusout', (e) => {
            const skill = e.target.closest('.skill');
            if (!skill) return;
            scheduleHide(skill);
            skill.classList.remove('pull');
        });

        document.addEventListener('click', (e) => {
            if (suppressDocumentClose) return;
            if (!aboutLeft.contains(e.target) && !skills.some(s => s.contains(e.target))) {
                hideDetail();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc') {
                hideDetail();
            }
        });

    })();

});


let resizeTimer = null;
window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        resizeTimer = null;
    }, 200);
});

// helper to escape HTML for safe insertion
function escapeHtml(str = '') {
    return String(str).replace(/[&<>"']/g, (s) => {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[s];
    });
}

// highlight first occurrence of label inside text (case-insensitive)
function highlightFirstOccurrence(text = '', label = '') {
    if (!label) return escapeHtml(text);
    const idx = String(text).toLowerCase().indexOf(String(label).toLowerCase());
    if (idx === -1) return escapeHtml(text);
    const before = escapeHtml(String(text).slice(0, idx));
    const match = escapeHtml(String(text).slice(idx, idx + String(label).length));
    const after = escapeHtml(String(text).slice(idx + String(label).length));
    return `${before}<span class="panel-keyword">${match}</span>${after}`;
}
