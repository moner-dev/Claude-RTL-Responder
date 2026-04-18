<div align="center">

# INSTALL · دليل التثبيت

### Claude RTL Responder — Installation Guide

<br/>

<img src="https://img.shields.io/badge/FIREFOX-109+-ff7139?style=for-the-badge&logo=firefox&logoColor=white"/>
<img src="https://img.shields.io/badge/WINDOWS-0078d4?style=for-the-badge&logo=windows&logoColor=white"/>
<img src="https://img.shields.io/badge/macOS-000000?style=for-the-badge&logo=apple&logoColor=white"/>
<img src="https://img.shields.io/badge/LINUX-fcc624?style=for-the-badge&logo=linux&logoColor=black"/>
<img src="https://img.shields.io/badge/VERSION-v0.1.0-2563eb?style=for-the-badge"/>

</div>

---

## مقدمة / Introduction

<div dir="rtl" align="right">

يشرح هذا الدليل خطوات تثبيت إضافة **Claude RTL Responder** على متصفح Firefox. تتوفر طريقتان للتثبيت: من متجر إضافات Firefox (الطريقة الموصى بها، قريباً)، أو من GitHub للمطورين والاختبار المبكر.

</div>

This guide explains how to install the **Claude RTL Responder** extension on Firefox. Two installation methods are available: from the Firefox Add-ons Store (recommended, coming soon), or from GitHub for developers and early testers.

---

## جدول المحتويات / Table of Contents

| Section | القسم |
|:--------|:------|
| [Prerequisites / المتطلبات](#-prerequisites--المتطلبات) | المتطلبات |
| [Method 1: Firefox Add-ons Store](#-method-1-firefox-add-ons-store-recommended--الطريقة-الأولى-متجر-firefox-موصى-بها) | متجر Firefox |
| [Method 2: Install from GitHub](#-method-2-install-from-github-developer-edition--الطريقة-الثانية-التثبيت-من-github-نسخة-المطور) | التثبيت من GitHub |
| [Post-Installation Setup](#-post-installation-configuration--الإعدادات-بعد-التثبيت) | الإعدادات بعد التثبيت |
| [Updating](#-updating-the-extension--تحديث-الإضافة) | تحديث الإضافة |
| [Uninstalling](#-uninstalling--إلغاء-التثبيت) | إلغاء التثبيت |
| [Troubleshooting](#-troubleshooting--استكشاف-الأخطاء-وإصلاحها) | استكشاف الأخطاء |
| [Compatibility](#-firefox-version-compatibility--توافق-إصدارات-firefox) | التوافق |
| [Platform Notes](#-platform-specific-notes--ملاحظات-حسب-نظام-التشغيل) | ملاحظات النظام |
| [Security & Privacy](#-security--privacy--الأمان-والخصوصية) | الأمان والخصوصية |
| [Getting Help](#-getting-help--طلب-المساعدة) | طلب المساعدة |

---

## 📋 Prerequisites / المتطلبات

<div dir="rtl" align="right">

قبل التثبيت، تأكد من توفر المتطلبات التالية:

- **متصفح Firefox** الإصدار 109 أو أحدث — [تنزيل Firefox](https://www.mozilla.org/firefox/)
- **حساب Claude.ai** — [إنشاء حساب](https://claude.ai)
- لا تحتاج لصلاحيات المسؤول (التثبيت على مستوى المتصفح فقط)

</div>

Before installing, ensure you have:

- **Firefox browser** version 109 or later — [Download Firefox](https://www.mozilla.org/firefox/)
- **A Claude.ai account** — [Sign up](https://claude.ai)
- No administrator privileges required (browser-level install)

<br/>

### System Requirements / متطلبات النظام

| Component / المكوّن | Minimum / الحد الأدنى | Recommended / الموصى به |
|:--------------------|:----------------------|:------------------------|
| **Firefox** | 109 | Latest version |
| **OS** | Windows 10 / macOS 10.14 / Ubuntu 20.04 | Any current version |
| **RAM** | 2 GB | 4 GB+ |
| **Disk Space** | 5 MB | — |

---

## 🟢 Method 1: Firefox Add-ons Store (Recommended) / الطريقة الأولى: متجر Firefox (موصى بها)

<div align="center">

### 🟡 Coming Soon / قريباً

<!-- TODO: Replace AMO URL with the actual listing once approved -->

[![Firefox Add-ons](https://img.shields.io/badge/Firefox_Add--ons-Coming_Soon-ff7139?style=for-the-badge&logo=firefox&logoColor=white)](https://addons.mozilla.org)

</div>

<br/>

<div dir="rtl" align="right">

الإضافة قيد المراجعة حالياً من فريق Mozilla. بمجرد الموافقة، ستكون هذه الطريقة الأسهل والأكثر أماناً للتثبيت.

**الخطوات (عند التوفر):**

1. زر صفحة الإضافة على متجر Firefox Add-ons
2. انقر على زر **"Add to Firefox"**
3. وافق على طلب الصلاحيات
4. تم! الإضافة جاهزة للاستخدام

</div>

The extension is currently under review by Mozilla. Once approved, this will be the easiest and most secure installation method.

**Steps (when available):**

1. Visit the extension's page on Firefox Add-ons Store
2. Click the **"Add to Firefox"** button
3. Confirm the permissions prompt
4. Done! The extension is ready to use

> ℹ️ **Tip:** Extensions from AMO are automatically updated by Firefox — no manual updates needed.
>
> **نصيحة:** إضافات متجر Firefox تُحدَّث تلقائياً — لا حاجة لتحديثات يدوية.

---

## 🔧 Method 2: Install from GitHub (Developer Edition) / الطريقة الثانية: التثبيت من GitHub (نسخة المطور)

<div dir="rtl" align="right">

هذه الطريقة متاحة الآن للمطورين والمختبرين. اتبع الخطوات التالية بدقة.

</div>

This method is currently available for developers and testers. Follow these steps carefully.

<br/>

### Step 1: Download the Extension / الخطوة 1: تنزيل الإضافة

<div dir="rtl" align="right">

**الخيار أ: استنساخ بـ Git**

</div>

**Option A: Clone with Git**

```bash
git clone https://github.com/moner-dev/Claude-RTL-Responder.git
```

<br/>

<div dir="rtl" align="right">

**الخيار ب: تنزيل ملف ZIP**

1. زر [صفحة الإصدارات](https://github.com/moner-dev/Claude-RTL-Responder/releases)
2. نزِّل أحدث ملف `claude-rtl-responder-vX.X.X.zip`
3. فُكَّ الضغط في مجلد دائم (مثال: `Documents/claude-rtl-responder`)

</div>

**Option B: Download ZIP**

1. Visit the [Releases page](https://github.com/moner-dev/Claude-RTL-Responder/releases)
2. Download the latest `claude-rtl-responder-vX.X.X.zip`
3. Extract to a permanent folder (e.g., `Documents/claude-rtl-responder`)

> ⚠️ **Important:** Choose a permanent folder location. Firefox references this folder directly — if you delete or move it, the extension will stop working.
>
> **هام:** اختر مجلداً دائماً. Firefox يشير مباشرة لهذا المجلد — إذا حذفته أو نقلته، ستتوقف الإضافة عن العمل.

<br/>

### Step 2: Open Firefox Debugging Page / الخطوة 2: فتح صفحة تصحيح Firefox

<div dir="rtl" align="right">

1. افتح Firefox
2. اكتب في شريط العناوين:

</div>

1. Open Firefox
2. Type in the address bar:

```
about:debugging#/runtime/this-firefox
```

3. Press <kbd>Enter</kbd>

<!-- TODO: Add screenshot at docs/screenshots/install/01-debugging-page.png -->

<br/>

### Step 3: Load the Extension / الخطوة 3: تحميل الإضافة

<div dir="rtl" align="right">

1. انقر على زر **"Load Temporary Add-on..."**
2. في نافذة اختيار الملفات، انتقل إلى المجلد المُستخرَج
3. اختر ملف `manifest.json`
4. انقر **"Open"**

</div>

1. Click the **"Load Temporary Add-on..."** button
2. In the file picker, navigate to the extracted folder
3. Select the `manifest.json` file
4. Click **"Open"**

<!-- TODO: Add screenshot at docs/screenshots/install/02-load-addon.png -->

<br/>

### Step 4: Verify Installation / الخطوة 4: التحقق من التثبيت

<div dir="rtl" align="right">

1. يجب أن تظهر أيقونة الإضافة في شريط أدوات Firefox
2. انقر على الأيقونة — يجب أن تفتح النافذة المنبثقة مع مُبدِّل الوضع

</div>

1. The extension icon should appear in the Firefox toolbar
2. Click the icon — the popup should open showing the mode switcher

<!-- TODO: Add screenshot at docs/screenshots/install/03-popup-verified.png -->

<br/>

### Step 5: Test on Claude.ai / الخطوة 5: التجربة على Claude.ai

<div dir="rtl" align="right">

1. زر [claude.ai](https://claude.ai)
2. ابدأ محادثة بالعربية
3. تحقق من أن ردود Claude تُعرض من اليمين لليسار (RTL)

</div>

1. Visit [claude.ai](https://claude.ai)
2. Start a conversation in Arabic
3. Verify that Claude's responses render right-to-left (RTL)

<br/>

> ⚠️ **Important Limitation / تنبيه هام**
>
> <div dir="rtl" align="right">
>
> الإضافات المؤقتة (Temporary Add-ons) تُحذف عند إعادة تشغيل Firefox. هذا قيد من Firefox للتطوير، وليس خللاً في الإضافة. للتثبيت الدائم، انتظر نسخة متجر Firefox أو أعد الخطوات بعد كل إعادة تشغيل.
>
> </div>
>
> Temporary add-ons are removed when Firefox restarts. This is a Firefox development limitation, not a bug in the extension. For permanent installation, wait for the AMO version or repeat these steps after each restart.

---

## ⚙️ Post-Installation Configuration / الإعدادات بعد التثبيت

<div dir="rtl" align="right">

بعد التثبيت الناجح، اتبع هذه الخطوات للإعداد الأولي:

</div>

After successful installation, follow these steps for initial setup:

<br/>

### 1. Pin the Extension to Toolbar / تثبيت الإضافة في شريط الأدوات

<div dir="rtl" align="right">

إذا لم تظهر الأيقونة في شريط الأدوات:

1. انقر على أيقونة الإضافات (قطعة البازل) في شريط الأدوات
2. ابحث عن "Claude RTL Responder"
3. انقر على أيقونة التثبيت (📌) لإبقائها مرئية

</div>

If the icon doesn't appear in the toolbar:

1. Click the Extensions icon (puzzle piece) in the toolbar
2. Find "Claude RTL Responder"
3. Click the pin icon (📌) to keep it visible

<br/>

### 2. Choose a Mode / اختيار الوضع

<div dir="rtl" align="right">

- **وضع عربي:** يُفعِّل RTL للنصوص العربية في Claude.ai
- **وضع English:** يُوقف معالجة RTL (السلوك الافتراضي لـ Claude)

</div>

- **Arabic Mode (عربي):** Activates RTL for Arabic text in Claude.ai
- **English Mode:** Disables RTL processing (default Claude behavior)

<br/>

### 3. Customize Settings / تخصيص الإعدادات

<div dir="rtl" align="right">

انقر على **"إعدادات متقدمة"** في النافذة المنبثقة للوصول إلى:

- حجم الخط (صغير / متوسط / كبير)
- تباعد الأسطر (مُدمج / عادي / مريح)
- مؤشر RTL مع منتقي الألوان

</div>

Click **"Advanced Settings"** in the popup to access:

- Font size (Small / Medium / Large)
- Line spacing (Compact / Normal / Relaxed)
- RTL indicator with color picker

See [README.md — Usage](README.md#-usage--طريقة-الاستخدام) for detailed customization options.

<br/>

### 4. Learn Keyboard Shortcuts / تعلُّم اختصارات لوحة المفاتيح

| Shortcut | Action | الإجراء |
|:---------|:-------|:--------|
| <kbd>Alt</kbd>+<kbd>G</kbd> | Toggle Arabic/English mode | تبديل الوضع |
| <kbd>Alt</kbd>+<kbd>O</kbd> | Open extension popup | فتح النافذة |

---

## 🔄 Updating the Extension / تحديث الإضافة

### A. If Installed from AMO / إذا ثُبِّتت من متجر Firefox

<div dir="rtl" align="right">

Firefox يُحدِّث الإضافات تلقائياً بشكل افتراضي. لا حاجة لأي إجراء.

</div>

Firefox auto-updates extensions by default. No action needed.

<br/>

### B. If Installed from GitHub (Temporary) / إذا ثُبِّتت من GitHub (مؤقتة)

<div dir="rtl" align="right">

1. زر [صفحة الإصدارات](https://github.com/moner-dev/Claude-RTL-Responder/releases)
2. نزِّل الإصدار الجديد
3. فُكَّ الضغط في مجلد جديد
4. أعد اتباع خطوات [الطريقة الثانية](#-method-2-install-from-github-developer-edition--الطريقة-الثانية-التثبيت-من-github-نسخة-المطور)

</div>

1. Check the [Releases page](https://github.com/moner-dev/Claude-RTL-Responder/releases) for new versions
2. Download the new version
3. Extract to a new folder
4. Re-follow [Method 2](#-method-2-install-from-github-developer-edition--الطريقة-الثانية-التثبيت-من-github-نسخة-المطور) steps

> ⚠️ **Note:** Settings do NOT persist across temporary add-on reinstalls. You'll need to reconfigure your preferences.
>
> **ملاحظة:** الإعدادات لا تُحفظ عبر إعادة تثبيت الإضافات المؤقتة. ستحتاج لإعادة ضبط تفضيلاتك.

---

## 🗑️ Uninstalling / إلغاء التثبيت

### A. Remove via about:addons / الإزالة عبر صفحة الإضافات

<div dir="rtl" align="right">

1. انتقل إلى `about:addons` في شريط العناوين
2. ابحث عن "Claude RTL Responder"
3. انقر على قائمة النقاط الثلاث (⋮)
4. اختر **"Remove"**
5. أكِّد الإزالة

</div>

1. Navigate to `about:addons` in the address bar
2. Find "Claude RTL Responder"
3. Click the three-dot menu (⋮)
4. Select **"Remove"**
5. Confirm removal

<br/>

### B. Remove Extracted Folder (GitHub method) / حذف المجلد المُستخرَج (طريقة GitHub)

<div dir="rtl" align="right">

بعد إزالة الإضافة من Firefox، يمكنك حذف المجلد الذي استخرجت فيه ملفات الإضافة.

</div>

After removing the extension from Firefox, you can delete the folder where you extracted the extension files.

---

## 🔧 Troubleshooting / استكشاف الأخطاء وإصلاحها

<details>
<summary><strong>Extension doesn't appear in toolbar after loading / الإضافة لا تظهر في شريط الأدوات</strong></summary>

<br/>

<div dir="rtl" align="right">

**الحل:**
1. انقر على أيقونة الإضافات (قطعة البازل) في شريط الأدوات
2. ابحث عن "Claude RTL Responder"
3. انقر على أيقونة التثبيت (📌)

إذا لم تجد الإضافة في القائمة، أعد تحميلها من `about:debugging`.

</div>

**Solution:**
1. Click the Extensions menu (puzzle piece) in the toolbar
2. Find "Claude RTL Responder"
3. Click the pin icon (📌)

If you don't see the extension in the list, reload it from `about:debugging`.

</details>

<details>
<summary><strong>Claude.ai text still renders left-to-right / النص في Claude.ai لا يزال من اليسار لليمين</strong></summary>

<br/>

<div dir="rtl" align="right">

**الأسباب المحتملة:**
1. الوضع مُعيَّن على "English" بدلاً من "عربي"
2. الإضافة لم تُحمَّل بشكل صحيح
3. الصفحة بحاجة لتحديث

**الحل:**
1. انقر على أيقونة الإضافة وتأكد أن وضع "عربي" مُفعَّل
2. حدِّث صفحة Claude.ai بـ <kbd>Ctrl</kbd>+<kbd>R</kbd>
3. افتح وحدة التحكم (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd>) وابحث عن رسائل `[Claude RTL Responder]`

</div>

**Possible causes:**
1. Mode is set to "English" instead of "عربي"
2. Extension didn't load correctly
3. Page needs refresh

**Solution:**
1. Click the extension icon and ensure "عربي" mode is active
2. Refresh Claude.ai page with <kbd>Ctrl</kbd>+<kbd>R</kbd>
3. Open console (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd>) and look for `[Claude RTL Responder]` messages

</details>

<details>
<summary><strong>Keyboard shortcuts don't work / اختصارات لوحة المفاتيح لا تعمل</strong></summary>

<br/>

<div dir="rtl" align="right">

**الأسباب المحتملة:**
1. تعارض مع اختصار Windows لتبديل اللغة (<kbd>Alt</kbd>+<kbd>Shift</kbd>)
2. إضافة أخرى تستخدم نفس الاختصارات

**الحل:**
1. انتقل إلى `about:addons`
2. انقر على أيقونة الترس (⚙️) في أعلى اليمين
3. اختر **"Manage Extension Shortcuts"**
4. ابحث عن "Claude RTL Responder"
5. غيِّر الاختصارات المتعارضة

</div>

**Possible causes:**
1. Conflict with Windows language switch shortcut (<kbd>Alt</kbd>+<kbd>Shift</kbd>)
2. Another extension using the same shortcuts

**Solution:**
1. Navigate to `about:addons`
2. Click the gear icon (⚙️) in the top-right
3. Select **"Manage Extension Shortcuts"**
4. Find "Claude RTL Responder"
5. Change the conflicting shortcuts

</details>

<details>
<summary><strong>Settings don't persist after Firefox restart / الإعدادات لا تُحفظ بعد إعادة تشغيل Firefox</strong></summary>

<br/>

<div dir="rtl" align="right">

هذا السلوك متوقع مع الإضافات المؤقتة (Temporary Add-ons). Firefox يحذف الإضافات المؤقتة عند إعادة التشغيل.

**الحل:**
- انتظر نسخة متجر Firefox Add-ons (قريباً)
- أو أعد تحميل الإضافة بعد كل إعادة تشغيل

</div>

This is expected behavior with temporary add-ons. Firefox removes temporary add-ons on restart.

**Solution:**
- Wait for the Firefox Add-ons Store version (coming soon)
- Or reload the extension after each restart

</details>

<details>
<summary><strong>Extension conflicts with other RTL extensions / تعارض مع إضافات RTL أخرى</strong></summary>

<br/>

<div dir="rtl" align="right">

**الحل:**
1. عطِّل إضافات RTL الأخرى من `about:addons`
2. استخدم إضافة RTL واحدة فقط لـ Claude.ai
3. أعد تحميل صفحة Claude.ai

</div>

**Solution:**
1. Disable other RTL extensions from `about:addons`
2. Use only one RTL extension at a time for Claude.ai
3. Refresh the Claude.ai page

</details>

<details>
<summary><strong>Manifest loading error ("unexpected JSON...") / خطأ تحميل manifest</strong></summary>

<br/>

<div dir="rtl" align="right">

هذا يعني أن ملف ZIP لم يُستخرَج بالكامل أو بشكل صحيح.

**الحل:**
1. احذف المجلد المُستخرَج
2. أعد استخراج ملف ZIP
3. تأكد من اختيار ملف `manifest.json` وليس المجلد

</div>

This indicates the ZIP wasn't fully or correctly extracted.

**Solution:**
1. Delete the extracted folder
2. Re-extract the ZIP file
3. Make sure to select the `manifest.json` file, not the folder

</details>

---

## 🦊 Firefox Version Compatibility / توافق إصدارات Firefox

| Firefox Version | Support | Notes / ملاحظات |
|:----------------|:--------|:----------------|
| **109+** | ✅ Full | Recommended / موصى به |
| **102 ESR** | ⚠️ Limited | Partial MV3 support |
| **< 102** | ❌ Not supported | Please upgrade Firefox |

> 💡 **Tip:** Check your Firefox version by navigating to `about:support` and looking for "Version".
>
> **نصيحة:** تحقق من إصدار Firefox بالانتقال إلى `about:support` والبحث عن "Version".

---

## 💻 Platform-Specific Notes / ملاحظات حسب نظام التشغيل

### Windows

<div dir="rtl" align="right">

- التثبيت القياسي من Firefox يعمل بدون مشاكل
- قد يُظهر Windows Defender / SmartScreen تحذيراً عند التحميل الأول — هذا طبيعي للملفات المُنزَّلة

</div>

- Standard Firefox installation works without issues
- Windows Defender / SmartScreen may show a warning on first download — this is normal for downloaded files

<br/>

### macOS

<div dir="rtl" align="right">

- التثبيت القياسي يعمل بدون مشاكل
- Gatekeeper لا يؤثر على إضافات المتصفح (يُطبَّق فقط على التطبيقات)

</div>

- Standard installation works without issues
- Gatekeeper doesn't affect browser extensions (only applies to applications)

<br/>

### Linux

<div dir="rtl" align="right">

- يعمل مع Firefox من المستودعات الرسمية، Snap، و Flatpak
- نسخة Snap قد تُظهر سلوكاً مختلفاً في نوافذ اختيار الملفات بسبب العزل (sandboxing)

</div>

- Works with Firefox from official repos, Snap, and Flatpak
- Snap version may show different behavior in file picker dialogs due to sandboxing

---

## 🔒 Security & Privacy / الأمان والخصوصية

<div dir="rtl" align="right">

**Claude RTL Responder** مصمم مع الخصوصية كأولوية:

- ✅ كل المعالجة تحدث محلياً في متصفحك
- ✅ لا بيانات تُرسَل خارج جهازك
- ✅ لا تحليلات أو تتبع
- ✅ الكود مفتوح المصدر بالكامل للمراجعة
- ✅ الإضافة تطلب فقط صلاحية `storage` + الوصول لـ claude.ai

</div>

**Claude RTL Responder** is designed with privacy as a priority:

- ✅ All processing happens locally in your browser
- ✅ No data is sent outside your device
- ✅ No analytics or tracking
- ✅ Source code is fully open for review on GitHub
- ✅ The extension only requests `storage` permission + access to claude.ai

---

## 🆘 Getting Help / طلب المساعدة

<div dir="rtl" align="right">

إذا واجهت مشاكل في التثبيت:

- 🐛 افتح issue على GitHub: [الإبلاغ عن مشكلة](https://github.com/moner-dev/Claude-RTL-Responder/issues)
- ✉️ راسلنا: [moner.intelligence@gmail.com](mailto:moner.intelligence@gmail.com)
- 📖 راجع [README.md](README.md) للتوثيق العام

</div>

If you encounter installation issues:

- 🐛 Open an issue on GitHub: [Report a problem](https://github.com/moner-dev/Claude-RTL-Responder/issues)
- ✉️ Email us: [moner.intelligence@gmail.com](mailto:moner.intelligence@gmail.com)
- 📖 Check [README.md](README.md) for general documentation

---

## ✅ Next Steps / الخطوات التالية

<div dir="rtl" align="right">

بعد التثبيت الناجح:

1. 📖 اقرأ [README.md — Usage](README.md#-usage--طريقة-الاستخدام) لتفاصيل الاستخدام
2. ⚙️ استكشف صفحة الإعدادات للتخصيص
3. ⌨️ جرِّب اختصارات لوحة المفاتيح (<kbd>Alt</kbd>+<kbd>G</kbd>، <kbd>Alt</kbd>+<kbd>O</kbd>)
4. 🌟 إذا أعجبتك الإضافة، ضع نجمة على [المستودع](https://github.com/moner-dev/Claude-RTL-Responder)!

</div>

After successful installation:

1. 📖 Read [README.md — Usage](README.md#-usage--طريقة-الاستخدام) for usage details
2. ⚙️ Explore the Settings page for customization
3. ⌨️ Try the keyboard shortcuts (<kbd>Alt</kbd>+<kbd>G</kbd>, <kbd>Alt</kbd>+<kbd>O</kbd>)
4. 🌟 If you like the extension, star the [repository](https://github.com/moner-dev/Claude-RTL-Responder)!

---

<div align="center">

**Claude RTL Responder** v0.1.0 · © 2026 **MONER INTELLIGENCE SYSTEMS** · Installation Guide

<br/>

[⬆ Back to Top / العودة للأعلى](#install--دليل-التثبيت)

</div>
