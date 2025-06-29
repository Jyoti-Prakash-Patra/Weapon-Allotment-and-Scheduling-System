// let allData = [];

// window.onload = async function () {
//   const response = await fetch("http://localhost:5000/all");
//   allData = await response.json();
//   renderTable(allData);
//   populateDropdowns(allData);
// };

// function renderTable(data) {
//   const tbody = document.querySelector("#reportTable tbody");
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
//     tbody.appendChild(tr);
//   });
// }

// function applyFilter() {
//   const name = document.getElementById("filterName").value.trim();
//   const weapon = document.getElementById("filterWeapon").value.trim();
//   const from = document.getElementById("filterFrom").value;
//   const to = document.getElementById("filterTo").value;

//   const filtered = allData.filter(row => {
//     const matchName = name === "" || row.employeeName === name;
//     const matchWeapon = weapon === "" || row.weaponName === weapon;

//     // check for valid date range
//     let matchDate = true;
//     if (from && to) {
//       matchDate = row.date >= from && row.date <= to;
//     } else if (from) {
//       matchDate = row.date >= from;
//     } else if (to) {
//       matchDate = row.date <= to;
//     }

//     return matchName && matchWeapon && matchDate;
//   });

//   renderTable(filtered);

//   // Optional: show message if no match
//   if (filtered.length === 0) {
//     alert("No records found for the selected filters.");
//   }
// }



// function clearFilter() {
//   document.getElementById("filterName").value = "";
//   document.getElementById("filterWeapon").value = "";
//   document.getElementById("filterFrom").value = "";
//   document.getElementById("filterTo").value = "";
//   renderTable(allData);
// }

// function populateDropdowns(data) {
//   const employeeSet = new Set();
//   const weaponSet = new Set();

//   data.forEach(row => {
//     employeeSet.add(row.employeeName);
//     weaponSet.add(row.weaponName);
//   });

//   const nameSelect = document.getElementById("filterName");
//   const weaponSelect = document.getElementById("filterWeapon");

//   employeeSet.forEach(name => {
//     const option = document.createElement("option");
//     option.value = name;
//     option.textContent = name;
//     nameSelect.appendChild(option);
//   });

//   weaponSet.forEach(weapon => {
//     const option = document.createElement("option");
//     option.value = weapon;
//     option.textContent = weapon;
//     weaponSelect.appendChild(option);
//   });
// }

// function exportToExcel() {
//   const wb = XLSX.utils.book_new();
//   const ws = XLSX.utils.table_to_sheet(document.getElementById("reportTable"));
//   XLSX.utils.book_append_sheet(wb, ws, "Firing Report");
//   XLSX.writeFile(wb, "Firing_Report.xlsx");
// }

// async function exportToPDF() {
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();

//   const logoImg = new Image();
//   logoImg.src = "../Assets/DRDO.png";

//   logoImg.onload = function () {
//     const logoWidth = 30;
//     const logoHeight = 30;
//     const xPosition = (210 - logoWidth) / 2;
//     const yPosition = 10;

//     doc.addImage(logoImg, "PNG", xPosition, yPosition, logoWidth, logoHeight);

//     doc.setFontSize(16);
//     doc.setTextColor(40);
//     doc.text("FIRING DETAILMENT REPORT", 105, yPosition + logoHeight + 10, null, null, "center");

//     // Get table data manually
//     const table = document.getElementById("reportTable");
//     const head = [Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim())];
//     const body = Array.from(table.querySelectorAll("tbody tr")).map(row =>
//       Array.from(row.querySelectorAll("td")).map(td => td.textContent.trim())
//     );

//     doc.autoTable({
//       head: head,
//       body: body,
//       startY: yPosition + logoHeight + 20,
//       theme: "striped",
//       headStyles: {
//         fillColor: [0, 64, 128],
//         halign: 'center',
//       },
//       styles: {
//         fontSize: 8,
//         cellPadding: 1.5,
//         halign: 'center',
//       }
//     });

//     doc.save("Firing_Details_Report.pdf");
//   };

//   logoImg.onerror = function () {
//     alert("Failed to load DRDO logo image.");
//   };
// }

let allData = [];

window.onload = async function () {
  try {
    const response = await fetch("/all"); // ✅ relative path
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server.");
    }

    allData = await response.json();
    renderTable(allData);
    populateDropdowns(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("❌ Failed to load data. Please make sure the server is running.");
  }
};

function renderTable(data) {
  const tbody = document.querySelector("#reportTable tbody");
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
    tbody.appendChild(tr);
  });
}

function applyFilter() {
  const name = document.getElementById("filterName").value.trim();
  const weapon = document.getElementById("filterWeapon").value.trim();
  const from = document.getElementById("filterFrom").value;
  const to = document.getElementById("filterTo").value;

  const filtered = allData.filter(row => {
    const matchName = name === "" || row.employeeName === name;
    const matchWeapon = weapon === "" || row.weaponName === weapon;

    let matchDate = true;
    if (from && to) {
      matchDate = row.date >= from && row.date <= to;
    } else if (from) {
      matchDate = row.date >= from;
    } else if (to) {
      matchDate = row.date <= to;
    }

    return matchName && matchWeapon && matchDate;
  });

  renderTable(filtered);

  if (filtered.length === 0) {
    alert("No records found for the selected filters.");
  }
}

function clearFilter() {
  document.getElementById("filterName").value = "";
  document.getElementById("filterWeapon").value = "";
  document.getElementById("filterFrom").value = "";
  document.getElementById("filterTo").value = "";
  renderTable(allData);
}

function populateDropdowns(data) {
  const employeeSet = new Set();
  const weaponSet = new Set();

  data.forEach(row => {
    employeeSet.add(row.employeeName);
    weaponSet.add(row.weaponName);
  });

  const nameSelect = document.getElementById("filterName");
  const weaponSelect = document.getElementById("filterWeapon");

  employeeSet.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    nameSelect.appendChild(option);
  });

  weaponSet.forEach(weapon => {
    const option = document.createElement("option");
    option.value = weapon;
    option.textContent = weapon;
    weaponSelect.appendChild(option);
  });
}

function exportToExcel() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(document.getElementById("reportTable"));
  XLSX.utils.book_append_sheet(wb, ws, "Firing Report");
  XLSX.writeFile(wb, "Firing_Report.xlsx");
}

async function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const logoImg = new Image();
  logoImg.src = "../Assets/DRDO.png";

  logoImg.onload = function () {
    const logoWidth = 30;
    const logoHeight = 30;
    const xPosition = (210 - logoWidth) / 2;
    const yPosition = 10;

    doc.addImage(logoImg, "PNG", xPosition, yPosition, logoWidth, logoHeight);

    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text("FIRING DETAILMENT REPORT", 105, yPosition + logoHeight + 10, null, null, "center");

    const table = document.getElementById("reportTable");
    const head = [Array.from(table.querySelectorAll("thead th")).map(th => th.textContent.trim())];
    const body = Array.from(table.querySelectorAll("tbody tr")).map(row =>
      Array.from(row.querySelectorAll("td")).map(td => td.textContent.trim())
    );

    doc.autoTable({
      head: head,
      body: body,
      startY: yPosition + logoHeight + 20,
      theme: "striped",
      headStyles: {
        fillColor: [0, 64, 128],
        halign: 'center',
      },
      styles: {
        fontSize: 8,
        cellPadding: 1.5,
        halign: 'center',
      }
    });

    doc.save("Firing_Details_Report.pdf");
  };

  logoImg.onerror = function () {
    alert("Failed to load DRDO logo image.");
  };
}
