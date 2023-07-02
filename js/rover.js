/////
///Nasa-Rover-API
/////
let searchBRov = document.querySelector("#submitRov");

searchBRov.addEventListener("click", () => {
  reqRov();
});

function rovCam() {
  if (document.getElementById("fhaz").checked) {
    //console.log("Fhaz");
    return "FHAZ";
  } else if (document.getElementById("rhaz").checked) {
    //console.log("Rhaz");
    return "RHAZ";
  } else {
    alert("cmon, click a button....");
  }
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
    let dataRov = await respRov.json();
    console.log(dataRov);
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
  const rov_pic_arr = [];
  rov_pic_arr.forEach((element) => {
    document.getElementById("apodPic").appendChild(element);
  });
  if (data.media_type == "image") {
    apodArr.push(title, img, caption, copy, mediaType);
    apodArr.forEach((element) => {
      document.getElementById("apodPic").appendChild(element);
    });
  }
  document.querySelector("#rov_pic").src = dataRov.photos[0].img_src;
}
