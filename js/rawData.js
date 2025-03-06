const btnRawData = document.getElementById("getRawData");

btnRawData.addEventListener("click", () => {
  getRawData();
});

async function getRawData() {
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
        `<li>${element.name}<ul><img class="img-fluid launchImg" src="${element.image}"></img></ul><ul>${element.net}</ul><ul>${element.mission.description}</ul></li>`
      );
    });
  }
}
