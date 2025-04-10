# frozen_string_literal: true

source "https://rubygems.org"

gemspec

gem "html-proofer", "~> 5.0", group: :test

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:mingw, :x64_mingw, :mswin]

gem 'jekyll-sitemap'
gem 'faraday-retry'
gem "webrick", "~> 1.9"

# ✅ Chirpy 테마용 필수 gem
gem "jekyll", "~> 4.3.2"
gem "jekyll-theme-chirpy", "~> 6.0", ">= 6.0.4" # 또는 latest
gem "jekyll-seo-tag"
gem "jekyll-feed"
gem "jekyll-archives"
gem "jekyll-paginate-v2"