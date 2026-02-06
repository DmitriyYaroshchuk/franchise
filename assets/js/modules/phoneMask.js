// phoneMask.js - Phone number masking functionality

import { getCurrentLanguage } from './languageSwitcher.js';

/**
 * Apply phone mask to input field
 * @param {HTMLInputElement} input - Phone input element
 */
export function applyPhoneMask(input) {
    input.addEventListener('input', function(e) {
        const cursorPosition = this.selectionStart;
        const oldValue = this.value;
        const oldLength = oldValue.length;

        // Get only digits
        const digits = this.value.replace(/\D/g, '');

        // Format the number
        const formatted = formatPhoneNumber(digits);

        // Update value
        this.value = formatted;

        // Restore cursor position
        const newLength = formatted.length;
        const diff = newLength - oldLength;
        this.setSelectionRange(cursorPosition + diff, cursorPosition + diff);
    });

    // Add + when field is focused and empty
    input.addEventListener('focus', function() {
        if (!this.value) {
            this.value = '+';
        }
    });
}

/**
 * Format phone number - only Ukraine gets formatting
 * @param {string} digits - Raw phone number digits
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(digits) {
    if (!digits) return '';

    // Check if it's Ukrainian number
    if (digits.startsWith('38')) {
        // Ukraine: +38 (0##) ###-##-##
        let formatted = '+38';

        if (digits.length > 2) {
            formatted += ' (' + digits.substring(2, 5);
            if (digits.length > 5) {
                formatted += ') ' + digits.substring(5, 8);
                if (digits.length > 8) {
                    formatted += '-' + digits.substring(8, 10);
                    if (digits.length > 10) {
                        formatted += '-' + digits.substring(10, 12);
                    }
                }
            }
        }

        return formatted;
    }

    // For all other countries - just add + and digits without formatting
    return '+' + digits;
}

/**
 * Update phone mask placeholder based on language
 * @param {string} lang - Language code
 */
export function updatePhoneMask(lang) {
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        // Don't set placeholder - it causes label overlap issues
        // The mask will format the input as user types
        phoneInput.placeholder = '';
    }
}

/**
 * Unmask phone number - extract only digits
 * @param {string} phoneNumber - Formatted phone number
 * @returns {string} Phone number with only digits
 */
export function unmaskPhone(phoneNumber) {
    return phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
}