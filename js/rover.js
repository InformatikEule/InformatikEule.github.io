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
  var spiritRIPdate = "2010-03-22";

  if (document.getElementById("curiosity").checked) {
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
    //
  } else if (document.getElementById("perseverance").checked) {
    if (
      document.getElementById("earthDate").value > dateFormatted ||
      document.getElementById("earthDate").value < "2021-02-18"
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
    //
  } else if (document.getElementById("spirit").checked) {
    if (
      document.getElementById("earthDate").value > spiritRIPdate ||
      document.getElementById("earthDate").value < "2004-01-04"
    ) {
      alert(
        "Spirit landed on January 4, 2004, and last transmitted data on March 22, 2010. No pictures beyond these dates! P.S. RIP Spirit :C"
      );
      throw new Error(
        "Unfortunately, iam not able to predict the Future. sadface.jpg"
      );
    } else {
      return document.getElementById("earthDate").value;
    }
  }
  // if (
  //   document.getElementById("earthDate").value > dateFormatted ||
  //   document.getElementById("earthDate").value < "2012-08-05"
  // ) {
  //   alert(
  //     "Curiosity landed on the 5th, August 2012. No Pictures before that date!"
  //   );
  //   throw new Error(
  //     "Unfortunately, iam not able to predict the Future. sadface.jpg"
  //   );
  // } else {
  //   return document.getElementById("earthDate").value;
  // }
}

function getRover() {
  if (document.getElementById("curiosity").checked) {
    return "curiosity";
  } else if (document.getElementById("perseverance").checked) {
    return "perseverance";
  } else if (document.getElementById("spirit").checked) {
    return "spirit";
  } else {
    alert("select a rover!");
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
  const rover = getRover();

  let respRov = await fetch(
    //earth_date: "2023-03-06"
    //`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?earth_date=${earthDate}&api_key=BCFopSyeo7rFrjmb6Ecl0yubJ08rEybAE0LsgVN0`
    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earthDate}&api_key=BCFopSyeo7rFrjmb6Ecl0yubJ08rEybAE0LsgVN0`
  );
  if (respRov.status >= 200 && respRov.status < 400) {
    let dataRov = await respRov.json();
    useDataRov(dataRov);
    console.log(dataRov);
    if (Object.keys(dataRov.photos).length == 0) {
      alert("No Pictures today. ");
    } else {
      useDataRov(dataRov);
    }
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

  let showData = dataRov.photos
    .map((data) => {
      const { img_src, rover, camera } = data;
      //console.log(img_src);
      return `
      <div class="col-sm-3">
        <div class="card bg-dark border-secondary">
          <a href="#modalFullScreen" data-bs-toggle="modal" data-bs-target="#modalFullScreen" data-toggle="modal">
            <img src="${img_src}" alt="a pic from mars" class="card-img-top img-fluid"></img>
          </a>
          <div class="card-body">
            <p class="text-center text-white">Camera: ${camera.name}</p>
          </div>
        </div>

        <div class="modal fade" id="modalFullScreen" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <img src="${img_src}" alt="a pic from mars" id="apod_pic_modal" class="img-fluid">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn-close btn-dark" data-bs-dismiss="modal"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    })
    .join("");
  display.innerHTML = showData;
}
