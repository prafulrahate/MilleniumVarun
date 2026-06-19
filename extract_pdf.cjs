const fs = require('fs');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser(null, 1);
let output = '';

pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', pdfData => {
    const pages = pdfData.Pages || [];
    pages.forEach((page, pi) => {
        output += `\n=== PAGE ${pi + 1} ===\n`;
        const texts = page.Texts || [];
        texts.forEach(t => {
            const runs = t.R || [];
            runs.forEach(r => {
                let decoded;
                try {
                    decoded = decodeURIComponent(r.T);
                } catch(e) {
                    decoded = r.T; // use raw if decoding fails
                }
                output += decoded + ' ';
            });
        });
        output += '\n';
    });
    fs.writeFileSync('pdf_output.txt', output, 'utf8');
    console.log('Saved to pdf_output.txt, length:', output.length);
});

pdfParser.loadPDF('C:\\Users\\Swapnil\\Downloads\\Unicode to Millennium Varun.pdf');
