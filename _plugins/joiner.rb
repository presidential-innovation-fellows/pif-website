require 'active_support/core_ext/hash/keys' # enable Hash#symbolize_keys
require 'pp' # enable pretty printing

module Pif
  class Joiner
    def self.join_data(site)
      filter_agencies(site)
      consolidate_pif_projects_by_agency(site)
      #log_fellow_counts(site) # un-comment this line to print fellow and region counts to the server logs (for example if you need to update the homepage map :-)
    end

    def self.filter_agencies(site)
      projects = consolidate_all_projects(site)
      agencies = {}
      projects.each do |p|
        agency = (agencies[p['agency']] ||= {})
        (agency['fellows'] ||= []).concat (p['fellows'] || [])
      end
      agencies.each_value {|a| a['fellows'] = a['fellows'].compact.sort.uniq}
      site.data['agencies'] = Hash[agencies.sort_by {|i| i[0].downcase}]
    end

    def self.consolidate_pif_projects_by_agency(site)
      site.data['fellows'].each_value {|f| f['projects'] = Hash.new}
      consolidate_all_projects(site).each do |project|
        agency = project['agency']
        (project['fellows'] || []).each do |fellow_name|
          next if fellow_name == nil
          fellow = site.data['fellows'][fellow_name]
          projects = fellow['projects']
          (projects[agency] ||= Array.new) << project['name']
        end
      end

      site.data['fellows'].each_value do |f|
        f['projects'] = Hash[f['projects'].sort_by {|i| i[0].downcase}]
        f['projects'].each_value {|v| v.sort_by! {|i| i.downcase}}
      end
    end

    private

    def self.consolidate_all_projects(site)
      return site.data['projects'] if site.data['projects'] != nil
      projects = []
      projects.concat site.data['current_projects'].values
      projects.concat site.data['previous_projects'].values
      site.data['projects'] = projects
    end

    # count the number of fellows, and number of fellows per region
    # ... and print results to server logs
    # ... adapted from source: https://stackoverflow.com/a/13519616/670433
    def self.log_fellow_counts(site)
      fellows = site.data['fellows']

      fellow_regions = fellows.map{|_,v| v['region']} #> ["northeast", "northeast", "west", "midwest", etc.]
      raise 'UNASSIGNED REGION(S) ERROR!' if fellow_regions.include?(nil)

      region_counts = fellow_regions.group_by{|region| region.downcase}.map{|k,v| [k, v.count] } #> [["northeast", 40], ["west", 45], etc.]
      region_counts = Hash[*region_counts.flatten].symbolize_keys #> {northeast: 40, west: 45, etc.}
      raise 'UNRECOGNIZED REGION(S) ERROR!' if region_counts.keys.sort != [:midwest, :northeast, :outside, :south, :west]

      fellow_counts = {total: fellows.count, by_region: region_counts}
      pp 'FELLOW COUNTS', fellow_counts
    end
  end
end
