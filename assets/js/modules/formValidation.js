// formValidation.js - Form validation logic

import { getCurrentLanguage } from './languageSwitcher.js';
import { getTranslation } from './translations.js';

/**
 * Validate entire form data
 * Only email and phone are required
 * @param {Object} data - Form data object
 * @returns {Object} Errors object with field names as keys
 */
export function validateForm(data) {
    const errors = {};
    const lang = getCurrentLanguage();

    // Email validation (REQUIRED)
    if (!data.email || data.email.trim() === '') {
        errors.email = getTranslation('errors.required', lang);
    } else if (!isValidEmail(data.email)) {
        errors.email = getTranslation('errors.email', lang);
    }

    // Phone validation (REQUIRED)
    if (!data.phone || data.phone.trim() === '') {
        errors.phone = getTranslation('errors.required', lang);
    }

    // Message length validation (optional field, but if filled must be <= 255)
    if (data.message && data.message.length > 255) {
        errors.message = getTranslation('errors.messageTooLong', lang);
    }

    // Optional fields - no validation needed
    // name, location, budget are optional

    return errors;
}

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone number (basic check)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone number
 */
export function isValidPhone(phone) {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    // Should have at least 10 digits
    return digits.length >= 10;
}

/**
 * Remove emoji from string
 * @param {string} str - String that may contain emoji
 * @returns {string} String without emoji
 */
export function removeEmoji(str) {
    if (!str) return str;
    return str.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
}

/**
 * Sanitize form data before submission
 * @param {Object} data - Raw form data
 * @returns {Object} Sanitized form data
 */
export function sanitizeFormData(data) {
    return {
        name: data.name ? removeEmoji(data.name) : '',
        email: data.email || '',
        phone: data.phone ? data.phone.replace(/\D/g, '') : '', // Remove all non-digits
        location: data.location ? removeEmoji(data.location) : '',
        budget: data.budget || '',
        message: data.message ? removeEmoji(data.message) : ''
    };
}