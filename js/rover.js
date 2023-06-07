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
  let respRov = await fetch(
    //das letzte " im oberen string ist falsch
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" +
      rovSol() +
      "&camera=" +
      rovCam() +
      "&api_key=DEMO_KEY"
  );
  console.log("respRov" + respRov.toString());
  let dataRov = await respRov.json();
  console.log("dataRov hier: " + dataRov);
  useDataRov(dataRov);
}

function useDataRov(dataRov) {
  //document.querySelector("#rov_name").innerHTML =
  //dataRov.manifests.rover_name.name;
  document.querySelector("#rov_pic").src = dataRov.photos[0].img_src;
}
