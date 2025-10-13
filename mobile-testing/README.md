# SFB 1252 Website Testing & Browser Automation

This directory contains tools for testing the SFB 1252 Research Data and Methods Workshop Series website, including automated browser testing using AI with **browser-use 0.7.9** featuring **Actor Use**.

## 🎯 What's New in 0.7.9

### Actor Use 🤖
- **Mix deterministic and agentic automations** - Combine predictable steps with AI intelligence
- **Query elements by natural language** - No more CSS selectors or XPath!
- **Built into Browser Use** - Works automatically, no special configuration

Example queries:
- "Find the blue button in the top right corner"
- "Click all links that go to matrix.to"  
- "Verify the FluffyChat recommendation text exists"

### Gemini Flash Latest
- **Model:** `gemini-flash-latest` (auto-updates to newest version)
- **Currently:** Gemini 2.5 Flash Preview (September 2025)
- **30% faster** than previous versions
- **More accurate** element detection with thinking capabilities
- **Cost-effective** for automation tasks
- **Auto-updates** with 2-week notice before version changes

## 🚀 Quick Start

### 1. Install Browser-Use 0.7.9

```bash
pip install -r mobile-testing/requirements.txt
playwright install
```

### 2. Set Up Environment

Create a `.env` file in the project root:

```bash
GOOGLE_API_KEY=your_api_key_here
```

Get your API key: https://aistudio.google.com/app/apikey

### 3. Run Website Inspection

```bash
python mobile-testing/browser_site_inspection_final.py
```

The script will:
- ✅ Navigate to the SFB 1252 website
- ✅ Use **Actor Use** to intelligently detect elements
- ✅ Verify Matrix integration (links, rooms, FluffyChat recommendation)
- ✅ Check for [TODO] markers
- ✅ Verify all 12 workshops are listed
- ✅ Generate a detailed inspection report

## 🔌 MCP Server Integration (Optional)

Use browser-use directly from **VS Code GitHub Copilot**!

### Configuration

Already set up in your `mcp.json`:

```json
{
  "browser-use": {
    "command": "uvx",
    "args": ["--from", "browser-use[cli]", "browser-use", "--mcp"],
    "env": {
      "GOOGLE_API_KEY": "your-key-here",
      "PYTHONIOENCODING": "utf-8"
    }
  }
}
```

### Usage Examples

Ask GitHub Copilot in VS Code:

```
Use browser-use to navigate to https://sfb1252.github.io/talks/ 
and verify the Matrix integration is working correctly
```

```
Use browser-use to check all links on the front page 
and report any broken links
```

```
Use browser-use to take a screenshot of the Community Chat section
```

### Available MCP Tools

The browser-use MCP server provides 14 tools:

**Direct Browser Control:**
- `browser_navigate` - Navigate to a URL
- `browser_click` - Click an element
- `browser_type` - Type text  
- `browser_get_state` - Get page state
- `browser_scroll` - Scroll the page

**Tab Management:**
- `browser_list_tabs` - List all tabs
- `browser_switch_tab` - Switch tabs
- `browser_close_tab` - Close a tab

**Content Extraction:**
- `browser_extract_content` - Extract structured data

**Autonomous Agent:**
- `retry_with_browser_use_agent` - Full AI automation

## 🎭 Actor Use in Action

### Natural Language Element Queries

**Old Way (Manual Selectors):**
```python
links = await page.locator("a[href*='matrix.to']").all()
```

**New Way (Actor Use):**
```python
# Just describe what you want in natural language
task = "Find all links that go to matrix.to"
# Actor Use handles element detection automatically!
```

### Mixed Automation Example

```python
# Combine deterministic steps with AI intelligence:

1. Navigate to URL (deterministic)
2. "Find the Community Chat section" (AI with Actor Use)
3. "Click the first Matrix room link" (AI with Actor Use)  
4. Verify URL contains "matrix.to" (deterministic)
```

Actor Use intelligently handles the ambiguous parts!

## � Test Results & Action Items

### Latest Comprehensive Test (October 13, 2025)

**Overall Score:** **8/10 - Production Ready** ✅

**Quick Summary:**
- ✅ All 12 workshop pages verified
- ✅ Matrix integration 100% functional  
- ✅ All navigation works perfectly
- ✅ No TODO markers found
- ❌ 1 critical issue: Broken University of Cologne Guidelines link (404)
- ⚠️ 2 minor enhancements needed: Calendar subscriptions & contact form

**Cost:** $0.27 total for complete site audit

**See full results:** [TESTING-RESULTS.md](TESTING-RESULTS.md)

### Two Test Scripts Available

#### 1. Matrix-Focused Test (Quick - 2 min)
```bash
python mobile-testing/browser_site_inspection_final.py
```
- **Duration:** ~2 minutes
- **Cost:** ~$0.03
- **Coverage:** Matrix integration, 7 verification points
- **Use for:** Daily checks before deployments

#### 2. Comprehensive Site Test (Full - 6 min)
```bash
python mobile-testing/comprehensive_site_test.py
```
- **Duration:** ~6 minutes  
- **Cost:** ~$0.24
- **Coverage:** 10 major sections, 175 checkpoints
- **Use for:** Weekly audits, major updates
- **Output:** JSON, HTML, and TXT reports in `reports/` directory

### Generated Reports

After running comprehensive test, view the beautiful HTML report:
```powershell
start mobile-testing/reports/comprehensive_report_*.html
```

Reports include:
- Executive summary with production readiness score
- Section-by-section analysis (Navigation, Workshops, Matrix, Resources, etc.)
- Critical issues highlighted in red
- Minor enhancements in yellow
- Actionable recommendations with priority levels

### Monthly Testing Recommendations

**Regular Schedule:**
- **Daily:** Matrix-focused test before deployments (~$0.90/month)
- **Weekly:** Comprehensive test for audits (~$2/month)
- **Total:** ~$2.90/month

**Cost vs. Value:**
- Manual testing: $50-100/hour developer time
- Automated testing: $3/month
- **Savings: ~$47-97 per month** 🎉

---

## �📱 Manual Mobile Responsiveness Testing

### Why Mobile Responsiveness Matters

### User Statistics

- **70%+ mobile browsing** on academic websites
- **International participants** often use mobile devices
- **Accessibility requirements** include mobile optimization
- **Workshop registration** often happens on-the-go

### Key Use Cases

- **Quick schedule checks** during conferences
- **Last-minute registration** on mobile devices
- **Resource access** during workshops
- **Calendar integration** on smartphones

## Testing Methods

### 1. Browser Developer Tools

#### Chrome DevTools

```bash
# Open Developer Tools
F12 or Ctrl+Shift+I (Windows)
Cmd+Option+I (Mac)

# Enable Device Simulation
Click device toggle button or Ctrl+Shift+M
```

**Test these device profiles:**

- iPhone SE (375px width)
- iPhone 12 Pro (390px width)
- iPad (768px width)
- iPad Pro (1024px width)
- Samsung Galaxy S20 (360px width)

#### Firefox Responsive Design Mode

```bash
# Open Responsive Design Mode
F12 → Responsive Design Mode
Or Ctrl+Shift+M
```

### 2. Real Device Testing

#### Recommended Test Devices

- **iOS:** iPhone (current and previous generation)
- **Android:** Samsung Galaxy or Google Pixel
- **Tablet:** iPad or Android tablet
- **Budget device:** Lower-end Android for performance testing

#### BrowserStack (University Access)

- Cross-browser testing platform
- Real device testing in cloud
- University of Cologne may have institutional access
- Alternative: LambdaTest, Sauce Labs

### 3. Online Testing Tools

#### Free Tools

- **ResponsiveDesignChecker.com** - Quick viewport testing
- **Am I Responsive?** - Visual preview across devices
- **Google Mobile-Friendly Test** - Google's assessment
- **PageSpeed Insights** - Performance and mobile usability

#### Automated Testing

```bash
# Lighthouse CLI for mobile testing
npm install -g lighthouse
lighthouse https://sfb1252.github.io/talks/ --preset=perf --view
```

## Key Testing Areas

### 1. Navigation & Menus

#### Issues to Check

- [ ] Menu collapses appropriately on small screens
- [ ] Navigation is accessible with touch
- [ ] Dropdowns work on touch devices
- [ ] Logo/title remains visible and readable

#### Test Scenarios

- Tap navigation items with finger (not stylus)
- Try landscape and portrait orientations
- Test menu accessibility with screen readers

### 2. Content Layout

#### Issues to Check

- [ ] Text remains readable without horizontal scrolling
- [ ] Images scale appropriately
- [ ] Tables are scrollable or reformat for mobile
- [ ] Workshop cards stack properly
- [ ] Contact information is easily accessible

#### Responsive Breakpoints

```css
/* Test these common breakpoints */
@media (max-width: 480px) /* Small phones */ @media (max-width: 768px) /* Tablets portrait */ @media (max-width: 1024px); /* Tablets landscape */
```

### 3. Interactive Elements

#### Issues to Check

- [ ] Buttons are large enough for touch (44px minimum)
- [ ] Links have adequate spacing
- [ ] Form inputs are properly sized
- [ ] Calendar integration works on mobile
- [ ] PDF downloads work on mobile browsers

### 4. Performance

#### Loading Speed

- **Target:** < 3 seconds on 3G connection
- **Test:** Chrome DevTools Network throttling
- **Tools:** Google PageSpeed Insights, WebPageTest

#### Resource Optimization

- [ ] Images are optimized for mobile
- [ ] CSS/JS files are minified
- [ ] Unnecessary resources are excluded on mobile

## Common Issues & Solutions

### 1. Text Too Small

**Problem:** Text < 16px is hard to read on mobile
**Solution:** Use relative units (rem, em) and ensure base font size ≥ 16px

```css
body {
  font-size: 16px; /* Minimum for mobile readability */
  line-height: 1.5;
}
```

### 2. Touch Targets Too Small

**Problem:** Buttons/links < 44px are hard to tap
**Solution:** Ensure adequate padding and spacing

```css
.btn,
a {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}
```

### 3. Horizontal Scrolling

**Problem:** Content wider than viewport
**Solution:** Use flexible layouts and max-width

```css
.container {
  max-width: 100%;
  overflow-x: hidden;
}

img,
table {
  max-width: 100%;
  height: auto;
}
```

### 4. Navigation Issues

**Problem:** Desktop navigation doesn't work on mobile
**Solution:** Implement hamburger menu or mobile-specific navigation

### 5. Table Overflow

**Problem:** Wide tables break mobile layout
**Solution:** Make tables scrollable or reformat for mobile

```css
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

## Implementation Checklist

### Phase 1: Basic Responsiveness

- [ ] Add viewport meta tag to HTML
- [ ] Test current site on mobile devices
- [ ] Fix critical navigation issues
- [ ] Ensure text readability
- [ ] Optimize touch targets

### Phase 2: Enhanced Mobile Experience

- [ ] Optimize images for mobile
- [ ] Implement mobile-specific interactions
- [ ] Add touch-friendly gestures
- [ ] Optimize forms for mobile input
- [ ] Test calendar integration on mobile

### Phase 3: Performance & Advanced Features

- [ ] Optimize loading performance
- [ ] Add offline support (service workers)
- [ ] Implement mobile-specific features
- [ ] Add app-like features (PWA)

## Testing Automation

### Automated Responsive Testing

```bash
# Using Cypress for responsive testing
describe('Mobile Responsiveness', () => {
  const devices = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  devices.forEach(device => {
    it(`should work on ${device.name}`, () => {
      cy.viewport(device.width, device.height);
      cy.visit('/');
      cy.get('nav').should('be.visible');
      cy.get('.workshop-card').should('be.visible');
    });
  });
});
```

### GitHub Actions for Mobile Testing

```yaml
name: Mobile Responsiveness Test
on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - name: Run Lighthouse
        run: |
          npm install -g lighthouse
          lighthouse ${{ github.event.deployment.payload.web_url }} \
            --preset=perf --output=json --output-path=./lighthouse.json
          # Parse results and fail if mobile score < 80
```

## Monitoring & Maintenance

### Regular Testing Schedule

- **Weekly:** Quick mobile check during development
- **Monthly:** Comprehensive device testing
- **Quarterly:** Performance audit and optimization
- **Annually:** Full responsive design review

### Metrics to Track

- **Mobile traffic percentage** (Google Analytics)
- **Mobile bounce rate** vs desktop
- **Mobile conversion rates** (registrations)
- **Page load times** on mobile networks
- **User feedback** about mobile experience

### Tools for Ongoing Monitoring

- **Google Analytics:** Mobile traffic analysis
- **Search Console:** Mobile usability reports
- **Real User Monitoring:** Actual user performance data
- **Hotjar/FullStory:** User behavior recordings

## Quick Mobile Checklist

Before each release, verify:

- [ ] Site loads properly on iPhone and Android
- [ ] All navigation works with touch
- [ ] Text is readable without zooming
- [ ] Buttons/links are easily tappable
- [ ] Images scale appropriately
- [ ] Forms work with mobile keyboards
- [ ] Calendar links work on mobile devices
- [ ] Contact information is easily accessible
- [ ] PDF documents open properly
- [ ] Page load time < 3 seconds on 3G

## Resources

### Testing Tools

- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [BrowserStack](https://www.browserstack.com/)
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [Chrome DevTools Device Mode](https://developers.google.com/web/tools/chrome-devtools/device-mode)

### Best Practices

- [Google Mobile SEO Guide](https://developers.google.com/search/mobile-sites)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Mobile Performance](https://web.dev/mobile/)

### University Resources

- University of Cologne IT Services
- Digital Learning Lab accessibility guidelines
- Web development support contacts

---

**Remember:** Mobile responsiveness is not a one-time fix but an ongoing process. Regular testing ensures the site remains accessible to all users.
