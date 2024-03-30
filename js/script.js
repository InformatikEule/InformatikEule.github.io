////
// rocketLaunches.js
////
async function upcomingLaunches() {
  let resp = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
  //prüfen ob der server einen fehler meldet:
  if (resp.status >= 200 && resp.status < 400) {
    let launchData = await resp.json();
    useLaunchData(launchData);
    //prüfen ob die 15 reqs/day abgelaufen sind
  } else if (resp.status == 429) {
    //error handling ändern. gib die original felder aus useLaunchData zurück und pack die fehlermeldung dort rein!
    alert("Too many requests.");
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
// if (resp.status >= 200 && resp.status < 400) {
//   let launchData = await resp.json();
//   useLaunchData(launchData);
// } else {
//   console.log("Error, Status code: " + resp.status);
//   alert(
//     "Error, Server returns status-code: " +
//       resp.status +
//       "! Status-Text: " +
//       resp.statusText
//   );
// }
clearSkeleton = document.getElementsByClassName("skeleton-text");
function useLaunchData(launchData) {
  console.log(launchData.results[1].name);
  console.log(launchData.results[1].pad.name);
  console.log(launchData.results[1].image);
  /*var clearSkeleton = document.getElementsByClassName("skeleton-text");
  clearSkeleton.style.display = "none";*/
  document.getElementsByClassName("skeleton-text").hidden = true;
  const launchImg = document.getElementById("launchImg");
  launchImg.src = launchData.results[0].image;
  const rocketType = document.getElementById("rocketType");
  rocketType.innerHTML = launchData.results[0].name;
  const spacePort = document.getElementById("spacePort");
  spacePort.textContent = launchData.results[0].pad.name;
  const launchImg2 = document.getElementById("launchImg2");
  launchImg2.src = launchData.results[1].image;
  const rocketType2 = document.getElementById("rocketType2");
  rocketType2.innerHTML = launchData.results[1].name;
  const spacePort2 = document.getElementById("spacePort2");
  spacePort2.textContent = launchData.results[1].pad.name;
}
