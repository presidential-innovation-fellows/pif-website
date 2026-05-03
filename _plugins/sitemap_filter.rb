# Excludes PDF static files from jekyll-sitemap output by post-processing
# the rendered sitemap.xml with a simple regex strip of any <url> block
# whose <loc> ends in .pdf. Avoids REXML namespace quirks that caused
# earlier "removed N entries" logs without an actual file change.

module Jekyll
  Hooks.register :site, :post_write do |site|
    sitemap_path = File.join(site.dest, "sitemap.xml")
    next unless File.exist?(sitemap_path)

    original = File.read(sitemap_path)
    filtered = original.gsub(
      %r{[ \t]*<url>\s*<loc>[^<]*\.pdf</loc>.*?</url>\s*}im,
      ""
    )

    if filtered != original
      File.write(sitemap_path, filtered)
      removed = original.scan(%r{<loc>[^<]*\.pdf</loc>}i).size
      Jekyll.logger.info "SitemapFilter:", "stripped #{removed} PDF entries from sitemap.xml"
    end
  end
end
