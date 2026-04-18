# Claude RTL Responder - Testing Guide

## Phase 0 Verification Checklist

Follow these steps to verify the extension scaffold is working correctly.

---

### Step 1: Load the Extension

1. Open Firefox
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click **"Load Temporary Add-on..."**
4. Navigate to `claude-rtl-responder` folder
5. Select `manifest.json` and click **Open**

**Expected Result:**
- Extension appears in the list of Temporary Extensions
- No error messages appear
- Extension shows name "Claude RTL Responder" and version "0.1.0"

---

### Step 2: Check Browser Console for Errors

1. Press `Ctrl+Shift+J` (or `Cmd+Shift+J` on Mac) to open Browser Console
2. Look for any red error messages related to the extension
3. Filter by "Claude RTL" if needed

**Expected Result:**
- No errors related to the extension
- May see general Firefox messages (these are OK)

---

### Step 3: Verify Toolbar Icon

1. Look at the Firefox toolbar (top right area)
2. Find the extension icon (blue square with Arabic letter "ع")

**Expected Result:**
- Icon is visible in toolbar
- Icon displays correctly (blue background, white Arabic letter)

If icon is not visible:
- Click the puzzle piece icon (Extensions menu)
- Find "Claude RTL Responder" and pin it to toolbar

---

### Step 4: Test Content Script Injection

1. Navigate to https://claude.ai (log in if needed)
2. Press `Ctrl+Shift+K` (or `Cmd+Option+K` on Mac) to open Web Console
3. Look for messages starting with `[Claude RTL Responder]`

**Expected Result:**
- Console shows: `[Claude RTL Responder] Content script loaded on claude.ai (v0.1.0)`
- Console shows: `[Claude RTL Responder] Loaded state: enabled`
- Console shows: `[Claude RTL Responder] Scanning X potential RTL targets`
- Console shows: `[Claude RTL Responder] MutationObserver started`
- Console shows: `[Claude RTL Responder] Initialization complete`
- No red error messages

---

### Step 5: Test Popup

1. Click the extension icon in the toolbar
2. Popup should open

**Expected Result:**
- Popup opens and displays:
  - Title in Arabic: "مُعدِّل RTL لـ Claude"
  - Version badge: "v0.1.0"
  - Mode selector with two buttons: "عربي" and "English"
  - "عربي" button is active by default (blue background, checkmark ✓)
  - Status indicator showing "مُفعَّل · Arabic Mode Active" with green background
  - Info text in Arabic and English
- Text is right-aligned (RTL layout)
- Segmented control has rounded corners and gray background

---

## Phase 1 Verification Checklist

After Phase 0 passes, verify the RTL functionality.

---

### Test 1: Arabic Message Display

**Setup:**
1. Navigate to https://claude.ai
2. Start a new conversation or open an existing Arabic conversation

**Test:**
1. Send a message: `مرحباً، كيف يمكنني مساعدتك اليوم؟`
2. Wait for Claude's response

**Expected Result:**
- Claude's Arabic response appears **right-aligned**
- Arabic text flows from **right to left**
- Punctuation marks (periods, commas) appear on the **left side** of sentences
- Console shows: `[Claude RTL Responder] Applied RTL to: DIV font-claude-message` (or similar)

**Visual Check:**
```
                                                      مرحباً! كيف يمكنني مساعدتك؟
```
(Text should be on the right side of the message bubble)

---

### Test 2: English Message Display

**Test:**
1. Send a message: `Hello, how are you today?`
2. Wait for Claude's response

**Expected Result:**
- Claude's English response appears **left-aligned** (normal)
- English text flows from **left to right**
- RTL is **NOT applied** to pure English content

---

### Test 3: Mixed Arabic/English Content

**Test:**
1. Send: `اشرح لي ما هو JavaScript ببساطة`
2. Wait for Claude's response (should contain Arabic with English terms like "JavaScript")

**Expected Result:**
- The response is predominantly right-aligned (RTL)
- English terms like "JavaScript" appear correctly within the RTL flow
- Technical terms render readably

---

### Test 4: Code Block Preservation

**Test:**
1. Send: `اكتب لي كود Python بسيط لطباعة "مرحباً"`
2. Wait for Claude's response with code

**Expected Result:**
- The Arabic explanation text is right-aligned (RTL)
- The **code block remains left-aligned** (LTR)
- Code syntax is readable and properly formatted:
```python
print("مرحباً")
```
- The code block does NOT flip to RTL
- Console may show skipping of protected elements

---

### Test 5: User Input Field

**Test:**
1. Click on the input field at the bottom
2. Type in Arabic: `هذا نص تجريبي`

**Expected Result:**
- Text flows **right to left** as you type
- Cursor appears on the left side of the text
- The input field feels natural for Arabic typing

**Additional Test:**
1. Clear the input
2. Type in English: `This is a test`

**Expected Result:**
- Text flows **left to right** as you type (normal English behavior)
- The `dir="auto"` allows both directions to work naturally

---

### Test 6: Streaming Response

**Test:**
1. Send a message that will generate a long Arabic response
2. Watch as Claude streams the response

**Expected Result:**
- RTL is applied during streaming, not just after completion
- Text appears right-aligned from the start
- No visible "flip" from LTR to RTL when streaming completes
- Smooth rendering without flickering

---

## Phase 1.5 Verification - Mode Switcher

After Phase 1 passes, verify the mode switching functionality.

---

### Test 7: Mode Switching

**Test (Switch to English Mode):**
1. Click the extension icon
2. Click the "English" button in the segmented control
3. Observe the page

**Expected Result (English Mode):**
- "English" button becomes active (blue background, checkmark)
- "عربي" button becomes inactive (gray)
- Status indicator changes to gray with "مُعطَّل · English Mode (No Changes)"
- All Arabic text reverts to **left-aligned** (default Claude behavior)
- Console shows: `[Claude RTL Responder] Activated English mode (passive)`
- Console shows: `[Claude RTL Responder] Cleaned up RTL from X elements`
- Console shows: `[Claude RTL Responder] MutationObserver stopped`

**Test (Switch to Arabic Mode):**
1. Click the "عربي" button
2. Observe the page

**Expected Result (Arabic Mode):**
- "عربي" button becomes active (blue background, checkmark)
- "English" button becomes inactive (gray)
- Status indicator changes to green with "مُفعَّل · Arabic Mode Active"
- Arabic text immediately becomes **right-aligned** again
- Console shows: `[Claude RTL Responder] Activated Arabic mode`
- Console shows: `[Claude RTL Responder] Applied RTL to: ...`
- Console shows: `[Claude RTL Responder] MutationObserver started`

---

### Test 8: Keyboard Navigation (Accessibility)

**Test:**
1. Click the extension icon to open popup
2. Press Tab to focus on the mode selector buttons
3. Press Left/Right arrow keys

**Expected Result:**
- Arrow keys switch between mode buttons
- Focus moves visually (focus ring visible)
- Mode changes when button is focused via arrow keys
- Both buttons are keyboard accessible

---

### Test 9: Mode Persistence Across Reload

**Test (Arabic Mode):**
1. With Arabic mode active, refresh the claude.ai page (Ctrl+R)
2. Check the console and observe the page

**Expected Result:**
- Extension loads in Arabic mode automatically
- Arabic content is right-aligned immediately
- Console shows: `[Claude RTL Responder] Loaded mode from storage: arabic`
- Console shows: `[Claude RTL Responder] Initialization complete, mode: arabic`

**Test (English Mode):**
1. Switch to English mode
2. Refresh the page
3. Check console and page

**Expected Result:**
- Extension stays in English mode after refresh
- Page shows default LTR alignment (no modifications)
- Console shows: `[Claude RTL Responder] Loaded mode from storage: english`
- Console shows: `[Claude RTL Responder] English mode - staying passive`
- Popup shows "English" button as active

---

## Phase 2 Part 1 Verification - Keyboard Shortcuts

After Phase 1.5 passes, verify the keyboard shortcut functionality.

---

### Test 10: Toggle Mode via Keyboard

**Setup:**
1. Reload the extension in `about:debugging`
2. Navigate to https://claude.ai
3. Ensure you have an Arabic conversation visible

**Test:**
1. Verify current mode is "عربي" (Arabic) - Arabic text should be RTL
2. Press **`Alt+G`**

**Expected Result:**
- Mode switches to English instantly (without popup opening)
- All RTL styling removed from the page
- Arabic text becomes left-aligned (default behavior)
- Console shows: `[Claude RTL Responder] Mode toggled via keyboard: english`

**Test (Toggle back):**
1. Press **`Alt+G`** again

**Expected Result:**
- Mode switches back to Arabic
- RTL styling reapplied to Arabic content
- Console shows: `[Claude RTL Responder] Mode toggled via keyboard: arabic`

---

### Test 11: Open Popup via Keyboard

**Test:**
1. While on claude.ai (or any page), press **`Alt+O`**

**Expected Result:**
- Extension popup opens
- Popup displays current mode correctly (button highlighted matches actual mode)
- All popup functionality works normally

---

### Test 12: Shortcuts Display in Popup

**Test:**
1. Click the extension icon to open the popup
2. Look for the shortcuts hint section

**Expected Result:**
- Popup displays a subtle shortcuts section showing:
  - "تبديل الوضع" with `Alt+G`
  - "فتح النافذة" with `Alt+O`
- Keyboard keys have a styled `<kbd>` appearance (white/gray button look)
- Section is visually secondary (subtle background, smaller text)

---

### Test 13: Shortcuts in Firefox Add-ons Manager

**Test:**
1. Open `about:addons` in Firefox
2. Click the gear/settings icon (top right)
3. Select "Manage Extension Shortcuts"

**Expected Result:**
- "Claude RTL Responder" section appears
- Lists two shortcuts:
  - "Toggle between Arabic and English mode" → `Alt+G`
  - "Open the Claude RTL Responder popup" → `Alt+O`
- User can click and change these shortcuts to custom combinations

---

### Test 14: Mode Sync Between Keyboard and Popup

**Test:**
1. Start in Arabic mode
2. Press `Alt+G` to toggle to English mode
3. Open the popup (click icon or press `Alt+O`)

**Expected Result:**
- Popup shows "English" button as active
- Status indicator shows gray "مُعطَّل · English Mode (No Changes)"
- Mode state is properly synced

**Test (Reverse):**
1. While popup is closed, press `Alt+G` to toggle back to Arabic
2. Open the popup

**Expected Result:**
- Popup shows "عربي" button as active
- Status indicator shows green "مُفعَّل · Arabic Mode Active"

---

### Test 15: Shortcut on Non-Claude Tab

**Test:**
1. Navigate to any non-claude.ai website (e.g., google.com)
2. Press `Alt+G`

**Expected Result:**
- Mode still toggles in storage (no error)
- Console (Browser Console, not page console) shows: `[Claude RTL Responder] Mode toggled via keyboard: [mode]`
- No content script message (expected - content script only runs on claude.ai)
- Next time you visit claude.ai, the new mode will be active

---

## Phase 2 Part 2A Verification - Options Page UI

After Phase 2 Part 1 passes, verify the options page UI functionality.

---

### Test 16: Settings Button in Popup

**Test:**
1. Click the extension icon to open the popup
2. Look for the "إعدادات متقدمة / Advanced Settings" button at the bottom

**Expected Result:**
- Button appears after the keyboard shortcuts hint section
- Button has a gear emoji icon
- Button has both Arabic and English labels
- Button has a subtle/secondary appearance (not as prominent as mode buttons)

---

### Test 17: Open Options Page

**Test:**
1. Click the "إعدادات متقدمة" button in the popup

**Expected Result:**
- A new tab opens with the options page
- Page URL is something like `moz-extension://[id]/options/options.html`
- Page has RTL layout (right-to-left)
- Page displays the title "إعدادات متقدمة / Advanced Settings"

---

### Test 18: Live Preview Box

**Test:**
1. On the options page, observe the "معاينة مباشرة / Live Preview" section at the top

**Expected Result:**
- Preview box shows sample Arabic and English text
- Text includes: "مرحباً! هذه معاينة مباشرة للإعدادات."
- Preview has a Claude-like message styling (border on the side)

---

### Test 19: Font Size Setting

**Test:**
1. Locate the "حجم الخط / Font Size" section
2. Click each option: صغير (Small), متوسط (Medium), كبير (Large)

**Expected Result:**
- Default selection is "متوسط" (Medium)
- Clicking each button:
  - Updates the button to active state (blue background)
  - Immediately changes the preview text size
  - Shows "تم الحفظ ✓" toast notification
- Small = smaller text, Large = larger text in preview

---

### Test 20: Line Spacing Setting

**Test:**
1. Locate the "تباعد الأسطر / Line Spacing" section
2. Click each option: مُدمج (Compact), عادي (Normal), مريح (Relaxed)

**Expected Result:**
- Default selection is "عادي" (Normal)
- Clicking each button:
  - Updates the button to active state (blue background)
  - Immediately changes the preview line spacing
  - Shows "تم الحفظ ✓" toast notification
- Compact = tighter lines, Relaxed = more space between lines

---

### Test 21: RTL Indicator Setting

**Test:**
1. Locate the "مؤشر RTL / RTL Indicator" section
2. Toggle the switch ON
3. Change the color using the color picker

**Expected Result:**
- Default: toggle is OFF, color picker is disabled/grayed
- Turning toggle ON:
  - Color picker becomes active
  - A colored dot appears in the preview box (top-left corner)
  - "تم الحفظ ✓" toast appears
- Changing color:
  - The indicator dot in preview updates to the new color
  - "تم الحفظ ✓" toast appears
- Turning toggle OFF:
  - Indicator dot disappears from preview
  - Color picker becomes disabled again

---

### Test 22: Save Toast Notification

**Test:**
1. Make any setting change on the options page

**Expected Result:**
- Green "تم الحفظ ✓" toast appears at the bottom of the screen
- Toast slides up smoothly
- Toast disappears after approximately 1.5 seconds
- Making another change before toast disappears resets the timer

---

### Test 23: Settings Persistence (Tab Close)

**Test:**
1. Change some settings (e.g., font size to "كبير", line spacing to "مريح")
2. Close the options tab
3. Reopen the options page (via popup button or `about:addons`)

**Expected Result:**
- All previously changed settings are still selected
- Preview reflects the saved settings
- No "تم الحفظ" toast on initial load (only on changes)

---

### Test 24: Settings Persistence (Browser Restart)

**Test:**
1. Change some settings
2. Close and reopen Firefox completely
3. Open the extension's options page

**Expected Result:**
- All settings persist across browser restart
- UI shows the correct saved values

---

### Test 25: Claude.ai Not Affected (Intentional)

**Test:**
1. Open claude.ai in another tab
2. Have an Arabic conversation visible
3. On the options page, change font size or line spacing

**Expected Result:**
- Claude.ai page does NOT change
- Only the options page preview updates
- This is intentional — Part 2B will connect settings to claude.ai

---

### Test 26: Dark Mode Support

**Test:**
1. Enable dark mode in your OS/browser
2. Open the options page

**Expected Result:**
- Page has dark background
- Text is light colored
- All controls (buttons, toggle, color picker) are visible and usable
- Contrast is sufficient for readability

---

## Phase 2 Part 2B Verification - Settings Connection & Language Switcher

After Phase 2 Part 2A passes, verify that settings actually affect claude.ai and the language switcher works.

---

### Test 27: Font Size Affects Claude.ai

**Setup:**
1. Navigate to https://claude.ai
2. Ensure Arabic mode is active (text is RTL)
3. Have an Arabic conversation visible

**Test:**
1. Open the options page (via popup "إعدادات متقدمة" button)
2. Change font size to "كبير" (Large)
3. Switch back to the claude.ai tab

**Expected Result:**
- Arabic text on claude.ai is noticeably larger immediately
- No page refresh needed
- Console shows: `[Claude RTL Responder] Applied dynamic styles:`
- Console shows: `[Claude RTL Responder] Updated settings:`

**Test (Change to Small):**
1. Go back to options page
2. Change font size to "صغير" (Small)
3. Switch to claude.ai tab

**Expected Result:**
- Arabic text becomes noticeably smaller
- Change is instant

---

### Test 28: Line Spacing Affects Claude.ai

**Test:**
1. With Arabic conversation visible on claude.ai
2. Open options page
3. Change line spacing to "مريح" (Relaxed)
4. Switch to claude.ai tab

**Expected Result:**
- Lines of Arabic text have more space between them
- Multi-line responses show visible difference

**Test (Change to Compact):**
1. Change line spacing to "مُدمج" (Compact)
2. Switch to claude.ai tab

**Expected Result:**
- Lines are closer together
- Text appears more condensed

---

### Test 29: RTL Indicator Affects Claude.ai

**Test:**
1. With Arabic conversation visible on claude.ai
2. Open options page
3. Enable the RTL indicator toggle
4. Switch to claude.ai tab

**Expected Result:**
- Small colored dots appear on Arabic text elements
- Dots indicate which elements have RTL applied
- Dot color matches the color picker value

**Test (Change Color):**
1. Change indicator color to red (#ff0000)
2. Switch to claude.ai tab

**Expected Result:**
- Indicator dots change to red
- Color updates instantly

**Test (Disable):**
1. Turn off the indicator toggle
2. Switch to claude.ai tab

**Expected Result:**
- All indicator dots disappear
- Only RTL styling remains (no visual indicator)

---

### Test 30: Settings Broadcast to Multiple Tabs

**Test:**
1. Open claude.ai in two separate tabs (Tab A and Tab B)
2. Have Arabic conversations in both
3. Open options page
4. Change font size to "كبير"

**Expected Result:**
- Both Tab A and Tab B update simultaneously
- Console in both tabs shows settings update message
- No need to refresh either tab

---

### Test 31: Settings in English Mode (No Effect)

**Test:**
1. Switch to English mode via popup or Alt+G
2. Open options page
3. Change font size to "كبير"
4. Switch to claude.ai tab

**Expected Result:**
- No visible change on claude.ai (English mode is passive)
- Settings are saved but not applied
- Console shows: `[Claude RTL Responder] Cleared dynamic styles`

**Test (Switch Back):**
1. Switch to Arabic mode
2. Observe claude.ai

**Expected Result:**
- Settings immediately apply with the saved "كبير" font size
- Dynamic styles are injected

---

### Test 32: Language Switcher - Default State

**Test:**
1. Open the options page for the first time (or clear extension storage)

**Expected Result:**
- Page is in Arabic (RTL layout)
- "العربية" button is active in the language switcher
- All labels show Arabic text (e.g., "حجم الخط", "تباعد الأسطر")
- English labels are hidden

---

### Test 33: Language Switcher - Switch to English

**Test:**
1. On the options page, click the "English" button in the language switcher

**Expected Result:**
- Page direction changes to LTR (left-to-right)
- "English" button becomes active
- All labels switch to English (e.g., "Font Size", "Line Spacing")
- Arabic labels are hidden
- Toggle slider animates from right to left position
- Layout feels natural for English reading

---

### Test 34: Language Switcher - Switch Back to Arabic

**Test:**
1. After switching to English, click "العربية" button

**Expected Result:**
- Page direction changes back to RTL
- "العربية" button becomes active
- All labels return to Arabic
- Toggle slider animates back to right position

---

### Test 35: Language Preference Persistence

**Test:**
1. Switch options page to English
2. Close the options tab
3. Reopen the options page

**Expected Result:**
- Options page opens in English (not Arabic)
- Language preference was saved
- No need to switch again

**Test (Browser Restart):**
1. Close and reopen Firefox
2. Open the options page

**Expected Result:**
- Language preference persists across browser restart

---

### Test 36: Language Switch Does Not Affect Claude.ai

**Test:**
1. Open claude.ai with Arabic content
2. Open options page
3. Switch language to English
4. Switch to claude.ai tab

**Expected Result:**
- Claude.ai is NOT affected by options page language
- Arabic mode still active on claude.ai
- Language switcher only affects the options page UI

---

### Test 37: Dynamic Stylesheet Inspection

**Test:**
1. On claude.ai with Arabic mode active
2. Open DevTools (F12 or Ctrl+Shift+I)
3. Go to Elements/Inspector tab
4. Look in `<head>` section

**Expected Result:**
- A `<style id="claude-rtl-dynamic-styles">` element exists
- Contains CSS rules for `.claude-rtl-active`
- Shows current font-size and line-height values
- If indicator enabled, contains `::before` pseudo-element rules

---

### Test 38: Dynamic Stylesheet Cleanup

**Test:**
1. With Arabic mode active, inspect `<head>` and find dynamic stylesheet
2. Switch to English mode (Alt+G or popup)
3. Inspect `<head>` again

**Expected Result:**
- Dynamic stylesheet element still exists but is empty
- No styles applied to `.claude-rtl-active`
- Console shows: `[Claude RTL Responder] Cleared dynamic styles`

---

## Phase 3.A Part 1 Verification - About the Extension Section

After Phase 2 Part 2B passes, verify the About the Extension section in the Options page.

---

### Test 39: About Section Visibility

**Test:**
1. Reload the extension in `about:debugging`
2. Open the Options page from the popup ("إعدادات متقدمة" button)
3. Scroll down on the Options page

**Expected Result:**
- New "عن الأداة / About the Extension" section appears
- Section is located AFTER the "RTL Indicator" section
- Section is located BEFORE the footer
- Section has the same card styling as other sections (rounded corners, background)

---

### Test 40: Video Placeholder

**Test:**
1. Locate the video placeholder at the top of the About section
2. Observe the placeholder appearance
3. Hover over the placeholder

**Expected Result:**
- 16:9 aspect ratio container with rounded corners
- Dark background with centered play button icon (blue circle with triangle)
- Text overlay: "شاهد الفيديو التوضيحي / Watch Demo Video"
- "قريباً / Coming Soon" ribbon in the corner
- On hover: subtle scale and border color change
- Currently non-functional (href="#") since video not uploaded

---

### Test 41: Extension Description

**Test:**
1. Locate the extension description below the video placeholder
2. Observe the content in Arabic mode

**Expected Result:**
- Arabic description paragraph is visible
- Text describes the extension's purpose and features
- Mentions: automatic RTL detection, code block preservation, customization

**Test (Switch to English):**
1. Click "English" in the language switcher

**Expected Result:**
- English description replaces Arabic
- Same content in English

---

### Test 42: Key Features List

**Test:**
1. Locate the "المميزات الرئيسية / Key Features" section
2. Count the feature items

**Expected Result:**
- 9 feature items displayed
- Each has a blue checkmark icon
- Features include: RTL detection, mixed-content handling, code preservation, etc.
- Two-column grid layout on wider screens
- Stacks to single column on narrow screens

---

### Test 43: Installation Cards

**Test:**
1. Locate the "طرق التثبيت / Installation Methods" section
2. Observe both installation cards

**Expected Result:**
- Two cards side by side (or stacked on mobile)
- **Firefox AMO card:**
  - Muted/disabled appearance (lower opacity)
  - "قريباً / Soon" ribbon
  - Shows "Coming Soon" subtitle
  - Not clickable (`cursor: not-allowed`)
- **GitHub card:**
  - Active appearance (full opacity)
  - GitHub icon in blue
  - "التثبيت من GitHub / Install from GitHub" title
  - "نسخة مطور / Developer Edition" subtitle
  - Clickable with hover effect

**Test (Click GitHub Card):**
1. Click the GitHub installation card

**Expected Result:**
- Opens `https://github.com/moner-dev/Claude-RTL-Responder` in new tab
- Note: URL has capital C in "Claude-RTL-Responder"

---

### Test 44: Action Buttons Row

**Test:**
1. Locate the action buttons row at the bottom of the About section
2. Identify all four buttons

**Expected Result:**
- Four buttons visible: GitHub Repository, Installation Guide, Report Issue, Documentation
- Each button has an icon and bilingual label
- Buttons have outlined style (not filled)
- Buttons wrap to next line on narrow screens

**Test (Click Each Button):**
1. Click "مستودع GitHub / GitHub Repository"
2. Click "دليل التثبيت / Installation Guide"
3. Click "الإبلاغ عن مشكلة / Report Issue"
4. Click "التوثيق / Documentation"

**Expected Result:**
- Repository → `https://github.com/moner-dev/Claude-RTL-Responder`
- Installation Guide → `https://github.com/moner-dev/Claude-RTL-Responder/blob/main/INSTALL.md` (may 404 until file created)
- Report Issue → `https://github.com/moner-dev/Claude-RTL-Responder/issues`
- Documentation → `https://github.com/moner-dev/Claude-RTL-Responder#readme`
- All links open in new tabs

---

### Test 45: Language Switching in About Section

**Test:**
1. With options page in Arabic mode, observe the About section
2. Switch to English mode
3. Observe all text changes

**Expected Result:**
- Section title: "عن الأداة" → "About the Extension"
- Video label: "شاهد الفيديو التوضيحي" → "Watch Demo Video"
- Description paragraph switches language
- Features list items switch language
- Install card titles switch language
- Action button labels switch language
- All transitions are instant (no page reload)

---

### Test 46: Dark Mode in About Section

**Test:**
1. Enable dark mode in your OS/browser
2. Open the options page
3. Scroll to the About section

**Expected Result:**
- Video placeholder has dark background
- Description box has dark background
- Feature items have dark backgrounds
- Install cards have dark backgrounds
- All text is readable (light on dark)
- Blue accent colors still visible (play icon, checkmarks, GitHub icon)
- No contrast issues

---

### Test 47: Responsive Layout — Multi-Breakpoint

**Test (Mobile — <768px):**
1. Open the options page
2. Resize browser window to narrow width (~400px)

**Expected Result:**
- Container uses full width with 16px padding
- Video placeholder maintains 16:9 aspect ratio, centered
- Features grid: single column
- Install cards: stacked vertically
- Action buttons wrap to multiple rows
- Simple settings sections are compact
- No horizontal scrolling

**Test (Tablet — 768px to 1024px):**
1. Resize browser window to ~900px width

**Expected Result:**
- Container max-width: 720px, centered
- Video placeholder scales up, max 720px wide
- Features grid: 2 columns
- Install cards: side-by-side (2 columns)
- Simple settings controls stay at comfortable width

**Test (Desktop — 1024px to 1440px):**
1. Resize browser window to ~1200px width

**Expected Result:**
- Container max-width: 960px, centered
- Video placeholder at full 720px width
- Features grid: **3 columns** (key change)
- Install cards: larger with more padding
- Simple settings controls constrained to ~500px
- Description text limited to 680px for readability
- Action buttons may fit on one line

**Test (Wide — >1440px):**
1. Resize browser window to 1920px width (full HD)

**Expected Result:**
- Container max-width: 1200px, centered with generous margins
- Video placeholder prominent but not stretched
- Features grid: 3 columns, well-spaced
- About section feels spacious, not cramped
- Simple settings sections don't stretch awkwardly
- All content properly centered

---

### Test 48: Console Errors Check

**Test:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Navigate through the About section, click links, switch languages

**Expected Result:**
- No JavaScript errors in console
- No CSS warnings
- No failed network requests (all resources are inline SVGs)

---

## Phase 3.A Part 2 Verification - About the Developer Section

After Phase 3.A Part 1 passes, verify the Developer section and Documentation button removal.

---

### Test 49: Documentation Button Removed

**Test:**
1. Reload the extension
2. Open the Options page
3. Scroll to "About the Extension" section
4. Look at the action buttons row

**Expected Result:**
- Only 3 buttons present: "GitHub Repository", "Installation Guide", "Report Issue"
- "Documentation / التوثيق" button is NOT present
- No visual gap or broken layout where the button was

---

### Test 50: Developer Section Visibility

**Test:**
1. Scroll down past "About the Extension" section
2. Locate the "عن المطور / About the Developer" section

**Expected Result:**
- New section appears AFTER "About the Extension"
- Section appears BEFORE the footer
- Section has the same card styling as other sections (rounded corners, background)
- Section title shows "عن المطور" in Arabic mode, "About the Developer" in English mode

---

### Test 51: Developer Identity Card

**Test:**
1. Locate the developer identity card at the top of the Developer section

**Expected Result:**
- Centered layout with distinct background (subtle gradient)
- Name displayed: `M.O.N.E.R` (large, bold, with letter spacing)
- Title below name (bilingual):
  - Arabic: "مطوّر تطبيقات ومتخصص في الذكاء الاصطناعي"
  - English: "Application Developer & AI Specialist"
- Organization: `MONER INTELLIGENCE SYSTEMS` in blue accent color (#2563eb)
- Generous vertical padding
- Text is centered

---

### Test 52: Developer Bio

**Test:**
1. Locate the bio paragraph below the identity card
2. Observe the content in Arabic mode

**Expected Result:**
- Bio text is readable and well-spaced
- Line length is comfortable (max ~680px)
- Arabic bio visible in Arabic mode
- Switch to English → English bio visible
- Both versions describe developer's expertise and focus

---

### Test 53: Projects Grid

**Test:**
1. Locate the "مشاريع أخرى / Other Projects" section
2. Count the project cards

**Expected Result:**
- 4 project cards displayed
- Projects are:
  1. Ghost Protocol Helpdesk
  2. DeadBYTE
  3. MyWorld Password Manager
  4. Professional Label Design Print
- Each card shows: project name, description (bilingual), tech badge ("Electron")
- Grid is 2×2 on tablet/desktop, single column on mobile

---

### Test 54: Project Card Hover Effects

**Test:**
1. Hover over each project card

**Expected Result:**
- Card lifts slightly (translateY)
- Border color changes to blue accent (#2563eb)
- Subtle shadow appears
- Cursor shows pointer
- Transition is smooth (200ms)

---

### Test 55: Project Card Links

**Test:**
1. Click "Ghost Protocol Helpdesk" card
2. Click "DeadBYTE" card
3. Click "MyWorld Password Manager" card
4. Click "Professional Label Design Print" card

**Expected Result:**
- Ghost Protocol → `https://github.com/moner-dev/ghost-protocol-helpdesk` (new tab)
- DeadBYTE → `https://github.com/moner-dev/DeadByte` (new tab)
- MyWorld → `https://github.com/moner-dev/MyWorld-Password-Manager` (new tab)
- Label Design → `https://github.com/moner-dev/Professional-Label-Design-Print` (new tab)
- All links open in new tabs (target="_blank")

---

### Test 56: Developer Contact Buttons

**Test:**
1. Locate the contact buttons row at the bottom of the Developer section
2. Click "صفحة GitHub / GitHub Profile" button
3. Click "تواصل / Contact" button

**Expected Result:**
- Two buttons present: GitHub Profile and Contact
- Buttons have same outlined style as About the Extension buttons
- GitHub Profile → opens `https://github.com/moner-dev` in new tab
- Contact → opens email client with `moner.intelligence@gmail.com` (mailto: link)
- Buttons have hover effects (border accent, color change)

---

### Test 57: Language Switching in Developer Section

**Test:**
1. With options page in Arabic mode, observe the Developer section
2. Switch to English mode
3. Observe all text changes

**Expected Result:**
- Section title: "عن المطور" → "About the Developer"
- Developer title switches language
- Bio paragraph switches language
- Projects section title: "مشاريع أخرى" → "Other Projects"
- All project descriptions switch language
- Contact button labels switch language
- All transitions are instant (no page reload)

---

### Test 58: Dark Mode in Developer Section

**Test:**
1. Enable dark mode in your OS/browser
2. Open the options page
3. Scroll to the Developer section

**Expected Result:**
- Identity card has dark gradient background
- Bio box has dark background
- Project cards have dark backgrounds
- Tech badges readable on dark background
- Blue accent colors visible (org name, hover states)
- All text readable (light on dark)
- No contrast issues

---

### Test 59: Developer Section Responsive Layout

**Test (Mobile — <768px):**
1. Resize browser window to ~400px width

**Expected Result:**
- Identity card: full width, comfortable padding
- Projects grid: single column (4 cards stacked)
- Contact buttons wrap if needed
- No horizontal scrolling

**Test (Tablet/Desktop — ≥768px):**
1. Resize browser window to ~900px+ width

**Expected Result:**
- Identity card: generous padding
- Projects grid: 2×2 layout
- Contact buttons on single row
- Good visual balance

---

## Quick Verification Checklist

Copy and fill in after testing:

```
Phase 0:
[ ] Extension loads without errors
[ ] No errors in Browser Console
[ ] Toolbar icon displays correctly
[ ] Content script logs initialization messages
[ ] Popup opens with Arabic text in RTL

Phase 1:
[ ] Arabic messages display right-to-left
[ ] English messages stay left-to-right
[ ] Mixed content renders correctly
[ ] Code blocks stay LTR inside RTL messages
[ ] User input supports RTL typing
[ ] Streaming responses apply RTL smoothly

Phase 1.5 (Mode Switcher):
[ ] Popup shows segmented control with عربي/English buttons
[ ] Arabic mode button is active by default (blue with checkmark)
[ ] Clicking English mode removes all RTL styling instantly
[ ] Clicking Arabic mode reapplies RTL to existing Arabic content
[ ] Status indicator updates (green for Arabic, gray for English)
[ ] Mode persists across page reload
[ ] Mode persists when opening popup (correct button highlighted)
[ ] Observer stops in English mode (no console spam)
[ ] Observer restarts in Arabic mode

Phase 2 Part 1 (Keyboard Shortcuts):
[ ] Alt+G toggles mode without opening popup
[ ] Alt+O opens the popup
[ ] Popup displays shortcuts hint section
[ ] Shortcuts appear in about:addons → Manage Extension Shortcuts
[ ] Mode syncs correctly between keyboard toggle and popup UI
[ ] Toggle works even on non-claude.ai tabs (updates storage)
[ ] Background script loads without errors (check Browser Console)

Phase 2 Part 2A (Options Page UI):
[ ] "إعدادات متقدمة" button appears in popup
[ ] Clicking button opens options page in new tab
[ ] Options page has RTL layout
[ ] Live preview shows sample Arabic/English text
[ ] Font size segmented control works (3 options)
[ ] Line spacing segmented control works (3 options)
[ ] RTL indicator toggle works
[ ] Color picker enables/disables based on toggle
[ ] Preview updates instantly on any change
[ ] "تم الحفظ ✓" toast appears after each change
[ ] Settings persist after closing/reopening tab
[ ] Settings persist after browser restart
[ ] Claude.ai is NOT affected (intentional for Part 2A)
[ ] Dark mode support works

Phase 2 Part 2B (Settings Connection & Language Switcher):
[ ] Font size changes on options page affect claude.ai instantly
[ ] Line spacing changes affect claude.ai instantly
[ ] RTL indicator toggle shows/hides dots on claude.ai
[ ] Indicator color changes apply to claude.ai
[ ] Settings broadcast to multiple claude.ai tabs simultaneously
[ ] Settings have no effect in English mode (passive)
[ ] Dynamic stylesheet exists in <head> with id "claude-rtl-dynamic-styles"
[ ] Dynamic stylesheet cleared when switching to English mode
[ ] Language switcher defaults to Arabic
[ ] Clicking "English" switches options page to LTR with English labels
[ ] Clicking "العربية" switches back to RTL with Arabic labels
[ ] Language preference persists after closing tab
[ ] Language preference persists after browser restart
[ ] Language switcher does NOT affect claude.ai

Phase 3.A Part 1 (About the Extension Section):
[ ] About section appears after RTL Indicator, before footer
[ ] Video placeholder has play icon and "Coming Soon" ribbon
[ ] Video placeholder has hover effect
[ ] Extension description visible in Arabic (default)
[ ] Description switches to English with language toggle
[ ] 9 feature items with checkmark icons displayed
[ ] Features in 2-column grid (single column on mobile)
[ ] AMO install card is disabled/muted with "Soon" ribbon
[ ] GitHub install card is active and clickable
[ ] GitHub card opens correct repo URL in new tab
[ ] 3 action buttons visible (Repository, Guide, Issue) — Documentation removed
[ ] Action buttons open correct URLs in new tabs
[ ] Dark mode renders About section correctly
[ ] No console errors when interacting with About section
[ ] Mobile (<768px): single column, compact layout
[ ] Tablet (~900px): 2-column features, comfortable width
[ ] Desktop (~1200px): 3-column features, generous space
[ ] Wide (1920px): container max 1200px, centered with margins
[ ] Simple settings don't stretch on wide screens
[ ] Video placeholder scales well (max 720px)

Phase 3.A Part 2 (About the Developer Section):
[ ] Documentation button removed from About the Extension section
[ ] Developer section appears after About the Extension, before footer
[ ] Developer identity card displays M.O.N.E.R with title and org
[ ] Organization "MONER INTELLIGENCE SYSTEMS" in blue accent
[ ] Developer bio readable and well-spaced (max 680px)
[ ] Bio switches language with language toggle
[ ] 4 project cards displayed in projects grid
[ ] Projects grid: 2×2 on tablet+, single column on mobile
[ ] Project cards have hover effects (lift, border accent)
[ ] Each project card opens correct GitHub URL in new tab
[ ] GitHub Profile button opens moner-dev profile
[ ] Contact button opens email client with correct address
[ ] All developer section text switches with language toggle
[ ] Dark mode renders developer section correctly
```

---

## Troubleshooting

### RTL not applied to Arabic text

1. Check console for error messages
2. Verify the selectors match Claude's current DOM:
   - `[data-is-streaming]` for streaming content
   - `.font-claude-message` for message text
3. Try hard-refreshing: `Ctrl+Shift+R`
4. Reload extension in `about:debugging`

### Code blocks appear RTL

1. Check if `pre` and `code` elements have the LTR override
2. Inspect the code block element for conflicting styles
3. Verify CSS is being injected (check `<head>` for `rtl.css` content)

### Toggle doesn't work

1. Check popup console for errors (right-click popup → Inspect)
2. Verify `browser.storage.local` permissions
3. Check if message is reaching content script (look for `Received message` in console)

### Input field doesn't support RTL

1. Check if input has `[contenteditable="true"]` attribute
2. Verify the input element matches our selectors
3. Try typing Arabic after typing English (and vice versa)

### Keyboard shortcuts don't work

1. Check if another extension or Firefox itself uses the same shortcut
2. Open `about:addons` → gear icon → "Manage Extension Shortcuts"
3. Verify shortcuts are assigned (not blank or conflicting)
4. Check Browser Console (`Ctrl+Shift+J`) for background script errors
5. Try reloading the extension in `about:debugging`
6. If on a restricted page (about:*, addons.mozilla.org), shortcuts may not work

### Alt+G toggles but page doesn't update

1. Verify you're on claude.ai (content script only loads there)
2. Check web console for `MODE_CHANGE` message received
3. Refresh the page and check if new mode is applied on load
4. Ensure content script initialized: look for `[Claude RTL Responder] Content script loaded`

---

## Known Limitations (Phase 1)

1. **No custom Arabic font** - Uses system fonts; custom font coming in Phase 6
2. **No per-element toggle** - All-or-nothing for the entire page
3. **Detection mode fixed to auto** - Cannot force RTL on English content
4. **DOM structure dependent** - If Claude updates their HTML, selectors may break

---

## Next Steps After Phase 1

If all tests pass:
1. Phase 5: Settings popup with more options
2. Phase 6: Arabic font (IBM Plex Sans Arabic)
3. Phase 7: Final testing and documentation
