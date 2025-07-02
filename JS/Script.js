// // Autofill employee ID based on selection
// function autofillEmployeeID() {
//   const empSelect = document.getElementById("employeeName");
//   const selected = empSelect.options[empSelect.selectedIndex];
//   document.getElementById("employeeID").value = selected.getAttribute("data-id") || "";
// }

// // Autofill weapon ID based on selection
// function autofillWeaponID() {
//   const weaponSelect = document.getElementById("weaponName");
//   const selected = weaponSelect.options[weaponSelect.selectedIndex];
//   document.getElementById("weaponID").value = selected.getAttribute("data-id") || "";
// }

// // Save data to backend
// document.getElementById("firingForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const data = {
//     employeeName: document.getElementById("employeeName").value,
//     employeeID: document.getElementById("employeeID").value,
//     weaponName: document.getElementById("weaponName").value,
//     weaponID: document.getElementById("weaponID").value,
//     date: document.getElementById("date").value,
//     firingPoint: document.getElementById("firingPoint").value,
//     time: document.getElementById("time").value
//   };

//   const response = await fetch("http://localhost:5000/save", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });

//   const result = await response.json();
//   alert(result.message);
//   document.getElementById("firingForm").reset();
//   loadTableData();
// });

// // Highlight selected row
// let selectedRow = null;

// function highlightRow(rowElement) {
//   if (selectedRow) {
//     selectedRow.classList.remove("highlighted-row");
//   }
//   selectedRow = rowElement;
//   selectedRow.classList.add("highlighted-row");
// }

// // Load all entries from DB and show in table
// async function loadTableData() {
//   const response = await fetch("http://localhost:5000/all");
//   const data = await response.json();

//   const tbody = document.querySelector("#dataTable tbody");
//   tbody.innerHTML = "";

//   data.forEach((row, index) => {
//     const tr = document.createElement("tr");
//     tr.setAttribute("data-id", row.id);
//     tr.innerHTML = `
//       <td>${index + 1}</td>
//       <td>${row.employeeName}</td>
//       <td>${row.employeeID}</td>
//       <td>${row.weaponName}</td>
//       <td>${row.weaponID}</td>
//       <td>${row.date}</td>
//       <td>${row.time}</td>
//       <td>${row.firingPoint}</td>
//     `;
//     tr.addEventListener("click", () => {
//       populateForm(row);
//       highlightRow(tr);
//     });
//     tbody.appendChild(tr);
//   });
// }

// // Populate form with row data
// function populateForm(row) {
//   document.getElementById("employeeName").value = row.employeeName;
//   document.getElementById("employeeID").value = row.employeeID;
//   document.getElementById("weaponName").value = row.weaponName;
//   document.getElementById("weaponID").value = row.weaponID;
//   document.getElementById("date").value = row.date;
//   document.getElementById("time").value = row.time;
//   document.getElementById("firingPoint").value = row.firingPoint;
//   document.getElementById("firingForm").dataset.editingId = row.id;
// }

// // Update selected row
// async function updateData() {
//   const form = document.getElementById("firingForm");
//   const id = form.dataset.editingId;

//   if (!id) {
//     alert("Please select a record from the table to update.");
//     return;
//   }

//   const data = {
//     id,
//     employeeName: document.getElementById("employeeName").value,
//     employeeID: document.getElementById("employeeID").value,
//     weaponName: document.getElementById("weaponName").value,
//     weaponID: document.getElementById("weaponID").value,
//     date: document.getElementById("date").value,
//     firingPoint: document.getElementById("firingPoint").value,
//     time: document.getElementById("time").value
//   };

//   const response = await fetch("http://localhost:5000/update", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });

//   const result = await response.json();
//   alert(result.message);

//   form.reset();
//   delete form.dataset.editingId;
//   selectedRow = null;
//   loadTableData();
// }

// // Delete selected row with confirmation
// async function deleteData() {
//   const id = document.getElementById("firingForm").dataset.editingId;
//   if (!id) {
//     alert("Please select a record from the table to delete.");
//     return;
//   }

//   const confirmDelete = confirm("Are you sure you want to delete the selected record?");
//   if (!confirmDelete) {
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:5000/delete/${id}`, {
//       method: "DELETE"
//     });

//     const result = await response.json();
//     alert(result.message);
//     document.getElementById("firingForm").reset();
//     delete document.getElementById("firingForm").dataset.editingId;
//     loadTableData();
//   } catch (error) {
//     alert("Failed to delete the record. Please check server logs.");
//     console.error(error);
//   }
// }


// // Predefined employees and weapons
// const employees = [
//   { name: "Amit Kumar", id: "DRDO2501" },
//   { name: "Priya Rani", id: "DRDO2502" },
//   { name: "Rakesh Sinha", id: "DRDO2503" },
//   { name: "Sonal Mishra", id: "DRDO2504" },
//   { name: "Manoj Das", id: "DRDO2505" },
//   { name: "Shruti Nanda", id: "DRDO2506" },
//   { name: "Anil Behera", id: "DRDO2507" },
//   { name: "Neha Panda", id: "DRDO2508" },
//   { name: "Alok Tripathy", id: "DRDO2509" },
//   { name: "Sanjay Mohanty", id: "DRDO2510" },
//   { name: "Meena Nayak", id: "DRDO2511" },
//   { name: "Ravi Patnaik", id: "DRDO2512" },
//   { name: "Kiran Mohapatra", id: "DRDO2513" },
//   { name: "Deepak Jena", id: "DRDO2514" },
//   { name: "Puja Swain", id: "DRDO2515" }
// ];

// const weapons = [
//   { name: "M-46 Field Gun", id: "WPN-M46-130" },
//   { name: "Soltam M-71", id: "WPN-SLT-155" },
//   { name: "Bofors L/60 Gun", id: "WPN-BFR-60" },
//   { name: "ATAGS-Mk1A", id: "WPN-ATGS-MK1A" },
//   { name: "ATAGS-155x52", id: "WPN-ATGS-15552" },
//   { name: "T-72 Tank", id: "WPN-T72-M1" },
//   { name: "MBT Arjun", id: "WPN-ARJ-MK1" },
//   { name: "IFG / LFG", id: "WPN-IFG-105" },
//   { name: "L/70 AD Gun", id: "WPN-L70-40" },
//   { name: "Bofors FH-77", id: "WPN-BFR-77" },
//   { name: "PINAKA MLRS", id: "WPN-PNK-MKI" },
//   { name: "AK-203 Rifle", id: "WPN-AK203" },
//   { name: "Agni-V", id: "WPN-AGN-V" },
//   { name: "Akash Missile", id: "WPN-AKS-MK1" },
//   { name: "Dhanush Gun", id: "WPN-DHN-155" },
//   { name: "Bharani Mk-II", id: "RAD-BHRN-MK2" },
//   { name: "Aslesha Mk-I", id: "RAD-ASLS-MK1" },
//   { name: "Rohini Radar", id: "RAD-ROH-3D" }
// ];

// // Populate dropdowns
// function populateEmployees() {
//   const select = document.getElementById("employeeName");
//   employees.forEach(emp => {
//     const option = document.createElement("option");
//     option.value = emp.name;
//     option.textContent = emp.name;
//     option.setAttribute("data-id", emp.id);
//     select.appendChild(option);
//   });
// }

// function populateFilterDropdowns() {
//   const empSelect = document.getElementById("filterEmployee");
//   employees.forEach(emp => {
//     const option = document.createElement("option");
//     option.value = emp.name;
//     option.textContent = emp.name;
//     empSelect.appendChild(option);
//   });

//   const wpnSelect = document.getElementById("filterWeapon");
//   weapons.forEach(wpn => {
//     const option = document.createElement("option");
//     option.value = wpn.name;
//     option.textContent = wpn.name;
//     wpnSelect.appendChild(option);
//   });
// }


// function populateWeapons() {
//   const select = document.getElementById("weaponName");
//   weapons.forEach(wpn => {
//     const option = document.createElement("option");
//     option.value = wpn.name;
//     option.textContent = wpn.name;
//     option.setAttribute("data-id", wpn.id);
//     select.appendChild(option);
//   });
// }

// // Filter records
// async function filterData() {
//   const filters = {
//     employeeName: document.getElementById("filterEmployee").value,
//     weaponName: document.getElementById("filterWeapon").value,
//     dateFrom: document.getElementById("filterFrom").value,
//     dateTo: document.getElementById("filterTo").value
//   };

//   const response = await fetch("http://localhost:5000/search", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(filters)
//   });

//   const data = await response.json();
//   const tbody = document.querySelector("#dataTable tbody");
//   tbody.innerHTML = "";

//   data.forEach((row, index) => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${index + 1}</td>
//       <td>${row.employeeName}</td>
//       <td>${row.employeeID}</td>
//       <td>${row.weaponName}</td>
//       <td>${row.weaponID}</td>
//       <td>${row.date}</td>
//       <td>${row.time}</td>
//       <td>${row.firingPoint}</td>
//     `;
//     tr.addEventListener("click", () => {
//       populateForm(row);
//       highlightRow(tr);
//     });
//     tbody.appendChild(tr);
//   });
// }

// // Clear filters
// function clearFilter() {
//   document.getElementById("filterEmployee").value = "";
//   document.getElementById("filterWeapon").value = "";
//   document.getElementById("filterFrom").value = "";
//   document.getElementById("filterTo").value = "";
//   loadTableData();
// }

// // Delete filtered data
// async function deleteFilteredData() {
//   const employee = document.getElementById("filterEmployee").value;
//   const weapon = document.getElementById("filterWeapon").value;
//   const dateFrom = document.getElementById("filterFrom").value;
//   const dateTo = document.getElementById("filterTo").value;

//   // If no filter is applied, no deletion
//   if (!employee && !weapon && !dateFrom && !dateTo) {
//     alert("Please select at least one filter to delete records.");
//     return;
//   }

//   const confirmDelete = confirm("Are you sure you want to delete the filtered records?");
//   if (!confirmDelete) {
//     return;
//   }

//   const filters = {
//     employeeName: employee,
//     weaponName: weapon,
//     dateFrom: dateFrom,
//     dateTo: dateTo
//   };

//   try {
//     const response = await fetch("http://localhost:5000/delete_filtered", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(filters)
//     });

//     const result = await response.json();
//     alert(result.message);
//     loadTableData();
//   } catch (error) {
//     alert("Failed to delete records. Please check server logs.");
//     console.error(error);
//   }
// }




// // On page load
// window.onload = function () {
//   if (!sessionStorage.getItem("isLoggedIn")) {
//     window.location.href = "login.html";
//     return;
//   }

//   const params = new URLSearchParams(window.location.search);
//   if (params.get("login") === "success") {
//     alert("You are successfully logged in.");
//   }

//   populateEmployees();
//   populateWeapons();
//   loadTableData();
//   populateFilterDropdowns();

// };


// Autofill employee ID based on selection
function autofillEmployeeID() {
  const empSelect = document.getElementById("employeeName");
  const selected = empSelect.options[empSelect.selectedIndex];
  document.getElementById("employeeID").value = selected.getAttribute("data-id") || "";
}

// Autofill weapon ID based on selection
function autofillWeaponID() {
  const weaponSelect = document.getElementById("weaponName");
  const selected = weaponSelect.options[weaponSelect.selectedIndex];
  document.getElementById("weaponID").value = selected.getAttribute("data-id") || "";
}

// Save data to backend
document.getElementById("firingForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    employeeName: document.getElementById("employeeName").value,
    employeeID: document.getElementById("employeeID").value,
    weaponName: document.getElementById("weaponName").value,
    weaponID: document.getElementById("weaponID").value,
    date: document.getElementById("date").value,
    firingPoint: document.getElementById("firingPoint").value,
    time: document.getElementById("time").value
  };

  const response = await fetch("/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  alert(result.message);
  document.getElementById("firingForm").reset();
  loadTableData();
});

// Highlight selected row
let selectedRow = null;

function highlightRow(rowElement) {
  if (selectedRow) {
    selectedRow.classList.remove("highlighted-row");
  }
  selectedRow = rowElement;
  selectedRow.classList.add("highlighted-row");
}

// Load all entries from DB and show in table
async function loadTableData() {
  const response = await fetch("/all");
  const data = await response.json();

  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", row.id);
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${row.employeeName}</td>
      <td>${row.employeeID}</td>
      <td>${row.weaponName}</td>
      <td>${row.weaponID}</td>
      <td>${row.date}</td>
      <td>${row.time}</td>
      <td>${row.firingPoint}</td>
    `;
    tr.addEventListener("click", () => {
      populateForm(row);
      highlightRow(tr);
    });
    tbody.appendChild(tr);
  });
}

// Populate form with row data
function populateForm(row) {
  document.getElementById("employeeName").value = row.employeeName;
  document.getElementById("employeeID").value = row.employeeID;
  document.getElementById("weaponName").value = row.weaponName;
  document.getElementById("weaponID").value = row.weaponID;
  document.getElementById("date").value = row.date;
  document.getElementById("time").value = row.time;
  document.getElementById("firingPoint").value = row.firingPoint;
  document.getElementById("firingForm").dataset.editingId = row.id;
}

// Update selected row
async function updateData() {
  const form = document.getElementById("firingForm");
  const id = form.dataset.editingId;

  if (!id) {
    alert("Please select a record from the table to update.");
    return;
  }

  const data = {
    id,
    employeeName: document.getElementById("employeeName").value,
    employeeID: document.getElementById("employeeID").value,
    weaponName: document.getElementById("weaponName").value,
    weaponID: document.getElementById("weaponID").value,
    date: document.getElementById("date").value,
    firingPoint: document.getElementById("firingPoint").value,
    time: document.getElementById("time").value
  };

  const response = await fetch("/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  alert(result.message);

  form.reset();
  delete form.dataset.editingId;
  selectedRow = null;
  loadTableData();
}

// Delete selected row with confirmation
async function deleteData() {
  const id = document.getElementById("firingForm").dataset.editingId;
  if (!id) {
    alert("Please select a record from the table to delete.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete the selected record ?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`/delete/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();
    alert(result.message);
    document.getElementById("firingForm").reset();
    delete document.getElementById("firingForm").dataset.editingId;
    loadTableData();
  } catch (error) {
    alert("Failed to delete the record. Please check server logs.");
    console.error(error);
  }
}

// Predefined employees and weapons
const employees = [
  { name: "Amit Kumar", id: "DRDO2501" },
  { name: "Priya Rani", id: "DRDO2502" },
  { name: "Rakesh Sinha", id: "DRDO2503" },
  { name: "Sonal Mishra", id: "DRDO2504" },
  { name: "Manoj Das", id: "DRDO2505" },
  { name: "Shruti Nanda", id: "DRDO2506" },
  { name: "Anil Behera", id: "DRDO2507" },
  { name: "Neha Panda", id: "DRDO2508" },
  { name: "Alok Tripathy", id: "DRDO2509" },
  { name: "Sanjay Mohanty", id: "DRDO2510" },
  { name: "Meena Nayak", id: "DRDO2511" },
  { name: "Ravi Patnaik", id: "DRDO2512" },
  { name: "Kiran Mohapatra", id: "DRDO2513" },
  { name: "Deepak Jena", id: "DRDO2514" },
  { name: "Puja Swain", id: "DRDO2515" }
];

const weapons = [
  { name: "M-46 Field Gun", id: "WPN-M46-130" },
  { name: "Soltam M-71", id: "WPN-SLT-155" },
  { name: "Bofors L/60 Gun", id: "WPN-BFR-60" },
  { name: "ATAGS-Mk1A", id: "WPN-ATGS-MK1A" },
  { name: "ATAGS-155x52", id: "WPN-ATGS-15552" },
  { name: "T-72 Tank", id: "WPN-T72-M1" },
  { name: "MBT Arjun", id: "WPN-ARJ-MK1" },
  { name: "IFG/LFG", id: "WPN-IFG-105" },
  { name: "L/70 AD Gun", id: "WPN-L70-40" },
  { name: "Bofors FH-77", id: "WPN-BFR-77" },
  { name: "PINAKA MLRS", id: "WPN-PNK-MKI" },
  { name: "AK-203 Rifle", id: "WPN-AK203" },
  { name: "Agni-V", id: "WPN-AGN-V" },
  { name: "Akash Missile", id: "WPN-AKS-MK1" },
  { name: "Dhanush Gun", id: "WPN-DHN-155" },
  { name: "Bharani Mk-II", id: "RAD-BHRN-MK2" },
  { name: "Aslesha Mk-I", id: "RAD-ASLS-MK1" },
  { name: "Rohini Radar", id: "RAD-ROH-3D" }
];

// Populate dropdowns
function populateEmployees() {
  const select = document.getElementById("employeeName");
  employees.forEach(emp => {
    const option = document.createElement("option");
    option.value = emp.name;
    option.textContent = emp.name;
    option.setAttribute("data-id", emp.id);
    select.appendChild(option);
  });
}

function populateWeapons() {
  const select = document.getElementById("weaponName");
  weapons.forEach(wpn => {
    const option = document.createElement("option");
    option.value = wpn.name;
    option.textContent = wpn.name;
    option.setAttribute("data-id", wpn.id);
    select.appendChild(option);
  });
}

function populateFilterDropdowns() {
  const empSelect = document.getElementById("filterEmployee");
  employees.forEach(emp => {
    const option = document.createElement("option");
    option.value = emp.name;
    option.textContent = emp.name;
    empSelect.appendChild(option);
  });

  const wpnSelect = document.getElementById("filterWeapon");
  weapons.forEach(wpn => {
    const option = document.createElement("option");
    option.value = wpn.name;
    option.textContent = wpn.name;
    wpnSelect.appendChild(option);
  });
}

// Filter records
async function filterData() {
  const filters = {
    employeeName: document.getElementById("filterEmployee").value,
    weaponName: document.getElementById("filterWeapon").value,
    dateFrom: document.getElementById("filterFrom").value,
    dateTo: document.getElementById("filterTo").value
  };

  const response = await fetch("/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters)
  });

  const data = await response.json();
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  data.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${row.employeeName}</td>
      <td>${row.employeeID}</td>
      <td>${row.weaponName}</td>
      <td>${row.weaponID}</td>
      <td>${row.date}</td>
      <td>${row.time}</td>
      <td>${row.firingPoint}</td>
    `;
    tr.addEventListener("click", () => {
      populateForm(row);
      highlightRow(tr);
    });
    tbody.appendChild(tr);
  });
}

// Clear filters
function clearFilter() {
  document.getElementById("filterEmployee").value = "";
  document.getElementById("filterWeapon").value = "";
  document.getElementById("filterFrom").value = "";
  document.getElementById("filterTo").value = "";
  loadTableData();
}

// Delete filtered data
async function deleteFilteredData() {
  const employee = document.getElementById("filterEmployee").value;
  const weapon = document.getElementById("filterWeapon").value;
  const dateFrom = document.getElementById("filterFrom").value;
  const dateTo = document.getElementById("filterTo").value;

  if (!employee && !weapon && !dateFrom && !dateTo) {
    alert("Please select at least one filter to delete records.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete the filtered records ?");
  if (!confirmDelete) return;

  const filters = { employeeName: employee, weaponName: weapon, dateFrom, dateTo };

  try {
    const response = await fetch("/delete_filtered", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters)
    });

    const result = await response.json();
    alert(result.message);
    loadTableData();
  } catch (error) {
    alert("Failed to delete records. Please check server logs.");
    console.error(error);
  }
}

// On page load
window.onload = function () {
  if (!sessionStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("login") === "success") {
    alert("You are successfully logged in.");
  }

  populateEmployees();
  populateWeapons();
  loadTableData();
  populateFilterDropdowns();
};

