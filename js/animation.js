

document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------
       Helpers & configuration
       ------------------------- */
    const PREFERS_REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function deferRun(fn, delay = 0) {
        requestAnimationFrame(() => setTimeout(fn, delay));
    }

    /* -------------------------
       Site entrance animation
       ------------------------- */
    function initializeSiteEntrance() {
        const siteContainer = document.querySelector('.site-container');
        if (!siteContainer) return;
        deferRun(() => siteContainer.classList.add('animate'), 60);
    }

    /* -------------------------
       About hero overlay (one-time)
       ------------------------- */
    function initializeAboutOverlayEntrance() {
        const overlay = document.getElementById('aboutHeroOverlay');
        const quotePanel = document.querySelector('.about-hero-qt');
        if (!overlay && !quotePanel) return;
        if (PREFERS_REDUCED_MOTION) {
            if (overlay) overlay.classList.add('entrance');
            if (quotePanel) quotePanel.classList.add('show');
            return;
        }

        deferRun(() => {
            if (overlay) overlay.classList.add('entrance');

            const MAX_WAIT_MS = 1400;
            const POLL_INTERVAL_MS = 50;
            const startTime = performance.now();

            const pollForOverlayEnd = () => {
                const elapsed = performance.now() - startTime;
                if (!overlay || !overlay.classList.contains('entrance')) {
                    if (quotePanel) quotePanel.classList.add('show');
                    return;
                }
                if (elapsed < MAX_WAIT_MS) {
                    setTimeout(pollForOverlayEnd, POLL_INTERVAL_MS);
                } else {
                    if (quotePanel) quotePanel.classList.add('show');
                }
            };

            setTimeout(pollForOverlayEnd, 220);
            // cleanup transient state later (keeps prior behavior)
            setTimeout(() => { if (overlay) overlay.classList.remove('entrance'); }, 1200);
        }, 0);
    }

    /* -------------------------
       Typewriter (roles cycle)
       ------------------------- */
    function initializeTypewriter() {
        const typewriterEl = document.getElementById('typewriter');
        if (!typewriterEl) return;

        const roles = [
            'Back End Developer',
            'Front End Developer',
            'UI/UX Designer',
            'System Architecture',
            'Senior Developer',
            'Game Developer',
            'Cyber Security'
        ];

        if (PREFERS_REDUCED_MOTION) {
            typewriterEl.textContent = roles[0];
            return;
        }

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const TYPE_SPEED = 80;
        const DELETE_SPEED = 40;
        const PAUSE_AFTER_FULL = 1400;

        function stepType() {
            const currentRole = roles[roleIndex];
            if (!deleting) {
                charIndex++;
                typewriterEl.textContent = currentRole.slice(0, charIndex);
                if (charIndex === currentRole.length) {
                    deleting = true;
                    setTimeout(stepType, PAUSE_AFTER_FULL);
                    return;
                }
                setTimeout(stepType, TYPE_SPEED);
            } else {
                charIndex--;
                typewriterEl.textContent = currentRole.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(stepType, 220);
                    return;
                }
                setTimeout(stepType, DELETE_SPEED);
            }
        }

        setTimeout(stepType, 700);
    }

    /* -------------------------
       Accessible hamburger/navigation
       ------------------------- */
    function initializeNavigation() {
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const navigationMenu = document.getElementById('navMenu');
        if (!hamburgerBtn || !navigationMenu) return;

        hamburgerBtn.setAttribute('aria-expanded', hamburgerBtn.getAttribute('aria-expanded') || 'false');
        if (!hamburgerBtn.hasAttribute('aria-controls')) hamburgerBtn.setAttribute('aria-controls', 'navMenu');
        hamburgerBtn.tabIndex = 0;

        navigationMenu.setAttribute('role', navigationMenu.getAttribute('role') || 'navigation');
        navigationMenu.setAttribute('aria-hidden', 'true');

        const getFirstNavLink = () => navigationMenu.querySelector('.nav-link');

        function openNavigation(focusFirst = false) {
            navigationMenu.classList.add('open');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            navigationMenu.setAttribute('aria-hidden', 'false');
            if (focusFirst) {
                const first = getFirstNavLink();
                if (first) first.focus();
            }
        }

        function closeNavigation(returnFocusToBtn = true) {
            navigationMenu.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            navigationMenu.setAttribute('aria-hidden', 'true');
            if (returnFocusToBtn) hamburgerBtn.focus();
        }

        function toggleNavigation(focusHint = false) {
            if (navigationMenu.classList.contains('open')) closeNavigation(true);
            else openNavigation(focusHint);
        }

        hamburgerBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            toggleNavigation(false);
        });

        hamburgerBtn.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                toggleNavigation(true);
            } else if (ev.key === 'ArrowDown') {
                ev.preventDefault();
                openNavigation(true);
            }
        });

        // reliable in-page link handling on mobile/overlay
        const inPageLinks = Array.from(navigationMenu.querySelectorAll('a[href^="#"]'));
        inPageLinks.forEach(link => {
            link.addEventListener('click', (ev) => {
                const href = link.getAttribute('href');
                if (!href || !href.startsWith('#')) return;
                const targetId = href.slice(1);
                const targetEl = document.getElementById(targetId);
                if (!targetEl) return;

                const smallScreen = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
                if (!smallScreen && !navigationMenu.classList.contains('open')) {
                    // desktop: allow default
                    return;
                }

                ev.preventDefault();
                closeNavigation(false);

                const prefersReduced = PREFERS_REDUCED_MOTION;
                setTimeout(() => {
                    const headerEl = document.querySelector('.header');
                    let headerOffset = 0;
                    if (headerEl) {
                        const headerPos = getComputedStyle(headerEl).position;
                        if (headerPos === 'fixed' || headerPos === 'sticky') {
                            headerOffset = Math.ceil(headerEl.getBoundingClientRect().height);
                        }
                    }
                    const rect = targetEl.getBoundingClientRect();
                    const targetY = rect.top + window.pageYOffset - headerOffset - 8;
                    try {
                        window.scrollTo({ top: targetY, behavior: prefersReduced ? 'auto' : 'smooth' });
                    } catch {
                        window.location.hash = `#${targetId}`;
                    }
                }, 180);
            });
        });

        document.addEventListener('click', (ev) => {
            if (!hamburgerBtn.contains(ev.target) && !navigationMenu.contains(ev.target)) {
                if (navigationMenu.classList.contains('open')) closeNavigation();
            }
        });

        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' || ev.key === 'Esc') {
                if (navigationMenu.classList.contains('open')) closeNavigation();
            }
        });

        const menuObserver = new MutationObserver(() => {
            const isOpen = navigationMenu.classList.contains('open');
            hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
            navigationMenu.setAttribute('aria-hidden', String(!isOpen));
        });
        menuObserver.observe(navigationMenu, { attributes: true, attributeFilter: ['class'] });
    }

    /* -------------------------
       Glassy sheen cycle (reusable)
       ------------------------- */
    function startGlassyCycle(selector = '.glassy', intervalMs = 2000) {
        const elements = Array.from(document.querySelectorAll(selector)).filter(Boolean);
        if (!elements.length) return null;

        if (window.__glassyInterval) {
            clearInterval(window.__glassyInterval);
            window.__glassyInterval = null;
        }

        let currentIndex = -1;

        function activateIndex(index) {
            elements.forEach(el => el.classList.remove('glassy-active'));
            const target = elements[index];
            if (target) {
                // force reflow to restart animation
                void target.offsetWidth;
                target.classList.add('glassy-active');
            }
        }

        function step() {
            currentIndex = (currentIndex + 1) % elements.length;
            activateIndex(currentIndex);
        }

        step();
        window.__glassyInterval = setInterval(step, intervalMs);

        // pause on interaction
        elements.forEach((element, idx) => {
            let resumeTimeout = null;
            element.addEventListener('mouseenter', () => {
                if (window.__glassyInterval) clearInterval(window.__glassyInterval);
                elements.forEach(it => it.classList.remove('glassy-active'));
                void element.offsetWidth;
                element.classList.add('glassy-active');
                if (resumeTimeout) clearTimeout(resumeTimeout);
            });
            element.addEventListener('mouseleave', () => {
                resumeTimeout = setTimeout(() => {
                    if (window.__glassyInterval) clearInterval(window.__glassyInterval);
                    currentIndex = idx;
                    window.__glassyInterval = setInterval(step, intervalMs);
                }, 300);
            });
            element.addEventListener('focus', () => {
                if (window.__glassyInterval) clearInterval(window.__glassyInterval);
                elements.forEach(it => it.classList.remove('glassy-active'));
                void element.offsetWidth;
                element.classList.add('glassy-active');
            });
            element.addEventListener('blur', () => {
                if (window.__glassyInterval) clearInterval(window.__glassyInterval);
                currentIndex = idx;
                window.__glassyInterval = setInterval(step, intervalMs);
            });
        });

        return {
            stop() {
                if (window.__glassyInterval) {
                    clearInterval(window.__glassyInterval);
                    window.__glassyInterval = null;
                }
                elements.forEach(it => it.classList.remove('glassy-active'));
            }
        };
    }

    /* -------------------------
       Skill progress intersection observer
       ------------------------- */
    function initializeSkillObserver() {
        const prefersReduced = PREFERS_REDUCED_MOTION;
        const skillNodes = Array.from(document.querySelectorAll('.skill'));
        if (!skillNodes.length) return;

        if (prefersReduced) {
            skillNodes.forEach(skill => {
                const fill = skill.querySelector('.skill-fill');
                if (!fill) return;
                const percent = getComputedStyle(fill).getPropertyValue('--skill-percent').trim() || '0%';
                fill.style.width = percent;
                skill.classList.add('in-view');
            });
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const skill = entry.target;
                const fill = skill.querySelector('.skill-fill');
                if (fill) {
                    const percent = getComputedStyle(fill).getPropertyValue('--skill-percent').trim() || '0%';
                    fill.style.width = percent;
                    skill.classList.add('in-view');
                }
                obs.unobserve(skill);
            });
        }, { threshold: 0.28 });

        skillNodes.forEach(n => observer.observe(n));
    }

    /* -------------------------
       Skill ↔ Portrait wiring (pointer delegation + cancellable typing)
       ------------------------- */
    function wireSkillPortraitPanel() {
        const skillsContainer = document.querySelector('.skills');
        const skillNodes = Array.from(document.querySelectorAll('.skill'));
        const portraitPanel = document.getElementById('portraitPanel');
        const panelTitle = document.getElementById('panelTitle');
        const panelDescription = document.getElementById('panelDesc');
        const aboutLeft = document.querySelector('.about-left');

        if (!skillsContainer || !skillNodes.length || !portraitPanel || !panelDescription || !aboutLeft) return;

        let activeSkillNode = null;
        let hideTimer = null;
        const HIDE_DELAY_MS = 160;
        let suppressDocumentClose = false;
        const SUPPRESS_MS = 420;

        // cancellable typing factory
        function createCancellableTyper(targetEl, charDelay = 36) {
            let cancelled = false;
            const timers = [];
            function clearTimers() { timers.forEach(t => clearTimeout(t)); }

            function cancel() {
                cancelled = true;
                clearTimers();
            }

            function typeText(text) {
                cancel();
                cancelled = false;
                targetEl.textContent = '';
                let pos = 0;
                return new Promise(resolve => {
                    const tick = () => {
                        if (cancelled) { resolve(false); return; }
                        targetEl.textContent = text.slice(0, ++pos);
                        if (pos < text.length) {
                            timers.push(setTimeout(tick, charDelay + (Math.random() * 40 - 20)));
                        } else {
                            resolve(true);
                        }
                    };
                    timers.push(setTimeout(tick, charDelay));
                });
            }

            return { typeText, cancel };
        }

        let activeTyper = null;
        function resetTyper() {
            if (activeTyper && activeTyper.cancel) activeTyper.cancel();
            activeTyper = createCancellableTyper(panelDescription, 36);
            return activeTyper;
        }

        function clearHideTimer() {
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        }

        function setSuppressDocumentClose(ms = SUPPRESS_MS) {
            suppressDocumentClose = true;
            setTimeout(() => { suppressDocumentClose = false; }, ms);
        }

        async function showSkillDetail(skillNode) {
            clearHideTimer();
            setSuppressDocumentClose();

            const labelText = (skillNode.querySelector('.skill-label') || { textContent: '' }).textContent.trim();
            const detailText = skillNode.getAttribute('data-detail') || '';

            // Prevent redundant re-processing for the same active skill
            if (activeSkillNode === skillNode) return;

            // update title immediately and clear description before typing
            if (panelTitle) panelTitle.textContent = labelText;
            if (panelDescription) panelDescription.textContent = '';

            activeSkillNode = skillNode;
            aboutLeft.classList.add('active');

            const panelAlreadyVisible = portraitPanel.classList.contains('visible');

            if (panelAlreadyVisible) {
                if (activeTyper && activeTyper.cancel) activeTyper.cancel();
                const typer = resetTyper();
                if (PREFERS_REDUCED_MOTION) {
                    panelDescription.innerHTML = highlightFirstOccurrence(detailText, labelText);
                } else {
                    await typer.typeText(detailText);
                    if (activeSkillNode === skillNode) panelDescription.innerHTML = highlightFirstOccurrence(detailText, labelText);
                }
                return;
            }

            // Normal open: reveal panel then type
            setTimeout(async () => {
                portraitPanel.classList.add('visible');
                await new Promise(res => setTimeout(res, 140));
                if (activeTyper && activeTyper.cancel) activeTyper.cancel();
                const typer = resetTyper();
                if (PREFERS_REDUCED_MOTION) {
                    panelDescription.innerHTML = highlightFirstOccurrence(detailText, labelText);
                } else {
                    await typer.typeText(detailText);
                    if (activeSkillNode === skillNode) panelDescription.innerHTML = highlightFirstOccurrence(detailText, labelText);
                }
            }, 180);
        }

        function scheduleHideForSkill(skillNode) {
            clearHideTimer();
            hideTimer = setTimeout(() => {
                if (activeSkillNode === skillNode) hideSkillDetail();
                hideTimer = null;
            }, HIDE_DELAY_MS);
        }

        function hideSkillDetail() {
            clearHideTimer();
            if (activeTyper && activeTyper.cancel) activeTyper.cancel();

            portraitPanel.classList.add('hiding');
            portraitPanel.classList.remove('visible');

            setTimeout(() => {
                portraitPanel.classList.remove('hiding');
                aboutLeft.classList.remove('active');
            }, 220);

            skillNodes.forEach(s => s.classList.remove('pull'));
            activeSkillNode = null;
        }

        // pointerdown: ensure taps on small interactive children are recognized
        skillsContainer.addEventListener('pointerdown', (ev) => {
            const clicked = ev.target.closest('.skill');
            if (!clicked) return;
            setSuppressDocumentClose();
        }, { passive: true });

        // click: toggle or switch
        skillsContainer.addEventListener('click', (ev) => {
            const clicked = ev.target.closest('.skill');
            if (!clicked) return;
            ev.stopPropagation();
            clearHideTimer();
            setSuppressDocumentClose();
            if (activeSkillNode === clicked) {
                hideSkillDetail();
            } else {
                skillNodes.forEach(s => s.classList.remove('pull'));
                clicked.classList.add('pull');
                showSkillDetail(clicked);
            }
        });

        // pointerover/pointerout with relatedTarget checks prevents redundant retriggers
        skillsContainer.addEventListener('pointerover', (ev) => {
            const entered = ev.target.closest('.skill');
            if (!entered) return;
            const from = ev.relatedTarget;
            if (from && entered.contains(from)) return;

            skillNodes.forEach(s => s.classList.remove('pull'));
            entered.classList.add('pull');

            if (activeSkillNode !== entered) showSkillDetail(entered);
        });

        skillsContainer.addEventListener('pointerout', (ev) => {
            const left = ev.target.closest('.skill');
            if (!left) return;
            const to = ev.relatedTarget;
            if (to && left.contains(to)) return;

            scheduleHideForSkill(left);
            left.classList.remove('pull');
        });

        // keyboard focus support
        skillsContainer.addEventListener('focusin', (ev) => {
            const focused = ev.target.closest('.skill');
            if (!focused) return;
            skillNodes.forEach(s => s.classList.remove('pull'));
            focused.classList.add('pull');
            if (activeSkillNode !== focused) showSkillDetail(focused);
        });
        skillsContainer.addEventListener('focusout', (ev) => {
            const blurred = ev.target.closest('.skill');
            if (!blurred) return;
            scheduleHideForSkill(blurred);
            blurred.classList.remove('pull');
        });

        // document-level close unless suppressed immediately after a skill interaction
        document.addEventListener('click', (ev) => {
            if (suppressDocumentClose) return;
            if (!aboutLeft.contains(ev.target) && !skillNodes.some(s => s.contains(ev.target))) hideSkillDetail();
        });

        // Escape hides panel
        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' || ev.key === 'Esc') hideSkillDetail();
        });
    }

    /* -------------------------
       Service cards entrance animation
       ------------------------- */
    function initializeServicesEntrance() {
        const serviceList = document.querySelector('.service-list');
        if (!serviceList) return;

        // If prefers-reduced-motion, show instantly
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            serviceList.classList.add('services-animate');
            serviceList.querySelectorAll('.service-list-item').forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'none';
                item.style.animation = 'none';
            });
            return;
        }

        // Animate when in viewport
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    serviceList.classList.add('services-animate');
                    obs.disconnect();
                }
            });
        }, { threshold: 0.18 });

        observer.observe(serviceList);
    }

    /* -------------------------
       Initialization sequence
       ------------------------- */
    initializeSiteEntrance();
    initializeAboutOverlayEntrance();
    initializeTypewriter();
    initializeNavigation();
    startGlassyCycle('.glassy', 2000);
    initializeSkillObserver();
    wireSkillPortraitPanel();
    initializeServicesEntrance();
});

/* -------------------------
   Window resize debounce helper (use window property to avoid redeclaration)
   ------------------------- */
// ensure global debounce slot exists and is safe to reuse across multiple script evaluations
if (typeof window.__resizeDebounceTimer === 'undefined') window.__resizeDebounceTimer = null;

window.addEventListener('resize', () => {
    if (window.__resizeDebounceTimer) clearTimeout(window.__resizeDebounceTimer);
    window.__resizeDebounceTimer = setTimeout(() => { window.__resizeDebounceTimer = null; }, 200);
});

/* -------------------------
   Small DOM helpers
   ------------------------- */
function escapeHtml(unsafe = '') {
    return String(unsafe).replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s]);
}

function highlightFirstOccurrence(text = '', keyword = '') {
    if (!keyword) return escapeHtml(text);
    const lowerText = String(text).toLowerCase();
    const lowerKeyword = String(keyword).toLowerCase();
    const index = lowerText.indexOf(lowerKeyword);
    if (index === -1) return escapeHtml(text);
    const before = escapeHtml(String(text).slice(0, index));
    const match = escapeHtml(String(text).slice(index, index + String(keyword).length));
    const after = escapeHtml(String(text).slice(index + String(keyword).length));
    return `${before}<span class="panel-keyword">${match}</span>${after}`;
}
