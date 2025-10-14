document.addEventListener('DOMContentLoaded', () => {
    const bookmarkBtn = document.querySelector('.bookmark-btn');
    const likeBtn = document.querySelector('.like-btn');
    const likeCountSpan = likeBtn ? likeBtn.querySelector('span') : null;

    // --- Bookmark Toggle ---
    if (bookmarkBtn) {
        let isBookmarked = localStorage.getItem('post-bookmarked') === 'true';

        const updateBookmarkIcon = () => {
            if (isBookmarked) {
                bookmarkBtn.classList.add('active');
                bookmarkBtn.querySelector('i').classList.replace('far', 'fas'); // Solid icon
            } else {
                bookmarkBtn.classList.remove('active');
                bookmarkBtn.querySelector('i').classList.replace('fas', 'far'); // Outline icon
            }
        };

        bookmarkBtn.addEventListener('click', () => {
            isBookmarked = !isBookmarked;
            localStorage.setItem('post-bookmarked', isBookmarked);
            updateBookmarkIcon();
            alert(isBookmarked ? 'Post bookmarked!' : 'Bookmark removed!');
        });

        updateBookmarkIcon(); // Set initial state
    }

    // --- Like Toggle ---
    if (likeBtn && likeCountSpan) {
        let isLiked = localStorage.getItem('post-liked') === 'true';
        let currentLikes = parseInt(likeCountSpan.textContent, 10);

        const updateLikeIcon = () => {
            if (isLiked) {
                likeBtn.classList.add('active');
                likeBtn.querySelector('i').classList.replace('far', 'fas'); // Solid heart
            } else {
                likeBtn.classList.remove('active');
                likeBtn.querySelector('i').classList.replace('fas', 'far'); // Outline heart
            }
            likeCountSpan.textContent = currentLikes;
        };

        likeBtn.addEventListener('click', () => {
            isLiked = !isLiked;
            localStorage.setItem('post-liked', isLiked);

            if (isLiked) {
                currentLikes += 1;
            } else {
                currentLikes -= 1;
            }
            updateLikeIcon();
        });

        updateLikeIcon(); // Set initial state
    }

    // --- Smooth Scroll for Related Articles Carousel (if needed, currently CSS based) ---
    // If you need programmatic scrolling or more complex carousel behavior,
    // you would add JavaScript here. For a simple overflow-x: auto with scroll-snap,
    // pure CSS is often sufficient.
    const relatedArticlesCarousel = document.querySelector('.related-articles-carousel');
    if (relatedArticlesCarousel) {
        // Example: Add arrows for manual scrolling if desired
        // This is a placeholder for potential future functionality
        // console.log("Related articles carousel detected. Add navigation arrows or swipe logic here.");
    }
});