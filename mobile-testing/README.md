# SFB 1252 Website Testing & Browser Automation

This directory contains tools for testing the SFB 1252 Research Data and Methods Workshop Series website, including automated browser testing using AI.

## 🤖 AI-Powered Browser Automation

### Quick Start with Gemini 2.5 Flash

We use Google's **Gemini 2.5 Flash** model for balanced performance: **fast + cheap + clever**.

1. **Install Dependencies:**

   ```bash
   pip install -r mobile-testing/requirements.txt
   playwright install
   ```

2. **Get Google API Key:**

   - Visit: https://aistudio.google.com/app/apikey
   - Create a new API key
   - Copy the key

3. **Configure Environment:**

   ```bash
   # Edit .env file in project root
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

4. **Run Setup Check:**

   ```bash
   python mobile-testing/setup_browser_automation.py
   ```

5. **Start Website Inspection:**
   ```bash
   python mobile-testing/browser_site_inspection.py
   ```

### What the Automation Does

The browser automation script will:

- ✅ Verify Matrix integration functionality
- ✅ Check for proper matrix.to links (not broken anchor links)
- ✅ Confirm FluffyChat is recommended
- ✅ Test three Matrix rooms setup
- ✅ Look for remaining "[TODO]" markers
- ✅ Take screenshots for documentation
- ✅ Test responsive design
- ✅ Generate detailed inspection reports

## 📱 Manual Mobile Responsiveness Testing

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
