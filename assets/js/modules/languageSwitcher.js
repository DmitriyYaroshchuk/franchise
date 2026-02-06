// languageSwitcher.js - Language switching functionality

import { getTranslation } from './translations.js';
import { updatePhoneMask } from './phoneMask.js';

let currentLang = 'uk';

export function getCurrentLanguage() {
    return currentLang;
}

export function setCurrentLanguage(lang) {
    currentLang = lang;
}

export function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;

            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update language
            setCurrentLanguage(lang);
            updateLanguage(lang);
        });
    });
}

export function updateLanguage(lang) {
    document.documentElement.lang = lang;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.dataset.i18n;
        const translation = getTranslation(key, lang);

        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        }
    });

    // Update phone mask
    updatePhoneMask(lang);
}