<div align="center">

  <!-- TODO: Add extension icon file to project root or icons/ folder -->
  <img src="src/icons/icon-96.png" alt="Claude RTL Responder Logo" width="96"/>

  <h1>Claude RTL Responder</h1>
  <h3>
    <span>إضافة ذكية لدعم اللغة العربية في Claude.ai</span>
    <br/>
    <em>Smart Arabic RTL Support for Claude.ai</em>
  </h3>

  <br/>

  <img src="https://img.shields.io/badge/VERSION-v0.1.0-2563eb?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/LICENSE-MIT-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/FIREFOX-109+-ff7139?style=for-the-badge&logo=firefox&logoColor=white"/>
  <img src="https://img.shields.io/badge/CHROME-MV3-4285f4?style=for-the-badge&logo=googlechrome&logoColor=white"/>
  <img src="https://img.shields.io/badge/MANIFEST-MV3-purple?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/JAVASCRIPT-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/STATUS-Beta-orange?style=for-the-badge"/>

  <br/><br/>

  <!-- Download Buttons -->
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/moner-dev/Claude-RTL-Responder/releases/latest/download/claude-rtl-responder-firefox-v0.1.0.zip">
          <img src="https://img.shields.io/badge/Download_for_Firefox-2563eb?style=for-the-badge&logo=firefox&logoColor=white" alt="Download for Firefox"/>
        </a>
        <br/>
        <img src="https://img.shields.io/github/downloads/moner-dev/Claude-RTL-Responder/latest/claude-rtl-responder-firefox-v0.1.0.zip/total?style=flat-square&label=downloads&color=gray" alt="Firefox Downloads"/>
      </td>
      <td width="20"></td>
      <td align="center">
        <a href="https://github.com/moner-dev/Claude-RTL-Responder/releases/latest/download/claude-rtl-responder-chrome-v0.1.0.zip">
          <img src="https://img.shields.io/badge/Download_for_Chrome-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Download for Chrome"/>
        </a>
        <br/>
        <img src="https://img.shields.io/github/downloads/moner-dev/Claude-RTL-Responder/latest/claude-rtl-responder-chrome-v0.1.0.zip/total?style=flat-square&label=downloads&color=gray" alt="Chrome Downloads"/>
      </td>
    </tr>
  </table>

  <br/>

  <a href="#-features--المميزات">Features</a> &nbsp;•&nbsp;
  <a href="#-screenshots--لقطات-الشاشة">Screenshots</a> &nbsp;•&nbsp;
  <a href="#-installation--التثبيت">Installation</a> &nbsp;•&nbsp;
  <a href="#-usage--طريقة-الاستخدام">Usage</a> &nbsp;•&nbsp;
  <a href="#-developer--المطور">Developer</a>

</div>

---

## 🎬 Demo Video / فيديو توضيحي

<div align="center">

<!-- TODO: Replace the thumbnail URL with https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg and the video link with the actual YouTube URL once uploaded -->

[![Watch Demo](https://img.shields.io/badge/🎬_Watch_Demo-Coming_Soon-2563eb?style=for-the-badge)](https://youtube.com)

> 🎥 *فيديو توضيحي شامل قريباً — يعرض كيفية استخدام الإضافة لتحسين تجربة Claude.ai بالعربية*
>
> *Full demo video coming soon — showcasing how to use the extension to enhance the Arabic Claude.ai experience*

</div>

---

## 📖 Introduction / المقدمة

<div dir="rtl" align="right">

**Claude RTL Responder** إضافة متصفح متكاملة (Firefox و Chrome) تُحسِّن تجربة استخدام Claude.ai للمستخدمين الناطقين بالعربية. تكتشف الأداة النصوص العربية تلقائياً وتُطبِّق اتجاه RTL الصحيح، مع الحفاظ على اتجاه LTR لكتل الكود والمحتوى التقني والمصطلحات الإنجليزية داخل السياق العربي.

تعتمد الإضافة على خوارزمية Unicode ثنائية الاتجاه المدمجة في المتصفح مع معالجة ذكية للمحتوى المختلط، وتوفر تخصيصاً كاملاً لحجم الخط، وتباعد الأسطر، والمؤشرات البصرية عبر صفحة إعدادات مخصصة.

</div>

<br/>

**Claude RTL Responder** is a comprehensive browser extension (Firefox & Chrome) that enhances the Claude.ai experience for Arabic-speaking users. It automatically detects Arabic text and applies the correct RTL direction, while preserving LTR for code blocks, technical content, and English terms within Arabic contexts.

Built on the browser's native Unicode Bidirectional Algorithm with intelligent mixed-content handling, the extension offers full customization of font size, line spacing, and visual indicators through a dedicated settings page.

---

## 📑 Table of Contents / جدول المحتويات

<div dir="rtl" align="right">

| القسم | الرابط |
|:------|:-------|
| المميزات | [Features](#-features--المميزات) |
| لقطات الشاشة | [Screenshots](#-screenshots--لقطات-الشاشة) |
| التثبيت | [Installation](#-installation--التثبيت) |
| طريقة الاستخدام | [Usage](#-usage--طريقة-الاستخدام) |
| التفاصيل التقنية | [Technical Details](#-technical-details--التفاصيل-التقنية) |
| هيكل المشروع | [Project Structure](#-project-structure--هيكل-المشروع) |
| الخصوصية | [Privacy](#-privacy--الخصوصية) |
| التوافق | [Compatibility](#-compatibility--التوافق) |
| المساهمة | [Contributing](#-contributing--المساهمة) |
| سجل التغييرات | [Changelog](#-changelog--سجل-التغييرات) |
| الترخيص | [License](#-license--الترخيص) |
| المطور | [Developer](#-developer--المطور) |

</div>

---

## ✨ Features / المميزات

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🔄 Automatic RTL Detection</h3>
      <h4 dir="rtl">كشف RTL تلقائي</h4>
      <p>Automatically detects Arabic text using Unicode BiDi algorithm and first-strong character analysis. No manual intervention needed.</p>
      <p dir="rtl">يكتشف النصوص العربية تلقائياً باستخدام خوارزمية Unicode ثنائية الاتجاه وتحليل الحرف الأول القوي.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🔀 Mixed-Content Handling</h3>
      <h4 dir="rtl">معالجة المحتوى المختلط</h4>
      <p>Intelligently handles Arabic text with embedded English terms, code snippets, and technical content.</p>
      <p dir="rtl">يتعامل بذكاء مع النصوص العربية المتضمنة لمصطلحات إنجليزية ومقتطفات برمجية.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>💻 Code Block Preservation</h3>
      <h4 dir="rtl">الحفاظ على كتل الكود LTR</h4>
      <p>Code blocks, inline code, and technical content always remain left-to-right for proper readability.</p>
      <p dir="rtl">تبقى كتل الكود والمحتوى التقني بالاتجاه الأيسر-لليمين دائماً للقراءة السليمة.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🔤 Font Size Customization</h3>
      <h4 dir="rtl">تخصيص حجم الخط</h4>
      <p>Three font size options: Small, Medium, Large. Changes apply instantly to Claude.ai responses.</p>
      <p dir="rtl">ثلاثة خيارات لحجم الخط: صغير، متوسط، كبير. التغييرات تُطبَّق فوراً.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📏 Line Spacing Customization</h3>
      <h4 dir="rtl">تخصيص تباعد الأسطر</h4>
      <p>Three spacing options: Compact, Normal, Relaxed. Improves reading comfort for longer responses.</p>
      <p dir="rtl">ثلاثة خيارات للتباعد: مُدمج، عادي، مريح. يُحسِّن راحة القراءة للردود الطويلة.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🎯 Optional RTL Indicator</h3>
      <h4 dir="rtl">مؤشر RTL اختياري</h4>
      <p>Visual dot indicator on RTL-applied elements with customizable color picker.</p>
      <p dir="rtl">مؤشر نقطة بصري على العناصر المُطبَّق عليها RTL مع منتقي ألوان.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>⌨️ Keyboard Shortcuts</h3>
      <h4 dir="rtl">اختصارات لوحة المفاتيح</h4>
      <p><kbd>Alt</kbd>+<kbd>G</kbd> toggles Arabic/English mode. <kbd>Alt</kbd>+<kbd>O</kbd> opens the popup.</p>
      <p dir="rtl"><kbd>Alt</kbd>+<kbd>G</kbd> لتبديل الوضع. <kbd>Alt</kbd>+<kbd>O</kbd> لفتح النافذة.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🌙 Dark Mode Support</h3>
      <h4 dir="rtl">دعم الوضع الداكن</h4>
      <p>Full dark mode support across popup and options page, following system preferences.</p>
      <p dir="rtl">دعم كامل للوضع الداكن في النافذة وصفحة الإعدادات حسب تفضيلات النظام.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🌐 Bilingual UI</h3>
      <h4 dir="rtl">واجهة ثنائية اللغة</h4>
      <p>Complete Arabic and English interface. Switch languages instantly in the options page.</p>
      <p dir="rtl">واجهة كاملة بالعربية والإنجليزية. تبديل فوري للغة في صفحة الإعدادات.</p>
    </td>
    <td width="50%" valign="top">
      <h3>💾 Persistent Settings</h3>
      <h4 dir="rtl">إعدادات محفوظة</h4>
      <p>All preferences saved locally and persist across browser sessions.</p>
      <p dir="rtl">جميع التفضيلات محفوظة محلياً وتستمر عبر جلسات المتصفح.</p>
    </td>
  </tr>
</table>

---

## 📸 Screenshots / لقطات الشاشة

<div align="center">

<!-- TODO: Add actual screenshot files to docs/screenshots/ folder before release -->

### Extension in Action / الإضافة أثناء العمل

<img src="docs/screenshots/01-in-action.png" alt="Claude RTL Responder in Action" width="80%"/>

> *Arabic text rendered with proper RTL direction in Claude.ai*
>
> *النص العربي يُعرض باتجاه RTL الصحيح في Claude.ai*

</div>

<br/>

<details>
<summary>📂 <strong>View More Screenshots / عرض المزيد من اللقطات</strong> — click to expand</summary>

<br/>

<div align="center">

**🎛️ Popup Mode Switcher / مُبدِّل الوضع**
<br/>
<img src="docs/screenshots/02-popup.png" alt="Popup Mode Switcher" width="300"/>

<br/><br/>

**⚙️ Options Page / صفحة الإعدادات**
<br/>
<img src="docs/screenshots/03-options.png" alt="Options Page" width="80%"/>

<br/><br/>

**🌙 Dark Mode / الوضع الداكن**
<br/>
<img src="docs/screenshots/04-dark-mode.png" alt="Dark Mode" width="80%"/>

</div>

</details>

---

## 📥 Installation / التثبيت

### A. From Firefox Add-ons Store (Recommended) / من متجر Firefox (موصى به)

<div align="center">

<!-- TODO: Replace with actual AMO listing URL once approved -->

[![Firefox Add-ons](https://img.shields.io/badge/Firefox_Add--ons-Coming_Soon-ff7139?style=for-the-badge&logo=firefox&logoColor=white)](https://addons.mozilla.org)

> 🔜 *قريباً على متجر إضافات Firefox / Coming soon to Firefox Add-ons Store*

</div>

<br/>

### B. From GitHub (Developer Edition) / من GitHub (نسخة المطور)

#### Firefox

<table>
<tr>
<td width="50%" valign="top">

**Installation Steps:**

1. Download `claude-rtl-responder-firefox-v*.zip` from [Releases](https://github.com/moner-dev/Claude-RTL-Responder/releases)
2. Extract the ZIP to a folder
3. Open Firefox → `about:debugging#/runtime/this-firefox`
4. Click **"Load Temporary Add-on..."**
5. Select `manifest.json` from extracted folder
6. Done!

</td>
<td width="50%" valign="top" dir="rtl">

**خطوات التثبيت:**

1. حمِّل `claude-rtl-responder-firefox-v*.zip` من [الإصدارات](https://github.com/moner-dev/Claude-RTL-Responder/releases)
2. فُكَّ ضغط الملف في مجلد
3. افتح Firefox ← `about:debugging#/runtime/this-firefox`
4. انقر على **"Load Temporary Add-on..."**
5. اختر ملف `manifest.json` من المجلد
6. تم!

</td>
</tr>
</table>

#### Chrome / Edge

<table>
<tr>
<td width="50%" valign="top">

**Installation Steps:**

1. Download `claude-rtl-responder-chrome-v*.zip` from [Releases](https://github.com/moner-dev/Claude-RTL-Responder/releases)
2. Extract the ZIP to a folder
3. Open Chrome → `chrome://extensions`
4. Enable **"Developer mode"** (top right toggle)
5. Click **"Load unpacked"**
6. Select the extracted folder
7. Done!

</td>
<td width="50%" valign="top" dir="rtl">

**خطوات التثبيت:**

1. حمِّل `claude-rtl-responder-chrome-v*.zip` من [الإصدارات](https://github.com/moner-dev/Claude-RTL-Responder/releases)
2. فُكَّ ضغط الملف في مجلد
3. افتح Chrome ← `chrome://extensions`
4. فعّل **"Developer mode"** (الزر في أعلى اليمين)
5. انقر على **"Load unpacked"**
6. اختر المجلد المستخرج
7. تم!

</td>
</tr>
</table>

<br/>

> ⚠️ **Note:** Temporary/unpacked extensions are removed when the browser restarts. For permanent installation, use the browser store versions (coming soon).
>
> **ملاحظة:** الإضافات المؤقتة تُحذف عند إعادة تشغيل المتصفح. للتثبيت الدائم، استخدم نسخ المتاجر (قريباً).

---

## 🚀 Usage / طريقة الاستخدام

### A. Mode Switching / تبديل الوضع

<table>
<tr>
<td width="50%" valign="top">

**Using the Popup:**
1. Click the extension icon in the toolbar
2. Choose **عربي** (Arabic) or **English** mode
3. Changes apply instantly to claude.ai

</td>
<td width="50%" valign="top" dir="rtl">

**باستخدام النافذة:**
1. انقر على أيقونة الإضافة في شريط الأدوات
2. اختر وضع **عربي** أو **English**
3. التغييرات تُطبَّق فوراً على claude.ai

</td>
</tr>
</table>

**Keyboard Shortcut:** Press <kbd>Alt</kbd>+<kbd>G</kbd> to toggle between Arabic and English modes without opening the popup.

<div dir="rtl">

**اختصار لوحة المفاتيح:** اضغط <kbd>Alt</kbd>+<kbd>G</kbd> للتبديل بين الوضعين بدون فتح النافذة.

</div>

<br/>

### B. Opening Settings / فتح الإعدادات

- **From Popup:** Click **"إعدادات متقدمة / Advanced Settings"** button
- **Keyboard:** Press <kbd>Alt</kbd>+<kbd>O</kbd> to open the popup

<div dir="rtl">

- **من النافذة:** انقر على زر **"إعدادات متقدمة / Advanced Settings"**
- **لوحة المفاتيح:** اضغط <kbd>Alt</kbd>+<kbd>O</kbd> لفتح النافذة

</div>

<br/>

### C. Customization Options / خيارات التخصيص

| Setting | Options | الإعداد |
|:--------|:--------|:--------|
| **Font Size** | Small / Medium / Large | حجم الخط |
| **Line Spacing** | Compact / Normal / Relaxed | تباعد الأسطر |
| **RTL Indicator** | Toggle + Color Picker | مؤشر RTL |

<br/>

### D. Keyboard Shortcuts Reference / مرجع الاختصارات

| Shortcut | Action | الإجراء |
|:---------|:-------|:--------|
| <kbd>Alt</kbd>+<kbd>G</kbd> | Toggle Arabic/English mode | تبديل الوضع عربي/إنجليزي |
| <kbd>Alt</kbd>+<kbd>O</kbd> | Open extension popup | فتح نافذة الإضافة |

---

## 🔧 Technical Details / التفاصيل التقنية

<details>
<summary>📋 <strong>Click to expand technical specifications</strong></summary>

<br/>

| Specification | Value |
|:--------------|:------|
| **Manifest Version** | MV3 (Manifest V3) |
| **Firefox Minimum** | 109+ |
| **Detection Algorithm** | Unicode BiDi + First-Strong Character Analysis |
| **Performance** | RAF-debounced MutationObserver, WeakSet tracking |
| **Storage** | `browser.storage.local` (sync-compatible) |

### Arabic Unicode Ranges Covered

```
U+0600–U+06FF    Arabic
U+0750–U+077F    Arabic Supplement
U+08A0–U+08FF    Arabic Extended-A
U+FB50–U+FDFF    Arabic Presentation Forms-A
U+FE70–U+FEFF    Arabic Presentation Forms-B
```

### Architecture

The extension uses isolated modules for maintainability:

- **`detector.js`** — Arabic text detection with Unicode analysis
- **`observer.js`** — MutationObserver for dynamic content
- **`content.js`** — Main content script orchestration
- **`background.js`** — Service worker for keyboard shortcuts
- **`popup/`** — Mode switcher UI
- **`options/`** — Full settings page with live preview

</details>

---

## 📁 Project Structure / هيكل المشروع

<details>
<summary>📂 <strong>Click to expand file tree</strong></summary>

<br/>

```
claude-rtl-responder/
├── src/                          # Extension source files
│   ├── manifest.firefox.json     # Firefox manifest (MV3)
│   ├── manifest.chrome.json      # Chrome manifest (MV3)
│   ├── background.js             # Service worker
│   ├── common/
│   │   └── browser-polyfill.js   # Cross-browser API polyfill
│   ├── content/
│   │   ├── detector.js           # Arabic text detection
│   │   ├── observer.js           # DOM mutation observer
│   │   └── content.js            # Main content script
│   ├── popup/
│   │   ├── popup.html            # Popup UI
│   │   ├── popup.css             # Popup styles
│   │   └── popup.js              # Popup logic
│   ├── options/
│   │   ├── options.html          # Settings page
│   │   ├── options.css           # Settings styles
│   │   └── options.js            # Settings logic
│   ├── styles/
│   │   └── rtl.css               # RTL injection styles
│   ├── icons/
│   │   ├── icon-48.png           # Toolbar icon
│   │   └── icon-96.png           # High-DPI icon
│   └── INSTALL.txt               # Quick installation guide
├── scripts/
│   └── build.js                  # Cross-browser build script
├── dist/                         # Build output (gitignored)
├── docs/
│   └── screenshots/              # README screenshots
├── package.json                  # Build configuration
├── README.md                     # This file
├── LICENSE                       # MIT License
├── CHANGELOG.md                  # Version history
├── CONTRIBUTING.md               # Contribution guidelines
├── SECURITY.md                   # Security policy
└── .gitignore                    # Git ignore rules
```

</details>

---

## 🔒 Privacy / الخصوصية

<table>
<tr>
<td width="50%" valign="top">

### English

- ✅ **All data stored locally** — uses `browser.storage.local`
- ✅ **No analytics or tracking** — zero telemetry
- ✅ **No external network requests** — everything runs offline
- ✅ **No user data transmitted** — your conversations stay private
- ✅ **Open source** — full code available for review

</td>
<td width="50%" valign="top" dir="rtl">

### العربية

- ✅ **جميع البيانات محفوظة محلياً** — يستخدم `browser.storage.local`
- ✅ **لا تحليلات أو تتبع** — صفر قياس عن بُعد
- ✅ **لا طلبات شبكة خارجية** — كل شيء يعمل بدون اتصال
- ✅ **لا بيانات مستخدم تُرسَل** — محادثاتك تبقى خاصة
- ✅ **مفتوح المصدر** — الكود الكامل متاح للمراجعة

</td>
</tr>
</table>

---

## 🌐 Compatibility / التوافق

| Browser / Platform | Support | الدعم |
|:-------------------|:--------|:------|
| **Firefox 109+** | ✅ Fully Supported | مدعوم بالكامل |
| **Firefox Developer Edition** | ✅ Supported | مدعوم |
| **Firefox ESR (109+)** | ✅ Supported | مدعوم |
| **Chrome 88+** | ✅ Fully Supported | مدعوم بالكامل |
| **Edge (Chromium)** | ✅ Supported | مدعوم |
| **Safari** | ❌ Not Supported | غير مدعوم |
| **claude.ai** | ✅ Target Site | الموقع المستهدف |
| **Other websites** | ❌ Not Affected | غير متأثرة |

> 💡 Both Firefox and Chrome/Edge are fully supported with Manifest V3.
>
> يدعم المتصفحان Firefox و Chrome/Edge بالكامل مع Manifest V3.

---

## 🤝 Contributing / المساهمة

<table>
<tr>
<td width="50%" valign="top">

Contributions are welcome! Here's how you can help:

- 🐛 **Report bugs** — open an issue
- 💡 **Suggest features** — share your ideas
- 🔧 **Submit PRs** — code contributions reviewed

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

</td>
<td width="50%" valign="top" dir="rtl">

المساهمات مرحب بها! إليك كيف يمكنك المساعدة:

- 🐛 **الإبلاغ عن الأخطاء** — افتح issue
- 💡 **اقتراح ميزات** — شارك أفكارك
- 🔧 **إرسال PRs** — مساهمات الكود تُراجَع

راجع [CONTRIBUTING.md](CONTRIBUTING.md) للإرشادات التفصيلية.

</td>
</tr>
</table>

<div align="center">

[![GitHub Issues](https://img.shields.io/github/issues/moner-dev/Claude-RTL-Responder?style=for-the-badge&color=2563eb)](https://github.com/moner-dev/Claude-RTL-Responder/issues)

</div>

---

## 📋 Changelog / سجل التغييرات

### v0.1.0 — Initial Release / الإصدار الأول

- ✨ Automatic Arabic RTL detection
- ✨ Mixed-content intelligent handling
- ✨ Code block LTR preservation
- ✨ Font size customization (3 options)
- ✨ Line spacing customization (3 options)
- ✨ Optional RTL indicator with color picker
- ✨ Keyboard shortcuts (Alt+G, Alt+O)
- ✨ Dark mode support
- ✨ Bilingual UI (Arabic/English)
- ✨ Persistent settings storage

See [CHANGELOG.md](CHANGELOG.md) for full version history.

---

## 📄 License / الترخيص

<div align="center">

**MIT License**

Copyright © 2026 **MONER INTELLIGENCE SYSTEMS**

See [LICENSE](LICENSE) for the full license text.

</div>

---

## 👨‍💻 Developer / المطور

<div align="center">

<br/>

### M.O.N.E.R

**Application Developer & AI Specialist**
<br/>
<span dir="rtl">مطوّر تطبيقات ومتخصص في الذكاء الاصطناعي</span>

<br/>

**MONER INTELLIGENCE SYSTEMS**

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-moner--dev-181717?style=for-the-badge&logo=github)](https://github.com/moner-dev)
[![Email](https://img.shields.io/badge/Email-Contact-2563eb?style=for-the-badge&logo=gmail)](mailto:moner.intelligence@gmail.com)

</div>

<br/>

### Other Projects / مشاريع أخرى

| Project | Description | الوصف |
|:--------|:------------|:------|
| [**Ghost Protocol Helpdesk**](https://github.com/moner-dev/ghost-protocol-helpdesk) | Enterprise incident management system | نظام إدارة حوادث للمؤسسات |
| [**DeadBYTE**](https://github.com/moner-dev/DeadByte) | Smart system analysis & cleanup for Windows | أداة تحليل وتنظيف ذكية لـ Windows |
| [**MyWorld Password Manager**](https://github.com/moner-dev/MyWorld-Password-Manager) | Secure local password manager | مدير كلمات مرور محلي آمن |
| [**Professional Label Design Print**](https://github.com/moner-dev/Professional-Label-Design-Print) | Professional label design & printing | تصميم وطباعة ملصقات احترافية |

---

## 🔨 Building from Source / البناء من المصدر

<table>
<tr>
<td width="50%" valign="top">

```bash
# Clone the repository
git clone https://github.com/moner-dev/Claude-RTL-Responder.git
cd Claude-RTL-Responder

# Build for Firefox
node scripts/build.js firefox

# Build for Chrome
node scripts/build.js chrome

# Build both
node scripts/build.js all
```

**Output:**
- `dist/firefox/` — Unpacked Firefox extension
- `dist/chrome/` — Unpacked Chrome extension
- `dist/claude-rtl-responder-firefox-v*.zip`
- `dist/claude-rtl-responder-chrome-v*.zip`

</td>
<td width="50%" valign="top" dir="rtl">

```bash
# استنساخ المستودع
git clone https://github.com/moner-dev/Claude-RTL-Responder.git
cd Claude-RTL-Responder

# البناء لـ Firefox
node scripts/build.js firefox

# البناء لـ Chrome
node scripts/build.js chrome

# بناء الاثنين
node scripts/build.js all
```

**المخرجات:**
- `dist/firefox/` — إضافة Firefox غير مضغوطة
- `dist/chrome/` — إضافة Chrome غير مضغوطة
- `dist/claude-rtl-responder-firefox-v*.zip`
- `dist/claude-rtl-responder-chrome-v*.zip`

</td>
</tr>
</table>

> **Requirements:** Node.js 14+ | **المتطلبات:** Node.js 14+

---

## 🙏 Acknowledgments / شكر وتقدير

<table>
<tr>
<td width="50%" valign="top">

- **Anthropic** — for creating Claude.ai
- **Mozilla** — for the Firefox WebExtensions platform
- **Open Source Community** — for inspiration and tools

</td>
<td width="50%" valign="top" dir="rtl">

- **Anthropic** — لإنشاء Claude.ai
- **Mozilla** — لمنصة إضافات Firefox
- **مجتمع المصادر المفتوحة** — للإلهام والأدوات

</td>
</tr>
</table>

---

<div align="center">

<br/>

**Claude RTL Responder** v0.1.0

© 2026 **MONER INTELLIGENCE SYSTEMS**

*Crafted with precision and passion for Arabic-speaking developers*

<br/>

<img src="https://img.shields.io/badge/Made_with-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/For-Firefox-ff7139?style=for-the-badge&logo=firefox&logoColor=white"/>
<img src="https://img.shields.io/badge/For-Chrome-4285f4?style=for-the-badge&logo=googlechrome&logoColor=white"/>
<img src="https://img.shields.io/badge/©_2026-MONER_INTELLIGENCE_SYSTEMS-2563eb?style=for-the-badge"/>

<!-- TODO: Add visitor counter badge once repository is public -->
<!-- [![Profile Views](https://komarev.com/ghpvc/?username=moner-dev&repo=Claude-RTL-Responder&color=2563eb&style=for-the-badge)](https://github.com/moner-dev/Claude-RTL-Responder) -->

</div>
