var apiKey = "736e5272d944201c50faf6e4659553f3";
var searchColumn = document.querySelector("#leftColumn")
var resultsContainer = document.querySelector("#resultsContainer");
var searchInput = document.querySelector("#searchBox");
var searchBtn = document.querySelector("#searchBtn"); 
var resultsColumn = document.querySelector("#resultsColumn");
var userSearch; 
var foreCastArray = []
var dateEl = document.createElement("h3")
dateEl.textContent = moment().format("dddd, MMMM Do YYYY");
dateEl.className = "col-2 date-text"; 
resultsColumn.append(dateEl);

var fetchWeather = function(lat, lon) {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(function(response) {
        response.json().then(function(data){
            displayWeather(data);
            console.log(data);
        })
    }).then(function(){
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(function(response) {
            response.json().then(function(data){
                // displayWeather(data);
                console.log(data.list);
                data.list.forEach(function(item, index){
                    if ((index+1)%8==0){
                        foreCastArray.push(item)
                    }
                })
                console.log(foreCastArray);
                displayForecast(foreCastArray);
            })
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
    })
}

var searchCity = function() {
    resultsContainer.innerHTML = "";

    userSearch = searchInput.value;
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
    userSearch = searchInput.value; 

    var tempEl = document.createElement("h3");
    tempEl.textContent=  userSearch + "'s Current Temperature: " + data.current.temp + "°F";
    tempEl.className = "temp-text";
    
    var condition= data.current.weather[0].main; 

    if (condition === "Clear") {
        var sunnyEl = document.createElement("img");
        sunnyEl.setAttribute("src", "./images/clear.png"); 
        sunnyEl.className = "weather-icon"; 
        resultsContainer.append(sunnyEl); 
    }

    else if (condition === "Clouds") {
        var cloudyEl = document.createElement("img");
        cloudyEl.setAttribute("src", "./images/clouds.png"); 
        cloudyEl.className = "weather-icon"; 
        resultsContainer.append(cloudyEl); 
    }

    else if (condition === "Rain") {
        var rainyEl = document.createElement("img");
        rainyEl.setAttribute("src", "./images/rainy.png"); 
        rainyEl.className = "weather-icon"; 
        resultsContainer.append(rainyEl); 
    }

    var humidityEl = document.createElement("h3")
    humidityEl.textContent = "Humidity: " + data.current.humidity + "%"; 
    humidityEl.className = "humidity-text"; 

    var windEl = document.createElement("h3");  
    windEl.textContent= "Wind Speed: " + data.current.wind_speed + "mph"
    windEl.className= "wind-text";

    var uvi = data.current.uvi;

    var uvBox = document.createElement("div");
        if (uvi < 4 || uvi === 4) {
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
    uvEl.className= "uvi-text"; 
    uvBox.append(uvEl); 

    resultsContainer.append(tempEl); 
    resultsContainer.append(humidityEl);
    resultsContainer.append(windEl); 
    resultsContainer.append(uvBox); 
}
var displayForecast = function(data){
    data.forEach(function(item){
     var card = document.createElement("div");
     card.setAttribute("class", "forecastCard");
  //   card.innerText = item.main.temp;
    card.innerHTML = `
    <div class="col-sm-6">
    <div class="">
      <div class="">
        <h5 class="">${item.dt_txt.slice(0,10)}</h5>
        <img src=""alt = "weather forecast icon"id = ${item.dt_txt.slice(0,10)}>
        <p class="">Temp:${item.main.temp}</p>
        <p class="">Wind:${item.wind.speed}mph</p>
        <p class="">Humidity:${item.main.humidity}%</p>
      </div>
    </div>
  </div>
    `
     document.getElementById("forecastResults").append(card);
     document.getElementById(item.dt_txt.slice(0,10));
     var condition= item.weather[0].main; 

    if (condition === "Clear") {
        var sunnyEl = document.getElementById(item.dt_txt.slice(0,10));
        sunnyEl.setAttribute("src", "./images/clear.png"); 
        sunnyEl.className = "weather-icon";  
    }

    else if (condition === "Clouds") {
        var cloudyEl = document.getElementById(item.dt_txt.slice(0,10));
        cloudyEl.setAttribute("src", "./images/clouds.png"); 
        cloudyEl.className = "weather-icon"; 
    //    resultsContainer.append(cloudyEl); 
    }

    else if (condition === "Rain") {
        var rainyEl = document.getElementById(item.dt_txt.slice(0,10));
        rainyEl.setAttribute("src", "./images/rainy.png"); 
        rainyEl.className = "weather-icon"; 
     //   resultsContainer.append(rainyEl); 
    }
    })
}

searchBtn.addEventListener("click", searchCity)