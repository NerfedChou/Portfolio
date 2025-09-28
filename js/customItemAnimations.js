document.addEventListener('DOMContentLoaded', () => {
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

        // Remove animation class after animation ends
        icon.addEventListener('animationend', () => {
            icon.classList.remove(animClass);
        });

        // On hover/focus, add the animation class
        item.addEventListener('mouseenter', () => {
            icon.classList.remove(animClass); // reset if needed
            void icon.offsetWidth; // force reflow
            icon.classList.add(animClass);
        });
        item.addEventListener('focusin', () => {
            icon.classList.remove(animClass);
            void icon.offsetWidth;
            icon.classList.add(animClass);
        });
    });
});
