// textFields.js - Text field with floating labels functionality

import { applyPhoneMask } from './phoneMask.js';

/**
 * Initialize all text fields on the page
 */
export function initTextFields() {
    const textfields = document.querySelectorAll('.textfield');

    textfields.forEach(field => {
        const input = field.querySelector('.textfield__input');

        if (!input) return;

        // Apply phone mask if it's a phone field
        if (input.name === 'phone') {
            applyPhoneMask(input);
        }

        // Setup event handlers
        setupFieldHandlers(field, input);

        // Check initial value
        if (hasActualValue(input)) {
            field.classList.add('textfield_active');
        }

        // Check for autofill after a short delay
        setTimeout(() => {
            if (hasActualValue(input) || isAutofilled(input)) {
                field.classList.add('textfield_active');
            }
        }, 100);
    });
}

/**
 * Check if input has actual value (not just formatting characters)
 * @param {HTMLInputElement} input - Input element
 * @returns {boolean} True if has actual value
 */
function hasActualValue(input) {
    if (!input.value) return false;

    // For phone inputs, check if there are actual digits
    if (input.name === 'phone') {
        const digits = input.value.replace(/\D/g, '');
        return digits.length > 0;
    }

    // For other inputs, just check if value exists
    return input.value.trim().length > 0;
}

/**
 * Check if input is autofilled
 * @param {HTMLInputElement} input - Input element
 * @returns {boolean} True if autofilled
 */
function isAutofilled(input) {
    try {
        return input.matches(':-webkit-autofill') || input.matches(':-moz-autofill');
    } catch (e) {
        return false;
    }
}

/**
 * Setup event handlers for a text field
 * @param {HTMLElement} field - Field container element
 * @param {HTMLInputElement} input - Input element
 */
function setupFieldHandlers(field, input) {
    // Focus handler - activate label
    input.addEventListener('focus', function() {
        field.classList.add('textfield_active');
    });

    // Blur handler - deactivate label if empty
    input.addEventListener('blur', function() {
        if (!hasActualValue(this)) {
            field.classList.remove('textfield_active');
        }
    });

    // Input handler - activate label if has value
    input.addEventListener('input', function() {
        if (hasActualValue(this)) {
            field.classList.add('textfield_active');
        } else {
            field.classList.remove('textfield_active');
        }
    });

    // Animation start event for autofill detection (Chrome)
    input.addEventListener('animationstart', function(e) {
        if (e.animationName === 'onAutoFillStart') {
            field.classList.add('textfield_active');
        }
    });
}

/**
 * Add error state to a field
 * @param {HTMLElement} fieldDiv - Field container with data-field attribute
 * @param {string} errorMessage - Error message to display
 */
export function setFieldError(fieldDiv, errorMessage) {
    const textfield = fieldDiv.querySelector('.textfield');
    const messageEl = fieldDiv.querySelector('.textfield__message, .field__message');

    if (textfield) {
        textfield.classList.add('textfield_error');
    }

    if (messageEl) {
        messageEl.textContent = errorMessage;
    }
}

/**
 * Clear error state from a field
 * @param {HTMLElement} fieldDiv - Field container with data-field attribute
 */
export function clearFieldError(fieldDiv) {
    const textfield = fieldDiv.querySelector('.textfield');
    const messageEl = fieldDiv.querySelector('.textfield__message, .field__message');

    if (textfield) {
        textfield.classList.remove('textfield_error');
    }

    if (messageEl) {
        messageEl.textContent = '';
    }
}

/**
 * Clear all field errors
 */
export function clearAllErrors() {
    const textfields = document.querySelectorAll('.textfield');
    textfields.forEach(field => {
        field.classList.remove('textfield_error');
    });

    const messages = document.querySelectorAll('.textfield__message, .field__message');
    messages.forEach(msg => {
        msg.textContent = '';
    });
}