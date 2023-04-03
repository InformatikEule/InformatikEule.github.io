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
// drumKit.html
////

//Detecting Button Press
let numberOfDrums = document.querySelectorAll(".drum").length;

for (let i = 0; i < numberOfDrums; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    let buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

function makeSound(key) {
  switch (key) {
    case "w":
      let tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;
    case "a":
      let tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;
    case "s":
      let tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;
    case "d":
      let tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;
    case "j":
      let snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
    case "k":
      let crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
    case "l":
      let kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    default:
      console.log(buttonInnerHTML);
  }
}

//Detecting Keyboard Press
document.addEventListener("keydown", function (event) {
  console.log(event);
  makeSound(event.key);
  buttonAnimation(event.key);
});

function buttonAnimation(currentKey) {
  let activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
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
    console.log(document.getElementById("date").value);
    return document.getElementById("date").value;
  }
}

async function req() {
  //let API_KEY = "DEMO_KEY"
  //https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2022-11-22
  let resp = await fetch(
    "https://api.nasa.gov/planetary/apod?" +
      "api_key=DEMO_KEY" +
      "&date=" +
      getDate()
  );
  console.log(resp);
  let data = await resp.json();
  console.log(data);
  useData(data);
}

function useData(data) {
  const houstonTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
  });
  const berlinTime = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Berlin",
  });
  //const timeError = new Date();

  //var today = new Date();
  //today.setHours(today.getHours() + 4);

  console.log(`The current time in Houston is: ${houstonTime}`);
  console.log(`The current time in Berlin is: ${berlinTime}`);
  /*if(houstonTime == "00");*/
  //routine zum prüfen ob ein bild oder video zurückkommt. Anlegen der jeweiligen elemente.
  if (data.media_type == "image") {
    document.querySelector("#mediaType").innerHTML = data.media_type;
    document.querySelector("#caption").innerHTML = data.explanation;
    document.querySelector("#link").innerHTML = data.url;
    document.querySelector("#titleAPOD").innerHTML = data.title;
    document.querySelector("#modalLabel").innerHTML = data.title;
    document.querySelector("#apod_pic_modal").src = data.url;
    document.querySelector("#apod_pic").src = data.url;
  } else {
    document.querySelector("#mediaType").innerHTML = data.media_type;
    document.querySelector("#caption").innerHTML = data.explanation;
    document.querySelector("#apod_vid").src = data.url;
    document.querySelector("#titleAPOD").innerHTML = data.title;
    document.querySelector("#modalLabel").innerHTML = data.title;
    document.querySelector("#apod_pic_modal").src = data.url;
    document.querySelector("#apod_pic").src = data.url;
  }
}
