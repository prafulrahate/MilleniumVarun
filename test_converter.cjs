// test_converter.cjs - Test the conversion logic against known-good outputs
// We replicate the conversion function here for testing

const mapping = {
    'अ': 'Dç', 'आ': 'Dçç', 'इ': 'F', 'ई': 'F&', 'उ': 'G', 'ऊ': 'G',
    'ए': 'S', 'ऐ': 'S', 'ओ': 'Dççí', 'औ': 'DççÌ', 'अं': 'vbo',
    'क': 'JçÀ', 'ख': 'Kç', 'ग': 'iç', 'घ': 'Dç', 'ङ': 'Ä',
    'च': '®ç', 'छ': 's', 'ज': 'pç', 'झ': 'Pç', 'ञ': '¥',
    'ट': 'ì', 'ठ': '"', 'ड': '[', 'ढ': '{', 'ण': 'Cç',
    'त': 'lç', 'थ': 'Lç', 'द': 'o', 'ध': 'Oç', 'न': 'vç',
    'प': 'Hç', 'फ': 'HçÀ', 'ब': 'yç', 'भ': 'Yç', 'म': 'cç',
    'य': '³ç', 'र': 'j', 'ल': '}', 'व': 'Jç', 'श': 'µç', 'ष': '<ç', 'स': 'mç', 'ह': 'n',
    'क्ष': '#ç', 'त्र': '$ç', 'ज्ञ': 'pç¥',
    'ा': 'ç', 'ि': 'çÆ', 'ी': 'çÇ', 'ु': 'á', 'ू': 'Ó', 'े': 'í', 'ै': 'Ì', 'ो': 'çí', 'ौ': 'çÌ',
    'ृ': '=À', 'ं': 'b', 'ः': ':', '्': 'w', '़': ']', 'ॉ': '@', 'ऑ': 'Dçç@', 'ँ': 'B',
    '०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9',
    '।': '~', '॥': '..', '(': '(', ')': ')', '"': '\u2018', "'": "'", ':': ':', ',': ',', ' ': ' ',
    '-': '-', '—': 'õ', '–': 'ö', '\u2018': '`', '\u2019': "'", '\u201C': '\u2018', '\u201D': '\u2018',
    'ळ': 'U'
};

function convertToMillennium(unicodeText) {
    if (!unicodeText) return '';
    let text = unicodeText.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/"/g, '\u2018');

    // 2. Chhoti I Reordering
    text = text.replace(/((?:[\u0915-\u0939]\u094d)*)([u0915-\u0939])\u093f/g, "çÆ$1$2");

    // 3. Ligature Handling
    text = text.replace(/श\u094dय/g, "µ³ç");
    text = text.replace(/ज्ञ\u093e/g, "%çç");
    text = text.replace(/ज्ञ/g, "%");
    text = text.replace(/ग\u094dर/g, "ûç");
    text = text.replace(/ङ\u094dक/g, "¹").replace(/श\u094dव/g, "é");
    text = text.replace(/द\u094dभ/g, "t").replace(/क\u094dत\u093f/g, "çqJçwlç");
    text = text.replace(/श\u094dर/g, "Þç").replace(/ष\u094dठ/g, "÷");
    text = text.replace(/ष\u094dट/g, "ä").replace(/त\u094dर/g, "$ç");
    text = text.replace(/श\u094dच/g, "½ç").replace(/क\u094dर/g, "¬çÀ");
    text = text.replace(/द\u094dव/g, "Ü").replace(/ब\u094dर/g, "yç´");
    text = text.replace(/र\u0941/g, "©").replace(/र\u0942/g, "ª");
    text = text.replace(/ग\u094dग/g, "iiç").replace(/ल\u094dल/g, "u}");
    text = text.replace(/ठ\u094dय/g, "\"îç").replace(/स\u094dफ/g, "mHç");
    text = text.replace(/स\u094dव/g, "mJç").replace(/ङ\u094d/g, "*d");
    text = text.replace(/\u0947\u0902/g, "W").replace(/रW/g, "jW");
    text = text.replace(/ह\u0943/g, "Ë").replace(/द्ध/g, "×");
    text = text.replace(/च्छ/g, "®sç").replace(/न्ध/g, "vOç");
    text = text.replace(/म्य/g, "c³ç").replace(/द्य/g, "Ðç");
    text = text.replace(/ब\u094dद/g, "yo").replace(/ज\u094dञ/g, "%");
    text = text.replace(/ध\u094dय/g, "O³ç").replace(/क्ष/g, "#ç");
    text = text.replace(/क\u094dष/g, "#").replace(/ङ\u094dग/g, "biç");
    text = text.replace(/ऱ/g, "]j").replace(/ड\u094dर/g, "[^");
    text = text.replace(/ट\u094dर/g, "ì^").replace(/भ\u094d/g, "Y");
    text = text.replace(/ख़/g, "™").replace(/\u0916\u093c/g, "™");
    text = text.replace(/प\u094dर/g, "Òç").replace(/ढ\u093c/g, "{");
    text = text.replace(/ढ़/g, "{");
    text = text.replace(/\u0943/g, "=");
    text = text.replace(/\u094d(?=[\s\.,;:)\]\-]|$)/g, "d");
    text = text.replace(/न\u094d/g, "v").replace(/थ\u094d/g, "L");
    text = text.replace(/म\u094d/g, "c").replace(/ग\u094d/g, "i");
    text = text.replace(/ल\u094d/g, "u").replace(/स\u094d/g, "m");
    text = text.replace(/क\u094d/g, "Jçw").replace(/द\u094d/g, "o");
    text = text.replace(/ष\u094d/g, "<").replace(/त\u094d/g, "l");
    text = text.replace(/श\u094d/g, "µ");
    text = text.replace(/ध\u094d/g, "O").replace(/ण\u094d/g, "C");
    text = text.replace(/च\u094d/g, "®").replace(/ज\u094d/g, "p");
    text = text.replace(/ट\u094d/g, "ì").replace(/ख\u094d/g, "K");
    text = text.replace(/प\u094d/g, "H").replace(/ब\u094d/g, "y");
    text = text.replace(/ह\u094d/g, "n").replace(/य\u094d/g, "³");
    text = text.replace(/व\u094d/g, "J").replace(/ड\u094d/g, "[");
    text = text.replace(/ढ\u094d/g, "{").replace(/झ\u094d/g, "P");
    text = text.replace(/ठ\u094d/g, '"').replace(/घ\u094d/g, "D");
    text = text.replace(/फ\u094d/g, "HçÀw").replace(/ळ\u094d/g, "U");
    text = text.replace(/ञ\u094d/g, "¥").replace(/ङ\u094d/g, "Ä");
    text = text.replace(/\u0930\u094d(\u092f)/g, "³ç&");
    text = text.replace(/\u0930\u094d([\u0915-\u0939])([\u093e-\u094c]?)/g, "$1$2&");

    // Build output
    let result = '';
    let i = 0;
    while (i < text.length) {
        const ch = text[i];
        if (/[A-Za-z0-9çÆçÇçíçÌ|û}ê~\]®HBCª&WQS=ÊÒ$ÐäîõV¬#yo×`'öõ%ä"îç{Ë<cÜ÷©:*dui´^™½vcLiYmÞ¹étµ]/.test(ch) || ch === '\u2018' || ch === '(' || ch === ')' || ch === ':' || ch === '~' || ch === "'" || ch === ',' || ch === '-') {
            result += ch;
            i++;
            continue;
        }
        const clusters = ['क्ष', 'त्र', 'ज्ञ'];
        let matched = false;
        for (const c of clusters) {
            if (text.startsWith(c, i)) {
                result += mapping[c];
                i += c.length;
                matched = true;
                break;
            }
        }
        if (matched) continue;
        result += mapping[ch] || ch;
        i++;
    }
    result = result.replace(/JçÀí/g, "JçíÀ");
    result = result.replace(/JçÀÌ/g, "JçÌÀ");
    result = result.replace(/JçÀá/g, "JçáÀ");
    result = result.replace(/JçÀÓ/g, "JçÓÀ");
    result = result.replace(/JçÀç/g, "JçÀç");
    result = result.replace(/JçÀçí/g, "JçÀçí");
    return result;
}

// Test cases
const tests = [
    // Set 1 - Basic words
    ['मराठी', 'cçjç"çÇ'],
    ['महाराष्ट्र', 'cçnçjçä^'],
    ['भाषा', 'Yçç<çç'],
    ['शिक्षण', 'çÆµç#çCç'],
    ['विद्यार्थी', 'çÆJçÐççL³çça'],  // Note: the 'a' might be wrong, let me check
    ['शाळा', 'µççUç'],
    ['महाविद्यालय', 'cçnççÆJçÐçç}³ç'],
    ['परीक्षा', 'HçjçÇ#çç'],
    ['प्रश्न', 'Òçµvç'],
    ['उत्तर', 'GÊçj'],
    ['पुस्तक', 'Hçámlç\u0056çÀ'],  // Hçámlç + JçÀ
    ['लेखन', '}íKçvç'],
    ['वाचन', 'Jçç®çvç'],
    ['ज्ञान', '%ççvç'],
    ['विज्ञान', 'çÆJç%ççvç'],
    ['संशोधन', 'mçbµççíOçvç'],
    ['अभ्यास', 'DçY³ççmç'],
    ['कार्यक्रम', 'JçÀç³ç&¬çÀcç'],
    ['व्यवस्था', 'J³çJçmLçç'],
    ['प्रकाश', 'ÒçJçÀçµç'],
    
    // Set 2 - Complex conjuncts
    ['कृष्ण', 'JçÀ=À<Cç'],
    ['वृक्ष', 'Jç=#ç'],
    ['संस्कृती', 'mçbmJç=ÀlççÇ'],
    ['श्रद्धा', 'Þç×ç'],
    ['क्षेत्र', '#çí$ç'],
    ['क्षमता', '#çcçlçç'],
    ['लक्ष्मी', '}#cççÇ'],
    ['दृष्टी', '¢äçÇ'],
    ['दृष्टिकोन', '¢çÆäJçÀçívç'],
    ['सृष्टी', 'mç=äçÇ'],
    ['प्रज्ञा', 'Òç%çç'],
    ['ज्ञानी', '%ççvççÇ'],
    ['ज्ञानेश्वर', '%ççvçíéçj'],
    ['त्रिकोण', 'çÆ$çJçÀçíCç'],
    ['त्रास', '$ççmç'],
    ['त्र्यंबक', '$³çbyçJçÀ'],
    ['स्वतंत्र', 'mJçlçb$ç'],
    ['स्वभाव', 'mJçYççJç'],
    ['स्मरण', 'mcçjCç'],
    ['स्मृती', 'mcç=lççÇ'],

    // Set 4 - Literature
    ['साहित्य', 'mçççÆnl³ç'],
    ['कविता', 'JçÀçÆJçlçç'],
    ['लेखक', '}íKçJçÀ'],
    ['वाचक', 'Jçç®çJçÀ'],
    ['कथासंग्रह', 'JçÀLççmçbûçn'],
    ['नाटक', 'vççìJçÀ'],
    ['अभिनय', 'DççÆYçvç³ç'],
    ['संवाद', 'mçbJçço'],
    ['भावना', 'YççJçvçç'],
    ['कल्पना', 'JçÀuHçvçç'],
    ['विचार', 'çÆJç®ççj'],
    ['अनुभव', 'DçvçáYçJç'],
    ['आत्मचरित्र', 'Dççlcç®ççÆj$ç'],
    ['चरित्र', '®ççÆj$ç'],
    ['ग्रंथ', 'ûçbLç'],
    ['संस्करण', 'mçbmJçÀjCç'],
    ['भाषांतर', 'Yçç<ççblçj'],
    ['प्रकाशन', 'ÒçJçÀçµçvç'],
    ['संपादन', 'mçbHççovç'],
    ['निबंध', 'çÆvçyçbOç'],
];

// Run tests
let passed = 0;
let failed = 0;
const failures = [];

for (const [input, expected] of tests) {
    const actual = convertToMillennium(input);
    if (actual === expected) {
        passed++;
    } else {
        failed++;
        failures.push({ input, expected, actual });
    }
}

console.log(`\nTest Results: ${passed} passed, ${failed} failed out of ${tests.length} total\n`);

if (failures.length > 0) {
    console.log('FAILURES:');
    for (const f of failures) {
        console.log(`  Input: ${f.input}`);
        console.log(`  Expected: ${f.expected}`);
        console.log(`  Actual:   ${f.actual}`);
        // Show char-by-char diff
        let diff = '  Diff:     ';
        const maxLen = Math.max(f.expected.length, f.actual.length);
        for (let i = 0; i < maxLen; i++) {
            if (f.expected[i] !== f.actual[i]) {
                diff += `[pos ${i}: exp='${f.expected[i] || 'EOF'}' (${f.expected.charCodeAt(i) || 'N/A'}) got='${f.actual[i] || 'EOF'}' (${f.actual.charCodeAt(i) || 'N/A'})]  `;
            }
        }
        console.log(diff);
        console.log('');
    }
}
