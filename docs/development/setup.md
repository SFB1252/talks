# Development Setup Guide

This guide will help you set up the optimal development environment for the SFB 1252 Research Data & Methods Workshop Series website.

## 🚀 Quick Start

### Prerequisites
- **VS Code**: [Download here](https://code.visualstudio.com/)
- **Python**: Version 3.8+ ([Installation guide](https://www.python.org/downloads/))
- **pip**: Python package installer (included with Python)
- **Git**: [Installation guide](https://git-scm.com/downloads)

### Initial Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/SFB1252/talks.git
   cd talks
   ```

2. **Open in VS Code**:
   ```bash
   code .
   ```

3. **Install recommended extensions**:
   VS Code will prompt you to install recommended extensions from `.vscode/extensions.json`

4. **Install MkDocs dependencies**:
   ```bash
   pip install mkdocs mkdocs-material
   ```

5. **Start development server**:
   ```bash
   mkdocs serve
   ```

## 🔧 VS Code Extensions

### Essential Extensions (Auto-installed)
- **Markdown All in One**: Enhanced Markdown editing with live preview
- **markdownlint**: Markdown quality checking and style guide enforcement
- **Python**: Python language support and debugging
- **GitLens**: Enhanced Git integration with blame annotations
- **YAML**: Configuration file support with validation

### Academic & Research Extensions
- **Zotero Picker**: Insert academic citations directly from Zotero
- **Markdown PDF**: Export workshop materials to PDF format
- **Code Spell Checker**: Spell checking for documentation

## 📝 Development Workflow

### Daily Workflow
1. **Start development**: Press `Ctrl+Shift+P` → "Tasks: Run Task" → "MkDocs: Serve Site"
2. **Edit content**: Use Markdown preview (`Ctrl+Shift+V`) for real-time editing
3. **Check quality**: markdownlint will highlight issues automatically
4. **Commit changes**: Use GitLens or integrated Git tools

### Creating New Workshops
1. **Use VS Code tasks**: `Ctrl+Shift+P` → "Tasks: Run Task" → "Create New Workshop"
2. **Follow the template**: Copy structure from existing workshops
3. **Test locally**: Ensure MkDocs builds without errors
4. **Check accessibility**: Use browser dev tools or axe extension

### Quality Checks
- **Markdown**: Automatic linting with markdownlint
- **Formatting**: Prettier auto-formats on save
- **Links**: Automated link checking in CI/CD
- **Accessibility**: Built-in accessibility validation

## 🎯 Key Features

### Automatic Formatting
- **On Save**: Files are automatically formatted using Prettier
- **Consistent Style**: Unified formatting across all contributors
- **Markdown**: Proper line breaks, list formatting, and heading structure

### Live Preview
- **Markdown Preview**: Real-time preview of workshop content
- **MkDocs Live Reload**: Automatic browser refresh on file changes
- **Mobile Testing**: Responsive design testing tools

### Academic Integration
- **Zotero**: Direct citation insertion from your reference library
- **BibTeX**: Syntax highlighting and validation for bibliographies
- **LaTeX**: Support for mathematical notation in workshop materials

### Git Integration
- **Visual History**: See file changes over time with GitLens
- **Blame Annotations**: Track who made what changes and when
- **Branch Management**: Visual Git graph for collaboration

## 📊 Quality Assurance

### Automated Checks
- **CI/CD Pipeline**: Automated quality checks on every commit
- **Link Validation**: Broken link detection and reporting
- **Accessibility**: WCAG compliance checking
- **Performance**: Site speed and optimization analysis

### Manual Testing
- **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
- **Mobile Devices**: Responsive design validation
- **Screen Readers**: Accessibility testing with assistive technology
- **Print Styles**: Ensure workshop materials print properly

## 🔍 Troubleshooting

### Common Issues

#### MkDocs Build Errors
```bash
# Clear cache and rebuild
mkdocs build --clean
mkdocs build
```

#### Extension Not Working
1. Restart VS Code
2. Check if extension is enabled
3. Verify workspace settings in `.vscode/settings.json`

#### Markdown Lint Errors
- Most errors are auto-fixable with `Ctrl+Shift+P` → "markdownlint: Fix all supported markdownlint violations"
- Custom rules are configured in `.vscode/settings.json`

#### Git Issues
- Use GitLens interface for visual Git operations
- Check `.gitignore` for intentionally ignored files
- Private directories (evaluation/, etc.) are intentionally excluded

### Performance Optimization
- **Images**: Compress images before adding to repository
- **Markdown**: Use relative links for internal navigation
- **Assets**: Minimize CSS and JavaScript files
- **Caching**: MkDocs automatically optimizes for GitHub Pages

## 📚 Educational Benefits

### For Instructors
- **Professional Workflow**: Learn modern web development practices
- **Content Quality**: Automated checking ensures high-quality materials
- **Collaboration**: Git workflows for multi-author content
- **Analytics**: Data-driven insights into content effectiveness

### For Students
- **Open Source**: Transparent development process to learn from
- **Best Practices**: Example of well-structured documentation
- **Modern Tools**: Exposure to professional development environment
- **Reproducibility**: Version-controlled educational materials

### For Institutions
- **Sustainability**: Tools that reduce long-term maintenance burden
- **Scalability**: Systems that grow with the program
- **Professional Image**: High-quality web presence
- **Cost Effective**: Open source tools reduce licensing costs

## 🎓 Learning Resources

### VS Code
- [Official Documentation](https://code.visualstudio.com/docs)
- [Keyboard Shortcuts Reference](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
- [Extension Development](https://code.visualstudio.com/api)

### MkDocs
- [Official Tutorial](https://www.mkdocs.org/getting-started/)
- [Material Theme Documentation](https://squidfunk.github.io/mkdocs-material/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

### Markdown
- [Markdown Guide](https://www.markdownguide.org/)
- [Academic Markdown](https://academic-writing-with-markdown.thomasboehm.de/)
- [Markdown and Citations](https://rmarkdown.rstudio.com/authoring_bibliographies_and_citations.html)

### Git & GitHub
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Collaborative Development](https://github.com/skills)

## 🆘 Getting Help

### Internal Support
1. **Check Documentation**: Start with this guide and linked resources
2. **GitHub Issues**: Report bugs or request features
3. **Discussion Forum**: Ask questions and share solutions
4. **Office Hours**: Weekly development help sessions

### External Resources
1. **VS Code Community**: [Discord](https://discord.gg/vscode) and [GitHub](https://github.com/microsoft/vscode)
2. **MkDocs Community**: [GitHub](https://github.com/mkdocs/mkdocs) and [Discord](https://discord.gg/7Q2b8C8)
3. **Stack Overflow**: Tag questions with relevant technology
4. **Academic Twitter**: Follow #DigitalHumanities and #AcademicTwitter

---

*This development environment is designed to support both novice and experienced developers working on educational content. The tools and workflows scale from simple content editing to advanced web development, making it suitable for users with varying technical backgrounds.*