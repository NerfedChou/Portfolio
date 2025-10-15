const textTruncationUtility = (() => {
    const storage = new WeakMap();

    function initialize({ selector, limit = 100, by = 'chars', moreText = 'See more', lessText = 'See less' }) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const originalText = element.textContent.trim();
            if ((by === 'chars' && originalText.length > limit) || (by === 'words' && originalText.split(/\s+/).length > limit)) {
                storage.set(element, originalText);
                let truncated, displayText;
                if (by === 'chars') {
                    truncated = originalText.slice(0, limit).replace(/\s+$/, '');
                } else {
                    truncated = originalText.split(/\s+/).slice(0, limit).join(' ');
                }
                displayText = truncated + '... ';
                element.textContent = displayText;
                const btn = document.createElement('a');
                btn.href = '#';
                btn.className = 'text-truncate-toggle';
                btn.textContent = moreText;
                btn.setAttribute('aria-expanded', 'false');
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const expanded = btn.getAttribute('aria-expanded') === 'true';
                    if (expanded) {
                        element.textContent = displayText;
                        btn.textContent = moreText;
                        btn.setAttribute('aria-expanded', 'false');
                        element.appendChild(btn);
                    } else {
                        element.textContent = originalText + ' ';
                        btn.textContent = lessText;
                        btn.setAttribute('aria-expanded', 'true');
                        element.appendChild(btn);
                    }
                });
                element.appendChild(btn);
            }
        });
    }

    return { initialize };
})();

// DOM-aware text truncation utility (preserves inline HTML)
const htmlTruncationUtility = (() => {
    const storage = new WeakMap();

    function truncateNode(node, limit, by, count = { value: 0 }) {
        if (count.value >= limit) return null;
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent;
            let result = '';
            if (by === 'chars') {
                let remaining = limit - count.value;
                if (text.length > remaining) {
                    result = text.slice(0, remaining);
                    count.value = limit;
                } else {
                    result = text;
                    count.value += text.length;
                }
            } else {
                let words = text.split(/(\s+)/);
                let out = [];
                for (let w of words) {
                    if (!w.trim() && out.length === 0) continue; // skip leading whitespace
                    let isWord = !!w.trim();
                    if (isWord && count.value >= limit) break;
                    out.push(w);
                    if (isWord) count.value++;
                }
                result = out.join('');
            }
            return document.createTextNode(result);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const clone = node.cloneNode(false);
            for (let child of node.childNodes) {
                if (count.value >= limit) break;
                let t = truncateNode(child, limit, by, count);
                if (t) clone.appendChild(t);
            }
            return clone;
        }
        return null;
    }

    function initialize({ selector, limit = 100, by = 'chars', moreText = 'See more', lessText = 'See less' }) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const originalHTML = element.innerHTML;
            // Count total chars/words
            let total = 0;
            (function countAll(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    if (by === 'chars') total += node.textContent.length;
                    else total += node.textContent.trim().split(/\s+/).filter(Boolean).length;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    for (let child of node.childNodes) countAll(child);
                }
            })(element);
            if (total > limit) {
                // Build truncated fragment
                let count = { value: 0 };
                let frag = document.createDocumentFragment();
                for (let child of element.childNodes) {
                    if (count.value >= limit) break;
                    let t = truncateNode(child, limit, by, count);
                    if (t) frag.appendChild(t);
                }
                frag.appendChild(document.createTextNode('... '));
                const btn = document.createElement('a');
                btn.href = '#';
                btn.className = 'text-truncate-toggle';
                btn.textContent = moreText;
                btn.setAttribute('aria-expanded', 'false');
                frag.appendChild(btn);

                // Store both original and truncated HTML
                storage.set(element, {
                    originalHTML,
                    truncatedHTML: frag,
                    moreText,
                    lessText
                });

                // Render truncated version
                renderTruncated(element);
            }
        });
    }

    function renderTruncated(element) {
        const data = storage.get(element);
        if (!data) return;
        element.innerHTML = '';
        element.appendChild(data.truncatedHTML.cloneNode(true));
        const btn = element.querySelector('.text-truncate-toggle');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                renderFull(element);
            });
        }
    }

    function renderFull(element) {
        const data = storage.get(element);
        if (!data) return;
        element.innerHTML = data.originalHTML + ' ';
        const btn = document.createElement('a');
        btn.href = '#';
        btn.className = 'text-truncate-toggle';
        btn.textContent = data.lessText;
        btn.setAttribute('aria-expanded', 'true');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            renderTruncated(element);
        });
        element.appendChild(btn);
    }

    return { initialize };
})();

// Array of configs for htmlTruncationUtility
const htmlTruncationConfigs = [
    {
        selector: '.initial-size',
        limit: 750,
        by: 'chars',
        moreText: 'See more',
        lessText: 'See less'
    },
    {
        selector: '.large-size-html-truncate',
        limit: 1000,
        by: 'chars',
        moreText: 'See more',
        lessText: 'See less'
    }
];
htmlTruncationConfigs.forEach(config => htmlTruncationUtility.initialize(config));

const textTruncationConfigs = [
    {
        selector: '.normal-truncate',
        limit: 750,
        by: 'chars',
        moreText: 'See more',
        lessText: 'See less'
    },
    {
        selector: '.large-truncate',
        limit: 1000,
        by: 'chars',
        moreText: 'See more',
        lessText: 'See less'
    }
];
textTruncationConfigs.forEach(config => textTruncationUtility.initialize(config));
