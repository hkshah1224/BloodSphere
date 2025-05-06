const donationCenters = [
    {
        name: "Zydus Hospital",
        address: "100 Ft Road, Sola Village, Ahmedabad 380058, Gujarat",
        latitude: 23.0707,
        longitude: 72.5146,
        phone: "079-27602222",
        email: "info@zydushospitals.com",
        operatingHours: "24/7"
    },
    // Add other donation centers here...
];

// Distance calculation function
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

// Filter nearby centers
function findNearbyCenters(userLat, userLon, radius) {
    return donationCenters.filter(center => {
        const distance = getDistance(userLat, userLon, center.latitude, center.longitude);
        return distance <= radius; // Only centers within the radius
    });
}

// Get user's location
function getUserLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                callback(userLat, userLon);
            },
            error => {
                console.error("Location access denied:", error);
                alert("Location access denied. Please allow location access to find nearby centers.");
            }
        );
    } else {
        alert("Your browser does not support geolocation.");
    }
}

// Display centers with the "Book Your Slots Now" button
function displayCenters(centers) {
    const centersList = document.getElementById("donation-centers-list");
    centersList.innerHTML = ""; // Clear previous results

    if (centers.length === 0) {
        centersList.innerHTML = "<p>No nearby centers found within the specified radius.</p>";
        return;
    }

    centers.forEach(center => {
        const centerDiv = document.createElement("div");
        centerDiv.classList.add("center");
        centerDiv.innerHTML = `
            <h3>${center.name}</h3>
            <p>${center.address}</p>
            <p>Phone: ${center.phone || "N/A"}</p>
            <p>Email: ${center.email || "N/A"}</p>
            <p>Operating Hours: ${center.operatingHours}</p>
            <button class="book-slot-button" onclick="showTimeSlots('${center.name}')">Book Your Slots Now</button>
        `;
        centersList.appendChild(centerDiv);
    });
}

// Show time slots for the selected center with dates
function showTimeSlots(centerName) {
    const today = new Date();
    const timeSlotsWithDates = [];

    // Generate 5 days of time slots starting from today
    for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); // Increment day by 'i'
        const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
        timeSlotsWithDates.push({
            date: formattedDate,
            slots: [
                "10:00 AM - 11:00 AM",
                "11:00 AM - 12:00 PM",
                "12:00 PM - 1:00 PM",
                "2:00 PM - 3:00 PM",
                "3:00 PM - 4:00 PM",
            ],
        });
    }

    const centersList = document.getElementById("donation-centers-list");
    centersList.innerHTML = `<h2>Select a Time Slot for ${centerName}</h2>`;

    timeSlotsWithDates.forEach(({ date, slots }) => {
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("date-slot-group");
        dateDiv.innerHTML = `<h3>${date}</h3>`;
        slots.forEach((slot) => {
            const slotButton = document.createElement("button");
            slotButton.classList.add("time-slot-button");
            slotButton.textContent = slot;
            slotButton.onclick = () => confirmBooking(centerName, date, slot);
            dateDiv.appendChild(slotButton);
        });
        centersList.appendChild(dateDiv);
    });

    const backButton = document.createElement("button");
    backButton.classList.add("location-button");
    backButton.textContent = "Go Back";
    backButton.onclick = () => location.reload();
    centersList.appendChild(backButton);
    backButton.style.marginTop="20px";
}

// Confirm booking and display message with date and time
function confirmBooking(centerName, date, slot) {
    const centersList = document.getElementById("donation-centers-list");
    centersList.innerHTML = `
        <h1 style="color: green; font-size: 2rem; text-align: center;">Slot Booked Successfully!</h1>
        <p style="text-align: center; font-size: 1.2rem;">
            Your slot on <strong>${date}</strong> at <strong>${slot}</strong> for "${centerName}" has been booked.<br> Thank you for your interest in saving lives!
        </p>
        <form action="index.html">
            <button class="location-button" onclick="location.reload()" style="display: block; margin: 20px auto;" type="submit">
                <a href="index.html" style="text-decoration: none; color: white;">Done</a>
            </button>
        </form>
    `;
}

// Button click to find centers
document.getElementById("find-locations-button").addEventListener("click", () => {
    const radius = 50; // Radius in kilometers
    getUserLocation((userLat, userLon) => {
        const nearbyCenters = findNearbyCenters(userLat, userLon, radius);
        displayCenters(nearbyCenters);
    });
});
