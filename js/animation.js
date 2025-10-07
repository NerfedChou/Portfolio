document.addEventListener('DOMContentLoaded', () => {
    /* -------------------------
       Helpers & configuration
       ------------------------- */
    const PREFERS_REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function deferRun(fn, delay = 0) {
        requestAnimationFrame(() => setTimeout(fn, delay));
    }

    const runIdle = (cb, timeout = 800) => {
        const g = typeof globalThis !== 'undefined' ? globalThis : window;
        
        const scheduler = g['scheduler']; 
        if (scheduler && typeof scheduler.postTask === 'function') {
            try {

                scheduler.postTask(cb, { priority: 'background' });
                return;
            } catch (e) {

            }
        }

        if (typeof g.requestIdleCallback === 'function') {
            g.requestIdleCallback(cb, { timeout });
            return;
        }

        setTimeout(cb, 0);
    };

    const isEscape = (ev) => ev && (ev.key === 'Escape' || ev.code === 'Escape');

    function observeVisibility(target, onEnter, onExit, options = { threshold: 0.2 }) {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (!el) return { disconnect() {} };
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) onEnter && onEnter(entry);
                else onExit && onExit(entry);
            });
        }, options);
        io.observe(el);
        return io;
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
       About hero overlay entrance animation
       ------------------------- */
    function initializeAboutOverlayEntrance() {
        const overlay = document.getElementById('aboutHeroOverlay');
        const quotePanel = document.querySelector('.about-hero-qt');
        const section = document.querySelector('.about-hero-section');
        if (!overlay && !quotePanel) return;

        if (PREFERS_REDUCED_MOTION) {
            if (overlay) overlay.classList.add('entrance');
            if (quotePanel) quotePanel.classList.add('show');
            return;
        }

        if (!section) {
            deferRun(() => {
                if (overlay) overlay.classList.add('entrance');
                setTimeout(() => { if (overlay) overlay.classList.remove('entrance'); }, 1200);
                if (quotePanel) setTimeout(() => quotePanel.classList.add('show'), 220);
            }, 0);
            return;
        }

        // Gate by viewport
        observeVisibility(section, () => {
            deferRun(() => {
                if (overlay) overlay.classList.add('entrance');
                setTimeout(() => { if (overlay) overlay.classList.remove('entrance'); }, 1200);
                if (quotePanel) setTimeout(() => quotePanel.classList.add('show'), 1300);
            }, 0);
        }, () => {
            if (overlay) overlay.classList.remove('entrance');
            if (quotePanel) quotePanel.classList.remove('show');
        }, { threshold: 0.4 });
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

        let running = false;
        const stepTimers = [];
        function clearStepTimers() { while (stepTimers.length) clearTimeout(stepTimers.pop()); }

        function stepType() {
            if (!running) return;
            const currentRole = roles[roleIndex];
            if (!deleting) {
                charIndex++;
                typewriterEl.textContent = currentRole.slice(0, charIndex);
                if (charIndex === currentRole.length) {
                    deleting = true;
                    stepTimers.push(setTimeout(stepType, PAUSE_AFTER_FULL));
                    return;
                }
                stepTimers.push(setTimeout(stepType, TYPE_SPEED));
            } else {
                charIndex--;
                typewriterEl.textContent = currentRole.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    stepTimers.push(setTimeout(stepType, 220));
                    return;
                }
                stepTimers.push(setTimeout(stepType, DELETE_SPEED));
            }
        }

        // Run only when visible, stop when hidden
        observeVisibility(typewriterEl, () => {
            if (running) return;
            running = true;
            stepTimers.push(setTimeout(stepType, 700));
        }, () => {
            running = false;
            clearStepTimers();
        }, { threshold: 0.01 });
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

        const navList = navigationMenu.querySelector('ul.nav');

        const getFirstNavLink = () => navList ? navList.querySelector('.nav-link') : navigationMenu.querySelector('.nav-link');

        function openNavigation(focusFirst = false) {
            navigationMenu.classList.add('open');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            navigationMenu.setAttribute('aria-hidden', 'false');
            Array.from(navigationMenu.querySelectorAll('a')).forEach(link => link.removeAttribute('tabindex'));
            if (focusFirst) {
                const first = getFirstNavLink();
                if (first) first.focus();
            }
        }

        function closeNavigation(returnFocusToBtn = true) {
            navigationMenu.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            navigationMenu.setAttribute('aria-hidden', 'true');
            Array.from(navigationMenu.querySelectorAll('a')).forEach(link => link.setAttribute('tabindex', '-1'));
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
            if (ev.key === 'Enter' || ev.key === ' ' || ev.code === 'Space') {
                ev.preventDefault();
                toggleNavigation(true);
            } else if (ev.key === 'ArrowDown') {
                ev.preventDefault();
                openNavigation(true);
            }
        });

        // Use navList for in-page links if present, else fallback to navigationMenu
        const linkContainer = navList || navigationMenu;
        const inPageLinks = Array.from(linkContainer.querySelectorAll('a[href^="#"]'));
        inPageLinks.forEach(link => {
            link.addEventListener('click', (ev) => {
                const href = link.getAttribute('href');
                if (!href || !href.startsWith('#')) return;
                const targetId = href.slice(1);
                const targetEl = document.getElementById(targetId);
                if (!targetEl) return;

                const smallScreen = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
                if (!smallScreen && !navigationMenu.classList.contains('open')) {
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
            if (isEscape(ev)) {
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
       Glassy sheen cycle (paused when offscreen)
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

        // Pause the cycle when tab is hidden to save CPU/battery
        function onVisibilityChange() {
            if (document.hidden) {
                if (window.__glassyInterval) {
                    clearInterval(window.__glassyInterval);
                    window.__glassyInterval = null;
                }
            } else {
                if (!window.__glassyInterval) {
                    // resume from last index
                    window.__glassyInterval = setInterval(step, intervalMs);
                }
            }
        }
        document.addEventListener('visibilitychange', onVisibilityChange);

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
       Skill ↔ Portrait wiring (viewport gated, cancellable)
       ------------------------- */
    function wireSkillPortraitPanel() {
        const skillsContainer = document.querySelector('.skills');
        const skillNodes = Array.from(document.querySelectorAll('.skill'));
        const portraitPanel = document.getElementById('portraitPanel');
        const panelTitle = document.getElementById('panelTitle');
        const panelDescription = document.getElementById('panelDesc');
        const aboutLeft = document.querySelector('.about-left');

        if (!skillsContainer || !skillNodes.length || !portraitPanel || !panelDescription || !aboutLeft) return null;

        let panelEnabled = true; // gate
        let activeSkillNode = null;
        let hideTimer = null;
        const HIDE_DELAY_MS = 160;
        let suppressDocumentClose = false;
        const SUPPRESS_MS = 420;
        let intentToShowNode = null;

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
            if (!panelEnabled) return;

            clearHideTimer();
            intentToShowNode = skillNode; // Set intent
            setSuppressDocumentClose();

            const skillLabelEl = skillNode.querySelector('.skill-label');
            const skillNameEl = skillLabelEl ? skillLabelEl.querySelector('.skill-name') : null;
            const labelText = (skillNameEl || skillLabelEl || { textContent: '' }).textContent.trim();
            const detailText = skillNode.getAttribute('data-detail') || '';


            if (activeSkillNode === skillNode) return;


            if (panelTitle) panelTitle.textContent = labelText;
            if (panelDescription) panelDescription.textContent = '';

            activeSkillNode = skillNode;
            aboutLeft.classList.add('active');
            portraitPanel.classList.remove('hiding'); // Cancel any pending hide animation

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
            
            // Use a microtask to ensure we are not in the middle of another animation frame
            await Promise.resolve();
            if (intentToShowNode !== skillNode) return; // Intent changed, abort.

            portraitPanel.classList.add('visible');
            await new Promise(res => setTimeout(res, 140));
            if (intentToShowNode !== skillNode) return; // Check intent again after delay

            if (activeTyper && activeTyper.cancel) activeTyper.cancel();
            const typer = resetTyper();
            if (PREFERS_REDUCED_MOTION) {
                panelDescription.innerHTML = highlightFirstOccurrence(detailText, labelText);
            } else {
                await typer.typeText(detailText);
                if (activeSkillNode === skillNode) panelDescription.innerHTML = highlightFirstOccurrence(detailText, labelText);
            }
        }

        function scheduleHideForSkill(skillNode) {
            if (!panelEnabled) return;
            intentToShowNode = null; // Clear intent
            clearHideTimer();
            hideTimer = setTimeout(() => {
                if (activeSkillNode === skillNode && !intentToShowNode) {
                    hideSkillDetail();
                }
                hideTimer = null;
            }, HIDE_DELAY_MS);
        }

        function hideSkillDetail() {
            clearHideTimer();
            intentToShowNode = null;
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


        // Events (guarded by panelEnabled flag)
        skillsContainer.addEventListener('pointerdown', (ev) => {
            if (!panelEnabled) return;
            const clicked = ev.target.closest('.skill');
            if (!clicked) return;
            setSuppressDocumentClose();
        }, { passive: true });


        skillsContainer.addEventListener('click', (ev) => {
            if (!panelEnabled) return;
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


        skillsContainer.addEventListener('pointerover', (ev) => {
            if (!panelEnabled) return;
            const entered = ev.target.closest('.skill');
            if (!entered) return;
            const from = ev.relatedTarget;
            if (from && entered.contains(from)) return;

            skillNodes.forEach(s => s.classList.remove('pull'));
            entered.classList.add('pull');

            showSkillDetail(entered);
        }, { passive: true });

        skillsContainer.addEventListener('pointerout', (ev) => {
            if (!panelEnabled) return;
            const left = ev.target.closest('.skill');
            if (!left) return;
            const to = ev.relatedTarget;
            if (to && left.contains(to)) return;

            scheduleHideForSkill(left);
            left.classList.remove('pull');
        }, { passive: true });

        skillsContainer.addEventListener('focusin', (ev) => {
            if (!panelEnabled) return;
            const focused = ev.target.closest('.skill');
            if (!focused) return;
            skillNodes.forEach(s => s.classList.remove('pull'));
            focused.classList.add('pull');
            showSkillDetail(focused);
        });
        skillsContainer.addEventListener('focusout', (ev) => {
            if (!panelEnabled) return;
            const blurred = ev.target.closest('.skill');
            if (!blurred) return;
            scheduleHideForSkill(blurred);
            blurred.classList.remove('pull');
        });


        document.addEventListener('click', (ev) => {
            if (!panelEnabled) return;
            if (suppressDocumentClose) return;
            if (!aboutLeft.contains(ev.target) && !skillNodes.some(s => s.contains(ev.target))) hideSkillDetail();
        });

        document.addEventListener('keydown', (ev) => {
            if (!panelEnabled) return;
            if (isEscape(ev)) hideSkillDetail();
        });

        return {
            enable() { panelEnabled = true; },
            disable() { panelEnabled = false; hideSkillDetail(); },
            stop() { panelEnabled = false; hideSkillDetail(); }
        };
    }

    /* -------------------------
       Service cards entrance animation
       ------------------------- */
    function initializeServicesEntrance() {
        const serviceList = document.querySelector('.service-list');
        if (!serviceList) return;

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
       History timeline controls (buttons + indicator)
       ------------------------- */
    function initializeHistoryTimelineUI() {
        const timeline = document.getElementById('historyTimeline');
        if (!timeline) return;

        const wrapper = timeline.closest('.timeline-wrapper') || timeline.parentElement;
        const prevBtn = wrapper.querySelector('.timeline-btn--prev');
        const nextBtn = wrapper.querySelector('.timeline-btn--next');
        const indicator = wrapper.querySelector('.timeline-indicator');
        const thumb = indicator ? indicator.querySelector('.timeline-indicator__thumb') : null;

        const smoothBehavior = PREFERS_REDUCED_MOTION ? 'auto' : 'smooth';

        function getStepAmount(direction = 1) {
            const item = timeline.querySelector('.timeline-item');
            const cs = getComputedStyle(timeline);
            const gapStr = cs.gap || cs.columnGap || '0px';
            const gap = parseFloat(gapStr) || 0;
            const itemWidth = item ? item.getBoundingClientRect().width : 0;
            const base = itemWidth ? (itemWidth + gap) : Math.max(240, timeline.clientWidth * 0.8);
            return base * direction;
        }

        function update() {
            const max = Math.max(0, timeline.scrollWidth - timeline.clientWidth);
            const atStart = timeline.scrollLeft <= 1;
            const atEnd = timeline.scrollLeft >= max - 1;

            if (prevBtn) prevBtn.disabled = atStart;
            if (nextBtn) nextBtn.disabled = atEnd;

            if (indicator && thumb) {
                if (max <= 0) {
                    indicator.classList.add('is-hidden');
                    indicator.setAttribute('aria-valuenow', '100');
                } else {
                    indicator.classList.remove('is-hidden');
                    const ratio = timeline.scrollLeft / max;
                    const visibleRatio = timeline.clientWidth / timeline.scrollWidth;
                    const thumbW = Math.max(visibleRatio * 100, 8);
                    const left = Math.max(0, Math.min(100 - thumbW, ratio * (100 - thumbW)));
                    thumb.style.width = `${thumbW}%`;
                    thumb.style.left = `${left}%`;
                    indicator.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
                }
            }
        }

        function scrollByStep(direction) {
            const amount = getStepAmount(direction);
            try {
                timeline.scrollBy({ left: amount, behavior: smoothBehavior });
            } catch {
                timeline.scrollLeft += amount;
            }
        }

        let rafId = null;
        function onScroll() {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => scrollByStep(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => scrollByStep(1));

        timeline.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => update(), { passive: true });

        if (indicator) {
            indicator.addEventListener('click', (ev) => {
                const rect = indicator.getBoundingClientRect();
                const x = ev.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, x / rect.width));
                const max = Math.max(0, timeline.scrollWidth - timeline.clientWidth);
                const target = ratio * max;
                try {
                    timeline.scrollTo({ left: target, behavior: smoothBehavior });
                } catch {
                    timeline.scrollLeft = target;
                }
            });
        }

        update();
    }

    /* -------------------------
       Initialization sequence (viewport-gated)
       ------------------------- */
    initializeSiteEntrance();
    initializeAboutOverlayEntrance();
    initializeTypewriter();
    initializeNavigation();
    initializeHistoryTimelineUI(); // init timeline controls

    runIdle(() => {
        // Start/stop glassy sheen only when a .glassy element is visible
        let glassyCtl = null;
        const firstGlassy = document.querySelector('.glassy');
        if (firstGlassy) {
            observeVisibility(firstGlassy, () => {
                if (!glassyCtl) glassyCtl = startGlassyCycle('.glassy', 2000);
            }, () => {
                if (glassyCtl && glassyCtl.stop) glassyCtl.stop();
                glassyCtl = null;
            }, { threshold: 0.1 });
        }

        const aboutSection = document.getElementById('about');
        let skillPanelCtl = null;
        if (aboutSection) {
            observeVisibility(aboutSection, () => {
                initializeSkillObserver(); // idempotent for unobserved skills
                if (!skillPanelCtl) skillPanelCtl = wireSkillPortraitPanel();
                if (skillPanelCtl && skillPanelCtl.enable) skillPanelCtl.enable();
            }, () => {
                if (skillPanelCtl && skillPanelCtl.stop) skillPanelCtl.stop();
            }, { threshold: 0.25 });
        }

        initializeServicesEntrance();

        // Initialize contact form validation
        initializeContactFormValidation();

        if (document.querySelector('.mentor-card')) {
            initializeMentorGlassySheen();
        } else {
            let glassyCtl = null;
            const firstGlassy = document.querySelector('.glassy');
            if (firstGlassy) {
                observeVisibility(firstGlassy, () => {
                    if (!glassyCtl) glassyCtl = startGlassyCycle('.glassy', 2000);
                }, () => {
                    if (glassyCtl && glassyCtl.stop) glassyCtl.stop();
                    glassyCtl = null;
                }, { threshold: 0.1 });
            }
        }
    });

    /* -------------------------
       Glassy sheen for About mentor section only
       ------------------------- */
    function initializeMentorGlassySheen() {
        const section = document.querySelector('.mentor-card');
        if (!section) return;

        const selector = '.mentor-card.glassy, .mentor-card .glassy, .mentor-quote.glassy';
        const targets = Array.from(document.querySelectorAll(selector));
        if (!targets.length) return;

        if (PREFERS_REDUCED_MOTION) {
            targets.forEach(el => el.classList.add('glassy-active'));
            return;
        }

        let ctl = null;
        observeVisibility(section, () => {
            if (!ctl) ctl = startGlassyCycle(selector, 2200);
        }, () => {
            if (ctl && ctl.stop) ctl.stop();
            ctl = null;
            targets.forEach(el => el.classList.remove('glassy-active'));
        }, { threshold: 0.2 });
    }
});

/* -------------------------
   Window resize debounce helper
   ------------------------- */
if (typeof window.__resizeDebounceTimer === 'undefined') window.__resizeDebounceTimer = null;

window.addEventListener('resize', () => {
    if (window.__resizeDebounceTimer) clearTimeout(window.__resizeDebounceTimer);
    window.__resizeDebounceTimer = setTimeout(() => { window.__resizeDebounceTimer = null; }, 200);
});

/* -------------------------
   Small DOM helpers Youtube: https://www.youtube.com/c/DevTipsForDesigners
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

/* -------------------------
       Contact form validation
       ------------------------- */
function initializeContactFormValidation() {
    const form = document.querySelector('.contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

    if (!form || !nameInput || !emailInput || !messageInput || !submitBtn) return;

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateForm() {
        const nameValid = nameInput.value.trim().length >= 2;
        const emailValid = isValidEmail(emailInput.value.trim());
        const messageValid = messageInput.value.trim().length >= 10;

        const allValid = nameValid && emailValid && messageValid;

        if (allValid) {
            submitBtn.style.backgroundColor = 'var(--accent)';
            submitBtn.style.borderColor = 'var(--accent)';
            submitBtn.style.color = 'var(--white)';
        } else {
            submitBtn.style.backgroundColor = '';
            submitBtn.style.borderColor = '';
            submitBtn.style.color = '';
        }
    }

    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    messageInput.addEventListener('input', validateForm);
    nameInput.addEventListener('blur', validateForm);
    emailInput.addEventListener('blur', validateForm);
    messageInput.addEventListener('blur', validateForm);

    // Initial validation
    validateForm();

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const loadingContainer = form.querySelector('.loading-container');
        const successMessage = form.querySelector('.success-message');

        submitBtn.style.display = 'none';
        loadingContainer.style.display = 'flex';

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            loadingContainer.style.display = 'none';
            successMessage.style.display = 'flex';
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 100);
            setTimeout(() => {
                form.reset();
                successMessage.classList.remove('show');
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    submitBtn.style.display = 'block';
                    validateForm();
                }, 300);
            }, 3000);
        } catch (error) {
            loadingContainer.style.display = 'none';
            submitBtn.style.display = 'block';
            console.error('Form submission error:', error);
            alert('Something went wrong. Please try again.');
        }
    });
}

const lightModeDetector = window.matchMedia('(prefers-color-scheme: light)');
const aboutPortrait = document.querySelector('.about-portrait');

function updatePortrait() {
    if (lightModeDetector.matches) {
        aboutPortrait.src = 'assets/melight.png';
    } else {
        aboutPortrait.src = 'assets/me.jpeg';
    }
}

updatePortrait();
lightModeDetector.addEventListener('change', updatePortrait);
