# Contributor's Guide

## Prerequisites

  + Ruby (version 2.3.5)
  + Bundler (version 1.16.1)

## Installation

Fork this repository under the ownership of your own account, then clone it:

```sh
git clone git@github.com:YOUR_USERNAME/pif-website.git
cd pif-website/
```

Install package dependencies:

```sh
bundle install
```

## Usage

To run a local web server:

```sh
bundle exec jekyll serve # then view in browser at localhost:4500
```

To generate counts of site data (including agencies, fellows, fellows by region, etc.):

```sh
JEKYLL_ENV=dev_logging bundle exec jekyll build
```

## Development

When contributing a new feature or fix: work on a new branch, commit and push your contributions to your remote fork, then open a pull request with the upstream repository to describe what changes you made and why. If possible, please include one or more screenshots depicting the relevant changes. Also, if possible, deploy your changes to a staging site on [Federalist](https://federalist.18f.gov), and include the relevant preview link in the body of your pull request.














<hr>





### Updating Site Data

In the **/_data** directory there are YAML files which specify information about fellows, agencies, projects, and case studies. Each kind of YAML file has a specific set of data fields and corresponding approved values.

When adding info to YAML files, if the text contains a comma (`,`) or period (`.`), please surround it with double quotes (`""`). If the quoted text contains quotes, use single quotes (`''`) inside the double quotes (e.g. `"Then he said, 'Hello World'."`).

#### Fellows

Fellows partner with agencies to work on projects.

File(s): **/_data/fellows/`lastname-firstname`.yml**

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

It's important to use the approved skills to ensure proper filtering on the Fellows page.

#### Agencies

Agencies partner with one or more fellows to work on projects.

File: **/_data/agency_list.yml**

field | info
--- | ---
short: | acronym or abbreviated name
long: | full name
website: | full URL of agency website

When adding a new agency, add the agency logo (400x400) to **/images/agencies/`SHORT`.png** and update the Agencies Appendix, below.

#### Projects

Projects associate fellows with agencies. The site data contains a legacy differentiation between current and previous projects. As current projects wrap up, move them to previous projects subdirectory.

Files: **/_data/current_projects/`project-name`.yml** OR **/_data/previous_projects/`project-name`.yml**

field | format/info
--- | ---
name: | name of project
agency: | reference name, see Appendix
description: |
fellows: | list of fellows who worked on project

It's important to use approved agency and fellow identifiers to ensure proper association.

#### Case Studies

Case studies are specific projects that are highlighted for branding and marketing purposes.

Files: **/_data/case_studies/`case-study-name`.yml**

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











<hr>



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
