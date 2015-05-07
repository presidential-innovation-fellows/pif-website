# Presidential Innovation Fellows website

This is the PIF website, jekyll edition (inspired by the [18F hub](https://github.com/18F/hub)). The website is currently maintained by the PIF leadership, with contributions from the fellows.

In the _data section there are YAML files available for PIF bios, current/previous projects, and case studies. Additionally, there are specific fields for each YAML file and corresponding approved values.

**NOTE:** When adding info to YAML files, if the text added contains a ',' or '.' please use "" around the text.

#### PIF bios

FILENAME: lastname-firstname.yml
- id: lastname-firstname
- name:
- img: lastname-firstname-headshot.png*
- class: [identified by year you joined]
- hometown:
- region: [using general US Census regions]
- skills: [list of approved terms are in the appendix]
- projects: [should contain a **title** and **agency** for each project]
 - title:
 - agency:
- agencies: [list of approved terms are in the appendix]

**NOTE:** It's **IMPORTANT** to use the approved values so the filtering on the Fellows page works.

#### Case Studies

Case studies are specific PIF projects that are highlighted and used for branding and marketing.

FILENAME: case-study-name.yml
- id: [case-study-id]
- img: case-study.png
- title:
- description:
- challenge:
- solution:
- impact:
- date:
- quote:
- quote_source:

#### Current and Previous Projects

Current and previous projects are within their respective subdirectories (current_projects and previous_projects). As current projects wrap up, they should be moved to the previous_projects subdirectory.

FILENAME: project-name.yml
- name:
- agency: [full name]
- description:

### Appendix

#### regions

term | name
--- | ---
northeast | Northeast
south | South
midwest | Midwest
west | West
outside | Outside the US

#### Skills

term | name
--- | ---
policy | Policy & Legislation
front | Front End Development
data | Data Visualization
product | Product Management
ux | User Experience
comm | Marketing & Communications
bd | Business Development
back | Back End Development
design | Visual Design
cyber | Cyber Security
digital | Digital Strategy

#### Agencies [1]

term | name
--- | ---
ag | Department of Agriculture
census | Census Bureau
cio | US Chief Information Office
commerce | Department of Commerce
ed | Department of Education
energy | Department of Energy
fda | Food and Drug Administration
fema | Federal Emergency Management Agency
gsa | General Services Administration
hhs | Health and Human Services
interior | Department of Interior
irs | Internal Revenue Service
labor | Department of Labor
mcc | Millennium Challenge Corporation
nara | National Archives and Records Administration
nasa | National Aeronautics and Space Administration
nih | National Institute of Health
nist | National Institute of Standards and Technology
noaa | National Oceanic and Atmospheric Administration
nsf | National Science Foundatoin
ostp | White House Office of Science & Technology, Policy
patent | United States Patent and Trademark Office
sba | Small Business Administration
smithsonian | Smithsonian Institution
state | State Department
treasury | Department of the Treasury
usaid | US 
VA | Veteran Affairs

[1] Working for an agency or organization that's not listed, message @stroupaloop to have it added (or be bold and do it yourself)!
