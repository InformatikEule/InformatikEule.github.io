////
// weather.html
////
const weatherB = document.querySelector("#weather");
const apiKey = "4b4deb0d15407521515a92a00bc6cf97";
weatherB.addEventListener("click", () => {
  fetchWeather();
});

async function fetchWeather() {
  let resp = await fetch(
    "https://api.openweathermap.org/data/3.0/onecall?units=metric&q=leipzig&appid=4b4deb0d15407521515a92a00bc6cf97" +
      apiKey
    //https://api.openweathermap.org/data/3.0/onecall?q=leipzig&appid=4b4deb0d15407521515a92a00bc6cf97
    //https://api.openweathermap.org/data/2.5/weather?q=leipzig&appid=4b4deb0d15407521515a92a00bc6cf97
    //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4b4deb0d15407521515a92a00bc6cf97
  );
  //prüfen ob der server einen fehler meldet:
  console.log(resp);
  if (resp.status >= 200 && resp.status < 400) {
    let data = await resp.json();
    console.log(data);
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

function useData(data) {}
