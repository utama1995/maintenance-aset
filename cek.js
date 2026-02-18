function formatTanggalIndonesia(tanggalISO){

if(!tanggalISO) return "-";

try{

const tanggal = new Date(tanggalISO);

if(isNaN(tanggal)) return tanggalISO;

return tanggal.toLocaleDateString("id-ID", {
day: "numeric",
month: "long",
year: "numeric"
});

}catch{

return tanggalISO;

}

}


function cekStatus(){

const ticket =
document.getElementById("ticket").value.trim();

if(!ticket){

alert("Masukkan Ticket ID");

return;

}

document.getElementById("hasil").innerHTML="Loading...";

fetch(API_URL+"?ticket="+ticket)

.then(res=>res.json())

.then(data=>{

if(data.error){

document.getElementById("hasil").innerHTML=
"Ticket tidak ditemukan";

return;

}

let statusClass="status-open";

if(data.status=="On Progress")
statusClass="status-progress";

if(data.status=="Done")
statusClass="status-done";


let fotoHTML="";

if(data.foto){

fotoHTML=`
<div class="label">Foto Kerusakan:</div>
<img src="${data.foto}">
`;

}


document.getElementById("hasil").innerHTML=

`
<div class="label">Ticket ID:</div>
<div class="value">${data.ticket}</div>

<div class="label">Status:</div>
<div class="value ${statusClass}">
${data.status}
</div>

<div class="label">Nama Pelapor:</div>
<div class="value">${data.nama || "-"}</div>

<div class="label">Cabang:</div>
<div class="value">${data.cabang || "-"}</div>

<div class="label">Nama Aset:</div>
<div class="value">${data.aset || "-"}</div>

<div class="label">Vendor:</div>
<div class="value">${data.vendor || "-"}</div>

<div class="label">Estimasi Selesai (SLA):</div>
<div class="value">${formatTanggalIndonesia(data.estimasi)}</div>

<div class="label">Catatan GA:</div>
<div class="value">${data.catatan || "-"}</div>

${fotoHTML}
`;

})

.catch(err=>{

document.getElementById("hasil").innerHTML=
"Error koneksi server";

});

}
