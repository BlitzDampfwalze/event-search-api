// const currentDate = Math.round((new Date()).getTime() / 1000);
const YELP_SEARCH_URL = 'https://api.yelp.com/v3/events';

function getDataFromApi(searchLocation, callback) {
  const settings = {
    url: YELP_SEARCH_URL,
    headers: {'Authorization': 'Bearer token'},
    data: {
      
      location: `${searchLocation}`,
      // categories: `${categorySelection}`,
      // start_date: `${currentDate}`,
      limit: 10
      
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
    console.log(settings)
  $.ajax(settings);
}

function renderResult(result) {
  return `
    <div>
      <h2>       
        <div class="results">${result.category}</div>
    </div>
  `;
};

function displaySearchData(data) {
  const results = data.events.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
};



function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displaySearchData);
    console.log(query)
    console.log(queryTarget)
  });
};
$(watchSubmit);
