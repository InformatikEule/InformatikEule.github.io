/////
///Nasa-Rover-API
/////
let searchBRov = document.querySelector("#submitRov");

searchBRov.addEventListener("click", () => {
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
  );
  if (respRov.status >= 200 && respRov.status < 400) {
    let dataRov = await respRov.json();
    console.log(dataRov);
    useDataRov(dataRov);
  } else {
    console.log("Error, Status code: " + respRov.status);
    alert("Error, Server returns status-code: " + respRov.status);
    //+ getHTTPCats()
  }
}

function useDataRov(dataRov) {
  const display = document.querySelector("#marsRoverDisplay");
  let showData = dataRov.photos
    .map((data) => {
      const { img_src, rover } = data;
      //console.log(img_src);
      return `
      <p class="text-center text-white">Rover: ${rover.name} Landing Date: ${rover.landing_date} Mission End date: ${rover.max_date}</p> 
      <div class="row">
        <div class="col-4">
          <ul class="list-group">
            <li class="list-group-item flex-fill">
              <img src="${img_src}" class="img-fluid"></img>
            </li>
          </ul>
        </div>
      </div>
      `;
    })
    .join("");
  display.innerHTML = showData;
}
