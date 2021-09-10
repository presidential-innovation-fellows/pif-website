/* Running tests:
 * cd _assets/js
 * yarn install
 * yarn test --watch
*/
let filters, searchbox, searchInput, resultsContainer, inFellowSearch, defaultList, yearSelect, skillSelect, searchInputDummy, mockedSearch;

describe('test that filters return correct data', () => {
  beforeEach(() => {
    window.history.replaceState = jest.fn();
    delete window.location;
    window.location = {
      "pathname": "expected-baseurl/fellows/",
      "search": ""
    };
    document.body.innerHTML = `<div>
      <button id='fellows-search-input'/>
      <select id='fellows-select-year'>
        <option value="">All</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
      <select id='fellows-select-skill'>
        <option value="all">All</option>
        <option value="front end development">Front end</option>
        <option value="back end development" selected>Back end</option>
        <option value="product management">Product</option>
      </select>
      <button id='fellow-search-default'/>
    </div>`;
    
    siteBaseurl = 'expected-baseurl';
    
    fellowsJson = [
      {
        "specialty": "product management",
        "fellow_year": "2021"
      },
      {
        "specialty": "product management",
        "fellow_year": "2020"
      },
      {
        "specialty": "front end development",
        "fellow_year": "2020"
      }, {
        "specialty": "back end development",
        "fellow_year": "2020"
      }
    ];
    
    resultsContainer = '<div>results go here</div>';
    searchResultTemplate = '<hi>hello</hi>';
    
    mockedSearch = jest.fn();
    SimpleJekyllSearch = jest.fn().mockReturnValue({ search: mockedSearch });
    
    filters = require('./filters');
    // TODO: these might outta be reset to blank beforeEach because otherwise side effects can happen
    searchbox = filters.searchbox;
    searchInput = filters.searchInput;
    resultsContainer = filters.resultsContainer;
    inFellowSearch = filters.inFellowSearch;
    defaultList = filters.defaultList;
    yearSelect = filters.yearSelect;
    skillSelect = filters.skillSelect;
    searchInputDummy = filters.searchInputDummy;
  });
  
  it('searchbox values can be reset correctly', () => {
    searchInput.value = 'nonsense';
    filters.resetSearch();
    expect(searchInput.value).toEqual('');
  });
  
  it('searchbox responds to search terms', () => {
    searchInput.value = "front end development";
    // focus listener triggers the SimpleJekyllSearch object binding
    const event = new Event('focus');
    searchbox.dispatchEvent(event);
    filters.respondToSearchbox(searchInput.value);
    expect(mockedSearch).toHaveBeenCalledWith(searchInput.value);
    expect(defaultList.style.display).toEqual('none');
  });
});