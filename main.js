"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class NmapFormatterPlugin extends obsidian_1.Plugin {
    async onload() {
        console.log("Nmap Formatter Plugin loaded.");
        // Register the command in the command palette
        this.addCommand({
            id: "format-selected-nmap",
            name: "Format Selected Nmap Output",
            editorCallback: (editor) => {
                const selection = editor.getSelection();
                if (!selection || selection.trim() === "") {
                    new obsidian_1.Notice("No text selected to format.");
                    return;
                }
                // Check if the selection starts and ends with code block markers
                let formattedText = selection;
                const isCodeBlock = formattedText.startsWith("```nmap") && formattedText.endsWith("```");
                if (isCodeBlock) {
                    // Remove code block markers
                    formattedText = formattedText
                        .replace(/^```nmap\s*/, "") // Remove the opening code block marker
                        .replace(/```$/, ""); // Remove the closing code block marker
                }
                // Format the selected text
                formattedText = this.formatNmapOutput(formattedText);
                // Replace the selection with the formatted text
                editor.replaceSelection(formattedText);
            },
        });
    }
    onunload() {
        console.log("Nmap Formatter Plugin unloaded.");
    }
    formatNmapOutput(rawOutput) {
        // Split the raw Nmap output into lines
        const lines = rawOutput.split("\n");
        const formattedLines = [];
        let isNmapOutput = false;
        for (const line of lines) {
            if (line.match(/^\d+\/tcp\s+(open|closed|filtered)/)) {
                // Match the port line and format with color for state
                const formattedLine = line.replace(/(\d+\/tcp\s+)(\w+)/, (_, port, state) => `- **${port}<span style="color:${this.getStateColor(state)}">${state}</span>**`);
                isNmapOutput = true;
                formattedLines.push(formattedLine);
            }
            else if (line.startsWith("|")) {
                // Format additional information
                formattedLines.push(`    \`${line.slice(1).trim()}\``);
            }
            else if (line.trim() === "") {
                // Preserve empty lines
                formattedLines.push("");
            }
            else if (isNmapOutput) {
                // General details under the current port
                formattedLines.push(`      ${line.trim()}`);
            }
            else {
                // Non-Nmap lines remain unchanged
                formattedLines.push(line);
            }
        }
        return formattedLines.join("\n");
    }
    getStateColor(state) {
        // Return a color based on the state
        switch (state.toLowerCase()) {
            case "open":
                return "green";
            case "closed":
                return "red";
            case "filtered":
                return "orange";
            default:
                return "gray";
        }
    }
}
exports.default = NmapFormatterPlugin;
