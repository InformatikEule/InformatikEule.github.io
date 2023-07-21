////
// weather.html
////
const weatherButton = document.querySelector("#weatherBtn");
const apiKey = "4b4deb0d15407521515a92a00bc6cf97";
weatherButton.addEventListener("click", () => {
  fetchWeather();
});

function getCity() {
  const cityName = document.getElementById("cityName").value;
  return cityName;
}

async function fetchWeather() {
  const city = getCity();
  let resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
    //https://api.openweathermap.org/data/2.5/weather?q=leipzig&appid=4b4deb0d15407521515a92a00bc6cf97
  );
  //prüfen ob der server einen fehler meldet:
  if (resp.status >= 200 && resp.status < 400) {
    let data = await resp.json();
    useData(data);
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

function useData(data) {
  console.log(data);
  const cityNameDisplay = document.createElement("h5");
  cityNameDisplay.textContent = "City Name:";
  document.getElementById("container2").appendChild(cityNameDisplay);
  const cityName = document.createElement("h5");
  cityNameDisplay.textContent = data.name;
  document.getElementById("container2").appendChild(cityName);

  const tempDisplay = document.createElement("h5");
  tempDisplay.textContent = "Temperature:";
  document.getElementById("container2").appendChild(tempDisplay);
  const temp = document.createElement("h5");
  temp.innerHTML = data.main.temp;
  document.getElementById("container2").appendChild(temp);

  const windDisplay = document.createElement("h5");
  windDisplay.textContent = "Windspeed:";
  document.getElementById("container2").appendChild(windDisplay);
  const wind = document.createElement("h5");
  wind.innerHTML = data.wind.speed;
  document.getElementById("container2").appendChild(wind);

  const humidityDisplay = document.createElement("h5");
  humidityDisplay.textContent = "Humidity:";
  document.getElementById("container2").appendChild(humidityDisplay);
  const humidity = document.createElement("h5");
  humidity.innerHTML = data.main.humidity;
  document.getElementById("container2").appendChild(humidity);

  const weatherDesc = document.createElement("h5");
  weatherDesc.textContent = data.weather[0].description;
  document.getElementById("container2").appendChild(weatherDesc);
}
