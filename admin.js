const API_URL = "PASTE_WEB_APP_URL_DISINI";
window.onload = function(){
loadTickets();
};

function loadTickets(){
fetch(API_URL + "?action=getAllTickets")
.then(res=>res.json())
.then(data=>{
const tbody = document.querySelector("#ticketTable tbody");
tbody.innerHTML="";
data.reverse().forEach(ticket=>{
tbody.innerHTML += `
<tr>
<td>${ticket["Ticket ID"]}</td>
<td>${ticket["Cabang"]}</td>
<td>${ticket["Nama Aset"]}</td>
<td>${ticket["Status"]}</td>
<td>
<button onclick="editTicket('${ticket["Ticket ID"]}')">
Edit
</button>
</td>
</tr>
`;
});
});
}

function editTicket(ticket_id){
fetch(API_URL + "?action=getTicket&ticket_id="+ticket_id)
.then(res=>res.json())
.then(ticket=>{
document.getElementById("modal").style.display="block";
document.getElementById("ticket_id").value=ticket_id;
document.getElementById("status").value=ticket["Status"]||"Open";
document.getElementById("vendor").value=ticket["Vendor"]||"";
document.getElementById("estimasi").value=formatDate(ticket["Estimasi Selesai"]);
document.getElementById("catatan").value=ticket["Catatan GA"]||"";
});
}

function updateTicket(){
const data = {
action:"updateTicket",
ticket_id:document.getElementById("ticket_id").value,
status:document.getElementById("status").value,
vendor:document.getElementById("vendor").value,
estimasi:document.getElementById("estimasi").value,
catatan:document.getElementById("catatan").value
};
fetch(API_URL,{
method:"POST",
body:JSON.stringify(data)
})
.then(res=>res.json())
.then(res=>{
alert("Updated");
closeModal();
loadTickets();
});
}

function closeModal(){
document.getElementById("modal").style.display="none";
}

function formatDate(date){
if(!date) return "";
const d=new Date(date);
return d.toISOString().split('T')[0];
}
