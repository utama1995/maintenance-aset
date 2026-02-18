const API_URL =
"https://script.google.com/macros/s/AKfycbyEH8dkD-u1TU4pHPJ2ONVWWy4cqKoLQlB9jeJxtwdveidn5R5j7OYve7jbIepsFRawxQ/exec";

window.onload = function(){

loadTickets();

};

function loadTickets(){

fetch(API_URL + "?action=getAllTickets")

.then(res => res.json())

.then(data => {

const tbody =
document.querySelector("#ticketTable tbody");

tbody.innerHTML = "";

if(!data || data.length === 0){

tbody.innerHTML =
"<tr><td colspan='5'>Tidak ada data</td></tr>";

return;

}

data.reverse().forEach(ticket => {

tbody.innerHTML += `
<tr>
<td>${ticket["Ticket ID"]}</td>
<td>${ticket["Cabang"]}</td>
<td>${ticket["Nama Aset"]}</td>
<td>${ticket["Status"]}</td>
<td>
<button onclick="alert('Edit: ${ticket["Ticket ID"]}')">
Edit
</button>
</td>
</tr>
`;

});

})

.catch(err => {

console.error(err);

document.querySelector("#ticketTable tbody").innerHTML =
"<tr><td colspan='5'>Error load data</td></tr>";

});

}
