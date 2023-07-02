/////
///Nasa-Rover-API
/////
let searchBRov = document.querySelector("#submitRov");

searchBRov.addEventListener("click", () => {
  reqRov();
});

function rovCam() {
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

function rovSol() {
  var sol = document.getElementById("sol").value;
  //console.log(sol);
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
    //der anchor macht das bild klcikbar
    const imgLink = document.createElement("a");
    imgLink.href = result.img_src;
    imgLink.target = "_blank";

    imgLink.appendChild(img);
    bla.appendChild(imgLink);
  });
}
