////
// nasaAPI.html
////
const apodArr = [];
const title = document.createElement("h3");
const caption = document.createElement("p");
const img = document.createElement("img");
img.setAttribute("id", "pic");
const mediaType = document.createElement("p");
const vid = document.createElement("iframe");
const copy = document.createElement("p");
const searchB = document.querySelector("#submit");

searchB.addEventListener("click", () => {
  fetchApod();
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

async function fetchApod() {
  //https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2022-11-22
  let resp = await fetch(
    "https://api.nasa.gov/planetary/apod?" +
      "api_key=" +
      "BCFopSyeo7rFrjmb6Ecl0yubJ08rEybAE0LsgVN0" +
      "&date=" +
      getDate()
  );
  //prüfen ob der server einen fehler meldet:
  console.log(resp);
  if (resp.status >= 200 && resp.status < 400) {
    let data = await resp.json();
    console.log(data);
    useData(data);
  } else {
    console.log("Error, Status code: " + resp.status);
    alert(
      "Error, Server returns status-code: " +
        resp.status +
        "! Status-Text: " +
        resp.statusText
    );
  }
}

function useData(data) {
  ///// WIP:
  //const houstonTime = new Date().toLocaleString("en-US", {
  //timeZone: "America/Chicago",
  //});
  //const berlinTime = new Date().toLocaleString("en-US", {
  //timeZone: "Europe/Berlin",
  //});
  //console.log(`The current time in Houston is: ${houstonTime}`);
  //console.log(`The current time in Berlin is: ${berlinTime}`);
  /////

  //routine zum prüfen ob ein bild oder video zurückkommt.
  //anlegen der Elemente und zu einem Array zufügen.
  console.log(data);
  title.textContent = data.title;
  caption.textContent = data.explanation;
  img.src = data.url;
  mediaType.textContent = "Media-Type: " + data.media_type;
  vid.src = data.url;
  copy.textContent = "Copyright: " + data.copyright;
  if (data.media_type == "image") {
    apodArr.push(title, img, caption, copy, mediaType);
    apodArr.forEach((element) => {
      document.getElementById("apodPic").appendChild(element);
    });
  } else if (data.media_type == "video") {
    apodArr.push(title, vid, caption, copy, mediaType);
    apodArr.forEach((element) => {
      document.getElementById("apodPic").appendChild(element);
    });
  } else {
    console.log("unknown media format: " + data.media_type);
    alert(
      "unknown media type. Server returns: " +
        data.media_type +
        ". Dont know what to do with that."
    );
  }
}
