var APIKey = "dc51e86f28b41d77ff8619417bc35d08";
var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', getCity);
searchButton.addEventListener('click', searchCity);
var listHistory = document.getElementById('history');

var allSearch = [];

function searchCity() {
  var inputCity = document.getElementById('search-bar').value;
  allSearch.push(inputCity);
  localStorage.setItem("Search-History", JSON.stringify(allSearch));
}

function cityHistory() {
  var storedCities = JSON.parse(localStorage.getItem('Search-History'));
  if (storedCities !== null) {
    allSearch = storedCities;

    for(i = 0; i < storedCities.length; i++) {
      var cityPlacement = storedCities[i];
      var li = document.createElement('button');
      li.textContent = cityPlacement;
      li.setAttribute('data-index', i);
      listHistory.appendChild(li);
    }
  }
}

cityHistory();

function getCity() {
  var inputCity = document.getElementById('search-bar').value;
  //console.log(userInput);
  //console.log(searchButton.textContent);
  var cityAPI = "https://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&APPID=dc51e86f28b41d77ff8619417bc35d08";

  fetch(cityAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Fetch Response \n-------------');
      console.log(data);
      var lat = (data.coord.lat);
      var lon =(data.coord.lon);
      console.log(lat,lon);
      getCoor(lat, lon);
  })
};

function getCoor(lat, lon) {
  var coordinateAPI = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=dc51e86f28b41d77ff8619417bc35d08";

  fetch(coordinateAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var temp = (data.list[0].main.temp);
      var humidity = (data.list[0].main.humidity);
      var wind = (data.list[0].wind.speed);
      var date = (data.list[0].dt_txt);
      var place = (data.city.name);
      var weather = (data.list[0].weather[0].main);
    })
};