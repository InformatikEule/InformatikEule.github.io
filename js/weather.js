////
// weather.html
////
const weatherButton = document.querySelector("#weatherBtn");
const apiKey = "4b4deb0d15407521515a92a00bc6cf97";
weatherButton.addEventListener("click", () => {
  fetchWeather();
});

function getCity() {
  const cityName = document.getElementById("getCityName").value;
  return cityName;
}

async function fetchWeather() {
  const city = getCity();
  let resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
  );
  //prüfen ob der server einen fehler meldet:
  if (resp.status >= 200 && resp.status < 400) {
    let weatherData = await resp.json();
    useWeatherData(weatherData);
  } else {
    console.log("Error, Status code: " + resp.status);
    alert(
      "Error, Server returns status-code: " +
        resp.status +
        "! Status-Text: " +
        resp.statusText
    );
  }
}

function useWeatherData(weatherData) {
  console.log(weatherData);
  const cityNameDisplay = document.createElement("h5");
  cityNameDisplay.textContent = "City Name:";
  document.getElementById("weatherContainer").appendChild(cityNameDisplay);
  const cityName = document.createElement("h5");
  cityName.textContent = weatherData.name;
  document.getElementById("weatherContainer").appendChild(cityName);

  const tempDisplay = document.createElement("h5");
  tempDisplay.textContent = "Temperature:";
  document.getElementById("weatherContainer").appendChild(tempDisplay);
  const temp = document.createElement("h5");
  temp.innerHTML = weatherData.main.temp + " &degC.  ";
  document.getElementById("weatherContainer").appendChild(temp);

  const windDisplay = document.createElement("h5");
  windDisplay.textContent = "Windspeed:";
  document.getElementById("weatherContainer").appendChild(windDisplay);
  const wind = document.createElement("h5");
  wind.innerHTML = weatherData.wind.speed + " km/h";
  document.getElementById("weatherContainer").appendChild(wind);

  const humidityDisplay = document.createElement("h5");
  humidityDisplay.textContent = "Humidity:";
  document.getElementById("weatherContainer").appendChild(humidityDisplay);
  const humidity = document.createElement("h5");
  humidity.innerHTML = weatherData.main.humidity + " %";
  document.getElementById("weatherContainer").appendChild(humidity);

  const weatherDescDisplay = document.createElement("h5");
  weatherDescDisplay.textContent = "short Weather description:";
  document.getElementById("weatherContainer").appendChild(weatherDescDisplay);
  const weatherDesc = document.createElement("h5");
  weatherDesc.textContent = weatherData.weather[0].description;
  document.getElementById("weatherContainer").appendChild(weatherDesc);
}
