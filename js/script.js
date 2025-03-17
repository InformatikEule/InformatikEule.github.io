//pageOnLoad wird ausgeführt sobald die seite geladen wurde und füllt den Launches/Events Berreich mit Daten
function pageOnLoad() {
  upcomingLaunches();
  upcomingEvents();
}

////
// rocketLaunches.js
////
async function upcomingLaunches() {
  let resp = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
  //prüfen ob der server einen fehler meldet:
  //i just learned about the .ok method... :D
  if (!resp.ok) {
    // >= 200 && resp.status < 400) {
    //prüfen ob die 15 requests per day abgelaufen sind:
    const tooManyRequests = document.getElementById("rocketType");
    tooManyRequests.innerHTML =
      "Error, Server returns status-code " + resp.status;
  } else if (resp.status == 429) {
    const tooManyRequestsLaunches1 = document.getElementById("rocketType");
    tooManyRequestsLaunches1.innerHTML =
      "Too many requests. Upcoming Launches wont show Data for the next hour";
  } else {
    let launchData = await resp.json();
    console.log("LaunchData:");
    console.log(launchData);
    useLaunchData(launchData);
  }
}

function useLaunchData(launchData) {
  let launchDayTime1 = launchData.results[1].net;
  let launchDay1 = new Date(launchDayTime1.slice(0, 10)).toLocaleDateString(
    "de-DE"
  );
  let launchTime1 = launchDayTime1.slice(11, 19);

  let launchDayTime2 = launchData.results[2].net;
  let launchDay2 = new Date(launchDayTime2.slice(0, 10)).toLocaleDateString(
    "de-DE"
  );
  let launchTime2 = launchDayTime2.slice(11, 19);

  //1st upcoming Rocket Launch:
  document.getElementsByClassName("skeleton-text").hidden = true;
  const launchImg = document.getElementById("launchImg");
  launchImg.src = launchData.results[0].image;
  const rocketType = document.getElementById("rocketType");
  rocketType.innerHTML = launchData.results[0].name;
  const spacePort = document.getElementById("spacePort");
  spacePort.textContent = launchData.results[0].pad.name;
  const launchDayShow1 = document.getElementById("launchDay1");
  launchDayShow1.textContent = launchDay1 + " ";
  const launchTimeShow1 = document.getElementById("launchTime1");
  launchTimeShow1.textContent = launchTime1 + " Zulu Time (UTC)";
  const flightStatusShow1 = document.getElementById("launchStatus1");
  flightStatusShow1.textContent =
    "Status: " + launchData.results[0].status.name;

  //2nd upcoming Rocket Launch
  const launchImg2 = document.getElementById("launchImg2");
  launchImg2.src = launchData.results[1].image;
  const rocketType2 = document.getElementById("rocketType2");
  rocketType2.innerHTML = launchData.results[1].name;
  const spacePort2 = document.getElementById("spacePort2");
  spacePort2.textContent = launchData.results[1].pad.name;
  const launchDayShow2 = document.getElementById("launchDay2");
  launchDayShow2.textContent = launchDay2;
  const launchTimeShow2 = document.getElementById("launchTime2");
  launchTimeShow2.textContent = launchTime2 + " Zulu Time (UTC)";
  const flightStatusShow2 = document.getElementById("launchStatus2");
  flightStatusShow2.textContent =
    "Status: " + launchData.results[1].status.name;
}

////
// events.js
////
async function upcomingEvents() {
  let resp = await fetch(`https://ll.thespacedevs.com/2.2.0/event/upcoming/`);
  //prüfen ob der server einen fehler meldet:
  if (!resp.ok) {
    const tooManyRequests = document.getElementById("event");
    tooManyRequests.innerHTML =
      "Error, Server returns status-code " + resp.status + "!";
    //prüfen ob die 15 requests per day abgelaufen sind
  } else if (resp.status == 429) {
    const tooManyRequests = document.getElementById("event");
    tooManyRequests.innerHTML =
      "Too many requests. Events wont show Data for the next hour";
  } else {
    let eventData = await resp.json();
    useEventData(eventData);
    console.log("EventData:");
    console.log(eventData);
  }
}

function useEventData(eventData) {
  let eventDateTime = eventData.results[0].date;
  let eventDate = new Date(eventDateTime.slice(0, 10)).toLocaleDateString(
    "de-DE"
  );
  let eventTime = eventDateTime.slice(11, 19);
  let eventDateTime2 = eventData.results[1].date;
  let eventDate2 = new Date(eventDateTime2.slice(0, 10)).toLocaleDateString(
    "de-DE"
  );
  let eventTime2 = eventDateTime2.slice(11, 19);

  const eventImgShow = document.getElementById("eventImg");
  eventImgShow.src = eventData.results[0].feature_image;
  const eventShow = document.getElementById("event");
  eventShow.innerHTML = eventData.results[0].description;
  const eventLocationShow = document.getElementById("eventLocation");
  const showMoreText = document.getElementById("showMoreText");

  eventLocationShow.innerHTML = eventData.results[0].location;
  const eventDateShow = document.getElementById("eventDate");
  eventDateShow.innerHTML = eventDate;
  const eventTimeShow = document.getElementById("eventTime");
  eventTimeShow.innerHTML = eventTime + " Zulu Time (UTC)";

  const eventImgShow2 = document.getElementById("eventImg2");
  eventImgShow2.src = eventData.results[1].feature_image;
  const eventShow2 = document.getElementById("event2");
  eventShow2.innerHTML = eventData.results[1].description;
  const eventLocationShow2 = document.getElementById("eventLocation2");
  const showMoreText2 = document.getElementById("showMoreText2");

  eventLocationShow2.innerHTML = eventData.results[1].location;
  const eventDateShow2 = document.getElementById("eventDate2");
  eventDateShow2.innerHTML = eventDate2;
  const eventTimeShow2 = document.getElementById("eventTime2");
  eventTimeShow2.innerHTML = eventTime2 + " Zulu Time (UTC)";
}
