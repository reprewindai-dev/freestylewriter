// Freestyle Writer - Main JavaScript

// DOM Elements
const editor = document.getElementById('editor');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const notification = document.getElementById('notification');

// Local Storage Key
const STORAGE_KEY = 'freestyle_writer_content';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    updateStats();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Update stats on input
    editor.addEventListener('input', () => {
        updateStats();
        saveContent();
    });

    // Download button
    downloadBtn.addEventListener('click', downloadText);

    // Clear button
    clearBtn.addEventListener('click', clearEditor);

    // Copy button
    copyBtn.addEventListener('click', copyToClipboard);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S to download
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            downloadText();
        }
        // Ctrl/Cmd + K to clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            clearEditor();
        }
    });

    // Auto-save every 30 seconds
    setInterval(saveContent, 30000);
}

// Update Word and Character Count
function updateStats() {
    const text = editor.value;
    
    // Character count
    charCount.textContent = text.length;
    
    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;
}

// Save Content to Local Storage
function saveContent() {
    try {
        localStorage.setItem(STORAGE_KEY, editor.value);
    } catch (error) {
        console.error('Failed to save content:', error);
    }
}

// Load Content from Local Storage
function loadContent() {
    try {
        const savedContent = localStorage.getItem(STORAGE_KEY);
        if (savedContent) {
            editor.value = savedContent;
            updateStats();
        }
    } catch (error) {
        console.error('Failed to load content:', error);
    }
}

// Download Text as File
function downloadText() {
    const text = editor.value;
    
    if (!text.trim()) {
        showNotification('Nothing to download. Write something first!', 'error');
        return;
    }

    // Create filename with timestamp
    const date = new Date();
    const timestamp = date.toISOString().split('T')[0] + '_' + 
                     date.toTimeString().split(' ')[0].replace(/:/g, '-');
    const filename = `freestyle_writer_${timestamp}.txt`;

    // Create blob and download
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('Downloaded successfully!', 'success');
}

// Clear Editor
function clearEditor() {
    if (!editor.value.trim()) {
        showNotification('Editor is already empty', 'error');
        return;
    }

    if (confirm('Are you sure you want to clear all text? This cannot be undone.')) {
        editor.value = '';
        updateStats();
        saveContent();
        showNotification('Editor cleared', 'success');
        editor.focus();
    }
}

// Copy to Clipboard
function copyToClipboard() {
    const text = editor.value;
    
    if (!text.trim()) {
        showNotification('Nothing to copy. Write something first!', 'error');
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            showNotification('Copied to clipboard!', 'success');
        })
        .catch(err => {
            console.error('Failed to copy:', err);
            showNotification('Failed to copy to clipboard', 'error');
        });
}

// Show Notification
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = 'notification ' + type;
    
    // Remove hidden class to show
    setTimeout(() => {
        notification.classList.remove('hidden');
    }, 10);

    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateStats,
        saveContent,
        loadContent,
        downloadText,
        clearEditor,
        copyToClipboard,
        showNotification
    };
}
