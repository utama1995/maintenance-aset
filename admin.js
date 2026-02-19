const API_URL ="https://script.google.com/macros/s/AKfycbyUXO0EgsC9O2vWSdCQ_IrldJ-J1P8tnvy7wq6edIvCxJQBqQmrpY0aJLpS520qiAs8Gg/exec";

window.addEventListener("load", loadTickets);

function loadTickets(){

const tbody =
document.querySelector("#ticketTable tbody");

tbody.innerHTML =
"<tr><td colspan='5'>Loading...</td></tr>";

fetch(API_URL + "?action=getAllTickets", {
method: "GET",
mode: "cors"
})
.then(function(response){

return response.json();

})
.then(function(data){

tbody.innerHTML = "";

if(!data || data.length === 0){

tbody.innerHTML =
"<tr><td colspan='5'>Tidak ada data</td></tr>";

return;

}

for(let i = data.length - 1; i >= 0; i--){

const ticket = data[i];

const row = document.createElement("tr");

row.innerHTML = `
<td>${ticket["Ticket ID"] || "-"}</td>
<td>${ticket["Cabang"] || "-"}</td>
<td>${ticket["Nama Aset"] || "-"}</td>
<td>${ticket["Status"] || "-"}</td>
<td>
<button onclick="editTicket('${ticket["Ticket ID"]}')">
Edit
</button>
</td>
`;

tbody.appendChild(row);

}

})
.catch(function(error){

console.error("ERROR:", error);

tbody.innerHTML =
"<tr><td colspan='5'>Gagal load data</td></tr>";

});

}

function editTicket(ticketId){
document.getElementById("editTicketId").value = ticketId;
document.getElementById("editModal").style.display = "block";
}
function closeModal(){
document.getElementById("editModal").style.display = "none";
}
function saveTicket(){
const ticket_id =
document.getElementById("editTicketId").value;
const status =
document.getElementById("editStatus").value;
const vendor =
document.getElementById("editVendor").value;
const catatan =
document.getElementById("editCatatan").value;
const estimasi =
document.getElementById("editEstimasi").value;
fetch(API_URL, {
method:"POST",
body:JSON.stringify({
action:"updateTicket",
ticket_id:ticket_id,
status:status,
vendor:vendor,
catatan:catatan,
estimasi:estimasi
})
})
.then(res=>res.json())
.then(data=>{
alert("Berhasil update");
closeModal();
loadTickets();
});
}

