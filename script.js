// script.js – Millennium Varun Font Converter (Comprehensive Fix)
// Unicode Devanagari → Varun Legacy Encoding

const mapping = {
    'अ': 'Dç', 'आ': 'Dçç', 'इ': 'F', 'ई': 'F&', 'उ': 'G', 'ऊ': 'G',
    'ए': 'S', 'ऐ': 'Sí', 'ओ': 'Dççí', 'औ': 'DççÌ', 'अं': 'vbo',
    'क': 'JçÀ', 'ख': 'Kç', 'ग': 'iç', 'घ': 'Iç', 'ङ': 'Ä',
    'च': '®ç', 'छ': 's', 'ज': 'pç', 'झ': 'Pç', 'ञ': '¥',
    'ट': 'ì', 'ठ': '"', 'ड': '[', 'ढ': '{', 'ण': 'Cç',
    'त': 'lç', 'थ': 'Lç', 'द': 'o', 'ध': 'Oç', 'न': 'vç',
    'प': 'Hç', 'फ': 'HçÀ', 'ब': 'yç', 'भ': 'Yç', 'म': 'cç',
    'य': '³ç', 'र': 'j', 'ल': '}', 'व': 'Jç', 'श': 'µç', 'ष': '<ç', 'स': 'mç', 'ह': 'n',
    'क्ष': '#ç', 'त्र': '$ç', 'ज्ञ': '%ç',
    'ा': 'ç', 'ि': 'çÆ', 'ी': 'çÇ', 'ु': 'á', 'ू': 'Ó', 'े': 'í', 'ै': 'Ì', 'ो': 'çí', 'ौ': 'çÌ',
    'ृ': '=À', 'ं': 'b', 'ः': ':', '्': 'w', '़': ']', 'ॉ': 'ç@', 'ऑ': 'Dçç@', 'ँ': 'B',
    '०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9',
    '।': '~', '॥': '..', '(': '(', ')': ')', '"': '\u2018', "'": "'", ':': ':', ',': ',', ' ': ' ',
    '-': '-', '—': 'õ', '–': 'ö', '\u2018': '`', '\u2019': "'", '\u201C': '\u2018', '\u201D': '\u2018',
    'ळ': 'U', '.': '.', '?': '?', '!': '!', ';': ';'
};

const exactMatches = {
    'वैश्य': 'JçÌµ³ç', 'ज्ञाती': '%ççlççÇ', 'मंडळ': 'cçb[U', 'मुलुंड': 'cçá}áb[',
    'ओङ्कार': 'Dççí¹çj', 'ईश्वर': 'F&éçj', 'नादात्मक': 'vççoçlcçJçÀ', 'नादात्‍मक': 'vççoçlcçJçÀ',
    'अभिव्यक्ति': 'DççÆYçJ³ççqJçwlç', 'उद्भव': 'GtJç', 'इब्रानी': 'Fyç´çvççÇ', 'सुमेरु': 'mçácçí©',
    'बलग्गु': 'yç}iiçá', 'बलगु': 'yç}içá', 'उल्लेख': 'Gu}íKç', 'विद्वान्': 'çÆJçÜçvçd',
    'विद्वान': 'çÆJçÜçvç', 'कुछ': 'JçáÀs', 'सम्पूर्ण': 'mçcHçÓCç&', 'वाङ्मय': 'Jçç*dcç³ç',
    'छन्दोबद्ध': 'svoçíyç×', 'प्रायः': 'Òçç³ç:', 'करें': 'JçÀjW', 'रुदन': '©ovç',
    'सर्वश्रेष्ठ': 'mçJç&Þçí÷', 'द्वारा': 'Üçjç', 'सुन्दर': 'mçávoj', 'समृद्ध': 'mçcç=×',
    'सुसम्पन्न': 'mçámçcHçVç', 'महत्वपूर्ण': 'cçnlJçHçÓCç&', 'मनुष्य': 'cçvçá<³ç', 'हृदय': 'Ëo³ç',
    'आनंदित': 'DççvçbçÆolç', 'उत्कृष्ट': 'GlJç=Àä', 'औचित्यपूर्ण': 'DççÌçÆ®çl³çHçÓCç&', 'औचित्य': 'DççÌçÆ®çl³ç',
    'संगीत': 'mçbiççÇlç', 'शब्द': 'µçyo', 'सम्': 'mçcçd', 'सम्यक्': 'mçc³çJçdÀ',
    'लयबद्ध': '}³çyç×', 'अच्छा': 'Dç®sç', 'अभिप्राय': 'DççÆYçÒçç³ç', 'गान्धर्व': 'iççvOçJç&',
    'संस्कृत': 'mçbmJç=Àlç', 'विद्या': 'çÆJçÐçç', 'मिलन': 'çÆcç}vç', 'मौखिक': 'cççÌçÆKçJçÀ',
    'संगीत्मय': 'mçbiççÇlcç³ç', 'क्रियाओं': 'çÆ¬çÀ³ççDççíb', 'क्रिया': 'çÆ¬çÀ³çç', 'संक्षेप': 'mçb#çíHç',
    'प्रक्रिया': 'ÒççÆ¬çÀ³çç', 'संस्कृतियों': 'mçbmJç=ÀçÆlç³ççíb', 'अभिन्न': 'DççÆYçVç', 'कलात्मक': 'JçÀ}çlcçJçÀ',
    'व्यवस्थित': 'J³çJççqmLçlç', 'जिसमें': 'çÆpçmçcçW', 'शामिल': 'µçççÆcç}', 'टेक्सचर': 'ìíJçwmç®çj',
    'व्यक्तिमत्त्वाचा': 'J³ççqJçwlçcçÊJçç®çç', 'व्यक्तिमत्त्व': 'J³ççqJçwlçcçÊJç', 'व्यक्ति': 'J³ççqJçwlç',
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
    'सभ्यता': 'mçY³çlçç', 'ख़ास': '™ççmç', 'सम्वेदनाओं': 'mçcJçíovççDççíb',
    'उद्घाटन': 'GodIççìvç'
};

function convertToMillennium(unicodeText) {
    if (!unicodeText) return '';
    let text = unicodeText.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/"/g, '\u2018');

    // === PHASE 1: Exact matches (longest first) ===
    Object.keys(exactMatches).sort((a,b)=>b.length-a.length).forEach(word=>{
        text = text.replace(new RegExp(word, 'g'), exactMatches[word]);
    });

    // === PHASE 2.0: Specific ligatures with Chhoti I (before reordering) ===
    text = text.replace(/\u0915\u094d\u0924\u093f/g, "çqJçwlç"); // क्ति → çqJçwlç

    // === PHASE 2: Chhoti I (ि) Reordering ===
    text = text.replace(/((?:[\u0915-\u0939]\u094d)*)([\u0915-\u0939])\u093f/g, "çÆ$1$2");

    // === PHASE 3: Reph (र्) handling — BEFORE ligatures ===
    // Captures full consonant cluster + optional vowel, puts & (reph) after
    text = text.replace(/\u0930\u094d(([\u0915-\u0939]\u094d)*[\u0915-\u0939])([\u093e-\u094c]?)/g,
        function(match, cluster, _inner, vowel) {
            return cluster + (vowel || '') + '&';
        });

    // === PHASE 3.5: Chhoti I + Reph ===
    // If Chhoti I (çÆ) and Reph (&) are on the same consonant, it becomes ç|
    text = text.replace(/çÆ((?:[\u0915-\u0939]\u094d)*[\u0915-\u0939])\&/g, "ç|$1");

    // === PHASE 4: ें (e + anusvara) → W ===
    text = text.replace(/\u0947\u0902/g, "W");

    // === PHASE 5a: Multi-consonant ligatures (3+ consonants) ===
    text = text.replace(/\u0937\u094d\u091f\u094d\u0930/g, "ä^");   // ष्ट्र → ä^
    text = text.replace(/\u0924\u094d\u0930\u094d\u092f/g, "$³ç");  // त्र्य → $³ç
    text = text.replace(/\u0915\u094d\u0937\u094d\u092e/g, "#cç");    // क्ष्म → #cç

    // === PHASE 5b: Half-form of ligatures (before full forms) ===
    text = text.replace(/\u0915\u094d\u0937\u094d/g, "#");   // क्ष् (half-ksha) → #
    text = text.replace(/\u0924\u094d\u0930\u094d/g, "$");   // त्र् (half-tra) → $
    text = text.replace(/\u0924\u094d\u0924\u094d/g, "Ê");   // त्त् (half-tta) → Ê
    text = text.replace(/\u091c\u094d\u091e\u094d/g, "%");   // ज्ञ् (half-gya) → %

    // === PHASE 5c: Two-consonant ligatures ===
    text = text.replace(/\u0936\u094d\u092f/g, "µ³ç");   // श्य → µ³ç
    text = text.replace(/\u091c\u094d\u091e/g, "%ç");     // ज्ञ → %ç (full form)
    text = text.replace(/\u0917\u094d\u0930/g, "ûç");     // ग्र → ûç
    text = text.replace(/\u0919\u094d\u0915/g, "¹");       // ङ्क → ¹
    text = text.replace(/\u0936\u094d\u0935/g, "éç");     // श्व → éç (FIXED: was é)
    text = text.replace(/\u0926\u094d\u092d/g, "t");       // द्भ → t
    // क्ति rule moved to Phase 2.0
    text = text.replace(/\u0936\u094d\u0930/g, "Þç");     // श्र → Þç
    text = text.replace(/\u0937\u094d\u0920/g, "÷");       // ष्ठ → ÷
    text = text.replace(/\u0937\u094d\u091f/g, "ä");       // ष्ट → ä
    text = text.replace(/\u0924\u094d\u0924/g, "Êç");     // त्त → Êç (NEW)
    text = text.replace(/\u0924\u094d\u0930/g, "$ç");      // त्र → $ç
    text = text.replace(/\u0936\u094d\u091a/g, "½ç");     // श्च → ½ç
    text = text.replace(/\u0915\u094d\u0930/g, "¬çÀ");    // क्र → ¬çÀ
    text = text.replace(/\u0926\u094d\u0935/g, "Ü");       // द्व → Ü
    text = text.replace(/\u0926\u094d\u0930/g, "ê");       // द्र → ê (NEW)
    text = text.replace(/\u092c\u094d\u0930/g, "yç´");    // ब्र → yç´
    text = text.replace(/\u0935\u094d\u0930/g, "¬ç");     // व्र → ¬ç (FIX for व्रुज्जी)
    text = text.replace(/\u0930\u0941/g, "©");              // रु → ©
    text = text.replace(/\u0930\u0942/g, "ª");              // रू → ª
    text = text.replace(/\u0917\u094d\u0917/g, "iiç");     // ग्ग → iiç
    text = text.replace(/\u0932\u094d\u0932/g, "u}");       // ल्ल → u}
    text = text.replace(/\u0920\u094d\u092f/g, '"îç');      // ठ्य → "îç
    text = text.replace(/\u0921\u094d\u092f/g, "[îç");     // ड्य → [îç (NEW)
    text = text.replace(/\u0938\u094d\u0935/g, "mJç");     // स्व → mJç
    text = text.replace(/\u0919\u094d/g, "*d");             // ङ् → *d
    text = text.replace(/\u0939\u094d\u092f/g, "¿ç");     // ह्य → ¿ç (NEW)
    text = text.replace(/\u0939\u094d\u092e/g, "ïç");     // ह्म → ïç (NEW)
    text = text.replace(/\u0926\u094d\u0927/g, "×");       // द्ध → ×
    text = text.replace(/\u091a\u094d\u091b/g, "®s");      // च्छ → ®s (FIXED: was ®sç)
    text = text.replace(/\u0928\u094d\u0927/g, "vOç");     // न्ध → vOç
    text = text.replace(/\u0928\u094d\u0928/g, "Vç");      // न्न → Vç (NEW)
    text = text.replace(/\u092e\u094d\u092f/g, "c³ç");     // म्य → c³ç
    text = text.replace(/\u0926\u094d\u092f/g, "Ðç");      // द्य → Ðç
    text = text.replace(/\u092c\u094d\u0926/g, "yo");       // ब्द → yo
    text = text.replace(/\u0927\u094d\u092f/g, "O³ç");     // ध्य → O³ç
    text = text.replace(/\u0915\u094d\u0937/g, "#ç");      // क्ष → #ç (full form)
    text = text.replace(/\u0919\u094d\u0917/g, "biç");     // ङ्ग → biç
    text = text.replace(/\u0921\u094d\u0930/g, "[^");       // ड्र → [^
    text = text.replace(/\u091f\u094d\u0930/g, "ì^");      // ट्र → ì^
    text = text.replace(/\u092d\u094d\u0930/g, "Yç´");      // भ्र → Yç´
    text = text.replace(/\u092d\u094d/g, "Y");              // भ् → Y (half-भ)
    text = text.replace(/\u0916\u093c/g, "™");              // ख़ → ™
    text = text.replace(/ख़/g, "™");
    text = text.replace(/\u0921\u093c/g, "›");              // ड़ → ›
    text = text.replace(/\u095c/g, "›");                    // ड़ → ›
    text = text.replace(/ड़/g, "›");
    text = text.replace(/ड़/g, "›");
    text = text.replace(/\u092a\u094d\u0930/g, "Òç");      // प्र → Òç
    text = text.replace(/\u0922\u093c/g, "{");              // ढ़ → {
    text = text.replace(/ढ़/g, "{");
    text = text.replace(/\u092e\u094d\u0930/g, "cç´");      // म्र → cç´

    // === PHASE 5d: Special vowel ligatures ===
    text = text.replace(/\u0926\u0943/g, "¢");   // दृ → ¢ (NEW)
    text = text.replace(/\u0939\u0943/g, "Ë");   // हृ → Ë

    // === PHASE 6: Generic sub-ra (्र after ligatures) ===
    text = text.replace(/\u094d\u0930/g, "^");

    // === PHASE 7: ृ → = (remaining, after दृ/हृ handled) ===
    text = text.replace(/\u0943/g, "=");

    // === PHASE 8: End-of-word halant → d ===
    text = text.replace(/\u094d(?=[\s\.,;:)\]\-]|$)/g, "d");

    // === PHASE 9: Half-ऱ (before full ऱ) ===
    text = text.replace(/\u0931\u094d/g, "N");   // ऱ् → N (NEW)
    text = text.replace(/\u0931/g, "]j");         // ऱ → ]j

    // === PHASE 10: Half-consonant forms ===
    text = text.replace(/\u0928\u094d/g, "v");    // न् → v
    text = text.replace(/\u0925\u094d/g, "L");    // थ् → L
    text = text.replace(/\u092e\u094d/g, "c");    // म् → c
    text = text.replace(/\u0917\u094d/g, "i");    // ग् → i
    text = text.replace(/\u0932\u094d/g, "u");    // ल् → u
    text = text.replace(/\u0938\u094d/g, "m");    // स् → m
    text = text.replace(/\u0915\u094d/g, "Jçw");  // क् → Jçw
    text = text.replace(/\u0926\u094d/g, "od");   // द् → od (visible halant, same glyph as full द)
    text = text.replace(/\u0937\u094d/g, "<");    // ष् → <
    text = text.replace(/\u0924\u094d/g, "l");    // त् → l
    text = text.replace(/\u0936\u094d/g, "µ");    // श् → µ
    text = text.replace(/\u0927\u094d/g, "O");    // ध् → O
    text = text.replace(/\u0923\u094d/g, "C");    // ण् → C
    text = text.replace(/\u091a\u094d/g, "®");    // च् → ®
    text = text.replace(/\u091c\u094d/g, "p");    // ज् → p
    text = text.replace(/\u091f\u094d/g, "ì");    // ट् → ì
    text = text.replace(/\u0916\u094d/g, "K");    // ख् → K
    text = text.replace(/\u092a\u094d/g, "H");    // प् → H
    text = text.replace(/\u092c\u094d/g, "y");    // ब् → y
    text = text.replace(/\u0939\u094d/g, "¼");    // ह् → ¼
    text = text.replace(/\u092f\u094d/g, "³");    // य् → ³
    text = text.replace(/\u0935\u094d/g, "J");    // व् → J
    text = text.replace(/\u0921\u094d/g, "[");    // ड् → [
    text = text.replace(/\u0922\u094d/g, "{");    // ढ् → {
    text = text.replace(/\u091d\u094d/g, "P");    // झ् → P
    text = text.replace(/\u0920\u094d/g, '"');     // ठ् → "
    text = text.replace(/\u0918\u094d/g, "I");    // घ् → I (FIXED: was D)
    text = text.replace(/\u092b\u094d/g, "HçÀw"); // फ् → HçÀw
    text = text.replace(/\u0933\u094d/g, "È");    // ळ् → È (FIXED: was U)
    text = text.replace(/\u091e\u094d/g, "¥");    // ञ् → ¥

    // === PHASE 11: Character-by-character mapping ===
    let result = '';
    let i = 0;
    while (i < text.length) {
        const ch = text[i];
        // Pass through already-converted characters
        if (/[A-Za-z0-9çÆÇíÌû}ê~\]®BCª&WQS=ÊÒ\$ÐäîõV¬#yo×`'öõ%"ç{Ë<cÜ÷©:*dui´\^™½vLYmÞ¹étµRNÓá¿ï¢È¼]/.test(ch)
            || ch === '\u2018' || ch === '(' || ch === ')' || ch === ':'
            || ch === '~' || ch === "'" || ch === ',' || ch === '-'
            || ch === '.' || ch === ';' || ch === '?' || ch === '!'
            || ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t'
            || ch === '|' || ch === 'H' || ch === 'P' || ch === 'I'
            || ch === 'K' || ch === 'J' || ch === 'O' || ch === 'b'
            || ch === 'p' || ch === 'l' || ch === 'i' || ch === 'v'
            || ch === 'u' || ch === 'm' || ch === 'c' || ch === 'n'
            || ch === 'j' || ch === 'U' || ch === 'F' || ch === 'G'
            || ch === '[' || ch === '^' || ch === 'w' || ch === 'µ') {
            result += ch;
            i++;
            continue;
        }
        // Handle remaining multi-char clusters
        const clusters = ['क्ष', 'त्र', 'ज्ञ'];
        let matched = false;
        for (const cl of clusters) {
            if (text.startsWith(cl, i)) {
                result += mapping[cl];
                i += cl.length;
                matched = true;
                break;
            }
        }
        if (matched) continue;
        // Single character mapping
        result += mapping[ch] || ch;
        i++;
    }

    // === PHASE 12: Post-processing ===
    // क (JçÀ) vowel reordering
    result = result.replace(/JçÀí/g, "JçíÀ");
    result = result.replace(/JçÀÌ/g, "JçÌÀ");
    result = result.replace(/JçÀá/g, "JçáÀ");
    result = result.replace(/JçÀÓ/g, "JçÓÀ");
    result = result.replace(/JçÀ=/g, "Jç=À");
    // फ (HçÀ) vowel reordering
    result = result.replace(/HçÀí/g, "HçíÀ");
    result = result.replace(/HçÀá/g, "HçáÀ");
    result = result.replace(/HçÀÓ/g, "HçÓÀ");
    result = result.replace(/HçÀ=/g, "Hç=À");
    // क्र (¬çÀ) vowel reordering
    result = result.replace(/¬çÀí/g, "¬çíÀ");
    result = result.replace(/¬çÀá/g, "¬çáÀ");
    // Reph + anusvara combination
    result = result.replace(/&b/g, "¥");

    return result;
}

// Font handling & UI
const convertBtn = document.getElementById('convertBtn');
const unicodeInput = document.getElementById('unicodeInput');
const outputBox = document.getElementById('outputBox');

if (convertBtn) {
    convertBtn.addEventListener('click', () => {
        const input = unicodeInput.value;
        const converted = convertToMillennium(input);
        outputBox.textContent = converted;
    });
}

// Copy Output functionality
const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', async () => {
    const textToCopy = outputBox.textContent;
    if (!textToCopy) return;

    try {
        await navigator.clipboard.writeText(textToCopy);
        showCopiedFeedback();
    } catch (err) {
        // Fallback for older browsers / non-HTTPS contexts
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            document.execCommand('copy');
            showCopiedFeedback();
        } catch (fallbackErr) {
            console.error('Copy failed:', fallbackErr);
        }
        document.body.removeChild(textarea);
    }
});

function showCopiedFeedback() {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.disabled = true;
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.disabled = false;
    }, 1500);
}

// New UI interactions
const pasteBtn = document.getElementById('pasteBtn');
const clearBtn = document.getElementById('clearBtn');
const charCount = document.getElementById('charCount');

if (pasteBtn) {
    pasteBtn.addEventListener('click', async () => {
        if (!navigator.clipboard || !navigator.clipboard.readText) {
            alert('Your browser restricts clipboard access on this connection. Please use Ctrl+V (or long-press) to paste directly into the box.');
            if (unicodeInput) unicodeInput.focus();
            return;
        }
        try {
            const text = await navigator.clipboard.readText();
            if (unicodeInput) {
                unicodeInput.value = text;
                updateCharCount();
            }
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
            alert('Clipboard access was denied by your browser. Please use Ctrl+V or long-press to paste.');
            if (unicodeInput) unicodeInput.focus();
        }
    });
}

if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        unicodeInput.value = '';
        outputBox.textContent = '';
        updateCharCount();
    });
}

if (unicodeInput && charCount) {
    unicodeInput.addEventListener('input', updateCharCount);
}

function updateCharCount() {
    if (unicodeInput && charCount) {
        charCount.textContent = `${unicodeInput.value.length} characters`;
    }
}