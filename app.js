document.addEventListener('DOMContentLoaded', () => {
    // Views
    const loginView = document.getElementById('loginView');
    const dashboardView = document.getElementById('dashboardView');

    // Login Form Elements
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

    // Dashboard Elements
    const profilePillBtn = document.getElementById('profilePillBtn');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const sidebarNavItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const sidebarHelpBox = document.getElementById('sidebarHelpBox');

    // Modals & Toast
    const topHelpBtn = document.getElementById('topHelpBtn');
    const supportModalBtn = document.getElementById('supportModalBtn');
    const forgotCredentialsBtn = document.getElementById('forgotCredentialsBtn');
    const forgotModal = document.getElementById('forgotModal');
    const supportModal = document.getElementById('supportModal');
    const closeForgotModal = document.getElementById('closeForgotModal');
    const closeSupportModal = document.getElementById('closeSupportModal');
    const toastContainer = document.getElementById('toastContainer');
    const recoveryForm = document.getElementById('recoveryForm');

    // Toggle Password Visibility
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

    // Form Validation Helper
    function validateInputs() {
        let isValid = true;
        usernameError.textContent = '';
        passwordError.textContent = '';
        usernameInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');

        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Please enter your username or Register No.';
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

    // Login Action
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

        // Simulate Authentication Delay
        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.textContent = 'Login';
            btnArrow.classList.remove('hidden');
            loginSpinner.classList.add('hidden');

            // Switch to Dashboard View
            loginView.classList.add('hidden');
            dashboardView.classList.remove('hidden');

            showToast('Signed in successfully! Welcome GREESHMA PREETHA.', 'success');
        }, 800);
    });

    // Clear validation errors on typing
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

    // User Profile Dropdown Toggle
    if (profilePillBtn && userDropdownMenu) {
        profilePillBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdownMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            if (!userDropdownMenu.classList.contains('hidden')) {
                userDropdownMenu.classList.add('hidden');
            }
        });
    }

    // Logout Action
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            userDropdownMenu.classList.add('hidden');
            dashboardView.classList.add('hidden');
            loginView.classList.remove('hidden');
            showToast('Logged out successfully.', 'info');
        });
    }

    // Change Password Action
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            userDropdownMenu.classList.add('hidden');
            openModal(forgotModal);
        });
    }

    // Sidebar Navigation Active Switching
    sidebarNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            const label = item.querySelector('.nav-label').textContent;
            showToast(`Navigated to ${label} section.`, 'info');
        });
    });

    if (sidebarHelpBox) {
        sidebarHelpBox.addEventListener('click', () => {
            openModal(supportModal);
        });
    }

    // Modals
    function openModal(modal) {
        modal.classList.remove('hidden');
    }

    function closeModal(modal) {
        modal.classList.add('hidden');
    }

    if (topHelpBtn) topHelpBtn.addEventListener('click', () => openModal(supportModal));
    if (supportModalBtn) supportModalBtn.addEventListener('click', () => openModal(supportModal));
    if (forgotCredentialsBtn) forgotCredentialsBtn.addEventListener('click', () => openModal(forgotModal));

    if (closeForgotModal) closeForgotModal.addEventListener('click', () => closeModal(forgotModal));
    if (closeSupportModal) closeSupportModal.addEventListener('click', () => closeModal(supportModal));

    [forgotModal, supportModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });

    if (recoveryForm) {
        recoveryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal(forgotModal);
            showToast('Recovery instructions sent to registered email.', 'success');
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
        }, 3500);
    }
});
