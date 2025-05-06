// Blood Centers Data (Initial Stock)
let bloodCenters = [
    { 
        name: "Apollo Hospital", 
        address: "123 Main Street, City", 
        phone: "9876543210", 
        latitude: 23.0225, 
        longitude: 72.5714, 
        stock: { "A+": 10, "A-": 5, "B+": 8, "B-": 4, "O+": 12, "O-": 8, "AB+": 7, "AB-": 3 }
    },
    { 
        name: "Prathama Blood Centre", 
        address: "456 Health Ave, City", 
        phone: "9876543220", 
        latitude: 23.0245, 
        longitude: 72.5716, 
        stock: { "A+": 15, "A-": 7, "B+": 10, "B-": 5, "O+": 18, "O-": 8, "AB+": 9, "AB-": 4 }
    }
];

document.getElementById("find-blood-centers").addEventListener("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            let nearbyCenters = bloodCenters
                .map(center => ({
                    ...center,
                    distance: getDistance(userLat, userLon, center.latitude, center.longitude)
                }))
                .filter(center => center.distance <= 50)
                .sort((a, b) => a.distance - b.distance);

            displayCenters(nearbyCenters);
        }, () => {
            alert("Unable to retrieve location.");
        });
    } else {
        alert("Geolocation not supported.");
    }
});

// Function to calculate distance using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    return R * 2 * Math.atan2(
        Math.sqrt(
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) ** 2
        ),
        Math.sqrt(1 - (
            Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) ** 2
        ))
    );
}

// Function to display blood centers
function displayCenters(centers) {
    const container = document.getElementById("centers-container");
    container.innerHTML = "";

    if (centers.length === 0) {
        container.innerHTML = "<p>No nearby centers found within 50 km.</p>";
        return;
    }

    centers.forEach(center => {
        const card = document.createElement("div");
        card.classList.add("center-card");
        card.innerHTML = `
            <h3>${center.name}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${center.address}</p>
            <p><i class="fas fa-phone"></i> ${center.phone}</p>
            <button class="check-stock-btn" style='margin-left:2rem'>Check Stock</button>
        `;

        // Attach redirect logic to Check Stock button
        const checkStockBtn = card.querySelector(".check-stock-btn");
        checkStockBtn.onclick = () => {
            const encodedName = encodeURIComponent(center.name);
            window.location.href = `stock-details.html?center=${encodedName}`;
        };

        container.appendChild(card);
    });
}