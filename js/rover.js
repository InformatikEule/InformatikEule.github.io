/////
///Nasa-Rover-API
/////
let searchBRov = document.querySelector("#submitRov");

searchBRov.addEventListener("click", () => {
  //console.log(document.getElementById("earthDate").value);
  reqRov();
  //outOfOrder();
});

function outOfOrder() {
  alert("This Page isnt working atm. sadface.jpg");
}

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
  var dateToday = new Date();
  var dateFormatted = dateToday.toISOString().slice(0, 10);
  if (
    document.getElementById("earthDate").value > dateFormatted ||
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

// function getHTTPCats() {
//   "https://http.cat/" + dataSingleApod.status;
// }

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
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=DEMO_KEY&cam=${cam}`
    //`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${cam}&api_key=DEMO_KEY`
  );
  if (respRov.status >= 200 && respRov.status < 400) {
    let dataRov = await respRov.json();
    //var dataRov = JSON.parse(respRov.responseText);
    console.log(dataRov);
    useDataRov(dataRov);
  } else {
    console.log("Error, Status code: " + respRov.status);
    alert("Error, Server returns status-code: " + respRov.status);
    //+ getHTTPCats()
  }
}
/* <h3>Title: ${title}</h3>
<img src="${url}" id="pic"></img>
<p>${explanation}</p>
<p class="text-center text-white">Copyright: ${copyright}</p>
<p class="text-center text-white">Date: ${date}</p>
<hr> */

//, FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM
function useDataRov(dataRov) {
  const display = document.querySelector("#marsRoverDisplay");
  //const results = dataRov.photos[0].img_src;
  let showdata = dataRov.map((result) => {
    const { img_src } = result;
    console.log(result);
    //const { img_src } = result;
    //return result;
  });
  // results.map((result) => {
  //   const { photos, img_src, earth_date } = result;

  //   console.log("hier: " + result);
  // return `
  //   <p>${earth_date}</p>
  //   <p>${photos}</p>
  //   <img src="${img_src}" id="pic"></img>
  //   `;
  // return console.log("hallo");
  // console.log(results);
  // const img = document.createElement("img");
  // img.src = result.img_src;
  // //der anchor macht das bild klickbar und verlinkt auf die source.
  // //TODO: vollbild statt source
  // const imgLink = document.createElement("a");
  // imgLink.href = result.img_src;
  // imgLink.target = "_blank";

  // imgLink.appendChild(img);
  // bla.appendChild(imgLink);
  // });
  display.innerHTML = showdata;
}

function showDataRov(result) {
  return `<p>${result.rover.name}</p>`;
}
