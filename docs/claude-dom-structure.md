# Claude.ai DOM Structure Reconnaissance

**Date of Reconnaissance:** ____________
**Firefox Version:** ____________
**Claude.ai URL:** https://claude.ai

---

## Instructions for Reconnaissance

### Setup
1. Open Firefox with the extension loaded (Phase 0 verified)
2. Navigate to https://claude.ai and log in
3. Start a new conversation
4. Send a test message in Arabic: "مرحباً، كيف يمكنني مساعدتك؟"
5. Wait for Claude's response
6. Open DevTools: Press `F12` or `Ctrl+Shift+I`
7. Go to the **Console** tab

### Running the Commands
Copy each command block below into the Console and press Enter.
Record the output in the corresponding "Findings" section.

---

## 1. Streaming Response Container

**Reference Selector (from Now2ai):** `[data-is-streaming]`

### Console Command
```javascript
// Check for streaming attribute during AND after response
(function() {
  const streaming = document.querySelectorAll('[data-is-streaming]');
  console.log('=== STREAMING ELEMENTS ===');
  console.log('Count:', streaming.length);
  streaming.forEach((el, i) => {
    console.log(`Element ${i}:`, {
      tagName: el.tagName,
      className: el.className,
      dataIsStreaming: el.getAttribute('data-is-streaming'),
      textPreview: el.textContent?.substring(0, 50) + '...'
    });
  });
  if (streaming.length === 0) {
    console.log('No [data-is-streaming] found. Try while Claude is actively responding.');
  }
})();
```

### Findings
- **Attribute exists?** [ ] Yes / [ ] No
- **Attribute values:** ____________
- **Element tag:** ____________
- **Element classes:** ____________
- **Notes:** ____________

---

## 2. Claude Message Text Class

**Reference Selector (from Now2ai):** `.font-claude-message`

### Console Command
```javascript
// Check for Claude message font class
(function() {
  const messages = document.querySelectorAll('.font-claude-message');
  console.log('=== FONT-CLAUDE-MESSAGE ELEMENTS ===');
  console.log('Count:', messages.length);
  messages.forEach((el, i) => {
    console.log(`Element ${i}:`, {
      tagName: el.tagName,
      className: el.className,
      textPreview: el.textContent?.substring(0, 50) + '...'
    });
  });
  if (messages.length === 0) {
    console.log('Class .font-claude-message not found. Searching for alternatives...');
    // Search for elements containing "font-" in class
    const fontClasses = document.querySelectorAll('[class*="font-"]');
    console.log('Elements with "font-" in class:', fontClasses.length);
    fontClasses.forEach((el, i) => {
      if (i < 5) console.log(`  ${el.tagName}: ${el.className}`);
    });
  }
})();
```

### Findings
- **Class exists?** [ ] Yes / [ ] No
- **Alternative class found:** ____________
- **Element structure:** ____________
- **Notes:** ____________

---

## 3. User Input Field

**Reference Selectors:** `[contenteditable]`, `textarea`

### Console Command
```javascript
// Check input field structure
(function() {
  console.log('=== INPUT FIELD ANALYSIS ===');

  // Check contenteditable
  const contentEditable = document.querySelectorAll('[contenteditable="true"]');
  console.log('Contenteditable elements:', contentEditable.length);
  contentEditable.forEach((el, i) => {
    console.log(`ContentEditable ${i}:`, {
      tagName: el.tagName,
      className: el.className,
      role: el.getAttribute('role'),
      ariaLabel: el.getAttribute('aria-label'),
      placeholder: el.getAttribute('data-placeholder') || el.getAttribute('placeholder')
    });
  });

  // Check textareas
  const textareas = document.querySelectorAll('textarea');
  console.log('Textarea elements:', textareas.length);
  textareas.forEach((el, i) => {
    console.log(`Textarea ${i}:`, {
      className: el.className,
      placeholder: el.placeholder,
      name: el.name
    });
  });

  // Find the main input (usually has specific attributes)
  const mainInput = document.querySelector('[aria-label*="message" i], [placeholder*="message" i], [data-placeholder*="message" i]');
  if (mainInput) {
    console.log('Main input found:', {
      tagName: mainInput.tagName,
      className: mainInput.className,
      isContentEditable: mainInput.isContentEditable
    });
  }
})();
```

### Findings
- **Input type:** [ ] contenteditable / [ ] textarea / [ ] other
- **Selector that works:** ____________
- **Input container class:** ____________
- **Notes:** ____________

---

## 4. Code Blocks

**Reference Selectors:** `pre`, `code`, `[data-language]`

### Console Command
```javascript
// First: Ask Claude to write some code, then run this
(function() {
  console.log('=== CODE BLOCK ANALYSIS ===');

  const preElements = document.querySelectorAll('pre');
  console.log('PRE elements:', preElements.length);
  preElements.forEach((el, i) => {
    console.log(`PRE ${i}:`, {
      className: el.className,
      dataLanguage: el.getAttribute('data-language'),
      hasCodeChild: !!el.querySelector('code'),
      textPreview: el.textContent?.substring(0, 30) + '...'
    });
  });

  const codeElements = document.querySelectorAll('code');
  console.log('CODE elements:', codeElements.length);
  codeElements.forEach((el, i) => {
    if (i < 5) {
      console.log(`CODE ${i}:`, {
        className: el.className,
        isInPre: el.closest('pre') !== null,
        dataLanguage: el.getAttribute('data-language')
      });
    }
  });

  const dataLang = document.querySelectorAll('[data-language]');
  console.log('Elements with data-language:', dataLang.length);
  dataLang.forEach((el, i) => {
    console.log(`DataLang ${i}:`, {
      tagName: el.tagName,
      language: el.getAttribute('data-language')
    });
  });
})();
```

### Findings
- **Code block wrapper:** ____________
- **Language attribute location:** ____________
- **Syntax highlighting classes:** ____________
- **Inline code selector:** ____________
- **Notes:** ____________

---

## 5. Message Container Structure

### Console Command
```javascript
// Analyze message container structure
(function() {
  console.log('=== MESSAGE CONTAINER ANALYSIS ===');

  // Look for common message container patterns
  const possibleContainers = [
    '[data-message-id]',
    '[data-testid*="message"]',
    '[class*="message"]',
    '[class*="Message"]',
    '[role="article"]',
    '[role="listitem"]'
  ];

  possibleContainers.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`${selector}:`, elements.length, 'elements');
      if (elements.length <= 3) {
        elements.forEach((el, i) => {
          console.log(`  ${i}: ${el.tagName}.${el.className.split(' ').slice(0,3).join('.')}`);
        });
      }
    }
  });

  // Try to find the conversation container
  const conversation = document.querySelector('[class*="conversation" i], [class*="chat" i], [role="log"]');
  if (conversation) {
    console.log('Conversation container:', {
      tagName: conversation.tagName,
      className: conversation.className,
      childCount: conversation.children.length
    });
  }
})();
```

### Findings
- **Message container selector:** ____________
- **User message identifier:** ____________
- **Claude message identifier:** ____________
- **Conversation wrapper:** ____________
- **Notes:** ____________

---

## 6. Paragraph Structure Inside Messages

### Console Command
```javascript
// Analyze paragraph structure in Claude's responses
(function() {
  console.log('=== PARAGRAPH STRUCTURE ===');

  // Find a Claude message (look for longer text content)
  const allText = document.querySelectorAll('p, div');
  let claudeMessage = null;

  allText.forEach(el => {
    if (el.textContent && el.textContent.length > 100 && !el.querySelector('button, input')) {
      if (!claudeMessage) claudeMessage = el.closest('[class*="message"], [data-message-id], article');
    }
  });

  if (claudeMessage) {
    console.log('Found message container:', claudeMessage.className);

    // Analyze children
    const paragraphs = claudeMessage.querySelectorAll('p');
    const divs = claudeMessage.querySelectorAll(':scope > div');
    const directText = Array.from(claudeMessage.childNodes).filter(n => n.nodeType === 3 && n.textContent.trim());

    console.log('Structure:', {
      paragraphElements: paragraphs.length,
      directDivs: divs.length,
      directTextNodes: directText.length
    });

    if (paragraphs.length > 0) {
      console.log('Paragraphs use <p> tags');
    } else if (divs.length > 0) {
      console.log('Paragraphs use <div> tags');
      divs.forEach((d, i) => {
        if (i < 3) console.log(`  Div ${i} class: ${d.className}`);
      });
    } else {
      console.log('Text may be in direct text nodes or spans');
    }
  } else {
    console.log('Could not find a Claude message. Make sure Claude has responded.');
  }
})();
```

### Findings
- **Paragraph element:** [ ] `<p>` / [ ] `<div>` / [ ] other: ____________
- **Paragraph class:** ____________
- **Line break handling:** ____________
- **Notes:** ____________

---

## 7. User vs Claude Message Differentiation

### Console Command
```javascript
// Find how user and Claude messages are differentiated
(function() {
  console.log('=== USER vs CLAUDE MESSAGES ===');

  // Common patterns for role identification
  const patterns = [
    '[data-role]',
    '[data-is-user-message]',
    '[data-sender]',
    '[class*="user" i]',
    '[class*="human" i]',
    '[class*="assistant" i]',
    '[class*="claude" i]',
    '[class*="ai-" i]'
  ];

  patterns.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`${selector}: ${elements.length} elements`);
      elements.forEach((el, i) => {
        if (i < 2) {
          const attrs = {};
          for (let attr of el.attributes) {
            if (attr.name.startsWith('data-')) {
              attrs[attr.name] = attr.value;
            }
          }
          console.log(`  ${el.tagName}:`, attrs, 'class:', el.className.substring(0, 50));
        }
      });
    }
  });
})();
```

### Findings
- **User message marker:** ____________
- **Claude message marker:** ____________
- **Distinguishing attribute/class:** ____________
- **Notes:** ____________

---

## 8. Artifact Containers (if visible)

### Console Command
```javascript
// Analyze artifact structure (if any artifacts are rendered)
(function() {
  console.log('=== ARTIFACT ANALYSIS ===');

  const artifactPatterns = [
    '[class*="artifact" i]',
    '[data-artifact]',
    'iframe',
    '[class*="preview" i]',
    '[class*="render" i]',
    '[class*="sandbox" i]'
  ];

  artifactPatterns.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      console.log(`${selector}: ${elements.length} elements`);
      elements.forEach((el, i) => {
        if (i < 2) {
          console.log(`  ${el.tagName}.${el.className.split(' ')[0]}`);
        }
      });
    }
  });

  // Check for iframes specifically
  const iframes = document.querySelectorAll('iframe');
  console.log('Total iframes:', iframes.length);
  iframes.forEach((iframe, i) => {
    console.log(`  Iframe ${i}: src=${iframe.src?.substring(0, 50) || '(no src)'}`);
  });
})();
```

### Findings
- **Artifact container selector:** ____________
- **Uses iframe?** [ ] Yes / [ ] No
- **Artifact wrapper class:** ____________
- **Notes:** ____________

---

## 9. Full Selector Dump (for reference)

### Console Command
```javascript
// Dump all unique class names in the message area
(function() {
  console.log('=== UNIQUE CLASSES IN MESSAGE AREA ===');

  const main = document.querySelector('main, [role="main"], #main');
  if (!main) {
    console.log('Could not find main content area');
    return;
  }

  const classes = new Set();
  main.querySelectorAll('*').forEach(el => {
    el.classList.forEach(c => classes.add(c));
  });

  const sorted = Array.from(classes).sort();
  console.log('Total unique classes:', sorted.length);
  console.log('Classes containing "message":', sorted.filter(c => c.toLowerCase().includes('message')));
  console.log('Classes containing "font":', sorted.filter(c => c.toLowerCase().includes('font')));
  console.log('Classes containing "text":', sorted.filter(c => c.toLowerCase().includes('text')));
  console.log('Classes containing "chat":', sorted.filter(c => c.toLowerCase().includes('chat')));
  console.log('Classes containing "response":', sorted.filter(c => c.toLowerCase().includes('response')));
})();
```

### Findings
Record any relevant class names discovered:
- **Message-related:** ____________
- **Font-related:** ____________
- **Other notable:** ____________

---

## Summary Table

Fill in after completing all reconnaissance:

| Element | Reference Selector | Validated Selector | Status |
|---------|-------------------|-------------------|--------|
| Streaming response | `[data-is-streaming]` | | [ ] Works / [ ] Changed / [ ] Missing |
| Claude message text | `.font-claude-message` | | [ ] Works / [ ] Changed / [ ] Missing |
| User input | `[contenteditable]` | | [ ] Works / [ ] Changed / [ ] Missing |
| Code block | `pre` | | [ ] Works / [ ] Changed / [ ] Missing |
| Code language | `[data-language]` | | [ ] Works / [ ] Changed / [ ] Missing |
| Inline code | `code` | | [ ] Works / [ ] Changed / [ ] Missing |
| User message | (unknown) | | |
| Claude message | (unknown) | | |
| Paragraph | (unknown) | | |
| Artifact | (unknown) | | |

---

## Recommended Selectors for Phase 1

Based on reconnaissance, fill in the final selectors we should use:

```javascript
// content/selectors.js - TO BE FILLED IN

const SELECTORS = {
  // RTL targets (elements to apply direction to)
  rtlTargets: {
    streaming: '____________',      // Streaming response container
    messageText: '____________',    // Claude message text
    userInput: '____________',      // User input field
    paragraph: '____________'       // Individual paragraphs
  },

  // Protected elements (always keep LTR)
  protected: {
    codeBlock: '____________',      // Code blocks
    inlineCode: '____________',     // Inline code
    codeLanguage: '____________'    // Language indicator
  },

  // Message identification
  messages: {
    userMessage: '____________',    // User's message container
    claudeMessage: '____________',  // Claude's message container
    container: '____________'       // Overall message wrapper
  }
};
```

---

## Notes / Observations

Add any additional observations here:

____________
____________
____________
