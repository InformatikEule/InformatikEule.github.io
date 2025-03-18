// const pacificTime = new Date().toLocaleString("en-GB", {
//   timeZone: "Canada/Pacific",
// });

// const mountainTime = new Date().toLocaleString("en-GB", {
//   timeZone: "America/Edmonton",
// });

// const berlinTime = new Date().toLocaleString("en-GB", {
//   timeZone: "Europe/Berlin",
// });

// document.getElementById("berlinTime").textContent = "Leipzig: " + berlinTime;
// document.getElementById("vancouverTime").textContent =
//   "Vancouver/Williams Lake: " + pacificTime;
// document.getElementById("calgaryTime").textContent =
//   "Calgary/Cranbrooke: " + mountainTime;

// window.addEventListener("DOMContentLoaded", () => {
//   //console.log("jo");
//   loadCSV("Data/data.csv");
// });

async function loadCSV(filename) {
  const response = await fetch(filename);
  if (!response.ok) {
    throw new Error(`Fehler beim Laden der Datei: ${response.statusText}`);
  }
  const text = await response.text();
  const data = parseCSV(text);
  console.log(data);
  const abbreviationsPage = document.getElementById("abbreviations");
  data.array.forEach((element) => {
    abbreviationsPage.insertAdjacentElement(`beforeend`, `<h2>${element}</h2>`);
  });
}

function onLoad() {
  loadCSV("Data/data.csv");
}

function parseCSV(text) {
  return text.split("\n").map((row) => row.split(","));
}
