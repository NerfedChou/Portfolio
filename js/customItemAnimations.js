document.addEventListener('DOMContentLoaded', () => {
    const PREFERS_REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (PREFERS_REDUCED_MOTION) {
        // Skip decorative icon animations for accessibility
        return;
    }

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
    serviceItems.forEach((item, idx) => {
        const icon = item.querySelector('ion-icon');
        if (!icon) return;
        const animClass = iconAnimations[idx % iconAnimations.length];

        icon.addEventListener('animationend', () => {
            icon.classList.remove(animClass);
        });

        item.addEventListener('mouseenter', () => {
            icon.classList.remove(animClass);
            void icon.offsetWidth;
            icon.classList.add(animClass);
        });
        item.addEventListener('focusin', () => {
            icon.classList.remove(animClass);
            void icon.offsetWidth;
            icon.classList.add(animClass);
        });
    });
});
