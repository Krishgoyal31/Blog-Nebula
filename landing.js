document.addEventListener('DOMContentLoaded', () => {
    // Basic landing page specific animations
    const heroContent = document.querySelector('.hero-content');
    const trendingPosts = document.querySelector('.trending-posts-section');
    const startWritingSection = document.querySelector('.start-writing-section');

    const animateOnScroll = (element, className, threshold = 0.1) => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    element.classList.add(className);
                } else {
                    element.classList.remove(className); // Optional: remove on scroll out
                }
            });
        }, { threshold: threshold });
        observer.observe(element);
    };

    // Add classes for initial load or specific animations
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    if (trendingPosts) {
        trendingPosts.style.opacity = '0';
        trendingPosts.style.transform = 'translateY(30px)';
        animateOnScroll(trendingPosts, 'fade-in-up', 0.2);
    }

    if (startWritingSection) {
        startWritingSection.style.opacity = '0';
        startWritingSection.style.transform = 'translateY(30px)';
        animateOnScroll(startWritingSection, 'fade-in-up', 0.3);
    }

    // Define the animation CSS classes (usually in CSS, but for demo brevity)
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .trending-posts-section, .start-writing-section {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(style);
});