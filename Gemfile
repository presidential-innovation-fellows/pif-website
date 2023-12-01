ruby '>= 3.1.4'

source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 3.9"

# See https://github.com/sass/sassc-rails/issues/114#issuecomment-441024718
# gem "sassc-rails"

# See https://github.com/rails/execjs#readme
gem "mini_racer"

# See https://github.com/envygeeks/jekyll-assets/issues/622
gem "sprockets", "~> 3.7"
gem "kramdown-parser-gfm", "~> 1.1.0"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.15"
  gem 'jekyll-redirect-from'
  gem 'jekyll-paginate-v2', "3.0.0"
  gem 'jekyll-sitemap'
  gem 'jekyll-seo-tag'
  gem 'jekyll-autoprefixer'
  gem 'jekyll-include-cache'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0" if Gem.win_platform?

gem "html-proofer", "~> 3.18"

gem "webrick", "~> 1.8"
