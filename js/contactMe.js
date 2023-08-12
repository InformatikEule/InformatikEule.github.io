// function sendAMailToMe() {

//   var dataMail = {
//     mailFrom: document.getElementById("mailFrom").value,
//     mailAddress: document.getElementById("mailAddress").value,
//     mailMessage: document.getElementById("mailMessage").value,
//   };

//   const serviceId = "service_j59bd2x";
//   const templateId = "template_301y19v";

//   emailjs
//     .send(serviceId, templateId, dataMail)
//     .then((resp) => {
//       document.getElementById("mailFrom").value = "";
//       document.getElementById("mailAddress").value = "";
//       document.getElementById("mailMessage").value = "";
//       console.log(resp);
//       alert("You send a Mail to me!");
//     })
//     .catch((errorMail) => alert("Error: " + errorMail));
// }

function notWorking() {
  alert("this function is not working atm.");
}
