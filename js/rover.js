/////
///Nasa-Rover-API
/////
let searchBRov = document.querySelector("#submitRov");

searchBRov.addEventListener("click", () => {
  console.log(document.getElementById("earthDate").value);
  reqRov();
});

function rovCam() {
  //sol 2553 (12.11.2019)auf cam "MAHLI" lohnt! (panoramaaufnahme)
  //sol 0 cam MARDI  (landing!)!
  //sol 1512 (06.11.2016) MAHLI
  return "MAHLI";
  // if (document.getElementById("fhaz").checked) {
  //   //console.log("Fhaz");
  //   return "FHAZ";
  // } else if (document.getElementById("rhaz").checked) {
  //   //console.log("Rhaz");
  //   return "RHAZ";
  // } else {
  //   alert("cmon, click a button....");
  // }
}

// function getSol() {
//   var sol = document.getElementById("sol").value;
//   return sol;
// }

function getEarthDate() {
  // var today = new Date();
  // var day = today.getUTCDate();
  // var month = today.getUTCMonth() + 1;
  // var year = today.getUTCFullYear();
  // var endDate = day + "-" + month + "-" + year;
  const dateAll = new Date();
  const month = [
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
  const month2 = month[dateAll.getMonth()];
  // Fügen die Datums-variablen zusammen...
  const dateToday =
    dateAll.getUTCFullYear() + "-" + month2 + "-" + dateAll.getUTCDate();
  // ...und können dann den User-Input mit dem echten Datum vergleichen.
  if (
    document.getElementById("earthDate").value > dateToday ||
    document.getElementById("earthDate").value < "2012-08-05"
  ) {
    alert(
      "Curiosity landed on the 5th, August 2012. No Pictures before that date!"
    );
    throw new Error(
      "Unfortunately, iam not able to predict the Future. sadface.jpg"
    );
  } else {
    return document.getElementById("earthDate").value;
  }
}

// function getSolOrEarthDate(){
//   if (document.getElementById("sol").value == "0") {
//     getEarthDate();
//   } else {
//   }
// }

async function reqRov() {
  //const sol = getSol();
  const earthDate = getEarthDate();
  const cam = rovCam();

  let respRov = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&camera=${cam}&api_key=DEMO_KEY`
    //`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${cam}&api_key=DEMO_KEY`
  );
  if (respRov.status >= 200 && respRov.status < 400) {
    const dataRov = await respRov.json();
    useDataRov(dataRov);
  } else {
    console.log("Error, Status code: " + respRov.status);
    alert(
      "Error, Server returns status-code: " +
        respRov.status +
        "! Status-Text: " +
        respRov.statusText
    );
  }
}

function useDataRov(dataRov) {
  const results = dataRov.photos;
  results.map((result) => {
    console.log(results);
    const img = document.createElement("img");
    img.src = result.img_src;
    //der anchor macht das bild klickbar und verlinkt auf die source.
    //TODO: vollbild statt source
    const imgLink = document.createElement("a");
    imgLink.href = result.img_src;
    imgLink.target = "_blank";

    imgLink.appendChild(img);
    bla.appendChild(imgLink);
  });
}
