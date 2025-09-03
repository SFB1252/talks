# GitHub Pages Deployment Fix for Organization Repositories

## 🎯 **Primary Issue**

Organization repositories have stricter permission controls than personal repositories, causing `GITHUB_TOKEN` permission denials when using third-party actions like `peaceiris/actions-gh-pages`.

## ✅ **Solution 1: GitHub's Official Pages Action (Implemented)**

Your workflow has been updated to use GitHub's built-in Pages deployment system, which is the recommended modern approach.

### **Key Changes Made:**

- Moved permissions to workflow level for better security
- Replaced `peaceiris/actions-gh-pages@v3` with official GitHub actions
- Added proper artifact upload/download pattern
- Removed need for `gh-pages` branch management

### **Required Repository Settings:**

1. Go to **Settings** → **Pages**
2. Set **Source** to **GitHub Actions** (not "Deploy from a branch")
3. This enables the new Pages API that the workflow uses

## 🔧 **Alternative Solutions (If Needed)**

### **Option 2: Personal Access Token (PAT)**

If you need to stick with the old approach:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    personal_token: ${{ secrets.PAGES_PAT }}
    publish_dir: ./site
```

**PAT Requirements:**

- **Scope needed:** `repo` (full control of private repositories)
- **For public repos:** `public_repo` might be sufficient
- **Add as repository secret:** `PAGES_PAT`

### **Option 3: Organization Token**

For organization-wide deployments:

1. Create organization secret
2. Grant organization access to the repository
3. Use `secrets.ORG_GITHUB_TOKEN` instead

## 🔍 **Troubleshooting Steps**

### **1. Check Repository Settings**

- **Settings** → **Actions** → **General**
- Workflow permissions: "Read and write permissions"
- Allow GitHub Actions to create and approve pull requests: ✅

### **2. Organization Settings**

- **Settings** → **Actions** → **General**
- Check if Actions are restricted for the organization
- Ensure workflow permissions allow Pages deployment

### **3. Branch Protection**

- If `main` branch has protection rules
- Ensure GitHub Actions can push to protected branches
- Or use the new Actions-based deployment (recommended)

## 🚀 **Why the New Approach is Better**

1. **Security**: No need for broad `contents: write` permissions
2. **Reliability**: Official GitHub support and maintenance
3. **Performance**: Direct API integration, no intermediate branches
4. **Simplicity**: No manual `gh-pages` branch management
5. **Future-proof**: GitHub's recommended approach going forward

## 📋 **Next Steps**

1. **Update repository Pages settings** to use "GitHub Actions" source
2. **Test the deployment** by pushing to main branch
3. **Monitor the Actions tab** for successful deployment
4. **Remove old `gh-pages` branch** if no longer needed

## 🔗 **Useful Links**

- [GitHub Pages Deployment Action](https://github.com/actions/deploy-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)
- [Organization Permissions](https://docs.github.com/en/organizations/managing-organization-settings/disabling-or-limiting-github-actions-for-your-organization)

---

_Updated: September 3, 2025_
