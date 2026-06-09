# CodeQL Security Fix: Incomplete String Escaping

## Problem

CodeQL flagged a security vulnerability in `assets/js/uswds.js` at line 656:

```javascript
return this.querySelector('[id="' + id.replace(/"/g, '\\"') + '"]');
```

**Issue**: This code only escapes double quotes but does not escape backslashes. If the input contains a backslash followed by a quote (e.g., `\"`), it won't be properly escaped, which could lead to CSS selector injection.

### Example Attack Vector

```javascript
// Input: test\"
// Current: '[id="test\\""]'  // The \" becomes an escaped quote
// Expected: '[id="test\\\\""]'  // Should be a literal backslash + escaped quote
```

## Solution

The fix ensures backslashes are escaped BEFORE quotes by chaining two replacements:

```javascript
return this.querySelector('[id="' + id.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"]');
```

**Order matters**:
1. First: Escape backslashes `\` → `\\`
2. Then: Escape quotes `"` → `\"`

## Implementation

The vulnerability existed in two locations:

1. **`node_modules/resolve-id-refs/index.js`** - Third-party dependency
2. **`node_modules/uswds/dist/js/uswds.js`** - USWDS bundle (which includes resolve-id-refs)

### Patch Files

Since these are in `node_modules`, we use [patch-package](https://www.npmjs.com/package/patch-package) to maintain the fixes:

- `patches/resolve-id-refs+0.1.0.patch`
- `patches/uswds+2.14.0.patch`

### Automation

The `postinstall` script in `package.json` automatically:
1. Applies patches via `patch-package`
2. Runs `scripts/update-uswds.sh` to copy patched files to `assets/js/`
3. Minifies the JavaScript for production

## Testing

To verify the fix is applied:

```bash
# Check the patched line
grep "id.replace" assets/js/uswds.js

# Should output:
#   return this.querySelector('[id="' + id.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"]');
```

## CI/CD Impact

When CI/CD runs `npm install`, the patches will be automatically applied, ensuring the security fix is present in all deployments.

The CodeQL scan should pass after this fix is merged.
