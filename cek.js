function cekStatus(){

const ticket =
document.getElementById("ticket").value;

document.getElementById("hasil").innerHTML="Loading...";

fetch(API_URL+"?ticket="+ticket)

.then(res=>res.json())

.then(data=>{

if(data.error){

document.getElementById("hasil").innerHTML =
"Ticket tidak ditemukan";

return;

}

let fotoHTML="";

if(data.foto){

fotoHTML =
`<img src="${data.foto}" style="max-width:100%;margin-top:10px;">`;

}

document.getElementById("hasil").innerHTML=

`
<b>Ticket:</b> ${data.ticket}<br>
<b>Status:</b> ${data.status}<br>
<b>Vendor:</b> ${data.vendor}<br>
<b>Catatan:</b> ${data.catatan}<br>
${fotoHTML}
`;

});

}
