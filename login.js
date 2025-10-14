document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const signupLeftBtn = document.querySelector('.signup-left-btn');
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    const signUpLink = document.querySelector('.signup-link');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Basic client-side validation (for demonstration purposes)
            if (!email || !password) {
                alert('Please enter both email/username and password.');
                return;
            }

            // In a real application, you would send this data to a server
            // For now, we'll just simulate a successful login
            console.log('Attempting to log in with:', { email, password });
            alert('Login successful! (Simulated)');

            // Redirect to another page after successful login
            window.location.href = 'profile.html'; // Or dashboard.html, etc.
        });
    }

    // Add event listener for "Forgot Password?" link
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Forgot Password? A reset link has been sent to your email (simulated).');
        });
    }

    // Add event listener for "Sign Up" links
    const handleSignUpClick = (e) => {
        e.preventDefault();
        alert('Redirecting to Sign Up page (simulated).');
        // In a real app, you would redirect to a registration page
        // window.location.href = 'signup.html';
    };

    if (signUpLink) {
        signUpLink.addEventListener('click', handleSignUpClick);
    }
    if (signupLeftBtn) {
        signupLeftBtn.addEventListener('click', handleSignUpClick);
    }
});