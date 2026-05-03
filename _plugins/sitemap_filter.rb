# Excludes PDF static files from jekyll-sitemap output.
#
# Background: jekyll-sitemap's static_file_or_document? logic includes
# .pdf URLs in sitemap.xml by default, and front-matter `defaults` with
# `path:` scope are not reliably honored for static files. Pa11y-CI then
# tries to audit those PDFs as HTML pages and fails on missing <title>.
#
# This plugin sets `data['sitemap'] = false` on every PDF static file,
# which jekyll-sitemap *does* honor.

module Jekyll
  Hooks.register :site, :post_read do |site|
    site.static_files.each do |file|
      next unless file.extname.casecmp(".pdf").zero?
      file.data["sitemap"] = false if file.respond_to?(:data) && file.data
    end
  end
end
