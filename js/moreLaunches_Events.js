//function um die "more Launches" page mit Daten zu füllen (wird onload ausgeführt)
async function getMoreLaunches() {
  let data = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
  if (!data.ok) {
    alert("Sum ting wroang!");
  } else {
    let dataRaw = await data.json();
    console.log(dataRaw);
    const dataRawList = document.querySelector("ul");
    dataRaw.results.forEach((element) => {
      let dateFormatted = new Date(element.net.slice(0, 10)).toLocaleDateString(
        "de-DE"
      );
      dataRawList.insertAdjacentHTML(
        `beforeend`,
        `<li><h4>${element.name}</h4><ul>
        <img class="img-fluid launchImg" src="${element.image}"></img>
        <li>Date: <span>${dateFormatted}</span></li>
        <li>Time: <span>${element.net.slice(11, 19)}</span></li>
        <li>Description: <span>${element.mission.description}</span></li>
        <li>Status: <span>${element.status.name}</span></li>
        <li>Orbit: <span>${element.mission.orbit.name}</span></li>
        <li>Type: <span>${element.mission.type}</span></li></ul><br>`
      );
    });
  }
}

//function um die "more Events" page mit Daten zu füllen (wird onload ausgeführt)
async function getMoreEvents() {
  let data = await fetch(`https://ll.thespacedevs.com/2.2.0/event/upcoming/`);
  if (!data.ok) {
    alert("Sum ting wroang!");
  } else {
    let dataRaw = await data.json();
    console.log(dataRaw);
    const dataRawList = document.querySelector("ul");
    dataRaw.results.forEach((element) => {
      let dateFormatted = new Date(
        element.date.slice(0, 10)
      ).toLocaleDateString("de-DE");
      dataRawList.insertAdjacentHTML(
        `beforeend`,
        `<li><h4>${element.name}</h4><ul>
        <img class="img-fluid launchImg" src="${element.feature_image}"></img>
        <li>Date: <span>${dateFormatted}</span></li>
        <li>Time: <span>${element.date.slice(11, 19)}</span></li>
        <li>Description: <span>${element.description}</span></li>
        <li>Location: <span>${element.location}</span></li>
        <li>Type: <span>${element.type.name}</span></li></ul><br>`
      );
    });
  }
}
