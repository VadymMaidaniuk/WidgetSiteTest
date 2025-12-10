/**
 * ==========================================================
 * PitchAvatar Widget Loader
 * ==========================================================
 * 
 * Этот скрипт автоматически вставляет виджет PitchAvatar на любую страницу.
 * 
 * Использование:
 * 1. Подключите этот скрипт на странице: <script src="widget-loader.js"></script>
 * 2. Добавьте контейнер с id="avatar-widget-section" на страницу
 * 3. Виджет автоматически появится в этом контейнере
 * 
 * Конфигурация:
 * Измените WIDGET_CONFIG ниже для настройки виджета.
 */

/* ===== WIDGET CONFIGURATION ===== */

const WIDGET_CONFIG = {
    // URL виджета PitchAvatar
    src: "https://slides-dev.pitchavatar.com/yqnxm",

    // Высота iframe
    height: 500,

    // ID контейнера, куда вставлять виджет
    containerId: "avatar-widget-section",

    // Показывать заголовок секции
    showTitle: true,

    // Текст заголовка
    title: "Avatar widget"
};

/* ===== WIDGET INJECTION ===== */

/**
 * Создаёт HTML-разметку виджета
 */
function createWidgetHTML() {
    const titleHTML = WIDGET_CONFIG.showTitle
        ? `<h2>${WIDGET_CONFIG.title}</h2>`
        : '';

    return `
    ${titleHTML}
    <!-- PitchAvatar Widget Embed (injected by widget-loader.js) -->
    <div id="avatar-widget-container">
      <iframe 
        id="pitchavatar-frame"
        title="PitchAvatar Presentation" 
        src="${WIDGET_CONFIG.src}" 
        frameBorder="no" 
        border="0" 
        cellSpacing="0" 
        allow="autoplay https://slides-dev.pitchavatar.com/; microphone https://slides-dev.pitchavatar.com/; camera https://slides-dev.pitchavatar.com/; clipboard-write https://slides-dev.pitchavatar.com/" 
        width="100%" 
        height="${WIDGET_CONFIG.height}" 
        scrolling="no" 
        allowFullScreen="" 
        allowtransparency="true">
      </iframe>
    </div>
  `;
}

/**
 * Инжектирует виджет в контейнер на странице
 */
function injectWidget() {
    const container = document.getElementById(WIDGET_CONFIG.containerId);

    if (!container) {
        console.warn(`[Widget Loader] Container #${WIDGET_CONFIG.containerId} not found on this page. Widget not injected.`);
        return;
    }

    // Проверяем, не был ли виджет уже добавлен
    if (container.querySelector('#pitchavatar-frame')) {
        console.log('[Widget Loader] Widget already present, skipping injection.');
        return;
    }

    container.innerHTML = createWidgetHTML();
    console.log('[Widget Loader] Widget injected successfully into #' + WIDGET_CONFIG.containerId);
}

/* ===== INITIALIZATION ===== */

// Запускаем инжекцию когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWidget);
} else {
    injectWidget();
}
