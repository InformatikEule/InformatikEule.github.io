//import { helloTest } from "./apiCall.js";
////
// nasaAPI.html
////

const apodArr = [];
const title = document.createElement("h3");
const caption = document.createElement("p");
const img = document.createElement("img");
img.setAttribute("class", "img-fluid");
const mediaType = document.createElement("p");
const vid = document.createElement("iframe");
const copy = document.createElement("p");
const fetchSingleApodButton = document.querySelector("#fetchSingleApod");
const fetchMultipleApodButton = document.querySelector("#fetchMultipleApod");
const dateToday = new Date();
const dateFormatted = dateToday.toISOString().slice(0, 10);

fetchSingleApodButton.addEventListener("click", () => {
  //console.log(helloTest);
  fetchSingleApod();
});

fetchMultipleApodButton.addEventListener("click", () => {
  fetchMultipleApods();
});

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
  if (
    document.getElementById("date").value > dateFormatted ||
    document.getElementById("date").value < "1995-06-20"
  ) {
    alert("Date must be between June 20, 1995 and Today!");
    throw new Error(
      "Unfortunately, iam not able to predict the Future. sadface.jpg"
    );
  } else {
    return document.getElementById("date").value;
  }
}

async function fetchSingleApod() {
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
      document
        .getElementById("apodDataDisplay")
        .setAttribute("class", "border border-secondary");
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
  if (startDate < "1995-20-06" || startDate > dateFormatted) {
    alert(
      "The start date must not be lower than 1995-20-06 and not higher than " +
        dateFormatted +
        "!"
    );
    throw new Error("apod api startet on 20.June, 1995!");
  } else {
    return startDate;
  }
}

function getEndDate() {
  var endDate = document.getElementById("getEndDate").value;
  if (endDate > dateFormatted || endDate < "1995-21-06") {
    alert(
      "The end date must not be higher than " +
        dateFormatted +
        " and not lower than 1995-21-06!"
    );
    throw new Error("dude, i cant show you tomorows picture...");
  } else {
    return endDate;
  }
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
  let showData = dataMultipleApods
    .map((data) => {
      const { title, url, media_type, explanation, date, copyright } = data;
      if (media_type == "image") {
        return `
        <ol class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-start border-secondary">
            <div class="ms-2 me-auto text-center text-white">
              <div class="fw-bold text-center text-white">
                <h3>Title: ${title}</h3>
              </div>
              <a href="#modalFullScreen" data-bs-toggle="modal" data-bs-target="#modalFullScreen" data-toggle="modal">
                <img src="${url}" id="pic" class="rounded img-fluid"></img>
              </a>
              <p>${explanation}</p>
              <p class="text-center text-white">Copyright: ${copyright}</p>
              <p class="text-center text-white">Date: ${date}</p>
            </div>
          </li>
        </ol>
      `;
      } else {
        return `
        <ol class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-start border-secondary">
            <div class="ms-2 me-auto text-center text-white">
              <div class="fw-bold text-center text-white">
                <h3>Title: ${title}</h3>
              </div>
              <div class="ratio ratio-16x9">
                <iframe src="${url}" id="vid" allowfullscreen></iframe>
              </div>
              <p>${explanation}</p>
              <p class="text-center text-white">Copyright: ${copyright}</p>
              <p class="text-center text-white">Date: ${date}</p>
            </div>
          </li>
        </ol>
      `;
      }
    })
    .join("");
  display.innerHTML = showData;
}
