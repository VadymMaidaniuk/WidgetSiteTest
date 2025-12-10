/**
 * ==========================================================
 * PitchAvatar Widget Loader - Floating Chat Widget
 * ==========================================================
 * 
 * Этот скрипт автоматически добавляет плавающий виджет PitchAvatar
 * в правый нижний угол страницы с кнопкой открытия/закрытия.
 * 
 * Использование:
 * Просто подключите этот скрипт на странице: <script src="widget-loader.js"></script>
 * Виджет автоматически появится в правом нижнем углу.
 */

/* ===== WIDGET CONFIGURATION ===== */

const WIDGET_CONFIG = {
    // URL виджета PitchAvatar
    src: "https://slides-dev.pitchavatar.com/yqnxm",

    // Размеры открытого виджета
    width: 400,
    height: 550,

    // Размер кнопки
    buttonSize: 60,

    // Отступ от края экрана
    offset: 20,

    // Начальное состояние (открыт или закрыт)
    initiallyOpen: false,

    // Текст/иконка на кнопке
    buttonIcon: "💬",
    closeIcon: "✕"
};

/* ===== STYLES ===== */

const WIDGET_STYLES = `
    #pitchavatar-widget-wrapper {
        position: fixed;
        bottom: ${WIDGET_CONFIG.offset}px;
        right: ${WIDGET_CONFIG.offset}px;
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    #pitchavatar-toggle-btn {
        width: ${WIDGET_CONFIG.buttonSize}px;
        height: ${WIDGET_CONFIG.buttonSize}px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    #pitchavatar-toggle-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
    }

    #pitchavatar-toggle-btn.open {
        background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
    }

    #pitchavatar-widget-container {
        position: absolute;
        bottom: ${WIDGET_CONFIG.buttonSize + 15}px;
        right: 0;
        width: ${WIDGET_CONFIG.width}px;
        height: ${WIDGET_CONFIG.height}px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.95);
        transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    }

    #pitchavatar-widget-container.open {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
    }

    #pitchavatar-widget-container iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
`;

/* ===== WIDGET INJECTION ===== */

/**
 * Создаёт HTML-разметку плавающего виджета
 */
function createFloatingWidgetHTML() {
    return `
        <div id="pitchavatar-widget-container">
            <iframe 
                id="pitchavatar-frame"
                title="PitchAvatar Chat" 
                src="${WIDGET_CONFIG.src}" 
                allow="autoplay; microphone; camera; clipboard-write"
                allowFullScreen
                allowtransparency="true">
            </iframe>
        </div>
        <button id="pitchavatar-toggle-btn" aria-label="Toggle chat widget">
            ${WIDGET_CONFIG.buttonIcon}
        </button>
    `;
}

/**
 * Добавляет стили в документ
 */
function injectStyles() {
    const styleElement = document.createElement('style');
    styleElement.id = 'pitchavatar-widget-styles';
    styleElement.textContent = WIDGET_STYLES;
    document.head.appendChild(styleElement);
}

/**
 * Инжектирует плавающий виджет на страницу
 */
function injectFloatingWidget() {
    // Проверяем, не был ли виджет уже добавлен
    if (document.getElementById('pitchavatar-widget-wrapper')) {
        console.log('[Widget Loader] Widget already present, skipping injection.');
        return;
    }

    // Добавляем стили
    injectStyles();

    // Создаём контейнер виджета
    const wrapper = document.createElement('div');
    wrapper.id = 'pitchavatar-widget-wrapper';
    wrapper.innerHTML = createFloatingWidgetHTML();
    document.body.appendChild(wrapper);

    // Настраиваем обработчик кнопки
    const toggleBtn = document.getElementById('pitchavatar-toggle-btn');
    const container = document.getElementById('pitchavatar-widget-container');

    let isOpen = WIDGET_CONFIG.initiallyOpen;

    if (isOpen) {
        container.classList.add('open');
        toggleBtn.classList.add('open');
        toggleBtn.innerHTML = WIDGET_CONFIG.closeIcon;
    }

    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        container.classList.toggle('open', isOpen);
        toggleBtn.classList.toggle('open', isOpen);
        toggleBtn.innerHTML = isOpen ? WIDGET_CONFIG.closeIcon : WIDGET_CONFIG.buttonIcon;

        console.log(`[Widget Loader] Widget ${isOpen ? 'opened' : 'closed'}`);
    });

    console.log('[Widget Loader] Floating widget injected successfully');
}

/* ===== INITIALIZATION ===== */

// Запускаем инжекцию когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFloatingWidget);
} else {
    injectFloatingWidget();
}
