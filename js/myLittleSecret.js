const AtlanticTime = new Date().toLocaleString("en-US", {
  timeZone: "Canada/Atlantic",
});

const CentralTime = new Date().toLocaleString("en-US", {
  timeZone: "Canada/Central",
});

const EasternTime = new Date().toLocaleString("en-US", {
  timeZone: "Canada/Eastern",
});

const MountainTime = new Date().toLocaleString("en-US", {
  timeZone: "Canada/Mountain",
});

const NewfoundlandTime = new Date().toLocaleString("en-US", {
  timeZone: "Canada/Newfoundland",
});

const PacificTime = new Date().toLocaleString("en-US", {
  timeZone: "Canada/Pacific",
});

const SaskatchewanTime = new Date().toLocaleString("en-US", {
  timeZone: "Canada/Saskatchewan",
});

const YukonTime = new Date().toLocaleString("en-US", {
  timeZone: "Canada/Yukon",
});

const berlinTime = new Date().toLocaleString("en-US", {
  timeZone: "Europe/Berlin",
});
console.log("Central: " + CentralTime);
console.log("Eastern: " + EasternTime);
console.log("Mountain: " + MountainTime);
console.log("Newfoundland: " + NewfoundlandTime);
console.log("Pacific: " + PacificTime);
console.log("Saskatchewan: " + SaskatchewanTime);
console.log("Yukon: " + YukonTime);

//console.log(`The current time in Houston is: ${houstonTime}`);
console.log(`The current time in Berlin is: ${berlinTime}`);
document.getElementById("berlinTime").textContent = "Leipzig: " + berlinTime;
document.getElementById("vancouverTime").textContent =
  "Vancouver: " + PacificTime;
