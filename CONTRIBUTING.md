# Contributing Guide | دليل المساهمة

<div align="center">

![Contributing](https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge&logo=github&logoColor=white)
![PRs](https://img.shields.io/badge/PRs-Welcome-blue?style=for-the-badge&logo=git&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

---

<div dir="rtl">

شكراً لاهتمامك بالمساهمة في Claude RTL Responder! نرحب بجميع المساهمات من المجتمع.

</div>

Thank you for your interest in contributing to Claude RTL Responder! We welcome all contributions from the community.

---

## 📋 Table of Contents | جدول المحتويات

- [Code of Conduct](#-code-of-conduct--قواعد-السلوك)
- [How Can I Contribute?](#-how-can-i-contribute--كيف-يمكنني-المساهمة)
- [Development Setup](#-development-setup--إعداد-بيئة-التطوير)
- [Project Structure](#-project-structure--هيكل-المشروع)
- [Coding Standards](#-coding-standards--معايير-الكود)
- [Commit Guidelines](#-commit-guidelines--إرشادات-الالتزام)
- [Pull Request Process](#-pull-request-process--عملية-طلب-الدمج)
- [Issue Guidelines](#-issue-guidelines--إرشادات-المشاكل)
- [Testing](#-testing--الاختبار)
- [Documentation](#-documentation--التوثيق)
- [Recognition](#-recognition--التقدير)

---

## 📜 Code of Conduct | قواعد السلوك

<div dir="rtl">

### نتوقع من جميع المساهمين:

- ✅ التعامل باحترام مع الجميع
- ✅ قبول النقد البناء بصدر رحب
- ✅ التركيز على ما هو أفضل للمشروع
- ✅ إظهار التعاطف تجاه أعضاء المجتمع

### غير مقبول:

- ❌ اللغة أو الصور غير اللائقة
- ❌ التنمر أو التعليقات المهينة
- ❌ التحرش العام أو الخاص
- ❌ نشر معلومات خاصة بدون إذن

</div>

### We expect all contributors to:

- ✅ Treat everyone with respect
- ✅ Accept constructive criticism gracefully
- ✅ Focus on what's best for the project
- ✅ Show empathy towards community members

### Unacceptable behavior:

- ❌ Inappropriate language or imagery
- ❌ Trolling or insulting comments
- ❌ Public or private harassment
- ❌ Publishing private information without permission

---

## 🤝 How Can I Contribute? | كيف يمكنني المساهمة؟

### 🐛 Reporting Bugs | الإبلاغ عن الأخطاء

<div dir="rtl">

وجدت خطأ؟ ساعدنا في إصلاحه!

</div>

Found a bug? Help us fix it!

1. **Search existing issues** — Check if it's already reported
2. **Create a new issue** — Use the bug report template
3. **Provide details** — Include steps to reproduce

```markdown
## Bug Report

**Description:** [Clear description]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected:** [What should happen]
**Actual:** [What happens]

**Environment:**
- Extension Version:
- Firefox Version:
- OS:
```

### 💡 Suggesting Features | اقتراح ميزات

<div dir="rtl">

لديك فكرة رائعة؟ نريد سماعها!

</div>

Have a great idea? We want to hear it!

1. **Check existing suggestions** — Avoid duplicates
2. **Create a feature request** — Use the template
3. **Explain the value** — Why would this help users?

```markdown
## Feature Request

**Problem:** [What problem does this solve?]

**Solution:** [Your proposed solution]

**Alternatives:** [Other approaches considered]

**Value:** [Who benefits and how?]
```

### 🔧 Contributing Code | المساهمة بالكود

<div dir="rtl">

جاهز للمساهمة بالكود؟ ممتاز!

</div>

Ready to contribute code? Excellent!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### 📖 Improving Documentation | تحسين التوثيق

<div dir="rtl">

التوثيق الجيد مهم جداً! يمكنك المساعدة في:

</div>

Good documentation matters! You can help by:

- Fixing typos and grammar
- Improving clarity
- Adding examples
- Translating content

### 🌍 Translation | الترجمة

<div dir="rtl">

ساعدنا في الوصول لمزيد من المستخدمين بترجمة الإضافة للغات أخرى.

</div>

Help us reach more users by translating the extension to other languages.

---

## 🛠️ Development Setup | إعداد بيئة التطوير

### Prerequisites | المتطلبات

- Firefox Browser (latest version)
- Git
- Code editor (VS Code recommended)

### Getting Started | البدء

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Claude-RTL-Responder.git

# 3. Navigate to project
cd Claude-RTL-Responder

# 4. Add upstream remote
git remote add upstream https://github.com/moner-dev/Claude-RTL-Responder.git

# 5. Create a branch
git checkout -b feature/your-feature-name
```

### Loading the Extension | تحميل الإضافة

1. Open Firefox
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select `manifest.json` from the project folder

### Development Workflow | سير العمل

```bash
# Keep your fork updated
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes, then commit
git add .
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/amazing-feature
```

---

## 📁 Project Structure | هيكل المشروع

```
claude-rtl-responder/
├── manifest.json          # Extension manifest (v3)
├── content/
│   ├── content.js         # Main content script
│   └── content.css        # RTL styles for Claude.ai
├── options/
│   ├── options.html       # Settings page structure
│   ├── options.css        # Settings page styles
│   └── options.js         # Settings page logic
├── icons/
│   ├── icon-48.png        # Toolbar icon
│   └── icon-96.png        # High-res icon
├── docs/                   # Additional documentation
├── README.md              # Project overview
├── LICENSE                # MIT License
├── CHANGELOG.md           # Version history
├── INSTALL.md             # Installation guide
├── SECURITY.md            # Security policy
└── CONTRIBUTING.md        # This file
```

### Key Files | الملفات الرئيسية

| File | Purpose | الغرض |
|------|---------|-------|
| `manifest.json` | Extension configuration | إعدادات الإضافة |
| `content/content.js` | RTL detection & styling | كشف وتنسيق RTL |
| `content/content.css` | RTL CSS styles | أنماط CSS للـ RTL |
| `options/options.js` | Settings management | إدارة الإعدادات |

---

## 📝 Coding Standards | معايير الكود

### JavaScript

```javascript
// ✅ Good: Clear, descriptive names
function detectArabicText(text) {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
}

// ❌ Bad: Unclear names
function check(t) {
    return /[\u0600-\u06FF]/.test(t);
}
```

### General Guidelines | الإرشادات العامة

1. **Naming Conventions**
   - Variables/Functions: `camelCase`
   - Constants: `UPPER_SNAKE_CASE`
   - CSS Classes: `kebab-case`

2. **Code Style**
   - Use 4 spaces for indentation
   - Use single quotes for strings
   - Add semicolons at end of statements
   - Keep lines under 100 characters

3. **Comments**
   ```javascript
   // Single line comment for brief explanations

   /**
    * Multi-line comment for functions
    * @param {string} text - The text to analyze
    * @returns {boolean} - True if RTL text detected
    */
   ```

4. **CSS Guidelines**
   ```css
   /* ✅ Good: Organized and readable */
   .rtl-message {
       direction: rtl;
       text-align: right;
       font-family: 'Segoe UI', Tahoma, sans-serif;
   }

   /* Group related properties */
   /* Use CSS custom properties for theming */
   ```

### Best Practices | أفضل الممارسات

- ✅ Keep functions small and focused
- ✅ Use meaningful variable names
- ✅ Handle errors gracefully
- ✅ Test your changes thoroughly
- ✅ Maintain backward compatibility
- ❌ Don't add unnecessary dependencies
- ❌ Don't use `eval()` or dynamic code
- ❌ Don't collect user data

---

## 📦 Commit Guidelines | إرشادات الالتزام

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types | الأنواع

| Type | Description | الوصف |
|------|-------------|-------|
| `feat` | New feature | ميزة جديدة |
| `fix` | Bug fix | إصلاح خطأ |
| `docs` | Documentation | توثيق |
| `style` | Formatting (no code change) | تنسيق |
| `refactor` | Code restructuring | إعادة هيكلة |
| `test` | Adding tests | إضافة اختبارات |
| `chore` | Maintenance | صيانة |

### Examples | أمثلة

```bash
# Feature
git commit -m "feat(content): add Hebrew RTL support"

# Bug fix
git commit -m "fix(options): resolve settings not saving"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Style
git commit -m "style(css): improve RTL message alignment"

# Refactor
git commit -m "refactor(content): simplify Arabic detection logic"
```

### Rules | القواعد

- ✅ Use present tense ("add" not "added")
- ✅ Use imperative mood ("move" not "moves")
- ✅ Keep subject line under 72 characters
- ✅ Reference issues when applicable (`fixes #123`)

---

## 🔀 Pull Request Process | عملية طلب الدمج

### Before Submitting | قبل الإرسال

- [ ] Code follows project style guidelines
- [ ] Self-reviewed the changes
- [ ] Tested in Firefox
- [ ] Updated documentation if needed
- [ ] No console errors or warnings
- [ ] Commit messages follow guidelines

### PR Template | قالب طلب الدمج

```markdown
## Description
[What does this PR do?]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Other: [describe]

## Testing
[How was this tested?]

## Screenshots
[If applicable]

## Related Issues
Closes #[issue number]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed changes
- [ ] Tested in Firefox
- [ ] Documentation updated
```

### Review Process | عملية المراجعة

1. **Submit PR** — Create pull request with clear description
2. **Automated Checks** — Wait for any CI checks to pass
3. **Code Review** — Maintainer reviews your code
4. **Address Feedback** — Make requested changes if any
5. **Approval** — PR approved by maintainer
6. **Merge** — Changes merged to main branch

### Tips for Faster Review | نصائح للمراجعة الأسرع

- Keep PRs focused and small
- Write clear descriptions
- Include screenshots for UI changes
- Respond to feedback promptly
- Test thoroughly before submitting

---

## 🐛 Issue Guidelines | إرشادات المشاكل

### Good Issue Examples | أمثلة جيدة

```markdown
✅ "RTL styling not applied to code blocks in Claude responses"
✅ "Settings reset after Firefox restart"
✅ "Add support for Persian (Farsi) language"
```

### Bad Issue Examples | أمثلة سيئة

```markdown
❌ "It doesn't work"
❌ "Bug"
❌ "Fix this"
```

### Issue Labels | تصنيفات المشاكل

| Label | Description |
|-------|-------------|
| `bug` | Something isn't working |
| `enhancement` | New feature request |
| `documentation` | Documentation improvements |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention needed |
| `question` | Further information requested |

---

## 🧪 Testing | الاختبار

### Manual Testing Checklist

<div dir="rtl">

قبل إرسال التغييرات، تأكد من اختبار:

</div>

Before submitting changes, test the following:

#### Content Script Tests
- [ ] Arabic text displays RTL correctly
- [ ] Mixed content (Arabic + English) works
- [ ] Code blocks remain LTR
- [ ] Long messages format properly

#### Options Page Tests
- [ ] Settings save correctly
- [ ] Settings persist after restart
- [ ] Toggle switches work
- [ ] Language switching works
- [ ] Reset to defaults works

#### General Tests
- [ ] No console errors
- [ ] Extension icon displays
- [ ] Popup functions correctly (if applicable)
- [ ] Works on claude.ai

### Testing Different Scenarios

```
Test Cases:
1. Pure Arabic message
2. Pure English message
3. Arabic with English words
4. Arabic with code snippets
5. Arabic with links/URLs
6. Long Arabic paragraph
7. Short Arabic phrase
8. Arabic in bullet points
9. Arabic in numbered lists
10. Arabic with emoji
```

---

## 📚 Documentation | التوثيق

### Writing Documentation

<div dir="rtl">

عند كتابة التوثيق، اتبع هذه الإرشادات:

</div>

When writing documentation, follow these guidelines:

1. **Be Bilingual** — Include Arabic and English
2. **Be Clear** — Use simple language
3. **Be Complete** — Cover all aspects
4. **Be Consistent** — Follow existing style

### Documentation Files

| File | Content |
|------|---------|
| `README.md` | Project overview |
| `INSTALL.md` | Installation guide |
| `CHANGELOG.md` | Version history |
| `SECURITY.md` | Security policy |
| `CONTRIBUTING.md` | Contribution guide |

---

## 🏆 Recognition | التقدير

<div dir="rtl">

نقدر جميع المساهمين! سيتم ذكر المساهمين في:

</div>

We appreciate all contributors! Contributors will be recognized in:

- README.md Contributors section
- Release notes for significant contributions
- GitHub Contributors graph

### Types of Contributions Recognized

- 💻 Code contributions
- 📖 Documentation improvements
- 🐛 Bug reports
- 💡 Feature suggestions
- 🌍 Translations
- 🎨 Design contributions
- 📣 Community support

---

## ❓ Questions? | أسئلة؟

<div dir="rtl">

لديك سؤال؟ لا تتردد في:

</div>

Have a question? Don't hesitate to:

- Open a [GitHub Discussion](https://github.com/moner-dev/Claude-RTL-Responder/discussions)
- Create an issue with the `question` label
- Check existing issues and discussions

---

## 📄 License | الرخصة

<div dir="rtl">

بالمساهمة في هذا المشروع، فإنك توافق على أن مساهماتك ستكون مرخصة بموجب رخصة MIT.

</div>

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to Claude RTL Responder!**

**شكراً لمساهمتك في Claude RTL Responder!**

<br>

[![Start Contributing](https://img.shields.io/badge/Start-Contributing-success?style=for-the-badge&logo=github&logoColor=white)](https://github.com/moner-dev/Claude-RTL-Responder/fork)

</div>
