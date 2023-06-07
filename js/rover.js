/////
///Nasa-Rover-API
/////
let searchBRov = document.querySelector("#submitRov");

searchBRov.addEventListener("click", () => {
  reqRov();
});

//function rovCam() {
//if (document.getElementById("fhaz").checked) {
//return "FHAZ";
//} else {
//return "RHAZ";
//}
//}

async function reqRov() {
  let respRov = await fetch(
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=FHAZ&api_key=DEMO_KEY"
    //+ rovCam();
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
