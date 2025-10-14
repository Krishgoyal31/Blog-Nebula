document.addEventListener('DOMContentLoaded', () => {
    const sidebarNavItems = document.querySelectorAll('.sidebar-nav li');
    const profileSections = document.querySelectorAll('.profile-section');
    const themeSelect = document.getElementById('theme-select');
    const fontSelect = document.getElementById('font-select');

    // --- Tab Switching Logic ---
    sidebarNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and hide all sections
            sidebarNavItems.forEach(nav => nav.classList.remove('active'));
            profileSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Show corresponding section
            const targetSectionId = item.dataset.section + '-section';
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // --- Theme & Font Customization Logic ---

    // Initialize the theme dropdown value based on current localStorage value
    const initializeThemeDropdown = () => {
        const storedTheme = localStorage.getItem('theme'); // 'light-mode', 'dark-mode', or 'system'
        if (storedTheme === 'dark-mode') {
            themeSelect.value = 'dark';
        } else if (storedTheme === 'light-mode') {
            themeSelect.value = 'light';
        } else { // 'system' or null (no preference)
            themeSelect.value = 'system';
        }
    };

    // Call initialize on load
    initializeThemeDropdown();

    // Event listener for theme select changes
    themeSelect.addEventListener('change', (e) => {
        // Use the global function defined in main.js to ensure consistency
        if (window.applyThemeAndPersist) {
            window.applyThemeAndPersist(e.target.value); // Pass 'system', 'light', or 'dark'
        }
    });

    // Font application logic
    const applyFont = (fontFamily) => {
        document.documentElement.style.setProperty('--font-primary', `'${fontFamily}', sans-serif`);
        localStorage.setItem('font', fontFamily);
    };

    // Load saved font preference
    const savedFont = localStorage.getItem('font');
    if (savedFont) {
        fontSelect.value = savedFont;
        applyFont(savedFont);
    } else {
        fontSelect.value = 'Inter'; // Default font
        applyFont('Inter');
    }

    fontSelect.addEventListener('change', (e) => {
        applyFont(e.target.value);
    });

    // Simulate save changes button
    document.querySelector('#settings-section .btn-primary').addEventListener('click', () => {
        const bioEdit = document.getElementById('bio-edit');
        const newBio = bioEdit.value;
        document.querySelector('.user-bio').textContent = newBio;
        alert('Profile settings saved! (Simulated)');
    });

    // Analytics chart placeholder functionality (if any interactive elements were needed)
    // For this project, it's just an image.
});