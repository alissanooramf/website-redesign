document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeOpen = togglePasswordBtn.querySelector('.eye-open');
    const eyeClosed = togglePasswordBtn.querySelector('.eye-closed');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnArrow = submitBtn.querySelector('.btn-arrow');
    const loginSpinner = document.getElementById('loginSpinner');
    // Modals
    const topHelpBtn = document.getElementById('topHelpBtn');
    const supportModalBtn = document.getElementById('supportModalBtn');
    const forgotCredentialsBtn = document.getElementById('forgotCredentialsBtn');
    const forgotModal = document.getElementById('forgotModal');
    const supportModal = document.getElementById('supportModal');
    const closeForgotModal = document.getElementById('closeForgotModal');
    const closeSupportModal = document.getElementById('closeSupportModal');
    const toastContainer = document.getElementById('toastContainer');
    const recoveryForm = document.getElementById('recoveryForm');

    // Password Toggle Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        if (isPassword) {
            eyeOpen.classList.add('hidden');
            eyeClosed.classList.remove('hidden');
        } else {
            eyeOpen.classList.remove('hidden');
            eyeClosed.classList.add('hidden');
        }
    });

    // Input Validation Helpers
    function validateInputs() {
        let isValid = true;
        
        // Reset errors
        usernameError.textContent = '';
        passwordError.textContent = '';
        usernameInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');

        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Please enter your username';
            usernameInput.classList.add('invalid');
            isValid = false;
        }

        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Please enter your password';
            passwordInput.classList.add('invalid');
            isValid = false;
        }

        return isValid;
    }

    // Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Authenticating...';
        btnArrow.classList.add('hidden');
        loginSpinner.classList.remove('hidden');

        // Simulate API call authentication
        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.textContent = 'Login';
            btnArrow.classList.remove('hidden');
            loginSpinner.classList.add('hidden');

            showToast('Signed in successfully to Student Portal!', 'success');
        }, 1200);
    });

    // Clear input errors on typing
    usernameInput.addEventListener('input', () => {
        if (usernameInput.value.trim()) {
            usernameError.textContent = '';
            usernameInput.classList.remove('invalid');
        }
    });

    passwordInput.addEventListener('input', () => {
        if (passwordInput.value.trim()) {
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid');
        }
    });

    // Modals Handling
    function openModal(modal) {
        modal.classList.remove('hidden');
    }

    function closeModal(modal) {
        modal.classList.add('hidden');
    }

    topHelpBtn.addEventListener('click', () => openModal(supportModal));
    supportModalBtn.addEventListener('click', () => openModal(supportModal));
    forgotCredentialsBtn.addEventListener('click', () => openModal(forgotModal));

    closeForgotModal.addEventListener('click', () => closeModal(forgotModal));
    closeSupportModal.addEventListener('click', () => closeModal(supportModal));

    // Close modal on click outside
    [forgotModal, supportModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Recovery Form Submit
    if (recoveryForm) {
        recoveryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal(forgotModal);
            showToast('Recovery instructions have been sent to your registered email.', 'success');
        });
    }

    // Toast Notification Utility
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = 'ℹ️';
        if (type === 'success') icon = '✓';
        if (type === 'error') icon = '✕';

        toast.innerHTML = `<span style="font-weight: 800;">${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});
