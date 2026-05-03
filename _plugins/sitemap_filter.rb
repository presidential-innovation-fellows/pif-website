# Excludes PDF static files from jekyll-sitemap output.
#
# Background: jekyll-sitemap 1.4.x includes .pdf URLs in sitemap.xml by
# default. Pa11y-CI then tries to audit those PDFs as HTML pages and
# fails on missing <title>. Per-file `data['sitemap'] = false` and
# `defaults` with `path:` scope both proved unreliable for static files
# in this codebase, so we post-process the rendered sitemap.xml directly.

require "rexml/document"

module Jekyll
  Hooks.register :site, :post_write do |site|
    sitemap_path = File.join(site.dest, "sitemap.xml")
    next unless File.exist?(sitemap_path)

    doc = REXML::Document.new(File.read(sitemap_path))
    removed = 0
    doc.root.elements.each("url") do |url_el|
      loc = url_el.elements["loc"]&.text
      next unless loc&.downcase&.end_with?(".pdf")
      url_el.parent.delete_element(url_el)
      removed += 1
    end

    if removed.positive?
      File.open(sitemap_path, "w") { |f| doc.write(f) }
      Jekyll.logger.info "SitemapFilter:", "removed #{removed} PDF entries"
    end
  end
end
