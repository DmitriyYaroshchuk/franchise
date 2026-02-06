// formHandler.js - Form submission and handling

import { validateForm, sanitizeFormData } from './formValidation.js';
import { setFieldError, clearAllErrors } from './textFields.js';

/**
 * Initialize form submission handler
 */
export function initForm() {
    const form = document.getElementById('reviewForm');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear previous errors
        clearAllErrors();

        // Get form data
        const formData = getFormData();

        // Validate
        const errors = validateForm(formData);

        if (Object.keys(errors).length > 0) {
            displayErrors(errors);
            scrollToFirstError();
            return;
        }

        // Submit
        await submitForm(formData);
    });
}

/**
 * Get form data from form fields
 * @returns {Object} Form data object
 */
export function getFormData() {
    const form = document.getElementById('reviewForm');
    const formData = new FormData(form);

    return {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        budget: formData.get('budget'),
        message: formData.get('message')
    };
}

/**
 * Display validation errors on form fields
 * @param {Object} errors - Errors object with field names as keys
 */
export function displayErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const fieldDiv = document.querySelector(`[data-field="${fieldName}"]`);
        if (!fieldDiv) return;

        setFieldError(fieldDiv, errors[fieldName]);
    });
}

/**
 * Scroll to first error field
 */
export function scrollToFirstError() {
    const firstError = document.querySelector('.textfield_error');
    if (firstError) {
        const offset = firstError.getBoundingClientRect().top + window.pageYOffset - 64;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
}

/**
 * Submit form data - simplified version
 * @param {Object} data - Form data to submit
 */
export async function submitForm(data) {
    const submitBtn = document.querySelector('button[type="submit"]');

    // Show loading state
    setButtonLoading(submitBtn, true);

    // Clean and prepare data
    const cleanData = sanitizeFormData(data);

    // Log data to console (for now, until API endpoint is ready)
    console.log('Form data ready to submit:', cleanData);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Hide loading state
    setButtonLoading(submitBtn, false);

    // Redirect to success page
    window.location.href = './success.html';
}

/**
 * Set button loading state
 * @param {HTMLButtonElement} button - Submit button element
 * @param {boolean} isLoading - Whether button should show loading state
 */
function setButtonLoading(button, isLoading) {
    const btnLoader = button.querySelector('.btn__loader');

    if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        btnLoader.style.display = 'block';
    } else {
        button.disabled = false;
        button.classList.remove('loading');
        btnLoader.style.display = 'none';
    }
}

/**
 * Configure API endpoint (call this when endpoint is ready)
 * @param {string} endpoint - API endpoint URL
 */
export function setApiEndpoint(endpoint) {
    window.FORM_API_ENDPOINT = endpoint;
}

/**
 * Submit to actual API (uncomment when ready)
 */
/*
export async function submitToApi(data) {
    const endpoint = window.FORM_API_ENDPOINT || '/api/v1/feedback';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return { success: true };
        } else if (response.status === 422) {
            const errorData = await response.json();
            return { success: false, errors: errorData.errors };
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
}
*/