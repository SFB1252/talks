# Research Data and Methods Workshop Series

Workshop series on research data management, ethics, literature management, and corpus linguistics tools for researchers at the University of Cologne's SFB 1252 - Prominence in Language.

## About

Repository containing materials for workshops on research methodology, data management, and academic practices.

## Workshop Series

### 📚 [Good Academic Practice](workshops/01-good-academic-practice/)
Foundation workshop covering academic integrity, research ethics, and responsible conduct in research.

### 💾 [Research Data Management](workshops/02-research-data-management/)
Learn to organize, store, and preserve research data throughout the research lifecycle.

### ⚖️ [Ethics Approval](workshops/03-ethics-approval/)
Navigate the ethics approval process and understand requirements for human subjects research.

### 📖 [Literature Management](workshops/04-literature-management/)
Efficiently manage research literature using modern reference management tools like Zotero.

### 🔧 [Annotation & Corpus Tools](workshops/05-annotation-corpus-tools/)
Explore tools for corpus linguistics and text annotation, from manual to automated approaches.

### 📋 [Preregistration](workshops/06-preregistration/)
Learn to preregister research studies to enhance transparency and reproducibility.

## Getting Started

### For GitHub Pages (Recommended)

This repository is configured to work with GitHub Pages automatically. Simply:

1. Push this repository to GitHub
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://yourusername.github.io/talks`

GitHub Pages will automatically build the Jekyll site using the configuration provided.

### Link Issues

If links are not working immediately after deployment:

1. **GitHub Pages Build Time**: It can take 5-10 minutes for GitHub Pages to build and deploy your site after pushing changes
2. **Check Repository Name**: Make sure your repository is named `rdm-slides` or update the `baseurl` in `_config.yml` to match your repository name
3. **Enable GitHub Pages**: Go to repository Settings → Pages → Source → Deploy from a branch → Select `main` branch
4. **Wait for Build**: Check the Actions tab to see if the site is still building

### For Local Development (Optional)

If you want to preview the site locally, you'll need Ruby and Jekyll installed:

1. **Install Ruby** (if not already installed):
   - Windows: Download from [rubyinstaller.org](https://rubyinstaller.org/)
   - macOS: Use Homebrew: `brew install ruby`
   - Linux: Use your package manager: `sudo apt install ruby-full`

2. **Install Bundler**:
   ```bash
   gem install bundler
   ```

3. **Install dependencies**:
   ```bash
   bundle install
   ```

4. **Run the development server**:
   ```bash
   bundle exec jekyll serve
   ```

5. **View the site** at `http://localhost:4000`

## Repository Structure

```
├── _config.yml              # Jekyll configuration
├── _layouts/                # Page layouts
├── _includes/               # Reusable components
├── workshops/               # Workshop materials
├── onboarding/             # Onboarding materials
├── docs/                   # Documentation
├── resources/              # Additional resources
├── agenda/                 # Schedule information
├── Gemfile                 # Ruby dependencies
└── index.md               # Homepage
```

## Academic Theme Features

- Professional academic design
- Responsive layout for mobile and desktop
- Workshop grid layout for easy navigation
- Institutional branding for SFB 1252
- SEO optimization
- Academic typography and styling

## Contributing

We welcome contributions to improve our workshop materials. See our [contributing guide](docs/contributing.md) for details on how to contribute.

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## Contact

This workshop series is part of the SFB 1252 "Prominence in Language" research initiative at the University of Cologne.

---

**Note**: The Jekyll theme is configured to work automatically with GitHub Pages. Links may take 5-10 minutes to work after initial deployment while GitHub builds the site.
