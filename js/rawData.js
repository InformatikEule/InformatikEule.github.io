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
    //useRawData(dataRaw);
    const dataRawList = document.querySelector("ul");
    dataRaw.results.forEach((element) => {
      console.log(element);
      // dataRawList.insertAdjacentElement(
      //   "beforeend",
      //   "<li>${element.name}</li>"
      // );
    });
  }
}

//function useRawData(dataRaw) {

//zeigt den namen der ersten rakete...
//console.log(dataRaw.results[0].name);
//dataRaw.forEach((element) => {
//console.log("ji");
//dataRawList.insertAdjacentElement("beforeend", `<li>${element.name}</li>`);
//});
//}
