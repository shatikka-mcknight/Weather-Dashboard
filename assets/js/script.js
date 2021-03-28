let appId = "ccd48ccf113eeb3d3f3a46d2f1e3ed7f";
let units = "metric";
let searchMethod = "zip";

//create a function to determine what data is being enter for the #searchData zip code or City name, state code and country code
function getSearchMethod(searchInfo) {
    //if searchInfo length entered zipcode should equal to 5 using numbers should return a number base off the empty string which equals 5 numbers making it true
    if (searchInfo.length === 5 && Number.parseInt(searchInfo) + "" === searchInfo)
        //searchMethod will pull the parameters of zip from OpneWeatherAPI that requires it to be a zipcode
        searchMethod = "zip";
    else
        //if it is not a zipcode user must enter in searchMethod of q from the OpenWeatherAPI the requires City name, state code and country code using 
        searchMethod = "q";
    // else
    //     searchMethod = 

}


 
function searchWeather(searchInfo) {
    getSearchMethod(searchInfo);
    /*calling the URL from the OpenWeatherAPI funtion name with parameters of
    searchInfo that includes the Api Key with how to display the degree...
    waiting for the server results and using json to read the information 
    that return show me the information returned*/
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchInfo}&APPID=${appId}&degree=${units}`).then(result => {
        return result.json();
    }).then(results => {
        init(results);
    })
    
}

function init(resultFromOpenWeather) {
    console.log(resultFromOpenWeather);
    var cityNameSearch = document.getElementById("cityName")
    var weatherIconResults = document.getElementById("weatherIcon")
    var weatherDescriptionResults = document.getElementById("weatherDescription");
    var tempDegreeResults = document.getElementById("tempDegree");
    var humityPercentResults = document.getElementById("humityPercent");
    var windSpeedResults = document.getElementById("windSpeed");
    var uvIndexResults = document.getElementById("uvIndex");

    weatherIconResults.src = " http://openweathermap.org/img/wn/" + resultFromOpenWeather.weather[0].icon + ".png";

    let resultWeatherDisplay = resultFromOpenWeather.weather[0].description;
    let resultWeatherArea = resultFromOpenWeather.name;
    let resultWeatherMain = resultFromOpenWeather.main;
    let resultWeatherWind = resultFromOpenWeather.wind;

    // capitalWords.join(" ");

    cityNameSearch.innerHTML = "Location: " + resultWeatherArea;
    weatherDescriptionResults.innerText = "Description: "
        + resultWeatherDisplay;
    

    tempDegreeResults.innerHTML = "Temp: "
        + "<li> Current: " + Math.floor(resultWeatherMain.temp) + "&#176</li>"
        + "<li> High: " + Math.floor(resultWeatherMain.temp_max) + "&#176</li>"
        + "<li> Low: " + Math.floor(resultWeatherMain.temp_min) + "&#176</li>";
    
    humityPercentResults.innerHTML = "Humidity: " + Math.floor(resultWeatherMain.humidity);
    
    windSpeedResults.innerHTML = "Wind Speed: " + Math.floor(resultWeatherWind.speed);
}
    // console.log();


//Setting up the search button interaction
    document.getElementById("submitCity").addEventListener("click", () => {
        let searchInfo = document.getElementById("searchData").value;
        //if user input data into the #searchData the OpenWeatherApp will use the information from the searchInfo value enter to procees the search information 
        if (searchInfo)
            searchWeather(searchInfo);
    })
