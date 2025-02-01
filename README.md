# Nmap Formatter Plugin for Obsidian

A simple Obsidian plugin that formats selected Nmap scan output for better readability and presentation.

## Features

- **Format selected Nmap output**: Converts raw Nmap scan results into a structured and readable format.
- **Automatic detection of Nmap code blocks**: Works seamlessly with Obsidian's markdown formatting.
- **Color-coded port states**: Highlights `open`, `closed`, and `filtered` ports with different colors.
- **Preserves additional scan details**: Maintains structured output for easy analysis.

## Installation

### Manual Installation
1. Download the latest release from the [Releases](https://github.com/your-repo/nmap-formatter/releases) section.
2. Extract the files and place them in your Obsidian `plugins` folder:
   - Windows: `%APPDATA%\obsidian\plugins\nmap-formatter`
   - macOS/Linux: `~/.config/obsidian/plugins/nmap-formatter`
3. Restart Obsidian and enable the plugin in **Settings > Community Plugins**.


## Usage

1. **Select the Nmap output** within an Obsidian note.
2. Press `Ctrl+P` (or `Cmd+P` on macOS) to open the **Command Palette**.
3. Search for `Format Selected Nmap Output` and execute the command.
4. The output will be formatted with:
   - Proper indentation for better readability.
   - Color-coded status labels (`open`, `closed`, `filtered`).
   - Inline code formatting for additional scan details.

## Example

### Before Formatting:
```
nmap scan report for example.com
22/tcp open  ssh
80/tcp open  http
|_http-title: Example Domain
443/tcp closed https
```

### After Formatting:
- **22/tcp** <span style="color:green">open</span>
- **80/tcp** <span style="color:green">open</span>
    `_http-title: Example Domain_`
- **443/tcp** <span style="color:red">closed</span>

## Development

### Building from Source
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/nmap-formatter.git
   cd nmap-formatter
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the plugin:
   ```sh
   npm run build
   ```
4. Copy the `main.js`, `manifest.json`, and `styles.css` (if applicable) into your Obsidian plugins folder.

## Contributing
Pull requests are welcome! If you have suggestions, feel free to open an issue.


