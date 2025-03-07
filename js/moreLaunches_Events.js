//function um die "more Launches" page mit Daten zu füllen
async function getMoreLaunches() {
  let data = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
  if (!data.ok) {
    alert("Sum ting wroang!");
  } else {
    let dataRaw = await data.json();
    console.log(dataRaw);
    const dataRawList = document.querySelector("ul");
    dataRaw.results.forEach((element) => {
      dataRawList.insertAdjacentHTML(
        `beforeend`,
        `<li>${element.name}<ul><img class="img-fluid launchImg" src="${
          element.image
        }"></img><li>${element.net.slice(0, 10)}<li>${element.net.slice(
          11,
          19
        )}</li></li><li>${element.mission.description}</li></ul></li><br>`
        //`<li>${element.name}<ul><img class="img-fluid launchImg" src="${element.image}"></img></ul><ul>${element.net}</ul><ul>${element.mission.description}</ul></li>`
      );
    });
  }
}

//function um die "more Events" page mit Daten zu füllen
async function getMoreEvents() {
  let data = await fetch(`https://ll.thespacedevs.com/2.2.0/event/upcoming/`);
  if (!data.ok) {
    alert("Sum ting wroang!");
  } else {
    let dataRaw = await data.json();
    console.log(dataRaw);
    const dataRawList = document.querySelector("ul");
    dataRaw.results.forEach((element) => {
      dataRawList.insertAdjacentHTML(
        `beforeend`,
        `<li>${element.name}<ul><img class="img-fluid launchImg" src="${
          element.feature_image
        }"></img><li>${element.date.slice(0, 10)}<li>${element.date.slice(
          11,
          19
        )}</li></li><li>${element.description}</li></ul></li><br>`
        //`<li>${element.name}<ul><img class="img-fluid launchImg" src="${element.image}"></img></ul><ul>${element.net}</ul><ul>${element.mission.description}</ul></li>`
      );
    });
  }
}
