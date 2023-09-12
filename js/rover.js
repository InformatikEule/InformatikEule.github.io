/////
///Nasa-Rover-API
/////
let searchBRov = document.querySelector("#submitRov");

searchBRov.addEventListener("click", () => {
  reqRov();
});

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

  let respRov = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earthDate}&api_key=DEMO_KEY`
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
  const displayDescriptive = document.querySelector(
    "#marsRoverDescriptiveDisplay"
  );

  // let roverData = dataRov.photos.rover[0];
  // (displayDescriptive.innerHTML = "Rover Name: " + roverData.name),
  //   ". Landing Date: " + roverData.landing_date,
  //   ". Last day with available Photos: " + roverData.max_date;

  let showData = dataRov.photos
    .map((data) => {
      const { img_src, rover, camera } = data;
      //console.log(img_src);
      return `<div class="col-sm-3">
      <div class="card bg-dark border-secondary">

        <img src="${img_src}" class="card-img-top"></img>

        <div class="card-body">
          <p class="text-center text-white">Camera: ${camera.name}</p>
        </div>
      </div>
      </div>
      <!---->
      `;
    })
    .join("");
  display.innerHTML = showData;
}
