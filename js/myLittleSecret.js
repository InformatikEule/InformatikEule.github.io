const pacificTime = new Date().toLocaleString("en-GB", {
  timeZone: "Canada/Pacific",
});

const mountainTime = new Date().toLocaleString("en-GB", {
  timeZone: "America/Edmonton",
});

const berlinTime = new Date().toLocaleString("en-GB", {
  timeZone: "Europe/Berlin",
});

document.getElementById("berlinTime").textContent = "Leipzig: " + berlinTime;
document.getElementById("vancouverTime").textContent =
  "Vancouver/Williams Lake: " + pacificTime;
document.getElementById("calgaryTime").textContent =
  "Calgary/Cranbrooke: " + mountainTime;
