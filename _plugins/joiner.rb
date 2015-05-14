module Pif
  class Joiner
    def self.join_data(site)
      site.data['agencies'] = filter_agencies(site)
    end

    def self.filter_agencies(site)
      projects = site.data['current_projects'].values
      projects.concat site.data['previous_projects'].values
      agencies = {}
      projects.each do |p|
        agency = (agencies[p['agency']] ||= {})
        (agency['fellows'] ||= []).concat (p['fellows'] || [])
      end
      agencies.each_value {|a| a['fellows'] = a['fellows'].compact.sort.uniq}
      agencies
    end
  end
end
