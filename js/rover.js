/////
///Nasa-Rover-API
/////
let searchBRov = document.querySelector("#submitRov");

searchBRov.addEventListener("click", () => {
  reqRov();
});

function rovCam() {
  if (document.getElementById("fhaz").checked) {
    return "FHAZ";
  } else if (document.getElementById("rhaz").checked) {
    return "RHAZ";
  } else {
    alert("cmon, click a button....");
  }
}

function rovSol() {
  var sol = document.getElementById("sol");
  return sol;
}

async function reqRov() {
  const sol = rovSol();
  const cam = rovCam();
  let respRov = await fetch(
    //working string:
    //https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=900&camera=fhaz&api_key=DEMO_KEY
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&camera=${cam}&api_key=DEMO_KEY`
    //rovSol() +
    //"&camera=" +
    //rovCam() +
    //"&api_key=DEMO_KEY"
  );
  //console.log("respRov" + respRov.json());
  let dataRov = await respRov.json();
  console.log("dataRov hier: " + dataRov);
  useDataRov(dataRov);
}

function useDataRov(dataRov) {
  document.querySelector("#rov_pic").src = dataRov.photos[0].img_src;
}
