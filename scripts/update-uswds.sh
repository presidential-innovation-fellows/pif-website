#!/bin/bash
# Copy USWDS files from node_modules to assets after patching
echo "Copying USWDS JavaScript files to assets..."
cp node_modules/uswds/dist/js/uswds.js assets/js/uswds.js
echo "Minifying uswds.js..."
npx terser assets/js/uswds.js -c -m --source-map "url=uswds.min.js.map" -o assets/js/uswds.min.js
echo "Done! USWDS files updated."
