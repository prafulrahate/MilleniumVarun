// script.js – handles font loading, glyph preview and conversion
// Mapping and conversion logic (extracted from VarunConverterV42)
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
    '।': '~', '॥': '..', '(': '(', ')': ')', '"': '’', "'": "'", ':': ':', ',': ',', ' ': ' ',
    '-': '-', '—': 'õ', '–': 'ö', '‘': '`', '’': "'", '“': '’', '”': '’',
    'ळ': 'U'
};

const exactMatches = {
    'वैश्य': 'JçÌµ³ç', 'ज्ञाती': '%ççlççÇ', 'मंडळ': 'cçb[U', 'मुलुंड': 'cçá}áb[',
    'ओङ्कार': 'Dççí¹çj', 'ईश्वर': 'F&éçj', 'नादात्मक': 'vççoçlcçJçÀ', 'नादात्‍मक': 'vççoçlcçJçÀ',
    'अभिव्यक्ति': 'DççÆYçJ³ççqJçwlç', 'उद्भव': 'GtJç', 'इब्रानी': 'Fyç´çvççÇ', 'सुमेरु': 'mçácçí©',
    'बलग्गु': 'yç}iiçá', 'बलगु': 'yç}içá', 'उल्लेख': 'Gu}íKç', 'विद्वान्': 'çÆJçÜçvçd',
    'विद्वान': 'çÆJçÜçvç', 'कुछ': 'JçáÀs', 'सम्पूर्ण': 'mçcHçÓCç&', 'वाङ्मय': 'Jçç*dcç³ç',
    'छन्दोबद्ध': 'svoçíyç×', 'प्रायः': 'Òçç³ç:', 'करें': 'JçÀjW', 'रुदन': '©ovç',
    'सर्वश्रेष्ठ': 'mçJç&Þçí÷', 'द्वारा': 'Üçjç', 'सुन्दर': 'mçávoj', 'समृद्ध': 'mçcç=×',
    'सुसम्पन्न': 'mçámçcHçVç', 'महत्वपूर्ण': 'cçnlJçHçÓCç&', 'मनुष्य': 'cçvçá<c³ç', 'हृदय': 'Ëo³ç',
    'आनंदित': 'DççvçbçÆolç', 'उत्कृष्ट': 'GlJç=Àä', 'औचित्यपूर्ण': 'DççÌçÆ®çl³çHçÓCç&', 'औचित्य': 'DççÌçÆ®çl³ç',
    'संगीत': 'mçbiççÇlç', 'शब्द': 'µçyo', 'सम्': 'mçcçd', 'सम्यक्': 'mçc³çJçdÀ',
    'लयबद्ध': '}³çyç×', 'अच्छा': 'Dç®sç', 'अभिप्राय': 'DççÆYçÒçç३ç', 'गान्धर्व': 'iççvOçJç&',
    'संस्कृत': 'mçbmJç=Àlç', 'विद्या': 'çÆJçÐçç', 'मिलन': 'çÆcç}vç', 'मौखिक': 'cççÌçÆKçJçÀ',
    'संगीत्मय': 'mçbiççÇlcç³ç', 'क्रियाओं': 'çÆ¬çÀ३ççDççíb', 'क्रिया': 'çÆ¬çÀ३çç', 'संक्षेप': 'mçb#çíHç',
    'प्रक्रिया': 'ÒççÆ¬çÀ३çç', 'संस्कृतियों': 'mçbmJç=ÀçÆlç³ççíb', 'अभिन्न': 'DççÆYçVç', 'कलात्मक': 'JçÀ}çlcçJçÀ',
    'व्यवस्थित': 'J³çJççqmLçlç', 'जिसमें': 'çÆpçmçcçW', 'शामिल': 'µçççÆcç}', 'टेक्सचर': 'ìíJçwmç®çj',
    'वॉल्यूम': 'Jçç@u³çÓcç', 'सौंदर्य': 'mççÌbo³ç&', 'उत्पन्न': 'GlHçVç', 'व्यक्त': 'J³çJçwlç',
    'गतिशीलता': 'iççÆlçµççÇ}lçç', 'सिर्फ': 'çÆmçHç&À', 'नहीं': 'vçnçR', 'बल्कि': 'yççquJçÀ',
    'नृत्य': 'vç=l³ç', 'भावनाओं': 'YççJçvççDççíb', 'आनंद': 'Dççvçbo', 'देती': 'oílççÇ',
    'हमारी': 'ncççjçÇ', 'जगाती': 'pçiççlççÇ', 'कला': 'JçÀ}ç', 'मिलाकर': 'çÆcç}çJçÀj',
    'बनाई': 'yçvççF&', 'गई': 'içF&', 'गायन': 'içç³çvç', 'वाद्य': 'JççÐç',
    'यंत्र': '³çb$ç', 'बजाने': 'yçpççvçí', 'और': 'DççÌj', 'हमें': 'ncçW',
    'गाना': 'iççvçç', 'एक': 'SJçÀ', 'का': 'JçÀç', 'की': 'JçÀçÇ',
    'के': 'JçíÀ', 'को': 'JçÀçí', 'है': 'nÌ', 'हैं': 'nQ',
    'में': 'cçW', 'मैं': 'cçQ', 'से': 'mçí', 'लिए': 'çÆ}S',
    'इसे': 'Fmçí', 'जहाँ': 'pçnçB', 'रूप': 'ªHç', 'संगम': 'mçbiçcç',
    'देखा': 'oíKçç', 'जाता': 'pççlçç', 'ये': '³çí', 'तीनों': 'lççÇvççíb',
    'कलाएँ': 'JçÀ}çSB', 'साथ': 'mççLç', 'कहलाती': 'JçÀn}çlççÇ',
    'विशिष्ट': 'çÆJççÆµçä', 'प्रस्फुटन': 'ÒçmHçáÀìvç', 'कंठ्य': 'JçbÀ"îç', 'सुरीले': 'mçájçÇ}í',
    'ढोलक': '{çí}JçÀ', 'औऱ': 'DççÌ]j', 'शृंगी': 'µç=biççÇ', 'ड्रम': '[^cç',
    'सभ्यता': 'mçY³çlçç', 'ख़ास': '™ççmç', 'सम्वेदनाओं': 'mçcJçíovççDççíb'
};

function convertToMillennium(unicodeText) {
    if (!unicodeText) return '';
    let text = unicodeText.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/"/g, '’');
    // Apply exact matches first (longest first)
    Object.keys(exactMatches).sort((a,b)=>b.length-a.length).forEach(word=>{
        text = text.replace(new RegExp(word, 'g'), exactMatches[word]);
    });
    // Reorder small i (Chhoti I)
    text = text.replace(/((?:[\u0915-\u0939]\u094d)*)([\u0915-\u0939])\u093f/g, "çÆ$1$2");
    // Ligature handling
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
    text = text.replace(/ठ\u094dय/g, "\\\"îç").replace(/स\u094dफ/g, "mHç");
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
        if (/[A-Za-z0-9çÆçÇçíçÌ|û}ê~\]®HBCª&WQS=ÊÒ$Ðäîõ@V¬#yo×`'öõ%ä"îç{Ë<cÜ÷©:*dui´^™½vcLiYmÞ¹étµ]/.test(ch) || ch === '’' || ch === '(' || ch === ')' || ch === ':' || ch === '~' || ch === "'" || ch === ',' || ch === '-') {
            result += ch;
            i++;
            continue;
        }
        // Handle clusters
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
    // Post‑processing fixes (same as original)
    result = result.replace(/JçÀí/g, "JçíÀ");
    result = result.replace(/JçÀÌ/g, "JçÌÀ");
    result = result.replace(/JçÀá/g, "JçáÀ");
    result = result.replace(/JçÀÓ/g, "JçÓÀ");
    result = result.replace(/JçÀç/g, "JçÀç");
    result = result.replace(/JçÀçí/g, "JçÀçí");
    return result;
}

// Font handling & UI
const fontInput = document.getElementById('fontFile');
const glyphPreview = document.getElementById('glyphPreview');
const convertBtn = document.getElementById('convertBtn');
const unicodeInput = document.getElementById('unicodeInput');
const outputBox = document.getElementById('outputBox');
let loadedFont = null;

fontInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const font = new FontFace('CustomVarun', arrayBuffer);
    await font.load();
    document.fonts.add(font);
    loadedFont = font;
    // Render glyph preview – first 128 Unicode code points of Devanagari (0x0900‑0x097F)
    glyphPreview.innerHTML = '';
    for (let cp = 0x0900; cp <= 0x097F; cp++) {
        const char = String.fromCharCode(cp);
        const span = document.createElement('span');
        span.className = 'glyph';
        span.style.fontFamily = 'CustomVarun';
        span.textContent = char;
        glyphPreview.appendChild(span);
    }
});

convertBtn.addEventListener('click', () => {
    const input = unicodeInput.value;
    const converted = convertToMillennium(input);
    outputBox.textContent = converted;
    // Apply custom font to output
    outputBox.style.fontFamily = loadedFont ? 'CustomVarun' : 'inherit';
});


document.getElementById('copyBtn').addEventListener('click', () => {
const content = document.getElementById('outputBox').innerText;
navigator.clipboard.writeText(content);
});
