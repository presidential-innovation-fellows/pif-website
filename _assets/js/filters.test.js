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

  it('filters can be reset correctly', () => {
    // console.log({global})
    yearSelect.value = "2020";
    skillSelect.value = "clowning";
    defaultList.style.display = "none";
    filters.resetFilters();
    expect(yearSelect.value).toEqual('');
    expect(skillSelect.value).toEqual('');
    expect(defaultList.style.display).toEqual('block');
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows');
  });
  
  it('searchbox values can be reset correctly', () => {
    inFellowSearch = true;
    searchInput.value = 'nonsense';
    filters.resetSearch();
    // expect(inFellowSearch).toEqual(false);
    expect(searchInput.value).toEqual('');
  });
  
  it('filter values render correct page path', () => {
    skillSelect.value = "front end development";
    yearSelect.value = '2020';
    let builtPath = filters.buildPath();
    expect(builtPath).toEqual('expected-baseurl/fellows/2020?specialty=front%20end%20development');
  });
  
  it('year select filters by year only when year is set', () => {
    yearSelect.value = '2020';
    skillSelect.value = '';
    let returnedJson = filters.respondToYearSelect('2020')
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows/2020');
    expect(defaultList.style.display).toEqual('none');;
    expect(returnedJson).toEqual([
      { specialty: 'product management', fellow_year: '2020' },
      { specialty: 'front end development', fellow_year: '2020' },
      { specialty: 'back end development', fellow_year: '2020' }
    ]);
  });

  it('year select filters by year and skill when both are set', () => {
    yearSelect.value = '2020';
    skillSelect.value = "front end development";
    let returnedJson = filters.respondToYearSelect('2020');
    expect(defaultList.style.display).toEqual('none');
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows/2020?specialty=front%20end%20development');
    expect(returnedJson).toEqual([{ specialty: 'front end development', fellow_year: '2020' }]);
    expect(SimpleJekyllSearch).toHaveBeenCalledWith({
      "json": [
        {
          "fellow_year": "2020",
          "specialty": "front end development",
        },
      ],
      "resultsContainer": resultsContainer,
      "searchInput": searchInputDummy,
      "searchResultTemplate": searchResultTemplate
    });
    expect(mockedSearch).toHaveBeenCalledWith('2020');
  });
  
  it('year select triggers a search by skill only when the year is unset', () => {
    yearSelect.value = '';
    skillSelect.value = "product management";
    let returnedJson = filters.respondToYearSelect('');
    expect(defaultList.style.display).toEqual('none');
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows?specialty=product%20management');
    expect(returnedJson).toEqual([
      { specialty: 'product management', fellow_year: '2021' },
      { specialty: 'product management', fellow_year: '2020' }
    ]);
  });
  
  it('year select returns complete JSON when neither filter is set', () => {
    yearSelect.value = '';
    skillSelect.value = '';
    let returnedJson = filters.respondToYearSelect('');
    expect(defaultList.style.display).toEqual('block');
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows');
    expect(returnedJson).toEqual([
      { specialty: 'product management', fellow_year: '2021' },
      { specialty: 'product management', fellow_year: '2020' },
      { specialty: 'front end development', fellow_year: '2020' },
      { specialty: 'back end development', fellow_year: '2020' } 
    ]);
  });
  
  it('skill select filters by skill only when skill is set', () => {
    yearSelect.value = '';
    skillSelect.value = "product management";
    let returnedJson = filters.respondToSkillSelect('product management');
    expect(defaultList.style.display).toEqual('none');
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows?specialty=product%20management');
    expect(returnedJson).toEqual([
      { specialty: 'product management', fellow_year: '2021' },
      { specialty: 'product management', fellow_year: '2020' } 
    ]);
  });
    
  it('skill select filters by skill and year when both are set', () => {
    yearSelect.value = '2020';
    skillSelect.value = 'product management';
    let returnedJson = filters.respondToSkillSelect('product management');
    expect(defaultList.style.display).toEqual('none');
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows/2020?specialty=product%20management');
    expect(returnedJson).toEqual([{ specialty: 'product management', fellow_year: '2020' }]);
  });
  
  it('skill select triggers a search by year only when skill is unset', () => {
    yearSelect.value = '2020';
    skillSelect.value = '';
    let returnedJson = filters.respondToSkillSelect('');
    expect(defaultList.style.display).toEqual('none');
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows/2020');
    expect(returnedJson).toEqual([
      { specialty: 'product management', fellow_year: '2020' },
      { specialty: 'front end development', fellow_year: '2020' },
      { specialty: 'back end development', fellow_year: '2020' } 
    ]);

  });
  
  it('skill select returns complete JSON when neither filter is set', () => {
    yearSelect.value = '';
    skillSelect.value = '';
    let returnedJson = filters.respondToSkillSelect('');
    expect(defaultList.style.display).toEqual('block');
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', 'expected-baseurl/fellows');
    expect(returnedJson).toEqual([
      { specialty: 'product management', fellow_year: '2021' },
      { specialty: 'product management', fellow_year: '2020' },
      { specialty: 'front end development', fellow_year: '2020' },
      { specialty: 'back end development', fellow_year: '2020' } 
    ]);
  });
  
  describe('testing URL string parsing', () => {
    beforeEach(() => {
      window.location = {
        "pathname": "expected-baseurl/fellows/2020",
        "search": "?specialty=front%20end%20development"
      };
    });
    it('parses the year and specialty on page load', () => {
      const returnedJson = filters.parseURL();
      expect(yearSelect.value).toEqual('2020');
      expect(skillSelect.value).toEqual('front end development');
      expect(returnedJson).toEqual([{ specialty: 'front end development', fellow_year: '2020' }]);
    });
  });
});