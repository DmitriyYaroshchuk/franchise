import { initLanguageSwitcher, updateLanguage } from './modules/languageSwitcher.js';
import { initTextFields } from './modules/textFields.js';
import {initForm} from "./modules/formHandler.js";
import {getCountry, initSocials} from "./modules/socials.js";

function init() {
    // Initialize language switcher
    initLanguageSwitcher();

    // Initialize text fields with floating labels
    initTextFields();

    // Initialize form handling
    initForm();

    // Initialize social media links
    const country = getCountry();
    initSocials('socialsList', country);

    // Set default language
    updateLanguage('uk');
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', init);