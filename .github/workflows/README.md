# GitHub Actions Workflows

This directory contains automated workflows for maintaining the quality of the SFB 1252 Research Data & Methods Workshop Series website.

## 🔄 Active Workflows

### `quality-check.yml` - Continuous Quality Assurance
**Triggers:** Every push to main/develop, every pull request
**Purpose:** Fast quality checks for development workflow

**What it checks:**
- ✅ Markdown quality and style (markdownlint)
- ✅ Code formatting consistency (Prettier) 
- ✅ Jekyll build validation
- ✅ HTML output validation
- ✅ Accessibility compliance (WCAG)
- ✅ Educational content metrics

**Runtime:** ~2-3 minutes

### `weekly-link-check.yml` - Comprehensive Link Validation
**Triggers:** Weekly (Mondays at 2 AM UTC), manual dispatch
**Purpose:** Thorough validation of all educational resource links

**What it checks:**
- 🔗 Workshop content and documentation links
- 🔗 Main site pages and schedules  
- 🔗 Educational resources and onboarding materials
- 🔗 Presenter resources and templates
- 🔗 External academic and tool references

**Runtime:** ~10-15 minutes

## 🎯 Design Philosophy

### Fast Feedback for Development
The main quality check workflow prioritizes speed to provide quick feedback during development. Link checking is separated because:

- **Internal navigation** is more critical than external link validation
- **Academic links** change infrequently and don't need constant validation  
- **Development speed** shouldn't be slowed by comprehensive external checks
- **Weekly validation** catches external changes while maintaining fast CI/CD

### Educational Content Focus
Both workflows are optimized for educational content:

- **Workshop structure validation** ensures all required files exist
- **Accessibility checking** ensures content is inclusive
- **Content metrics** track the growth of educational materials
- **Presenter resources** are validated separately for workshop leaders

## 🛠️ Configuration Files

### `link-check-config.json`
Optimized configuration for educational sites:
- Faster timeouts for development efficiency
- Ignores social media and temporary links
- Handles academic site redirects properly
- Excludes localhost and development URLs

## 🚀 Local Development

For quick development feedback, use the local tools:

```powershell
# Quick internal link check
.\check-links.ps1

# Format code (if available)
.\format-code.ps1
```

## 📊 Monitoring

### Workflow Status
- **Green builds** = All quality checks passing
- **Yellow builds** = Warnings but functional (common with academic links)
- **Red builds** = Critical issues need attention

### Weekly Reports
The weekly link check generates summary reports showing:
- Number of workshop materials
- Link validation results by content area
- Recommendations for content maintenance

## 🔧 Customization

### Adjusting Link Check Frequency
Edit the cron schedule in `weekly-link-check.yml`:
```yaml
schedule:
  - cron: '0 2 * * 1'  # Weekly Monday 2 AM
  # - cron: '0 2 * * *'  # Daily 2 AM  
  # - cron: '0 2 1 * *'  # Monthly 1st day 2 AM
```

### Adding New Quality Checks
Add steps to `quality-check.yml` for additional validation:
- Spell checking
- Image optimization validation
- Performance testing
- SEO analysis

### Excluding Content from Checks
Update `.prettierignore` or link check patterns to exclude:
- Generated content
- External legacy files
- Work-in-progress materials

---

*These workflows ensure the SFB 1252 workshop series maintains high quality while supporting efficient educational content development.*
