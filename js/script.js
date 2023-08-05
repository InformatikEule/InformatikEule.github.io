////
// nasaAPI.html
////
////////////////
//remember DRY//
////////////////
const apodArr = [];
const title = document.createElement("h3");
const caption = document.createElement("p");
const img = document.createElement("img");
img.setAttribute("id", "pic");
const mediaType = document.createElement("p");
const vid = document.createElement("iframe");
const copy = document.createElement("p");
const fetchSingleApodButton = document.querySelector("#fetchSingleApod");
const fetchMultipleApodButton = document.querySelector("#fetchMultipleApod");

fetchSingleApodButton.addEventListener("click", () => {
  fetchSingleApod();
});

fetchMultipleApodButton.addEventListener("click", () => {
  fetchMultipleApods();
});

function getDate() {
  //unnötigste Datums-überprüfung aller zeiten. Das fällt wohl unter programming warcrimes.
  //mein blick als ich zum ersten mal month() + 1 sah... :-D
  //egal, bleibt erstmal drinne weil funny!
  // Überprüfung des Datums auf Zukunft/Vergangenheit.
  // Date() gibt Monate leider nur als Zahl 0-11 aus. Dies lässt sich mit dem Userinput nicht direkt vergleichen...
  const dateAll = new Date();
  // ...also schreiben wir ein Array mit den passenden Zahlen.
  const monthCheck = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  // Geben Indexbassiert den Monat zurück.
  const monthInput = monthCheck[dateAll.getMonth()];
  // Fügen die Datums-variablen zusammen...
  const dateToday =
    dateAll.getUTCFullYear() + "-" + monthInput + "-" + dateAll.getUTCDate();
  // ...und können dann den User-Input mit dem echten Datum vergleichen.
  if (
    document.getElementById("date").value > dateToday ||
    document.getElementById("date").value < "1995-06-15"
  ) {
    alert("Date must be between June 16, 1995 and Today!");
    throw new Error(
      "Unfortunately, iam not able to predict the Future. sadface.jpg"
    );
  } else {
    return document.getElementById("date").value;
  }
}

async function fetchSingleApod() {
  //https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2022-11-22
  let singleResp = await fetch(
    "https://api.nasa.gov/planetary/apod?" +
      "api_key=" +
      "BCFopSyeo7rFrjmb6Ecl0yubJ08rEybAE0LsgVN0" +
      "&date=" +
      getDate()
  );
  //prüfen ob der server einen fehler meldet:
  console.log(singleResp);
  if (singleResp.status >= 200 && singleResp.status < 400) {
    let dataSingleApod = await singleResp.json();
    console.log(dataSingleApod);
    useSingleData(dataSingleApod);
  } else {
    console.log("Error, Status code: " + singleResp.status);
    alert(
      "Error, Server returns status-code: " +
        singleResp.status +
        "! Status-Text: " +
        singleResp.statusText
    );
  }
}

function useSingleData(dataSingleApod) {
  ///// WIP:
  //const houstonTime = new Date().toLocaleString("en-US", {
  //timeZone: "America/Chicago",
  //});
  //const berlinTime = new Date().toLocaleString("en-US", {
  //timeZone: "Europe/Berlin",
  //});
  //console.log(`The current time in Houston is: ${houstonTime}`);
  //console.log(`The current time in Berlin is: ${berlinTime}`);
  /////

  //routine zum prüfen ob ein bild oder video zurückkommt.
  //anlegen der Elemente und zu einem Array zufügen.
  console.log(dataSingleApod);
  title.textContent = dataSingleApod.title;
  caption.textContent = dataSingleApod.explanation;
  img.src = dataSingleApod.url;
  mediaType.textContent = "Media-Type: " + dataSingleApod.media_type;
  vid.src = dataSingleApod.url;
  copy.textContent = "Copyright: " + dataSingleApod.copyright;
  if (dataSingleApod.media_type == "image") {
    apodArr.push(title, img, caption, copy, mediaType);
    apodArr.forEach((element) => {
      document.getElementById("apodPic").appendChild(element);
    });
  } else if (dataSingleApod.media_type == "video") {
    apodArr.push(title, vid, caption, copy, mediaType);
    apodArr.forEach((element) => {
      document.getElementById("apodPic").appendChild(element);
    });
  } else {
    console.log("unknown media format: " + dataSingleApod.media_type);
    alert(
      "unknown media type. Server returns: " +
        dataSingleApod.media_type +
        ". Dont know what to do with that."
    );
  }
}

////
// Multiple Apods Part:
////
//TODO: DRY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function getStartDate() {
  var startDate = document.getElementById("getStartDate").value;
  console.log(startDate);
  return startDate;
}

function getEndDate() {
  // var today = new Date();
  // var day = today.getUTCDate();
  // var month = today.getUTCMonth() + 1;
  // var year = today.getUTCFullYear();
  // var endDate = day + "-" + month + "-" + year;
  var endDate = document.getElementById("getEndDate").value;
  console.log(endDate);
  return endDate;
}

async function fetchMultipleApods() {
  let multipleResp = await fetch(
    "https://api.nasa.gov/planetary/apod?" +
      "api_key=" +
      "BCFopSyeo7rFrjmb6Ecl0yubJ08rEybAE0LsgVN0" +
      "&start_date=" +
      getStartDate() +
      "&end_date=" +
      getEndDate()
  );
  //prüfen ob der server einen fehler meldet:
  console.log(multipleResp);
  if (multipleResp.status >= 200 && multipleResp.status < 400) {
    let dataMultipleApods = await multipleResp.json();
    console.log(dataMultipleApods);
    useDataMultiple(dataMultipleApods);
  } else {
    console.log("Error, Status code: " + multipleResp.status);
    alert(
      "Error, Server returns status-code: " +
        multipleResp.status +
        "! Status-Text: " +
        multipleResp.statusText
    );
  }
}

function useDataMultiple(dataMultipleApods) {
  console.log(dataMultipleApods);
}
