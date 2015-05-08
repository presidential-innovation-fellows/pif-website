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
USDA | Department of Agriculture
USCB | Census Bureau
USCIO | US Chief Information Officer
DOC | Department of Commerce
ED | Department of Education
DOE | Department of Energy
FDA | Food and Drug Administration
FEMA | Federal Emergency Management Agency
GSA | General Services Administration
HHS | Health and Human Services
DOI | Department of Interior
IRS | Internal Revenue Service
DOL | Department of Labor
MCC | Millennium Challenge Corporation
NARA | National Archives and Records Administration
NASA | National Aeronautics and Space Administration
NIH | National Institute of Health
NIST | National Institute of Standards and Technology
NOAA | National Oceanic and Atmospheric Administration
NSF | National Science Foundatoin
OSTP | White House Office of Science & Technology, Policy
USPTO | United States Patent and Trademark Office
SBA | Small Business Administration
Smithsonian | Smithsonian Institution
State | State Department
Treasury | Department of the Treasury
USAID | US Agency for International Development
VA | Veteran Affairs

[1] Working for an agency or organization that's not listed, message @stroupaloop to have it added (or be bold and do it yourself)!
