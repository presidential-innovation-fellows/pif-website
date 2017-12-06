# Contributor's Guide

## Prerequisites

  + Ruby (version 2.3.5)
  + Bundler (version 1.16.0)

## Installation

Fork this repository under the ownership of your own account, then clone it:

```sh
git clone git@github.com:`YOUR_USERNAME`/pif-website.git
cd pif-website/
```

Install package dependencies:

```sh
bundle install
```

## Development

Run local web server:

```sh
bundle exec jekyll serve # then view in browser at localhost:4500
```

When contributing a new feature or fix: work on a new branch, commit and push your contributions to your remote fork, then open a pull request within the upstream repository to describe what changes you made and why.

### Updating Site Data

In the `/_data` directory there are YAML files available for fellow bios, current/previous projects, and case studies. Additionally, there are specific fields for each YAML file and corresponding approved values.

**NOTE:** When adding info to YAML files, if the text added contains a , or . please use "" around the text. ALSO, if you need to quote something (using ""), use '' instead.

#### Fellows

LOCATION: `/_data/fellows/`

FILENAME: lastname-firstname.yml

field | format/info
--- | ---
id: | lastname-firstname
name: | full name
year: | year joined
img: | lastname-firstname-headshot.png
hometown: | City, STATE
region: | US Census regions [map link](http://www2.census.gov/geo/pdfs/maps-data/maps/reference/us_regdiv.pdf)
bio: | 140 character bio
bio_full: | full fellow bio
skills: | list of approved terms are in Appendix

**NOTE:** It's **IMPORTANT** to use the approved values for **SKILLS** so the filtering on the Fellows page works.

#### Agencies

This YAML file contains the reference keys for agencies

LOCATION: `/_data/`

FILENAME: agency_list.yml

field | info
--- | ---
short: | acronym or abbreviated name
long: | full name
website: | full URL of agency website

**NOTE:** If you need to add an agency, make sure to add their logo (400x400) to the /images/agencies/ folder using the **SHORT** field name AND update the README.md file to include the agency in the Appendix list.

#### Projects

Projects associate fellows with agencies.

Current and previous projects are within their respective subdirectories. As current projects wrap up, they should be moved to the previous projects subdirectory.

LOCATION: `/_data/current_projects/` OR `/_data/previous_projects/`

FILENAME: project-name.yml

field | format/info
--- | ---
name: | name of project
agency: | reference name, see Appendix
description: |
fellows: | list of fellows who worked on project

**NOTE:** It's **IMPORTANT** to use the approved values for **AGENCY** and **PIFS** so their info in other YAML files are accurately populated.

#### Case Studies

Case studies are specific fellow projects that are highlighted and used for branding and marketing.

LOCATION: `/_data/case_studies/`

FILENAME: case-study-name.yml

field | format/info
--- | ---
id: | case-study-name
img: | case-study.png
title: | name of case study
description: |
challenge: |
solution: |
impact: |
date: | typically a range (e.g. 2013 - present)
quote: |
quote_source: |

### Appendices

#### Regions Appendix

term | name
--- | ---
northeast | Northeast
south | South
midwest | Midwest
west | West
outside | Outside the US

#### Skills Appendix

term | name
--- | ---
back | Back End Development
bd | Business Development
comm | Marketing & Communications
cyber | Cyber Security
data | Data Visualization
design | Visual Design
digital | Digital Strategy
front | Front End Development
policy | Policy & Legislation
product | Product Management
ux | User Experience

#### Agencies Appendix

term | name
--- | ---
DOC | Department of Commerce
DOE | Department of Energy
DOI | Department of Interior
DOL | Department of Labor
DOT | Department of Transportation
ED | Department of Education
FDA | Food and Drug Administration
FEMA | Federal Emergency Management Agency
GSA | General Services Administration
HHS | Health and Human Services
IRS | Internal Revenue Service
MCC | Millennium Challenge Corporation
NARA | National Archives and Records Administration
NASA | National Aeronautics and Space Administration
NCI | National Cancer Institute
NIH | National Institute of Health
NIST | National Institute of Standards and Technology
NOAA | National Oceanic and Atmospheric Administration
NSF | National Science Foundation
ODNI | Office of the Director of National Intelligence
OSTP | White House Office of Science & Technology, Policy
SBA | Small Business Administration
Smithsonian | Smithsonian Institution
State | State Department
Treasury | Department of the Treasury
USAID | US Agency for International Development
USDA | Department of Agriculture
USCB | Census Bureau
USCIO | US Chief Information Officer
USPTO | United States Patent and Trademark Office
VA | Veteran Affairs
