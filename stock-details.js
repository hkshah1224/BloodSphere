

// Initialize EmailJS
emailjs.init("XBxtADS4oppliqcbc");

// Get blood center name from URL
const urlParams = new URLSearchParams(window.location.search);
const centerName = urlParams.get("center");

const bloodCenters = [
    {
        name: "Apollo Hospital",
        stock: { "A+": 10, "A-": 5, "B+": 8, "B-": 4, "O+": 12, "O-": 8, "AB+": 7, "AB-": 3 }
    },
    {
        name: "Prathama Blood Centre",
        stock: { "A+": 15, "A-": 7, "B+": 10, "B-": 5, "O+": 18, "O-": 8, "AB+": 9, "AB-": 4 }
    }
];

const center = bloodCenters.find(c => c.name === centerName);

if (!center) {
    document.getElementById("center-name").textContent = "Center not found";
} else {
    document.getElementById("center-name").textContent = `Blood Stock - ${center.name}`;
    const stock = center.stock;
    const cardsContainer = document.getElementById("blood-stock-cards");

    Object.entries(stock).forEach(([type, qty]) => {
        const card = document.createElement("div");
        card.className = "blood-stock-card animate-entry";
        card.setAttribute("data-type", type);

        const percent = Math.min((qty / 20) * 100, 100);

        card.innerHTML = `
            <div class="blood-type-label">${type}</div>
            <div class="blood-meter-bg">
                <div class="blood-meter-fill" style="width: 0%;" data-fill="${percent}"></div>
            </div>
            <div class="stock-info">${qty} units available</div>
            <button class="select-btn" data-type="${type}" data-qty="${qty}">Select</button>
        `;

        cardsContainer.appendChild(card);
    });

    // Animate fill bars after load
    setTimeout(() => {
        document.querySelectorAll(".blood-meter-fill").forEach(bar => {
            const fillPercent = bar.getAttribute("data-fill");
            bar.style.width = `${fillPercent}%`;
        });
    }, 100);
}

document.getElementById("request-blood-btn").addEventListener("click", () => {
    const bloodTypeInput = document.getElementById("selected-blood");
    const unitInput = document.getElementById("blood-units");
    const emailInput = document.getElementById("user-email");
    const requestBtn = document.getElementById("request-blood-btn");

    const bloodType = bloodTypeInput.value;
    const units = parseInt(unitInput.value);
    const email = emailInput.value;

    if (!bloodType) {
        showToastMessage("⚠️ Please select a blood group.", false);
        return;
    }

    if (!units || units <= 0) {
        showToastMessage("⚠️ Enter a valid number of units.", false);
        return;
    }

    const maxUnits = parseInt(unitInput.getAttribute("max"));
    if (units > maxUnits) {
        showToastMessage(`❌ Only ${maxUnits} units available for ${bloodType}.`, false);
        return;
    }

    bloodTypeInput.disabled = true;
    unitInput.disabled = true;
    emailInput.disabled = true;
    requestBtn.disabled = true;
    document.querySelectorAll(".select-btn").forEach(btn => btn.disabled = true);

    showToastMessage(`✅ Request Approved!<br>${units} units of <strong>${bloodType}</strong> — our team will contact you shortly.`, true);

    setTimeout(() => {
        const card = document.querySelector(`.blood-stock-card[data-type="${bloodType}"]`);
        const infoText = card.querySelector(".stock-info");
        const fillBar = card.querySelector(".blood-meter-fill");

        const currentQty = center.stock[bloodType];
        const newQty = currentQty - units;
        center.stock[bloodType] = newQty;

        infoText.textContent = `${newQty} units available`;

        const newPercent = Math.min((newQty / 20) * 100, 100);
        fillBar.style.width = `${newPercent}%`;
        fillBar.setAttribute("data-fill", newPercent);
    }, 2000);

    // ✅ Corrected EmailJS block
    emailjs.send(
        "service_63e4hqc",
        "template_2x6xgks",
        {  
            email: email,
            user_name: "User",
            blood_type: bloodType,
            blood_units: units,
            center_name: center.name
        }).then(() => {
        console.log("Email sent successfully!");
    }).catch(error => {
        console.error("Email send failed:", error);
    });
});

function showToastMessage(message, isSuccess = true) {
    const toast = document.createElement("div");
    toast.className = `toast-overlay ${isSuccess ? 'toast-success' : 'toast-error'}`;
    toast.innerHTML = `<div class="toast-content">${message}</div>`;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

const donorsByBloodGroup = {
    "A+": [
        { name: "Rohit Khanna", phone: "9680728895", city: "Vadodara" },
        { name: "Pooja Nair", phone: "9978692185", city: "Surat" },
        { name: "Sneha Desai", phone: "9864698685", city: "Vadodara" }
    ],
    "A-": [
        { name: "Sneha Desai", phone: "9487568250", city: "Gandhinagar" },
        { name: "Anjali Rao", phone: "9133089397", city: "Gandhinagar" },
        { name: "Amit Verma", phone: "9744941618", city: "Gandhinagar" },
        { name: "Rahul Sharma", phone: "9389662009", city: "Rajkot" },
        { name: "Sneha Desai", phone: "9579722565", city: "Surat" }
    ],
    "O-": [
        { name: "Harshil Shah", phone: "7016534432", city: "Gandhinagar" },
        { name: "kris prajapati", phone: "9133089397", city: "Gandhinagar" },
        { name: "Darshil shah", phone: "9744941618", city: "Gandhinagar" }
    ],
    "O+": [
        { name: "Nayan shah", phone: "7016534434", city: "Gandhinagar" },
        { name: "yarch sarvan", phone: "9133089397", city: "Gandhinagar" },
        { name: "Malav Sanyari", phone: "9744941618", city: "Gandhinagar" },
        { name: "yash prajapti", phone: "9744941618", city: "Gandhinagar" }
    ]
};

function showDonorsForBloodGroup(bloodType) {
    const donorSection = document.getElementById("donor-section");
    donorSection.innerHTML = "";

    const donors = donorsByBloodGroup[bloodType] || [];
    if (donors.length === 0) {
        donorSection.innerHTML = `<p>No donors found for ${bloodType}</p>`;
        return;
    }

    donorSection.innerHTML = `<h3>Available Donors for ${bloodType}:</h3>`;
    donors.forEach(donor => {
        const card = document.createElement("div");
        card.className = "donor-card";
        card.innerHTML = `
            <h4>${donor.name}</h4>
            <p>📍 ${donor.city}</p>
            <p>📞 <a href="tel:${donor.phone}" class="call-btn">${donor.phone}</a></p>
        `;
        donorSection.appendChild(card);
    });

    donorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    donorSection.classList.add("highlight-focus");
    setTimeout(() => donorSection.classList.remove("highlight-focus"), 2000);
}

document.querySelectorAll(".select-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-type");
        const qty = btn.getAttribute("data-qty");
        document.getElementById("selected-blood").value = type;
        document.getElementById("blood-units").setAttribute("max", qty);
        showDonorsForBloodGroup(type);
    });
});
