document.addEventListener('DOMContentLoaded', () => {
    const PREFERS_REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (PREFERS_REDUCED_MOTION) return;

    const iconAnimations = [
        'icon-bounce',      // Custom Web Applications
        'icon-pulse',       // UI/UX & Frontend Engineering
        'icon-rotate',      // Backend APIs & Integrations
        'icon-shake',       // Game Development
        'icon-flip',        // Security & Code Audits
        'icon-fade',        // Consulting & Mentorship
        'icon-scale',       // Performance Optimization
        'icon-swing'        // DevOps & Deployment
    ];

    const serviceItems = document.querySelectorAll('.service-list-item');
    if (!serviceItems.length) return;

    const handlerMap = new WeakMap();

    function attachHandlers(item, idx) {
        const icon = item.querySelector('ion-icon');
        if (!icon) return;
        const animClass = iconAnimations[idx % iconAnimations.length];

        const onEnd = () => icon.classList.remove(animClass);
        const triggerAnim = () => { icon.classList.remove(animClass); void icon.offsetWidth; icon.classList.add(animClass); };
        const onEnter = () => { triggerAnim(); };
        const onFocus = () => { triggerAnim(); };

        // Mobile/touch: prefer Pointer Events; fallback to touchstart where needed
        let onPointerDown = null;
        let onTouchStart = null;

        if (window.PointerEvent) {
            onPointerDown = (ev) => {
                // Only animate on touch/pen to avoid double-trigger with mouse
                const pt = ev.pointerType;
                if (pt && pt !== 'touch' && pt !== 'pen') return;
                triggerAnim();
            };
            item.addEventListener('pointerdown', onPointerDown, { passive: true });
        } else {
            onTouchStart = () => { triggerAnim(); };
            item.addEventListener('touchstart', onTouchStart, { passive: true });
        }

        icon.addEventListener('animationend', onEnd);
        item.addEventListener('mouseenter', onEnter);
        item.addEventListener('focusin', onFocus);

        handlerMap.set(item, { icon, animClass, onEnd, onEnter, onFocus, onPointerDown, onTouchStart });
    }

    function detachHandlers(item) {
        const stored = handlerMap.get(item);
        if (!stored) return;
        const { icon, animClass, onEnd, onEnter, onFocus, onPointerDown, onTouchStart } = stored;
        icon.removeEventListener('animationend', onEnd);
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('focusin', onFocus);
        if (onPointerDown) item.removeEventListener('pointerdown', onPointerDown);
        if (onTouchStart) item.removeEventListener('touchstart', onTouchStart);
        icon.classList.remove(animClass);
        handlerMap.delete(item);
    }

    // Observe the services list; attach when visible, detach when hidden
    const servicesTarget = document.querySelector('.service-list') || document.querySelector('.services-container');
    if (!servicesTarget) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                serviceItems.forEach(attachHandlers);
            } else {
                serviceItems.forEach(detachHandlers);
            }
        });
    }, { threshold: 0.2 });

    io.observe(servicesTarget);
});

function expand(el) {
    el.style.display = 'flex';
    el.style.overflow = 'hidden';
    el.style.opacity = '0';
    el.style.height = '0';

    void el.offsetWidth;

    el.style.transition = 'height 0.5s cubic-bezier(.2,.9,.3,1), opacity 0.5s ease-in-out, visibility 0.5s linear';
    el.style.height = el.scrollHeight + 'px';
    el.style.opacity = '1';
    el.style.visibility = 'visible';

    el.addEventListener('transitionend', function handler() {
        if (el.style.height !== '0px') {
            el.style.height = 'auto';
            el.style.overflow = '';
            buttons.textContent = ``;
        }
        el.removeEventListener('transitionend', handler);
    }, { once: true });
}

function collapse(el) {
    const { height } = window.getComputedStyle(el);
    el.style.height = height;
    el.style.overflow = 'hidden';

    void el.offsetWidth;

    el.style.transition = 'height 0.5s cubic-bezier(.2,.9,.3,1), opacity 0.5s ease-in-out';
    el.style.height = '0';
    el.style.opacity = '0';

    el.addEventListener('transitionend', function handler(event) {
        if (event.propertyName === 'height') {
            el.style.visibility = 'hidden';
            el.removeEventListener('transitionend', handler);
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.expand-btn');
    const targets = document.querySelectorAll('.project-lower');


    buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const target = targets[idx];
            if (!target) return;

            const isCollapsed = window.getComputedStyle(target).height === '0px';

            if (isCollapsed) {
                expand(target);
            } else {
                collapse(target);
            }
        });
    });
    buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const target = targets[idx];
            if (!target) return;

            const isCollapsed = window.getComputedStyle(target).height === '0px';

            if (isCollapsed) {
                btn.textContent = 'Expanded'; // Only this button changes
            } else {
                btn.textContent = 'See Timeline';
            }
        });
    });
});

