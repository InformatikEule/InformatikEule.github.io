////
// rocketLaunches.js
////

// function getCity() {
//   const cityName = document.getElementById("getCityName").value;
//   return cityName;
// }
async function upcomingLaunches() {
  //const city = getCity();
  let resp = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
  //prüfen ob der server einen fehler meldet:
  if (resp.status >= 200 && resp.status < 400) {
    let launchData = await resp.json();
    useLaunchData(launchData);
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

function useLaunchData(launchData) {
  console.log(launchData.results[1].name);
  console.log(launchData.results[1].pad.name);
  console.log(launchData.results[1].image);
  const launchImg = document.getElementById("launchImg");
  launchImg.src = launchData.results[1].image;
  const rocketType = document.getElementById("rocketType");
  rocketType.textContent = launchData.results[1].name;
  const spacePort = document.getElementById("spacePort");
  spacePort.textContent = launchData.results[1].pad.name;
}
