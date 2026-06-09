# Patches

This directory contains patches for npm dependencies to fix security vulnerabilities.

## Applied Patches

### resolve-id-refs@0.1.0
**Issue**: Incomplete string escaping or encoding (CodeQL security alert)

**Fix**: Added backslash escaping before quote escaping in the `queryById` function.

**Details**: The original code only escaped double quotes when building a CSS selector, but didn't escape backslashes. This could allow backslash characters in the input to escape the quote escaping, potentially leading to CSS selector injection.

**Changed**:
```javascript
// Before
id.replace(/"/g, '\\"')

// After
id.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
```

### uswds@2.14.0
**Issue**: Same incomplete string escaping issue in bundled `resolve-id-refs` dependency

**Fix**: Applied the same fix to the bundled `uswds.js` distribution file.

## How Patches Work

These patches are managed by [patch-package](https://github.com/ds300/patch-package) and are automatically applied during `npm install` via the `postinstall` script in `package.json`.

After patches are applied, the `scripts/update-uswds.sh` script copies the patched USWDS files to `assets/js/` and minifies them for production use.

## Updating Dependencies

When updating the `uswds` or `resolve-id-refs` packages, check if the security fix has been incorporated upstream. If not, the patches will need to be regenerated:

1. Make your changes to the dependency in `node_modules/`
2. Run `npx patch-package <package-name>` to update the patch file
3. Test that `npm run postinstall` works correctly
