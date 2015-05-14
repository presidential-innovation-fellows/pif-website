require "jekyll"
require "jekyll/site"

module Pif
  class DummyTestSite < ::Jekyll::Site
    def initialize(config: {})
      @config = config
      @data = {'public' => {}, 'private' => {}}
      @pages = []
      @source = @config['source']
    end
  end
end
