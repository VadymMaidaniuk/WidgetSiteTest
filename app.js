/**
 * ==========================================================
 * PitchAvatar Widget Navigation Test Site - Main Application
 * ==========================================================
 * 
 * This script handles:
 * 1. postMessage listener for widget commands
 * 2. Origin and URL validation
 * 3. Navigation (full reload or SPA mode)
 * 4. Debug panel updates and event logging
 * 5. Widget simulation for testing
 */

/* ===== CONFIGURATION ===== */

/**
 * Allowed origin for postMessage events from the PitchAvatar widget.
 * In production, only messages from this origin will be accepted.
 */
const ALLOWED_AVATAR_ORIGIN = "https://slides-dev.pitchavatar.com";

/**
 * Development flag: when true, allows postMessage from any origin.
 * Set to false in production for security.
 * 
 * WARNING: This flag bypasses origin security checks.
 * Only enable for local development/testing.
 */
const ALLOW_ANY_ORIGIN_FOR_LOCAL_DEV = true;

/* ===== STATE ===== */

/**
 * Event log storage for the debug panel.
 * Each event has: { timestamp, type, origin, url, description }
 */
let eventLog = [];

/**
 * Last valid avatar command received.
 */
let lastValidCommand = null;

/**
 * Last validation error encountered.
 */
let lastError = null;

/**
 * Navigation mode: 'reload' (full page reload) or 'spa' (history pushState).
 */
let navigationMode = 'reload';

/* ===== PAGE CONTENT DATA (for SPA mode) ===== */

/**
 * Page content definitions for SPA mode simulation.
 * Maps page paths to their content.
 */
const PAGE_CONTENT = {
    '/index.html': {
        title: 'Главная',
        heading: 'PitchAvatar Widget Test Site',
        intro: 'Добро пожаловать на тестовый сайт для QA-тестирования навигации через виджет PitchAvatar.',
        content: 'Этот сайт используется для тестирования функции навигации через postMessage API. Используйте панель симуляции ниже или настоящий виджет для отправки команд навигации.'
    },
    '/testimonials.html': {
        title: 'Отзывы',
        heading: 'Отзывы клиентов',
        intro: 'Что говорят наши клиенты о PitchAvatar.',
        content: 'Здесь собраны отзывы от компаний, которые уже используют PitchAvatar для своих презентаций и маркетинговых материалов.'
    },
    '/use-cases-telecom.html': {
        title: 'Use cases — Telecom',
        heading: 'Телеком кейсы',
        intro: 'Как телекоммуникационные компании используют PitchAvatar.',
        content: 'Телекоммуникационные компании используют PitchAvatar для обучения персонала, презентаций тарифных планов и поддержки клиентов.'
    },
    '/pricing.html': {
        title: 'Pricing',
        heading: 'Тарифы и цены',
        intro: 'Гибкие тарифные планы для любых потребностей.',
        content: 'Выберите план, который подходит вашей компании. От стартапов до крупных enterprise-клиентов.'
    }
};

/* ===== INITIALIZATION ===== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigationMode();
    initSimulationForm();
    initDebugPanel();
    highlightCurrentNav();

    // Log page load event
    logEvent('received', window.location.origin, window.location.href, 'Страница загружена');
});

/**
 * Initialize navigation mode from radio buttons.
 */
function initNavigationMode() {
    const radios = document.querySelectorAll('input[name="nav-mode"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            navigationMode = e.target.value;
            logEvent('received', '', '', `Режим навигации изменён на: ${navigationMode === 'reload' ? 'Full Reload' : 'SPA (pushState)'}`);
        });
    });
}

/**
 * Initialize simulation form handlers.
 */
function initSimulationForm() {
    const form = document.getElementById('simulation-form');
    const input = document.getElementById('simulation-url');
    const button = document.getElementById('simulation-button');

    if (!form || !input || !button) return;

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const url = input.value.trim();

        if (!url) {
            logEvent('rejected', window.location.origin, '', 'Пустой URL в симуляции');
            return;
        }

        // Simulate postMessage from widget
        // Using current origin to simulate local widget behavior
        const message = {
            type: 'avatar-command',
            action: 'navigate',
            url: url
        };

        console.log('[Simulation] Sending postMessage:', message);

        // Send message to self (simulating widget)
        window.postMessage(message, '*');
    });
}

/**
 * Initialize debug panel with current state.
 */
function initDebugPanel() {
    updateDebugPanel();
}

/**
 * Highlight current page in navigation menu.
 */
function highlightCurrentNav() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-menu a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        // Check if current path ends with the href or if we're on index and href is index
        const isActive = currentPath.endsWith(href) ||
            (currentPath === '/' && href === 'index.html') ||
            (currentPath.endsWith('/') && href === 'index.html');

        link.classList.toggle('active', isActive);
    });
}

/* ===== POST MESSAGE LISTENER ===== */

/**
 * Main postMessage event listener.
 * Handles navigation commands from the PitchAvatar widget.
 */
window.addEventListener('message', (event) => {
    console.log('[postMessage] Received event:', event);

    // ===== 1. ORIGIN VALIDATION =====
    const originValid = validateOrigin(event.origin);
    if (!originValid) {
        const errorMsg = `Недопустимый origin: "${event.origin}". Ожидается: "${ALLOWED_AVATAR_ORIGIN}"`;
        logEvent('rejected', event.origin, '', errorMsg);
        lastError = { timestamp: new Date(), message: errorMsg, origin: event.origin };
        updateDebugPanel();
        console.warn('[postMessage] Origin rejected:', event.origin);
        return;
    }

    // ===== 2. MESSAGE STRUCTURE VALIDATION =====
    const data = event.data;

    // Check if data is an object - silently ignore non-object messages
    // (these are often from browser extensions, React DevTools, etc.)
    if (typeof data !== 'object' || data === null) {
        console.log('[postMessage] Ignoring non-object message:', typeof data);
        return;
    }

    // Check message type - silently ignore non-avatar messages
    // (could be from extensions, analytics, etc.)
    if (data.type !== 'avatar-command') {
        console.log('[postMessage] Ignoring non-avatar message type:', data.type);
        return;
    }

    // Check action
    if (data.action !== 'navigate') {
        const errorMsg = `Неизвестное действие: "${data.action}". Поддерживается только "navigate"`;
        logEvent('rejected', event.origin, '', errorMsg);
        lastError = { timestamp: new Date(), message: errorMsg, origin: event.origin };
        updateDebugPanel();
        console.warn('[postMessage] Unknown action:', data.action);
        return;
    }

    // Check URL presence
    if (typeof data.url !== 'string' || !data.url.trim()) {
        const errorMsg = 'Отсутствует или пустой URL в команде';
        logEvent('rejected', event.origin, '', errorMsg);
        lastError = { timestamp: new Date(), message: errorMsg, origin: event.origin };
        updateDebugPanel();
        console.warn('[postMessage] Missing URL');
        return;
    }

    const targetUrl = data.url.trim();
    logEvent('received', event.origin, targetUrl, `Получена команда navigate: ${targetUrl}`);

    // ===== 3. URL VALIDATION =====
    const urlValidation = validateUrl(targetUrl);
    if (!urlValidation.valid) {
        logEvent('rejected', event.origin, targetUrl, urlValidation.error);
        lastError = { timestamp: new Date(), message: urlValidation.error, origin: event.origin, url: targetUrl };
        updateDebugPanel();
        console.warn('[postMessage] URL validation failed:', urlValidation.error);
        return;
    }

    // ===== 4. PERFORM NAVIGATION =====
    lastValidCommand = {
        timestamp: new Date(),
        origin: event.origin,
        url: urlValidation.resolvedUrl
    };

    console.log('[postMessage] Navigating to:', urlValidation.resolvedUrl, 'Mode:', navigationMode);

    if (navigationMode === 'reload') {
        // Full page reload
        logEvent('navigated', event.origin, urlValidation.resolvedUrl, `Переход (reload): ${urlValidation.resolvedUrl}`);
        updateDebugPanel();

        // Small delay to allow debug panel update to be visible
        setTimeout(() => {
            window.location.href = urlValidation.resolvedUrl;
        }, 100);
    } else {
        // SPA mode - use history.pushState
        performSpaNavigation(urlValidation.resolvedUrl, event.origin);
    }
});

/* ===== VALIDATION FUNCTIONS ===== */

/**
 * Validate the origin of a postMessage event.
 * 
 * @param {string} origin - The origin to validate
 * @returns {boolean} - True if origin is valid
 */
function validateOrigin(origin) {
    // In development mode, allow any origin
    if (ALLOW_ANY_ORIGIN_FOR_LOCAL_DEV) {
        console.log('[Origin] Dev mode enabled, allowing any origin');
        return true;
    }

    // Check against allowed origin
    if (origin === ALLOWED_AVATAR_ORIGIN) {
        return true;
    }

    // Also allow same-origin messages (for testing with embedded iframes on same domain)
    if (origin === window.location.origin) {
        return true;
    }

    return false;
}

/**
 * Validate a navigation URL.
 * 
 * @param {string} url - The URL to validate
 * @returns {Object} - { valid: boolean, resolvedUrl?: string, error?: string }
 */
function validateUrl(url) {
    // Try to parse the URL
    let parsedUrl;

    try {
        // Handle relative URLs by resolving against current location
        parsedUrl = new URL(url, window.location.href);
    } catch (e) {
        return {
            valid: false,
            error: `Невалидный URL: "${url}". Ошибка парсинга: ${e.message}`
        };
    }

    // Check protocol - only allow http and https
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return {
            valid: false,
            error: `Недопустимый протокол: "${parsedUrl.protocol}". Разрешены только http: и https:`
        };
    }

    // Check host - only allow same host by default
    if (parsedUrl.host !== window.location.host) {
        return {
            valid: false,
            error: `Недопустимый хост: "${parsedUrl.host}". Разрешён только текущий хост: "${window.location.host}"`
        };
    }

    return {
        valid: true,
        resolvedUrl: parsedUrl.href
    };
}

/* ===== SPA NAVIGATION ===== */

/**
 * Perform SPA-style navigation without page reload.
 * Updates URL via history.pushState and dynamically updates page content.
 * 
 * @param {string} url - The URL to navigate to
 * @param {string} origin - The origin of the navigation command
 */
function performSpaNavigation(url, origin) {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;

    // Find page content
    let pageKey = pathname;
    if (!pageKey.startsWith('/')) {
        pageKey = '/' + pageKey;
    }

    const pageData = PAGE_CONTENT[pageKey] || PAGE_CONTENT['/index.html'];

    // Update browser history
    history.pushState({ path: pathname }, pageData.title, url);

    // Update page content
    updatePageContent(pageData);

    // Update navigation highlighting
    highlightCurrentNav();

    // Log the navigation
    logEvent('navigated', origin, url, `SPA-переход (pushState): ${url}`);
    updateDebugPanel();

    console.log('[SPA] Navigation complete:', url);
}

/**
 * Update page content for SPA navigation.
 * 
 * @param {Object} pageData - The page content data
 */
function updatePageContent(pageData) {
    // Update document title
    document.title = `${pageData.title} — PitchAvatar Test Site`;

    // Update page heading
    const heading = document.querySelector('.page-title');
    if (heading) {
        heading.textContent = pageData.heading;
    }

    // Update page intro
    const intro = document.querySelector('.page-intro');
    if (intro) {
        intro.textContent = pageData.intro;
    }

    // Update main content
    const contentSection = document.querySelector('.content-section p');
    if (contentSection) {
        contentSection.textContent = pageData.content;
    }
}

// Handle browser back/forward buttons in SPA mode
window.addEventListener('popstate', (event) => {
    if (navigationMode === 'spa' && event.state) {
        const pathname = event.state.path || window.location.pathname;
        let pageKey = pathname;
        if (!pageKey.startsWith('/')) {
            pageKey = '/' + pageKey;
        }
        const pageData = PAGE_CONTENT[pageKey] || PAGE_CONTENT['/index.html'];
        updatePageContent(pageData);
        highlightCurrentNav();
        logEvent('navigated', window.location.origin, window.location.href, `Навигация назад/вперёд: ${window.location.href}`);
        updateDebugPanel();
    }
});

/* ===== EVENT LOGGING ===== */

/**
 * Log an event to the event log.
 * 
 * @param {string} type - Event type: 'received', 'navigated', 'rejected'
 * @param {string} origin - Origin of the event
 * @param {string} url - URL involved (if any)
 * @param {string} description - Human-readable description
 */
function logEvent(type, origin, url, description) {
    const event = {
        timestamp: new Date(),
        type: type,
        origin: origin || '',
        url: url || '',
        description: description
    };

    // Add to beginning of array (newest first)
    eventLog.unshift(event);

    // Keep only last 50 events
    if (eventLog.length > 50) {
        eventLog = eventLog.slice(0, 50);
    }

    console.log(`[Event] ${type}:`, description);
}

/* ===== DEBUG PANEL ===== */

/**
 * Update the debug panel with current state.
 */
function updateDebugPanel() {
    // Update current URL display
    const currentUrlEl = document.getElementById('debug-current-url');
    if (currentUrlEl) {
        currentUrlEl.textContent = window.location.href;
    }

    // Update last valid command display
    const lastCommandEl = document.getElementById('debug-last-command');
    if (lastCommandEl) {
        if (lastValidCommand) {
            const time = formatTime(lastValidCommand.timestamp);
            lastCommandEl.innerHTML = `
        <strong>Time:</strong> ${time}<br>
        <strong>Origin:</strong> ${lastValidCommand.origin}<br>
        <strong>URL:</strong> ${lastValidCommand.url}
      `;
        } else {
            lastCommandEl.textContent = 'Нет валидных команд';
        }
    }

    // Update last error display
    const lastErrorEl = document.getElementById('debug-last-error');
    if (lastErrorEl) {
        if (lastError) {
            const time = formatTime(lastError.timestamp);
            lastErrorEl.innerHTML = `
        <strong>Time:</strong> ${time}<br>
        <strong>Error:</strong> ${lastError.message}
      `;
        } else {
            lastErrorEl.textContent = 'Нет ошибок';
        }
    }

    // Update event log
    const eventListEl = document.getElementById('debug-event-list');
    if (eventListEl) {
        eventListEl.innerHTML = eventLog.map(event => `
      <li class="${event.type}">
        <span class="debug-event-time">${formatTime(event.timestamp)}</span>
        <span class="debug-event-type">${event.type}</span>
        <span class="debug-event-content">${escapeHtml(event.description)}</span>
      </li>
    `).join('');
    }
}

/**
 * Format a timestamp for display.
 * 
 * @param {Date} date - The date to format
 * @returns {string} - Formatted time string
 */
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ms = date.getMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${ms}`;
}

/**
 * Escape HTML special characters.
 * 
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
