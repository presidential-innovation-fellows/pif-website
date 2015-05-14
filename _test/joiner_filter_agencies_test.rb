require_relative "../_plugins/joiner"
require_relative "site"

require "minitest/autorun"

module Pif
  class FilterAgenciesTest < ::Minitest::Test
    def setup
      @site = DummyTestSite.new
      @site.data['current_projects'] = {}
      @site.data['previous_projects'] = {}
    end

    def test_empty_projects
      Joiner.filter_agencies(@site)
      assert_empty @site.data['agencies']
    end

    def test_compile_agencies_and_sort_fellows
      @site.data['current_projects'] = {
        'api.nasa.gov' => {
          'agency' => 'NASA',
          'fellows' => ['hammer-dan'],
         },
        'Blue Button Initiative' => {
          'agency' => 'VA',
          'fellows' => ['black-tom', 'ruskin-mollie'],
         },
      }
      @site.data['previous_projects'] = {
        'Human Centered Design' => {
          'agency' => 'VA',
          'fellows' => ['ruskin-mollie'],
        },
        'RFP-EZ' => {
          'agency' => 'SBA',
          'fellows' => ['read-robert', 'godbout-greg'],
        },
      }
      Joiner.filter_agencies(@site)

      expected = {
        'NASA' => {'fellows' => ['hammer-dan']},
        'VA' => {'fellows' => ['black-tom', 'ruskin-mollie']},
        'SBA' => {'fellows' => ['godbout-greg', 'read-robert']},
      }
      assert_equal expected,  @site.data['agencies']
    end
  end
end
