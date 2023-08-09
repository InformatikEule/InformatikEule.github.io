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
  //showDisclaimer();
});

function showDisclaimer() {
  alert("not working at the moment, use the single APOD!");
}

function getDate() {
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // My old solution for date comparison. I'll leave it commented out in here because I'm proud to have come up with it, but somehow it falls under programming warcrimes ;-D//
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const dateAll = new Date();
  // const monthCheck = [
  //   "01",
  //   "02",
  //   "03",
  //   "04",
  //   "05",
  //   "06",
  //   "07",
  //   "08",
  //   "09",
  //   "10",
  //   "11",
  //   "12",
  // ];
  // const monthInput = monthCheck[dateAll.getMonth()];
  // const dateToday =
  //   dateAll.getUTCFullYear() + "-" + monthInput + "-" + dateAll.getUTCDate();
  // if (
  //   document.getElementById("date").value > dateToday ||
  //   document.getElementById("date").value < "1995-06-15"
  // ) {
  //   alert("Date must be between June 16, 1995 and Today!");
  //   throw new Error(
  //     "Unfortunately, iam not able to predict the Future. sadface.jpg"
  //   );
  // } else {
  //   return document.getElementById("date").value;
  // }

  var dateToday = new Date();
  var dateFormatted = dateToday.toISOString().slice(0, 10);
  if (
    document.getElementById("date").value > dateFormatted ||
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
    alert("Error, Server returns status-code: " + singleResp.status);
    // + getHTTPCats()
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
      document.getElementById("apodDataDisplay").appendChild(element);
    });
  } else if (dataSingleApod.media_type == "video") {
    apodArr.push(title, vid, caption, copy, mediaType);
    apodArr.forEach((element) => {
      document.getElementById("apodDataDisplay").appendChild(element);
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
  return startDate;
}

function getEndDate() {
  var endDate = document.getElementById("getEndDate").value;
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
  const display = document.querySelector("#apodDataDisplay");
  const displayPic = document.getElementById("#pic");
  let showData = dataMultipleApods
    .map((object) => {
      const { title, url, explanation, media_type, copyright } = object;
      if (media_type == "image") {
        return `
        <h3>Title: ${title}</h3>
        <img src="${url}" id="pic"></img>
        <p>${explanation}</p>
        <p class="text-center text-white">Copyright: ${copyright}</p>
        <p class="text-center text-white">Media-Type: ${media_type}</p>
        <hr>
      `;
      } else if (media_type == "video") {
        return `
        <h3>Title: ${title}</h3>
        <iframe src="${url}" id="vid"></iframe>
        <p>${explanation}</p>
        <p class="text-center text-white">Copyright: ${copyright}</p>
        <p class="text-center text-white">Media-Type: ${media_type}</p>
        <hr>
      `;
      }
    })
    .join("");
  display.innerHTML = showData;
}
