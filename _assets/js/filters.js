var searchbox = document.getElementById('fellows-search-input');
var searchInput = document.getElementById('fellows-search-input'); // Found in fellow-filters.html
var resultsContainer = document.getElementById('fellow-search-results');
var inFellowSearch = false;
var defaultList = document.getElementById("fellow-search-default");
var yearSelect = document.getElementById("fellows-select-year");
var skillSelect = document.getElementById("fellows-select-skill");
var searchInputDummy = {addEventListener: () => {}}; // in order to filter the JSON blob correctly and have both the search and the filters work as expected, we need to not bind the initial SJS instance to the actual search input.


let sjs = SimpleJekyllSearch({
  searchInput:  searchInputDummy,
  resultsContainer: resultsContainer,
  json: fellowsJson,
  searchResultTemplate: searchResultTemplate
}); 

// Set filters based on path during page load
const parseURL = () => {
  let json = fellowsJson;
  // Since the year data is part of its own page, we don't need to worry about doing a search just for that
  var curYearMatch = window.location.pathname.match(/([\d])\w+/g);
  if (curYearMatch) {
    yearSelect.value = curYearMatch[0];
    json = json.filter(fellow => fellow.fellow_year === curYearMatch[0]);
  }
  // Skills do need an explicit search because they're not their own Jekyll collection
  var params = new URLSearchParams(window.location.search);
  const curSkillMatch = params.getAll('specialty')[0];;
  
  if (curSkillMatch) {
    skillSelect.value = curSkillMatch;
    json = json.filter(fellow => fellow.specialty === curSkillMatch);
    sjs = SimpleJekyllSearch({
      searchInput:  searchInputDummy,
      resultsContainer: resultsContainer,
      json: json,
      searchResultTemplate: searchResultTemplate
    });
    sjs.search(curSkillMatch);
    defaultList.style.display = "none";
  }
  return json; // for testing
}
parseURL();


const resetFilters = () => {
  yearSelect.value="";
  skillSelect.value="";
  window.history.replaceState({}, '', `${siteBaseurl}/fellows`); 
  defaultList.style.display = "block";
};


const resetSearch = () => {
  inFellowSearch = false;
  searchInput.value = '';
  //defaultList.style.display = "block";
};

// When the searchbox is focused, create a new instance of SJS with access to the full fellows JSON blob and clear any filter choices.
searchbox.addEventListener('focus', () => {
  // searchbox needs to be connected to the entire JSON results blob
  sjs = SimpleJekyllSearch({
    searchInput: searchInput,
    resultsContainer: resultsContainer,
    json: fellowsJson,
    searchResultTemplate: searchResultTemplate
  });
  resetFilters();
});

/*** show initial list after search is over ***/
searchbox.addEventListener('keyup', function() {
  if (searchInput.value.trim().length && !inFellowSearch) {
    sjs.search(searchInput.value.trim());
    inFellowSearch = true;
    defaultList.style.display = "none";
  }
  if (!searchInput.value.trim().length && inFellowSearch) {
    inFellowSearch = false;
    defaultList.style.display = "block";
  }
});

// we need to track both the filters by way of the URL so that if someone shares the path, we can render the right results
const buildPath = () => {
  const base = `${siteBaseurl}/fellows`;
  const subpage = yearSelect.value ? `/${yearSelect.value}` : ''; // years are rendered as pages because fellows are a Jekyll collection (defined in config.yml)
  const querystring = skillSelect.value ? `?specialty=${encodeURI(skillSelect.value)}` : '';
  return base + subpage + querystring;
};

// TODO: Test
const doSJS = (json, searchterm) => {
  sjs = SimpleJekyllSearch({
    searchInput:  searchInputDummy,
    resultsContainer: resultsContainer,
    json: json,
    searchResultTemplate: searchResultTemplate
  }); 
  sjs.search(searchterm); 
};

const respondToYearSelect = (value) => {
  let json = fellowsJson;
  if (value) {
    json = json.filter(fellow => fellow.fellow_year === value);
    if (skillSelect.value) {
      json = json.filter(fellow => fellow.specialty === skillSelect.value);
    }
    doSJS(json, value);
    defaultList.style.display = "none";
  } else {
    if (skillSelect.value) {
      json = fellowsJson.filter(fellow => fellow.specialty === skillSelect.value);
      doSJS(json, skillSelect.value);
    } else {
      defaultList.style.display = "block";
    }
  }
  window.history.replaceState({}, '', buildPath());
  return json; // for testing
};

const respondToSkillSelect = (value) => {
  let json = fellowsJson;
  if (value) {
    json = json.filter(fellow => fellow.specialty === value);
    if (yearSelect.value) {
      json = json.filter(fellow => fellow.fellow_year === yearSelect.value);
    }
    doSJS(json, value);
    defaultList.style.display = "none";
  } else {
      if (yearSelect.value) {
      json = fellowsJson.filter(fellow => fellow.fellow_year === yearSelect.value);
      doSJS(json, yearSelect.value);
    } else {
      defaultList.style.display = "block";
    }
  }
  window.history.replaceState({}, '', buildPath());
  return json;
};

yearSelect.addEventListener('change', (e) => {
  resetSearch();
  respondToYearSelect(e.target.value);
});

skillSelect.addEventListener('change', (e) => {
  resetSearch();
  respondToSkillSelect(e.target.value);
});

try {
  if (process.env.JEST_WORKER_ID !== undefined) {
    module.exports = {
      searchbox,
      searchInput,
      resultsContainer,
      inFellowSearch,
      defaultList,
      yearSelect,
      skillSelect,
      searchInputDummy,
      parseURL,
      buildPath,
      resetFilters,
      resetSearch,
      respondToYearSelect,
      respondToSkillSelect,
      doSJS
    }
  }
} catch {};