module Pif
  class Joiner
    def self.join_data(site)
      filter_agencies(site)
      consolidate_pif_projects_by_agency(site)
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
  end
end
