const API_URL = "https://script.google.com/macros/s/AKfycbzLmDzXPGRK8P6uFeP3UgVrFwidcqlfGCHgloE21CKYYgJPSSOLywLdTF8d6v5MOmOB/exec";


function cekTicket(){

const ticket_id =
document.getElementById("ticket_id").value.trim();

if(!ticket_id){

alert("Masukkan Ticket ID");

return;

}


fetch(API_URL + "?action=getTicket&ticket_id=" + ticket_id)

.then(res=>res.json())

.then(data=>{

if(data.error){

document.getElementById("result").innerHTML =
"Ticket tidak ditemukan";

return;

}


let fotoHTML = "";

if(data["Upload Foto"]){

fotoHTML =
`<img src="${data["Upload Foto"]}">`;

}


document.getElementById("result").innerHTML =

`
<b>Ticket:</b> ${data["Ticket ID"]}<br>
<b>Status:</b> ${data["Status"]}<br>
<b>Nama:</b> ${data["Nama Pelapor"]}<br>
<b>Cabang:</b> ${data["Cabang"]}<br>
<b>Aset:</b> ${data["Nama Aset"]}<br>
<b>Vendor:</b> ${data["Vendor"] || "-"}<br>
<b>Catatan GA:</b> ${data["Catatan GA"] || "-"}<br>
${fotoHTML}
`;

});

}
