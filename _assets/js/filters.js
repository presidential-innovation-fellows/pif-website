var searchbox = document.getElementById('fellows-search-input');
var searchInput = document.getElementById('fellows-search-input'); // Found in fellow-filters.html
var resultsContainer = document.getElementById('fellow-search-results');
var inFellowSearch = false;
var defaultList = document.getElementById("fellow-search-default");
var yearSelect = document.getElementById("fellows-select-year");
var skillSelect = document.getElementById("fellows-select-skill");
/* In order to filter the JSON blob correctly later and have both the search
and the filters work as expected, we need to not bind the filters' SJS instance
to the actual search input. */
var searchInputDummy = {addEventListener: () => {}}; 

let sjs = SimpleJekyllSearch({
  searchInput:  searchInputDummy,
  resultsContainer: resultsContainer,
  json: fellowsJson,
  searchResultTemplate: searchResultTemplate
}); 

// Set filters based on path during page load
const parseURL = () => {
  let json = fellowsJson;

  var curYearMatch = window.location.pathname.match(/([\d])\w+/g);
  if (curYearMatch) {
    yearSelect.value = curYearMatch[0];
    json = json.filter(fellow => fellow.fellow_year === curYearMatch[0]);
  }

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
    /* Since the year data is part of its own page/Jekyll collection,
     * we can rely on redirecting to the appropriate fellows/[year] page 
     * and don't need to worry about triggering an SJS search for year. 
     * But we do need to trigger SJS if there's a specialty in the query string. */
    sjs.search(curSkillMatch);
    defaultList.style.display = "none";
  }
  return json; // used in filters.tests.js
}
// Call the parseURL function immediately on page load. Could also be an IIFE.
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
};

/* When the searchbox is focused, create a new instance of SJS with access
 * to the full fellows JSON blob and clear any filter choices. 
 * We also bind this SJS instance to the actual search input element. */
searchbox.addEventListener('focus', () => {
  sjs = SimpleJekyllSearch({
    searchInput: searchInput,
    resultsContainer: resultsContainer,
    json: fellowsJson,
    searchResultTemplate: searchResultTemplate
  });
  // We can't search in a way that takes the filters into account, so set them back to "all"
  resetFilters();
});

const respondToSearchbox = (searchterm) => {
  if (searchterm.length && !inFellowSearch) {
    sjs.search(searchterm);
    inFellowSearch = true;
    defaultList.style.display = "none";
  }
  if (!searchterm.length && inFellowSearch) {
    inFellowSearch = false;
    // show initial list after search is over
    defaultList.style.display = "block";
  }
}

searchbox.addEventListener('keyup', () => {
  respondToSearchbox(searchInput.value.trim());
});

// we need to track both the filters by way of the URL so that if someone shares the path, we can render the right results
const buildPath = () => {
  const base = `${siteBaseurl}/fellows`;
  const subpage = yearSelect.value ? `/${yearSelect.value}` : ''; // years are rendered as pages because fellows are a Jekyll collection (defined in config.yml)
  const querystring = skillSelect.value ? `?specialty=${encodeURI(skillSelect.value)}` : '';
  return base + subpage + querystring;
};

const doSJS = (json, searchterm) => {
  sjs = SimpleJekyllSearch({
    searchInput:  searchInputDummy,
    resultsContainer: resultsContainer,
    json: json,
    searchResultTemplate: searchResultTemplate
  }); 
  sjs.search(searchterm); 
};

/**** respondToSelect takes an object that looks like this:
 * filtersToSet = [
 * {propertyName: 'name of primary fellowsJson property to filter on', value: 'value from input'},
 * {propertyName: 'secondary fellowsJson property', value: 'value from secondary input'}
 * ]
 * The "primary filter" is the one that triggered the event listener.
 * The "secondary filter" is the other filter, which must also be checked for a value.
 *
 * Theoretically there could be multiple secondary filters, but this code doesn't quite support that.
 * (Namely, the value passed to doSJS() assumes there are only two filters. See tests.)
 * Note that it is possible for the primary property to be undefined. This happens when someone
 * has filtered by both year and specialty, and then sets one of them back to "all." In this case,
 * the array will have only one object in it, and that object will be the secondary filter.
****/
const respondToSelect = (filtersToSet) => {
  let json = fellowsJson;
  if (filtersToSet.length) {
    filtersToSet.forEach(filter => {
      json = json.filter(fellow => fellow[filter.propertyName] === filter.value);
    });
    doSJS(json, filtersToSet[0].value); // if there are multiple values, filter on the first value.
    defaultList.style.display = "none";
  } else {
    defaultList.style.display = "block";
  }
  window.history.replaceState({}, '', buildPath());
  return json; // for testing
};

const buildYearFilterObject = () => {
  if (yearSelect.value) {
    return { propertyName: 'fellow_year', value: yearSelect.value }
  } else {
    return;
  }
}

const buildSkillFilterObject = () => {
  if (skillSelect.value) {
    return { propertyName: 'specialty', value: skillSelect.value }
  } else {
    return;
  }
}

yearSelect.addEventListener('change', (e) => {
  resetSearch();
  let filtersToSet = [];
  // the first filter needs to match the select
  filtersToSet.push(buildYearFilterObject());
  filtersToSet.push(buildSkillFilterObject());
  respondToSelect(filtersToSet.filter(item => item !== undefined));
});

skillSelect.addEventListener('change', (e) => {
  resetSearch();
  let filtersToSet = [];
  // the first filter needs to match the select
  filtersToSet.push(buildSkillFilterObject());
  filtersToSet.push(buildYearFilterObject());
  respondToSelect(filtersToSet.filter(item => item !== undefined));
});

// exports for tests in filters.test.js
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
      doSJS,
      respondToSelect,
      respondToSearchbox
    }
  }
} catch {
  // triggering the catch means we're in a prod environment, so don't do anything
};