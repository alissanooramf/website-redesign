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

    // Dashboard Navigation & Elements
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const dashSidebar = document.getElementById('dashSidebar');
    const profilePillBtn = document.getElementById('profilePillBtn');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    
    // Submenu Elements
    const studentParentItem = document.getElementById('studentParentItem');
    const studentSubmenu = document.getElementById('studentSubmenu');
    const viewProfileLink = document.getElementById('viewProfileLink');
    const resStudentProfile = document.getElementById('resStudentProfile');
    const crumbHome = document.getElementById('crumbHome');

    // Tab Panes
    const tabHome = document.getElementById('tabHome');
    const tabStudentProfile = document.getElementById('tabStudentProfile');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Profile Horizontal Tabs & Accordions
    const pTabBtns = document.querySelectorAll('.p-tab-btn');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

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
    const sidebarHelpBox = document.getElementById('sidebarHelpBox');

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

        submitBtn.disabled = true;
        btnText.textContent = 'Authenticating...';
        btnArrow.classList.add('hidden');
        loginSpinner.classList.remove('hidden');

        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.textContent = 'Login';
            btnArrow.classList.remove('hidden');
            loginSpinner.classList.add('hidden');

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

    // Mobile Sidebar Toggle
    if (menuToggleBtn && dashSidebar) {
        menuToggleBtn.addEventListener('click', () => {
            dashSidebar.classList.toggle('mobile-open');
        });
    }

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

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            userDropdownMenu.classList.add('hidden');
            openModal(forgotModal);
        });
    }

    // Switch Main Content Tab (e.g. Home vs Student Profile)
    function switchMainTab(targetTabId) {
        tabPanes.forEach(pane => pane.classList.add('hidden'));

        if (targetTabId === 'tabStudentProfile') {
            tabStudentProfile.classList.remove('hidden');
        } else {
            tabHome.classList.remove('hidden');
        }

        // Scroll to top of content
        document.querySelector('.dash-content').scrollTop = 0;
    }

    // Sidebar Student Submenu Toggle
    if (studentParentItem && studentSubmenu) {
        const studentNavLink = studentParentItem.querySelector('.nav-has-submenu');
        studentNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            studentParentItem.classList.toggle('expanded');
            studentSubmenu.classList.toggle('submenu-open');
        });
    }

    // Submenu Items Navigation
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            submenuItems.forEach(sub => sub.classList.remove('active'));
            item.classList.add('active');

            const tab = item.dataset.tab;
            if (tab === 'tabStudentProfile') {
                switchMainTab('tabStudentProfile');
            } else {
                const label = item.innerText.trim();
                showToast(`Opening ${label}...`, 'info');
            }
        });
    });

    // Sidebar Main Nav Item Clicks (e.g., Home)
    const mainNavItems = document.querySelectorAll('.sidebar-nav > .nav-item');
    mainNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            mainNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const tab = item.dataset.tab;
            if (tab === 'tabHome') {
                switchMainTab('tabHome');
            }
        });
    });

    // Quick links to Profile
    if (viewProfileLink) {
        viewProfileLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchMainTab('tabStudentProfile');
        });
    }

    if (resStudentProfile) {
        resStudentProfile.addEventListener('click', () => {
            switchMainTab('tabStudentProfile');
        });
    }

    if (crumbHome) {
        crumbHome.addEventListener('click', () => {
            switchMainTab('tabHome');
        });
    }

    // Student Profile Horizontal Tabs Switching
    pTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const ptab = btn.dataset.ptab;
            const tabName = btn.innerText.trim();
            showToast(`Switched to ${tabName} section.`, 'info');
        });
    });

    // Accordion Expand / Collapse Handling
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionBody = accordionItem.querySelector('.accordion-body');
            
            const isExpanded = accordionItem.classList.contains('expanded');
            
            if (isExpanded) {
                accordionItem.classList.remove('expanded');
                accordionBody.classList.add('hidden');
            } else {
                accordionItem.classList.add('expanded');
                accordionBody.classList.remove('hidden');
            }
        });
    });

    if (sidebarHelpBox) {
        sidebarHelpBox.addEventListener('click', () => {
            openModal(supportModal);
        });
    }

    // Modals Handling
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

    // Toast Utility
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = 'ℹ️';
        if (type === 'success') icon = '✓';

        toast.innerHTML = `<span style="font-weight: 800;">${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }
});
