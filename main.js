document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navbarContainer = document.querySelector('.navbar-container');
    const backToTopButton = document.querySelector('.back-to-top');
    const preloader = document.getElementById('preloader');

    // Function to compute and set CSS variables for RGB values of accent colors and body text
    window.computeThemeColorRGB = () => {
        // Compute --link-hover-color-rgb
        // Create a temporary element to get the computed background color of --accent-color-hover
        const tempAccentDiv = document.createElement('div');
        tempAccentDiv.style.background = getComputedStyle(document.body).getPropertyValue('--accent-color-hover');
        tempAccentDiv.style.display = 'none'; // Keep it hidden
        document.body.appendChild(tempAccentDiv);
        const accentColor = getComputedStyle(tempAccentDiv).backgroundColor;
        document.body.removeChild(tempAccentDiv); // Clean up

        const accentMatch = accentColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (accentMatch) {
            document.documentElement.style.setProperty('--link-hover-color-rgb', `${accentMatch[1]},${accentMatch[2]},${accentMatch[3]}`);
        } else {
            // Fallback for gradients or non-standard values
            if (body.classList.contains('light-mode')) {
                document.documentElement.style.setProperty('--link-hover-color-rgb', '106,90,205'); // Corresponds to #6A5ACD from initial light-mode setup
            } else { // dark-mode
                document.documentElement.style.setProperty('--link-hover-color-rgb', '187,134,252'); // Corresponds to #BB86FC from initial dark-mode setup
            }
        }

        // Compute --body-text-color-rgb
        const bodyTextColor = getComputedStyle(document.body).getPropertyValue('color');
        const bodyTextMatch = bodyTextColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (bodyTextMatch) {
            document.documentElement.style.setProperty('--body-text-color-rgb', `${bodyTextMatch[1]},${bodyTextMatch[2]},${bodyTextMatch[3]}`);
        } else {
            if (body.classList.contains('light-mode')) {
                document.documentElement.style.setProperty('--body-text-color-rgb', '51,51,51'); // #333
            } else {
                document.documentElement.style.setProperty('--body-text-color-rgb', '224,224,224'); // #e0e0e0
            }
        }
    };

    // Exposed global function for applying theme consistently across the site
    window.applyThemeAndPersist = (themePreference) => {
        // themePreference can be 'light', 'dark', 'system' (from profile dropdown)
        // or 'light-mode', 'dark-mode' (from main.js theme toggle or initial load)
        let themeClassToSet;

        if (themePreference === 'system') {
            localStorage.removeItem('theme'); // Remove explicit preference, defer to system
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            themeClassToSet = prefersDark ? 'dark-mode' : 'light-mode';
        } else if (themePreference === 'light' || themePreference === 'dark') { // From profile dropdown
            themeClassToSet = `${themePreference}-mode`; // Convert 'light' -> 'light-mode'
            localStorage.setItem('theme', themeClassToSet);
        } else { // Already 'light-mode' or 'dark-mode' (from toggle or initial saved preference)
            themeClassToSet = themePreference;
            localStorage.setItem('theme', themeClassToSet);
        }

        body.className = themeClassToSet; // Apply the theme class
        window.computeThemeColorRGB(); // Always re-compute RGB variables after theme change
    };

    // Initial theme application on DOMContentLoaded
    const savedTheme = localStorage.getItem('theme'); // This will be 'light-mode', 'dark-mode', or 'system' (if explicitly set to system), or null
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'system') {
        window.applyThemeAndPersist('system');
    } else if (savedTheme) { // 'light-mode' or 'dark-mode' was explicitly saved
        window.applyThemeAndPersist(savedTheme);
    } else if (prefersDark) { // No saved preference, system default is dark
        window.applyThemeAndPersist('dark-mode');
    } else { // No saved preference, system default is light
        window.applyThemeAndPersist('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                window.applyThemeAndPersist('dark-mode');
            } else {
                window.applyThemeAndPersist('light-mode');
            }
        });
    }

    // System theme change listener for when 'system' is the preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        // Only apply system theme change if no specific theme is saved or if 'system' is chosen
        if (localStorage.getItem('theme') === 'system' || localStorage.getItem('theme') === null) {
            window.applyThemeAndPersist('system');
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add an active class to current nav link
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Navbar Scroll Effect ---
    const handleNavbarScroll = () => {
        if (navbarContainer) {
            if (window.scrollY > 50) {
                navbarContainer.classList.add('scrolled');
            } else {
                navbarContainer.classList.remove('scrolled');
            }
        }
    };
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Call on load to set initial state

    // --- Back to Top Button ---
    if (backToTopButton) {
        const handleScrollToTop = () => {
            if (window.scrollY > 200) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        };

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', handleScrollToTop);
        handleScrollToTop(); // Call on load to set initial state
    }

    // --- Preloader Logic ---
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after transition
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            }, { once: true });
        });
    }

    // --- General Scroll Reveal Animation (for elements with .reveal-on-scroll) ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of element visible to trigger
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }
});