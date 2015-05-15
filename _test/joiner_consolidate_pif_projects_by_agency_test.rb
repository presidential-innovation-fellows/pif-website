require_relative "../_plugins/joiner"
require_relative "site"

require "minitest/autorun"

module Pif
  class ConsolidatePifProjectsByAgencyTest < ::Minitest::Test
    def setup
      @site = DummyTestSite.new
      @site.data['current_projects'] = {}
      @site.data['previous_projects'] = {}
      @site.data['fellows'] = {
        'hammer-dan' => {},
        'black-tom' => {},
        'ruskin-mollie' => {},
        'godbout-greg' => {},
        'read-robert' => {},
      }
    end

    def test_empty_projects
      Joiner.consolidate_pif_projects_by_agency(@site)
      fellows = @site.data['fellows']
      assert_empty fellows['hammer-dan']['projects']
      assert_empty fellows['black-tom']['projects']
      assert_empty fellows['ruskin-mollie']['projects']
      assert_empty fellows['godbout-greg']['projects']
      assert_empty fellows['read-robert']['projects']
    end

    def test_consolidate_pif_projects
      @site.data['current_projects'] = {
        'api.nasa.gov' => {
          'name' => 'api.nasa.gov',
          'agency' => 'NASA',
          'fellows' => ['hammer-dan'],
         },
        'Blue Button Initiative' => {
          'name' => 'Blue Button Initiative',
          'agency' => 'VA',
          'fellows' => ['black-tom', 'ruskin-mollie'],
         },
      }
      @site.data['previous_projects'] = {
        'Human Centered Design' => {
          'name' => 'Human Centered Design',
          'agency' => 'VA',
          'fellows' => ['ruskin-mollie'],
        },
        'RFP-EZ' => {
          'name' => 'RFP-EZ',
          'agency' => 'SBA',
          'fellows' => ['read-robert', 'godbout-greg'],
        },
      }

      Joiner.consolidate_pif_projects_by_agency(@site)
      fellows = @site.data['fellows']
      assert_equal({'NASA' => ['api.nasa.gov']},
        fellows['hammer-dan']['projects'])
      assert_equal({'VA' => ['Blue Button Initiative']},
        fellows['black-tom']['projects'])
      assert_equal(
        {'VA' => ['Blue Button Initiative', 'Human Centered Design']},
        fellows['ruskin-mollie']['projects'])
      assert_equal({'SBA' => ['RFP-EZ']},
        fellows['godbout-greg']['projects'])
      assert_equal({'SBA' => ['RFP-EZ']},
        fellows['read-robert']['projects'])
    end

    def test_sort_consolidated_pif_projects

      # We'll lie and say Mollie worked on NASA and SBA projects to test the
      # sort order of 'projects' keys.
      @site.data['current_projects'] = {
        'Blue Button Initiative' => {
          'name' => 'Blue Button Initiative',
          'agency' => 'VA',
          'fellows' => ['ruskin-mollie'],
        },
        'RFP-EZ' => {
          'name' => 'RFP-EZ',
          'agency' => 'SBA',
          'fellows' => ['ruskin-mollie'],
        },
        'Veteran Employment Center' => {
          'name' => 'Veteran Employment Center',
          'agency' => 'VA',
          'fellows' => ['ruskin-mollie'],
        },
      }
      @site.data['previous_projects'] = {
        'Human Centered Design' => {
           'name' => 'Human Centered Design',
           'agency' => 'VA',
           'fellows' => ['ruskin-mollie'],
        },
        'api.nasa.gov' => {
          'name' => 'api.nasa.gov',
          'agency' => 'NASA',
          'fellows' => ['ruskin-mollie'],
         },
        'va.gov/data' => {
           'name' => 'va.gov/data',
           'agency' => 'VA',
           'fellows' => ['ruskin-mollie'],
        },
      }

      Joiner.consolidate_pif_projects_by_agency(@site)
      fellows = @site.data['fellows']
      projects = fellows['ruskin-mollie']['projects']
      assert_equal(
        {'VA' => [
          'Blue Button Initiative',
          'Human Centered Design',
          'va.gov/data',
          'Veteran Employment Center',
          ],
         'SBA' => ['RFP-EZ'],
         'NASA' => ['api.nasa.gov'],
        },
        projects)
      assert_equal ['NASA', 'SBA', 'VA'], projects.keys
    end
  end
end
