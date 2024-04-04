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
//function getLaunchDayandTime(launchData) {
//  getLaunchDayandTime();
//}

function useLaunchData(launchData) {
  var launchDayTime1 = launchData.results[0].net;
  var launchDay1 = launchDayTime1.slice(0, 10);
  var launchTime1 = launchDayTime1.slice(11, 19);

  var launchDayTime2 = launchData.results[1].net;
  var launchDay2 = launchDayTime2.slice(0, 10);
  var launchTime2 = launchDayTime2.slice(11, 19);

  // var launchDayTime = launchData.results[0].net;
  // var launchDay = launchDayTime.slice(0, 10);
  // var launchTime = launchDayTime.slice(11, 19);
  // console.log(launchDay2);
  // console.log(launchDay3);

  //dateToday.toISOString().slice(0, 10);
  //console.log(launchData.results[1].image);
  //var clearSkeleton = document.getElementsByClassName("skeleton-text");
  //clearSkeleton.innerHTML = "";
  //1st upcoming Rocket Launch:
  document.getElementsByClassName("skeleton-text").hidden = true;
  const launchImg = document.getElementById("launchImg");
  launchImg.src = launchData.results[0].image;
  const rocketType = document.getElementById("rocketType");
  rocketType.innerHTML = launchData.results[0].name;
  const spacePort = document.getElementById("spacePort");
  spacePort.textContent = launchData.results[0].pad.name;
  const launchTimeShow = document.getElementById("launchTime");
  launchTimeShow.textContent =
    launchDay1 + " " + launchTime1 + "Zulu Time (UTC +0)!";

  //2nd upcoming Rocket Launch
  const launchImg2 = document.getElementById("launchImg2");
  launchImg2.src = launchData.results[1].image;
  const rocketType2 = document.getElementById("rocketType2");
  rocketType2.innerHTML = launchData.results[1].name;
  const spacePort2 = document.getElementById("spacePort2");
  spacePort2.textContent = launchData.results[1].pad.name;
  const launchTimeShow2 = document.getElementById("launchTime2");
  launchTimeShow2.textContent =
    launchDay2 + " " + launchTime2 + "Zulu Time (UTC +0)!";
}
