// Freestyle Writer - Main Application
class FreestyleWriter {
    constructor() {
        this.currentDocumentId = null;
        this.documents = [];
        this.autoSaveTimeout = null;
        this.autoSaveDelay = 2000; // 2 seconds
        
        // Initialize
        this.initElements();
        this.loadFromLocalStorage();
        this.attachEventListeners();
        this.initDarkMode();
        
        // Create default document if none exist
        if (this.documents.length === 0) {
            this.createNewDocument();
        } else {
            this.loadDocument(this.documents[0].id);
        }
        
        this.updateStats();
    }
    
    initElements() {
        // Editor
        this.editor = document.getElementById('editor');
        this.documentTitle = document.getElementById('documentTitle');
        this.saveStatus = document.getElementById('saveStatus');
        
        // Stats
        this.wordCount = document.getElementById('wordCount');
        this.charCount = document.getElementById('charCount');
        
        // Menu
        this.menuBtn = document.getElementById('menuBtn');
        this.menuSidebar = document.getElementById('menuSidebar');
        this.closeMenuBtn = document.getElementById('closeMenuBtn');
        this.overlay = document.getElementById('overlay');
        
        // Buttons
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.newDocBtn = document.getElementById('newDocBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.loadBtn = document.getElementById('loadBtn');
        this.exportTxtBtn = document.getElementById('exportTxtBtn');
        this.exportMdBtn = document.getElementById('exportMdBtn');
        this.clearBtn = document.getElementById('clearBtn');
        
        // Settings
        this.autoSaveCheckbox = document.getElementById('autoSave');
        this.focusModeCheckbox = document.getElementById('focusMode');
        
        // Documents list
        this.documentsList = document.getElementById('documentsList');
    }
    
    attachEventListeners() {
        // Editor events
        this.editor.addEventListener('input', () => {
            this.updateStats();
            this.markUnsaved();
            if (this.autoSaveCheckbox.checked) {
                this.scheduleAutoSave();
            }
        });
        
        this.documentTitle.addEventListener('input', () => {
            this.updateCurrentDocumentTitle();
            this.markUnsaved();
            if (this.autoSaveCheckbox.checked) {
                this.scheduleAutoSave();
            }
        });
        
        // Menu toggle
        this.menuBtn.addEventListener('click', () => this.openMenu());
        this.closeMenuBtn.addEventListener('click', () => this.closeMenu());
        this.overlay.addEventListener('click', () => this.closeMenu());
        
        // Dark mode
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        
        // Document actions
        this.newDocBtn.addEventListener('click', () => this.createNewDocument());
        this.saveBtn.addEventListener('click', () => this.saveToFile());
        this.loadBtn.addEventListener('click', () => this.loadFromFile());
        this.exportTxtBtn.addEventListener('click', () => this.exportAs('txt'));
        this.exportMdBtn.addEventListener('click', () => this.exportAs('md'));
        this.clearBtn.addEventListener('click', () => this.clearDocument());
        
        // Settings
        this.focusModeCheckbox.addEventListener('change', () => {
            document.body.classList.toggle('focus-mode', this.focusModeCheckbox.checked);
            this.saveSettings();
        });
        
        this.autoSaveCheckbox.addEventListener('change', () => {
            this.saveSettings();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S to save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveToLocalStorage();
                this.saveToFile();
            }
            
            // Ctrl/Cmd + N for new document
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.createNewDocument();
            }
            
            // Escape to close menu
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
        
        // Auto-save on window close
        window.addEventListener('beforeunload', () => {
            this.saveToLocalStorage();
        });
    }
    
    // Document Management
    createNewDocument() {
        const doc = {
            id: Date.now(),
            title: 'Untitled Document',
            content: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.documents.unshift(doc);
        this.loadDocument(doc.id);
        this.saveToLocalStorage();
        this.renderDocumentsList();
        this.editor.focus();
    }
    
    loadDocument(documentId) {
        const doc = this.documents.find(d => d.id === documentId);
        if (!doc) return;
        
        this.currentDocumentId = documentId;
        this.documentTitle.value = doc.title;
        this.editor.value = doc.content;
        this.updateStats();
        this.renderDocumentsList();
        this.markSaved();
    }
    
    updateCurrentDocumentTitle() {
        const doc = this.documents.find(d => d.id === this.currentDocumentId);
        if (doc) {
            doc.title = this.documentTitle.value || 'Untitled Document';
            doc.updatedAt = new Date().toISOString();
            this.renderDocumentsList();
        }
    }
    
    updateCurrentDocumentContent() {
        const doc = this.documents.find(d => d.id === this.currentDocumentId);
        if (doc) {
            doc.content = this.editor.value;
            doc.updatedAt = new Date().toISOString();
        }
    }
    
    clearDocument() {
        if (confirm('Are you sure you want to clear this document? This action cannot be undone.')) {
            this.editor.value = '';
            this.updateStats();
            this.updateCurrentDocumentContent();
            this.saveToLocalStorage();
            this.markSaved();
        }
    }
    
    deleteDocument(documentId) {
        if (this.documents.length === 1) {
            alert('Cannot delete the last document.');
            return;
        }
        
        if (confirm('Are you sure you want to delete this document?')) {
            this.documents = this.documents.filter(d => d.id !== documentId);
            
            if (this.currentDocumentId === documentId) {
                this.loadDocument(this.documents[0].id);
            }
            
            this.saveToLocalStorage();
            this.renderDocumentsList();
        }
    }
    
    renderDocumentsList() {
        if (this.documents.length === 0) {
            this.documentsList.innerHTML = '<div class="empty-state">No documents yet</div>';
            return;
        }
        
        this.documentsList.innerHTML = this.documents.map(doc => {
            const date = new Date(doc.updatedAt);
            const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const wordCount = this.countWords(doc.content);
            const isActive = doc.id === this.currentDocumentId;
            
            return `
                <div class="document-item ${isActive ? 'active' : ''}" data-id="${doc.id}">
                    <div class="document-name">${this.escapeHtml(doc.title)}</div>
                    <div class="document-meta">${wordCount} words • ${formattedDate}</div>
                </div>
            `;
        }).join('');
        
        // Attach click listeners
        this.documentsList.querySelectorAll('.document-item').forEach(item => {
            item.addEventListener('click', () => {
                const docId = parseInt(item.dataset.id);
                this.loadDocument(docId);
                this.closeMenu();
            });
        });
    }
    
    // Stats
    updateStats() {
        const text = this.editor.value;
        const words = this.countWords(text);
        const chars = text.length;
        
        this.wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
        this.charCount.textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
    }
    
    countWords(text) {
        return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    }
    
    // Save Status
    markSaved() {
        this.saveStatus.textContent = 'All changes saved';
        this.saveStatus.style.color = 'var(--text-tertiary)';
    }
    
    markUnsaved() {
        this.saveStatus.textContent = 'Unsaved changes';
        this.saveStatus.style.color = 'var(--accent-color)';
    }
    
    markSaving() {
        this.saveStatus.textContent = 'Saving...';
        this.saveStatus.style.color = 'var(--accent-color)';
    }
    
    // Auto-save
    scheduleAutoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveToLocalStorage();
        }, this.autoSaveDelay);
    }
    
    // Storage
    saveToLocalStorage() {
        this.markSaving();
        this.updateCurrentDocumentContent();
        localStorage.setItem('freestyleWriterDocuments', JSON.stringify(this.documents));
        setTimeout(() => this.markSaved(), 300);
    }
    
    loadFromLocalStorage() {
        const stored = localStorage.getItem('freestyleWriterDocuments');
        if (stored) {
            try {
                this.documents = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading documents:', e);
                this.documents = [];
            }
        }
        
        this.renderDocumentsList();
        this.loadSettings();
    }
    
    // File Operations
    saveToFile() {
        this.updateCurrentDocumentContent();
        const doc = this.documents.find(d => d.id === this.currentDocumentId);
        if (!doc) return;
        
        const filename = this.sanitizeFilename(doc.title) + '.txt';
        const content = doc.content;
        
        this.downloadFile(filename, content);
        alert(`Document saved as "${filename}".\n\nTo sync with iCloud Drive:\n1. Move the downloaded file to your iCloud Drive folder\n2. On macOS: ~/Library/Mobile Documents/com~apple~CloudDocs/\n3. The file will automatically sync across your devices`);
    }
    
    loadFromFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.md,.markdown';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const title = file.name.replace(/\.(txt|md|markdown)$/, '');
                
                const doc = {
                    id: Date.now(),
                    title: title,
                    content: content,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                
                this.documents.unshift(doc);
                this.loadDocument(doc.id);
                this.saveToLocalStorage();
                this.renderDocumentsList();
                this.closeMenu();
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    exportAs(format) {
        this.updateCurrentDocumentContent();
        const doc = this.documents.find(d => d.id === this.currentDocumentId);
        if (!doc) return;
        
        const filename = this.sanitizeFilename(doc.title) + '.' + format;
        let content = doc.content;
        
        // Add metadata for markdown
        if (format === 'md') {
            const date = new Date(doc.updatedAt).toLocaleDateString();
            content = `# ${doc.title}\n\n*Last updated: ${date}*\n\n${content}`;
        }
        
        this.downloadFile(filename, content);
    }
    
    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    sanitizeFilename(filename) {
        return filename
            .replace(/[^a-z0-9\s\-_]/gi, '')
            .replace(/\s+/g, '-')
            .substring(0, 100)
            || 'untitled';
    }
    
    // Dark Mode
    initDarkMode() {
        const savedTheme = localStorage.getItem('freestyleWriterTheme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (savedTheme === null) {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        }
    }
    
    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('freestyleWriterTheme', newTheme);
    }
    
    // Settings
    saveSettings() {
        const settings = {
            autoSave: this.autoSaveCheckbox.checked,
            focusMode: this.focusModeCheckbox.checked
        };
        localStorage.setItem('freestyleWriterSettings', JSON.stringify(settings));
    }
    
    loadSettings() {
        const stored = localStorage.getItem('freestyleWriterSettings');
        if (stored) {
            try {
                const settings = JSON.parse(stored);
                this.autoSaveCheckbox.checked = settings.autoSave !== false; // Default to true
                this.focusModeCheckbox.checked = settings.focusMode || false;
                
                if (this.focusModeCheckbox.checked) {
                    document.body.classList.add('focus-mode');
                }
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }
    
    // Menu
    openMenu() {
        this.menuSidebar.classList.add('active');
        this.overlay.classList.add('active');
        this.renderDocumentsList();
    }
    
    closeMenu() {
        this.menuSidebar.classList.remove('active');
        this.overlay.classList.remove('active');
    }
    
    // Utilities
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.freestyleWriter = new FreestyleWriter();
});
