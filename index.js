"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
class Converter {
    constructor() {
        this.inCodeBlock = false;
    }
    convertToHtml(markup) {
        let html = '';
        let inList = false;
        markup.split('\n').forEach((line) => {
            if (line.startsWith('@')) {
                html += `<h1>${line.substring(2)}</h1>`;
            }
            else if (line.startsWith('**') && line.endsWith('**')) {
                html += `<strong>${line.substring(2, line.length - 2)}</strong>`;
            }
            else if (line.startsWith('^') && line.endsWith('^')) {
                html += `<em>${line.substring(1, line.length - 1)}</em>`;
            }
            else if (line.startsWith('\\') && line.endsWith('\\')) {
                html += `<code>${line.substring(1, line.length - 1)}</code>`;
            }
            else if (line.startsWith('\\\\\\') && line.endsWith('\\\\\\')) {
                if (this.inCodeBlock) {
                    html += '</pre>';
                    this.inCodeBlock = false;
                }
                else {
                    html += '<pre>';
                    this.inCodeBlock = true;
                }
            }
            else if (line.startsWith('~~') && line.endsWith('~~')) {
                const parts = line.split('~~');
                if (parts.length === 4) {
                    const [, text, link] = parts;
                    html += `<a href='${link}'>${text}</a>`;
                }
            }
            else if (line.startsWith('---')) {
                html += '<hr>';
            }
            else if (line.startsWith('>')) {
                if (!inList) {
                    html += '<ul>';
                    inList = true;
                }
                html += `<li>${line.substring(2)}</li>`;
            }
            else {
                if (inList) {
                    html += '</ul>';
                    inList = false;
                }
                html += `${line}<br>`;
            }
        });
        if (this.inCodeBlock) {
            html += '</pre>';
        }
        if (inList) {
            html += '</ul>';
        }
        return html;
    }
}
exports.Converter = Converter;
