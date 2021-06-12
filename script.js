var searchColumn = document.querySelector("#leftColumn")
var resultsContainer = document.querySelector("#resultsContainer");
var searchInput = document.querySelector("#searchBox");
var searchBtn = document.querySelector("#searchBtn"); 
var apiKey = "736e5272d944201c50faf6e4659553f3";

var fetchWeather = function(lat, lon) {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(function(response) {
        response.json().then(function(data){
            displayWeather(data);
            console.log(data);
        })
    }) 
    
}

var fetchCoor = function (city) {
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        fetchWeather(data[0].lat, data[0].lon)
        console.log(data)
    })

}


var searchCity = function() {
    resultsContainer.innerHTML = "";

    var userSearch = searchInput.value;
    fetchCoor(userSearch);

    var userCity = document.createElement("h3");
    userCity.textContent = userSearch; 
    userCity.className = "user-city"

    var cityBox= document.createElement("div");
    cityBox.className = "city-box";

    cityBox.append(userCity); 
    leftColumn.append(cityBox); 

}

var displayWeather = function(data) {
    var tempEl = document.createElement("h3");
    tempEl.textContent=  "'s Weather: " + data.current.temp + "°F";
    tempEl.class = "temp-text";
    
    var humidityEl = document.createElement("h3")
    humidityEl.textContent = "Humidity: " + data.current.humidity + "%"; 
    humidityEl.className = "humidity-text"; 

    var windEl = document.createElement("h3");  
    windEl.textContent= "Wind Speed: " + data.current.wind_speed + "mph"
    windEl.className= "wind-text";

    var uvi = data.current.uvi;

    var uvBox = document.createElement("div");
        if (uvi < 4) {
            uvBox.className = "uv-box-fav";
        }
        else if (uvi >4 && uvi <8) {
            uvBox.className = "uv-box-mod"
        }
        else {
            uvBox.className = "uv-box-sev"
        }

    var uvEl = document.createElement("h3");
    uvEl.textContent = "UVI: " + uvi
    uvEl.className= "uv-text"; 
    uvBox.append(uvEl); 

    resultsContainer.append(tempEl); 
    resultsContainer.append(humidityEl);
    resultsContainer.append(windEl); 
    resultsContainer.append(uvBox); 
}

searchBtn.addEventListener("click", searchCity)