module Pif
  class Generator < ::Jekyll::Generator
    def generate(site)
      Joiner.join_data(site)
    end
  end
end
