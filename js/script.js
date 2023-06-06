////
// index.html
////

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

////
// nasaAPI.html
////

let searchB = document.querySelector("#submit");

searchB.addEventListener("click", () => {
  req();
});

function getDate() {
  // Überprüfung des Datums auf Zukunft/Vergangenheit.
  // Date() gibt Monate leider nur als Zahl 0-11 aus. Dies lässt sich mit dem Userinput nicht direkt vergleichen...
  const dateAll = new Date();
  // ...also schreiben wir ein Array mit den passenden Zahlen.
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
    document.getElementById("date").value > dateToday ||
    document.getElementById("date").value < "1995-06-15"
  ) {
    alert("Date must be between Jun 16, 1995 and Today!");
    throw new Error(
      "Unfortunately, iam not able to predict the Future. sadface.jpg"
    );
  } else {
    return document.getElementById("date").value;
  }
}

async function req() {
  //https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2022-11-22
  let resp = await fetch(
    "https://api.nasa.gov/planetary/apod?" +
      "api_key=" +
      returnSecrets() +
      "&date=" +
      getDate()
  );
  console.log(resp);
  if (resp.status >= 200 && resp.status < 400) {
    let data = await resp.json();
    console.log(data);
    useData(data);
  } else {
    console.log("Error, Status code: " + resp.status);
    alert("Error, Server returns status-code: " + resp.status);
  }
}

function useData(data) {
  const houstonTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
  });
  const berlinTime = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Berlin",
  });

  console.log(`The current time in Houston is: ${houstonTime}`);
  console.log(`The current time in Berlin is: ${berlinTime}`);

  //routine zum prüfen ob ein bild oder video zurückkommt. Anlegen und füllen der jeweiligen elemente.
  if (data.media_type == "image") {
    document.querySelector("#mediaType").innerHTML =
      "Media-Type: " + data.media_type;
    document.querySelector("#caption").innerHTML = data.explanation;
    document.querySelector("#link").innerHTML = data.url;
    document.querySelector("#titleAPOD").innerHTML = data.title;
    document.querySelector("#modalLabel").innerHTML = data.title;
    document.querySelector("#apod_pic_modal").src = data.url;
    document.querySelector("#apod_pic").src = data.url;
  } else if (data.media_type == "video") {
    document.querySelector("#mediaType").innerHTML = data.media_type;
    document.querySelector("#caption").innerHTML = data.explanation;
    document.querySelector("#apod_vid").src = data.url;
    document.querySelector("#titleAPOD").innerHTML = data.title;
    document.querySelector("#modalLabel").innerHTML = data.title;
    document.querySelector("#apod_pic_modal").src = data.url;
    document.querySelector("#apod_pic").src = data.url;
  } else {
    console.log("unknown media format: " + data.media_type);
    alert(
      "unknown media type. Server returns: " +
        data.media_type +
        ". Dont know what to do with that."
    );
  }
}

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
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY"
    //+ rovCam();
  );
  let dataRov = await respRov.json();
  console.log("dataRov hier: " + dataRov);
  useDataRov(dataRov);
}

function useDataRov(dataRov) {
  document.querySelector("#rov_cam").text = dataRov.camera;
  document.querySelector("#rov_pic").src = dataRov.photos[0].img_src;
}
