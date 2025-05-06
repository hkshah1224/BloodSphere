// Fetch blood inventory data from the backend
async function fetchInventory() {
    try {
        const response = await fetch("http://localhost:5000/api/blood-inventory");
        const data = await response.json();
        displayInventory(data);
    } catch (error) {
        console.error("Error fetching inventory:", error);
    }
}

// Function to display data in the table
function displayInventory(data) {
    const tableBody = document.getElementById("inventoryTable");
    tableBody.innerHTML = ""; // Clear previous rows

    data.forEach((item) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.type}</td>
            <td>${item.center}</td>
            <td>${item.location}</td>
            <td>${item.quantity}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="updateStock('${item.center}', '${item.type}', 1)">+</button>
                <button class="btn btn-danger btn-sm" onclick="updateStock('${item.center}', '${item.type}', -1)">-</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to update blood quantity
async function updateStock(center, type, change) {
    try {
        const response = await fetch("http://localhost:5000/api/update-blood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ center, type, change }),
        });

        const data = await response.json();
        console.log(data.message);
        fetchInventory(); // Refresh table after update
    } catch (error) {
        console.error("Error updating stock:", error);
    }
}

// Function to filter table by search input
document.getElementById("searchBox").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    const rows = document.querySelectorAll("#inventoryTable tr");

    rows.forEach(row => {
        const center = row.cells[1].textContent.toLowerCase();
        const location = row.cells[2].textContent.toLowerCase();

        if (center.includes(searchText) || location.includes(searchText)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

// Fetch inventory initially and refresh every 5 seconds
fetchInventory();
setInterval(fetchInventory, 5000);
