# Freestyle Writer

A beautiful, distraction-free writing application built with vanilla HTML, CSS, and JavaScript. Perfect for creative writing, note-taking, brainstorming, or any kind of freeform text composition.

## Features

- **Clean, Modern Interface** - Dark theme optimized for long writing sessions
- **Real-time Statistics** - Track word count and character count as you type
- **Auto-save** - Your work is automatically saved to local storage
- **Download** - Export your text as a `.txt` file with timestamp
- **Copy to Clipboard** - Quickly copy all your text with one click
- **Keyboard Shortcuts** - Efficient keyboard-based workflow
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Distraction-Free** - Minimal UI that gets out of your way

## Getting Started

### Quick Start

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Open `index.html` in your web browser:
   ```bash
   open index.html
   ```
   Or simply double-click the `index.html` file.

That's it! No build process, no dependencies, no server required.

### Live Server (Optional)

For development, you can use a live server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

### Writing

- Click in the text area or press any key to start writing
- Your work is automatically saved to your browser's local storage
- Statistics (word and character count) update in real-time

### Buttons

- **Download** - Save your text as a file with a timestamped filename
- **Copy** - Copy all text to your clipboard
- **Clear** - Clear all text (with confirmation prompt)

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Download text as file
- `Ctrl/Cmd + K` - Clear editor (with confirmation)

## Technical Details

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (version 90+)
- Firefox (version 88+)
- Safari (version 14+)
- Opera (version 76+)

### Local Storage

The application uses the browser's `localStorage` API to persist your writing between sessions. Your data stays on your device and is never sent to any server.

### File Structure

```
freestyle-writer/
├── index.html      # Main HTML structure
├── styles.css      # Styling and theme
├── script.js       # Application logic
└── README.md       # Documentation
```

## Customization

### Changing the Theme

Edit `styles.css` and modify the CSS variables in the `:root` selector:

```css
:root {
    --bg-primary: #1e1e1e;      /* Main background */
    --bg-secondary: #2d2d2d;    /* Header background */
    --text-primary: #e0e0e0;    /* Main text color */
    --accent: #007acc;          /* Accent color */
    /* ... more variables ... */
}
```

### Changing Fonts

The editor uses Georgia (serif) for a classic writing feel. To change it, modify the `.editor` class in `styles.css`:

```css
.editor {
    font-family: 'Your Font Here', serif;
}
```

## Features in Detail

### Auto-save

Your work is saved automatically:
- On every keystroke (debounced)
- Every 30 seconds (automatic interval)
- When you close the browser tab

### Download Format

Downloaded files are named with the pattern:
```
freestyle_writer_YYYY-MM-DD_HH-MM-SS.txt
```

For example: `freestyle_writer_2026-02-01_14-30-45.txt`

## Privacy

- **No tracking** - Zero analytics or tracking scripts
- **No server** - Everything runs locally in your browser
- **No data collection** - Your writing stays on your device
- **Open source** - Full transparency of the code

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on the repository.

---

**Happy Writing! ✍️**
