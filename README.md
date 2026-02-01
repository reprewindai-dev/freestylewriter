# Freestyle Writer

A beautiful, distraction-free writing application with iCloud Drive sync support. Write freely with a modern, minimalist interface that keeps you focused on your words.

## Features

✨ **Beautiful & Minimalist Design** - Clean interface that gets out of your way  
🌓 **Dark Mode** - Easy on the eyes, day or night  
💾 **Auto-Save** - Never lose your work with automatic saving  
📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile  
📂 **Multiple Documents** - Organize your writing in separate documents  
☁️ **iCloud Drive Sync** - Save and load files from iCloud Drive  
📊 **Live Stats** - Real-time word and character count  
🎯 **Focus Mode** - Minimal interface for distraction-free writing  
⌨️ **Keyboard Shortcuts** - Fast access to common actions  
📤 **Export Options** - Export as TXT or Markdown

## Quick Start

1. **Open the app**: Simply open `index.html` in your web browser
2. **Start writing**: Begin typing in the editor
3. **Your work is saved**: Auto-save keeps your documents in browser storage

## Using with iCloud Drive

### Saving to iCloud Drive

1. Click the **Menu** button in the top-right corner
2. Select **"Save to iCloud Drive"**
3. The file will be downloaded to your Downloads folder
4. Move the file to your iCloud Drive folder:
   - **macOS**: `~/Library/Mobile Documents/com~apple~CloudDocs/`
   - **Windows**: `C:\Users\[YourName]\iCloudDrive\`
5. Your file will automatically sync across all your devices

### Loading from iCloud Drive

1. Click the **Menu** button
2. Select **"Load from iCloud Drive"**
3. Browse to your iCloud Drive folder
4. Select the `.txt` or `.md` file you want to open
5. The document will be imported and added to your documents list

### Continuous Sync

For the best experience with iCloud Drive:

1. Create a dedicated folder in iCloud Drive for your writings
2. Save your documents from Freestyle Writer regularly
3. Replace files in iCloud Drive to keep them synced
4. Load updated files back into the app when needed

## Features Guide

### Document Management

- **New Document**: Click the `+` button or press `Ctrl/Cmd + N`
- **Switch Documents**: Open the menu and click on any document in the list
- **Rename Document**: Edit the document title at the top
- **Clear Document**: Open menu → "Clear Document"

### Saving & Loading

- **Auto-Save**: Enabled by default, saves to browser storage every 2 seconds
- **Manual Save**: Press `Ctrl/Cmd + S` or click "Save to iCloud Drive"
- **Load File**: Click "Load from iCloud Drive" and select a file
- **Export**: Choose "Export as TXT" or "Export as Markdown"

### Interface

- **Dark Mode**: Click the moon icon to toggle dark/light theme
- **Focus Mode**: Enable in Settings to hide the header for distraction-free writing
- **Word Count**: Live stats shown in the header
- **Menu**: Access all features from the sliding menu panel

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save document
- `Ctrl/Cmd + N` - Create new document
- `Esc` - Close menu

## Browser Compatibility

Freestyle Writer works in all modern browsers:

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Data Storage

- Documents are stored in your browser's localStorage
- Data persists across sessions
- No server or cloud service required (privacy-focused)
- Export regularly to iCloud Drive for backup and sync

## Tips for Best Experience

1. **Regular Backups**: Export important documents to iCloud Drive regularly
2. **Multiple Devices**: Use iCloud Drive sync to work across devices
3. **Focus Mode**: Enable for distraction-free writing sessions
4. **Dark Mode**: Easier on eyes during long writing sessions
5. **Organize**: Use descriptive document titles for easy navigation

## Technical Details

- **Pure JavaScript** - No frameworks, fast and lightweight
- **Responsive Design** - Mobile-first approach
- **localStorage API** - Browser-based storage
- **File System Access** - Standard download/upload for file operations

## Privacy

- All data stays on your device
- No analytics or tracking
- No server communication (except font loading)
- You own your data completely

## Troubleshooting

**Documents not saving?**
- Check if localStorage is enabled in your browser
- Ensure you have sufficient storage space

**Can't load files?**
- Make sure files are in `.txt` or `.md` format
- Check file encoding (should be UTF-8)

**Dark mode not working?**
- Clear browser cache and reload
- Check if browser supports CSS custom properties

## License

MIT License - Feel free to use and modify for personal or commercial projects.

## Credits

Built with ❤️ for writers who love simplicity and focus.

---

**Start writing today!** Open `index.html` and let your creativity flow.
