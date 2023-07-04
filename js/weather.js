////
// weather.html
////
const weatherB = document.querySelector("#weatherBtn");
const apiKey = "4b4deb0d15407521515a92a00bc6cf97";
weatherB.addEventListener("click", () => {
  fetchWeather();
});

function createDivWeatherCard() {
  const weatherCard = document.createElement("div");
  weatherCard.id = "weatherCard";
  weatherCard.style.width = "90%";
  weatherCard.style.maxwidth = "450px";
  weatherCard.style.background = "linear-gradient(135deg, #200122, #6f0000)";
  weatherCard.style.color = "#fff";
  weatherCard.style.margin = "50px auto 0";
  weatherCard.style.borderradius = "20px";
  weatherCard.style.padding = "40px 35px";
  weatherCard.style.textalign = "center";
  return weatherCard;
}

function createDivSearchWeather() {
  const searchWeather = document.createElement("div");
  searchWeather.id = "searchWeather";
  searchWeather.style.width = "100%";
  searchWeather.style.display = "flex";
  searchWeather.style.alignitems = "center";
  searchWeather.style.justifycontent = "space-between";
  return searchWeather;
}

function createWeatherImg() {
  const weatherImg = document.createElement("img");
  weatherImg.id = "weatherImg";
  weatherImg.style.width = "170px";
  weatherImg.style.marginTop = "30px";
  return weatherImg;
}

function createTempDisplay() {
  const temp = document.createElement("h1");
  temp.id = "temp";
  temp.style.fontSize = "80px";
  temp.style.fontWeight = "500";
  return temp;
}

function createCityDisplay() {
  const city = document.createElement("h2");
  city.id = "city";
  city.style.fontSize = "45px";
  city.style.fontWeight = "400";
  city.style.marginTop = "-10px";
  return city;
}

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
  weatherCard = createDivWeatherCard();
  document.getElementById("test123").appendChild(weatherCard);
  searchWeather = createDivSearchWeather();
  document.getElementById("weatherCard").appendChild(searchWeather);
  weatherImg = createWeatherImg();
  weatherImg.src = "imgs/weather/snow.png";
  document.getElementById("searchWeather").appendChild(weatherImg);
  temp = createTempDisplay();
  temp.innerHTML = "Temperature: " + data.main.temp + " &degC.";
  document.getElementById("weatherImg").appendChild(temp);
  city = createCityDisplay();
  city.innerHTML = data.name;
  document.getElementById("temp").appendChild(city);
  console.log(city.innerHTML);
  console.log(data);
}
