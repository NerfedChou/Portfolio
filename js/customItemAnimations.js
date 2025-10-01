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
        const onEnter = () => { icon.classList.remove(animClass); void icon.offsetWidth; icon.classList.add(animClass); };
        const onFocus = () => { icon.classList.remove(animClass); void icon.offsetWidth; icon.classList.add(animClass); };

        icon.addEventListener('animationend', onEnd);
        item.addEventListener('mouseenter', onEnter);
        item.addEventListener('focusin', onFocus);

        handlerMap.set(item, { icon, animClass, onEnd, onEnter, onFocus });
    }

    function detachHandlers(item) {
        const stored = handlerMap.get(item);
        if (!stored) return;
        const { icon, animClass, onEnd, onEnter, onFocus } = stored;
        icon.removeEventListener('animationend', onEnd);
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('focusin', onFocus);
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
