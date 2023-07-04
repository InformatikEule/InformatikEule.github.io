////
// weather.html
////
const weatherCard = document.createElement("div");
weatherCard.id = "weatherCard";
const searchWeather = document.createElement("div");
searchWeather.id = "searchWeather";
const weatherImg = document.createElement("img");
const temp = document.createElement("h1");
const city = document.createElement("h2");
const weatherB = document.querySelector("#weatherBtn");
const apiKey = "4b4deb0d15407521515a92a00bc6cf97";
weatherB.addEventListener("click", () => {
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
  //classes: container -> weatherCard -> searchweather
  document.getElementById("test123").appendChild(weatherCard);
  document.getElementById("weatherCard").appendChild(searchWeather);
  temp.innerHTML = "Temperature: " + data.main.temp + " &degC.";
  document.getElementById("searchWeather").appendChild(temp);
  console.log(data);
}
