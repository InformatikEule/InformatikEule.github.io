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
    useRawData(dataRaw);
  }
}

function useRawData(dataRaw) {
  //komme hier grad nicht weiter sadface.jpg
  console.log(dataRaw);
}
