document.addEventListener('DOMContentLoaded', () => {
    const tagButtons = document.querySelectorAll('.tag-button');
    const masonryGrid = document.querySelector('.post-masonry-grid');
    const postCards = document.querySelectorAll('.explore-card');

    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tagButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            const filterTag = button.textContent.trim(); // e.g., "Technology", "All"

            // Filter posts (this is a simplified client-side filter)
            postCards.forEach(card => {
                const cardTags = card.querySelector('.post-meta').textContent.toLowerCase();
                const cardVisible = filterTag === 'All' || cardTags.includes(filterTag.toLowerCase());

                if (cardVisible) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            // Re-layout masonry after filtering if needed (not strictly necessary with flex/grid, but good practice for true masonry)
            // For a simple grid, this might not require a full re-layout script.
        });
    });
});