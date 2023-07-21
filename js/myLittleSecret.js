const PacificTime = new Date().toLocaleString("en-GB", {
  timeZone: "Canada/Pacific",
});

const berlinTime = new Date().toLocaleString("en-GB", {
  timeZone: "Europe/Berlin",
});

document.getElementById("berlinTime").textContent = "Leipzig: " + berlinTime;
document.getElementById("vancouverTime").textContent =
  "Vancouver/Williams Lake: " + PacificTime;
