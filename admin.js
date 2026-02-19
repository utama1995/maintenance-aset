const API_URL ="https://script.google.com/macros/s/AKfycbzODJqajPX8S_XNefoz6s-PmaPoTBzBBLZ2oDoV4oWVdpnU6u-l9tChNWQhEv8Bn8w0qg/exec";

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

function editTicket(id){

alert("Edit ticket: " + id);

}
