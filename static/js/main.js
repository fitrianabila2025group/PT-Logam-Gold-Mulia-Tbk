/**
 * PT Logam Gold Mulia Tbk — Main JavaScript
 * Handles: mobile menu, sticky header, scroll reveal, FAQ toggles, form validation
 */

(function () {
    'use strict';

    // =============================================
    // Mobile Menu
    // =============================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', !isOpen);
        });
    }

    // =============================================
    // Sticky Header
    // =============================================
    const header = document.getElementById('site-header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // =============================================
    // Scroll Reveal
    // =============================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // =============================================
    // FAQ Toggles
    // =============================================
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            const item = this.closest('.faq-item');
            const content = item.querySelector('.faq-content');
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item.active').forEach(function (activeItem) {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    const activeContent = activeItem.querySelector('.faq-content');
                    activeContent.classList.add('hidden');
                    activeContent.style.maxHeight = null;
                    activeItem.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current
            if (isActive) {
                item.classList.remove('active');
                content.classList.add('hidden');
                content.style.maxHeight = null;
                this.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                content.classList.remove('hidden');
                content.style.maxHeight = content.scrollHeight + 'px';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // =============================================
    // Contact Form — Basic Validation
    // =============================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            // Clear previous error states
            contactForm.querySelectorAll('.field-error').forEach(function (el) {
                el.remove();
            });
            contactForm.querySelectorAll('.border-red-400').forEach(function (el) {
                el.classList.remove('border-red-400');
            });

            requiredFields.forEach(function (field) {
                var value = field.value.trim();
                if (!value) {
                    isValid = false;
                    showFieldError(field, 'Kolom ini wajib diisi');
                } else if (field.type === 'email' && !isValidEmail(value)) {
                    isValid = false;
                    showFieldError(field, 'Format email tidak valid');
                } else if (field.minLength && value.length < field.minLength) {
                    isValid = false;
                    showFieldError(field, 'Minimal ' + field.minLength + ' karakter');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    function showFieldError(field, message) {
        field.classList.add('border-red-400');
        const errorEl = document.createElement('p');
        errorEl.className = 'field-error text-xs text-red-600 mt-1';
        errorEl.textContent = message;
        field.parentNode.appendChild(errorEl);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
})();
