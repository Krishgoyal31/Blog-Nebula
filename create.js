document.addEventListener('DOMContentLoaded', () => {
    const markdownEditor = document.getElementById('markdown-editor');
    const livePreview = document.getElementById('live-preview');
    const toolbarButtons = document.querySelectorAll('.toolbar-button');
    const postTitleInput = document.getElementById('post-title');
    const readingTimeSpan = document.getElementById('reading-time');
    const tagsInput = document.getElementById('post-tags-input');
    const selectedTagsContainer = document.getElementById('selected-tags');

    let currentTags = new Set();

    // Markdown to HTML conversion (simplified)
    const renderMarkdown = (markdown) => {
        let html = markdown
            // Headings
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            // Links
            .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
            // Unordered Lists
            .replace(/^\s*[-*+] (.*$)/gim, '<li>$1</li>');

        // Wrap list items in ul tags
        if (html.includes('<li>')) {
            html = html.replace(/(<li>.*<\/li>(\n|$))/g, '<ul>$1</ul>').replace(/<\/li><ul>/g, '</li>');
        }

        // Add paragraph tags for lines not already wrapped in block elements
        html = html.split('\n').map(line => {
            if (line.trim() === '') return ''; // Ignore empty lines
            if (!line.match(/<h[1-6]>|<pre>|<li>|<p>|<blockquote>|<hr>|<img|<video>/)) {
                return `<p>${line}</p>`;
            }
            return line;
        }).join('');

        // Basic image/video embed simulation (will just show text as content, not render actual embeds)
        // In a real app, this would be more complex, involving actual file uploads and embed code generation.
        // For simplicity, we just pass through placeholder text for now.
        if (html === '') {
            return '<h2 class="preview-placeholder">Your content will appear here...</h2>';
        }
        return html;
    };

    // Update Live Preview and Reading Time
    const updatePreview = () => {
        const markdownText = markdownEditor.value;
        livePreview.innerHTML = renderMarkdown(markdownText);

        // Calculate estimated reading time
        const wordCount = markdownText.split(/\s+/).filter(word => word.length > 0).length;
        const wordsPerMinute = 200; // Average reading speed
        const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
        readingTimeSpan.textContent = `~ ${readingTimeMinutes} min read`;
    };

    // Toolbar button functionality
    toolbarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const format = button.dataset.format;
            const start = markdownEditor.selectionStart;
            const end = markdownEditor.selectionEnd;
            const selectedText = markdownEditor.value.substring(start, end);

            let newText = selectedText;
            let cursorOffset = 0;

            switch (format) {
                case 'bold':
                    newText = `**${selectedText || 'bold text'}**`;
                    cursorOffset = selectedText ? 0 : 2;
                    break;
                case 'italic':
                    newText = `*${selectedText || 'italic text'}*`;
                    cursorOffset = selectedText ? 0 : 1;
                    break;
                case 'heading':
                    newText = `# ${selectedText || 'Heading'}`;
                    cursorOffset = selectedText ? 0 : 2;
                    break;
                case 'link':
                    newText = `[${selectedText || 'link text'}](http://example.com)`;
                    cursorOffset = selectedText ? 0 : newText.length - 16; // cursor inside ()
                    break;
                case 'image':
                    newText = `![${selectedText || 'alt text'}](http://image.url/image.jpg)`;
                    cursorOffset = selectedText ? 0 : newText.length - 23;
                    break;
                case 'video':
                    newText = `\n\n<video src="http://video.url/video.mp4" controls width="100%"></video>\n\n`;
                    cursorOffset = newText.length;
                    break;
                case 'list':
                    const currentLineStart = markdownEditor.value.lastIndexOf('\n', start - 1) + 1;
                    const currentLine = markdownEditor.value.substring(currentLineStart, end);
                    if (currentLine.trim().startsWith('- ')) {
                        // Remove list item
                        newText = currentLine.replace(/^- /, '').trim();
                        markdownEditor.setSelectionRange(currentLineStart, end);
                    } else {
                        // Add list item
                        newText = `- ${currentLine || 'List Item'}`;
                        cursorOffset = selectedText ? 0 : 2;
                        markdownEditor.setSelectionRange(currentLineStart, end);
                    }
                    break;
            }

            markdownEditor.value = markdownEditor.value.substring(0, start) + newText + markdownEditor.value.substring(end);
            markdownEditor.focus();
            markdownEditor.setSelectionRange(start + cursorOffset, start + newText.length);
            updatePreview();
        });
    });

    // Tag management
    const addTag = (tagText) => {
        if (tagText && !currentTags.has(tagText)) {
            currentTags.add(tagText);
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag-pill';
            tagSpan.innerHTML = `${tagText} <span class="remove-tag">&times;</span>`;
            tagSpan.querySelector('.remove-tag').addEventListener('click', () => {
                currentTags.delete(tagText);
                tagSpan.remove();
            });
            selectedTagsContainer.appendChild(tagSpan);
        }
    };

    tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tagText = tagsInput.value.trim();
            if (tagText) {
                addTag(tagText);
                tagsInput.value = '';
            }
        }
    });

    // Initial render
    markdownEditor.addEventListener('input', updatePreview);
    postTitleInput.addEventListener('input', updatePreview); // Not used in preview but good to have
    updatePreview();

    // Example of saving/publishing
    document.querySelector('.publish-btn').addEventListener('click', () => {
        alert('Post Published! (Simulated)');
        console.log('Title:', postTitleInput.value);
        console.log('Content:', markdownEditor.value);
        console.log('Tags:', Array.from(currentTags));
    });

    document.querySelector('.save-draft-btn').addEventListener('click', () => {
        alert('Draft Saved! (Simulated)');
    });

    // Handle initial placeholder text if editor is empty
    if (markdownEditor.value.trim() === '') {
        livePreview.innerHTML = '<h2 class="preview-placeholder">Your content will appear here...</h2>';
    }
});