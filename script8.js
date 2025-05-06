// Initialize EmailJS
(function () {
    emailjs.init("XBxtADS4oppliqcbc"); // Replace with your public key
  })();
  
  // Blood center data
  const bloodCenters = [
    {
      name: "General Hospital Blood Bank",
      address: "Sola, Ahmedabad, Gujarat",
      phone: "",
      latitude: 23.0776,
      longitude: 72.5255,
    },
    {
      name: "Gujarat Blood Bank",
      address: "1-2 Seller Shubhlaxmi Complex, Seller, Ahmedabad, Gujarat",
      phone: "079 2745 3728",
      latitude: 23.0301,
      longitude: 72.5589,
    },
    {
      name: "The Gujarat Cancer & Research Institute",
      address: "Asarwa, Ahmedabad, Gujarat",
      phone: "079 2268 8000",
      latitude: 23.0481,
      longitude: 72.6042,
    },
    {
      name: "Supertech Voluntary Blood Bank",
      address: "NR. Drive IN Cinema, Ahmedabad, Gujarat",
      phone: "079 4005 8958",
      latitude: 23.0358,
      longitude: 72.5469,
    },
    {
      name: "L. G. Hospital Blood Bank",
      address: "Maninagar, Ahmedabad, Gujarat",
      phone: "",
      latitude: 22.9945,
      longitude: 72.6031,
    },
    {
      name: "Shraddhadeep Blood Bank",
      address: "Vrundavan Trade Center, Ahmedabad, Gujarat",
      phone: "098255 83898",
      latitude: 23.025,
      longitude: 72.57,
    },
    {
      name: "Apollo Hospital International Blood Bank",
      address: "GIDC Bhat, Bhat, Ahmedabad, Gujarat",
      phone: "",
      latitude: 23.0994,
      longitude: 72.578,
    },
    {
      name: "Prathama Blood Centre",
      address: "C V Raman Marg, Ahmedabad, Gujarat",
      phone: "079 2660 0101",
      latitude: 23.0225,
      longitude: 72.5714,
    },
    {
      name: "AMI Pathology Laboratory & Blood Bank",
      address: "204 Sabarmati Road, Ahmedabad 380005",
      phone: "079 2750 1202",
      latitude: 23.0594,
      longitude: 72.58,
    },
    {
      name: "Adarsh Voluntary Blood Bank",
      address: "Samjuba Hospital, Bapunagar, Ahmedabad, Gujarat",
      phone: "079 2273 0446",
      latitude: 23.0305,
      longitude: 72.65,
    },
  ];
  
  // Get distance using Haversine formula
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  // Display centers
  function displayCenters(centers) {
    const list = document.getElementById("donation-centers-list");
    list.innerHTML = "";
  
    if (!centers.length) {
      list.innerHTML = `<p class="text-center">No centers found within 50km.</p>`;
      return;
    }
  
    centers.forEach((center) => {
      const col = document.createElement("div");
      col.className = "col-md-6";
      col.innerHTML = `
        <div class="card border-danger">
          <div class="card-body">
            <h5 class="card-title">${center.name}</h5>
            <p class="card-text">${center.address}</p>
            <p class="card-text">Phone: ${center.phone || "N/A"}</p>
            <p class="card-text">Distance: ${center.distance.toFixed(2)} km</p>
            <button class="btn btn-outline-danger" onclick="bookSlot('${center.name}')">Book Slot</button>
          </div>
        </div>
      `;
      list.appendChild(col);
    });
  }
  
  // Book slot flow
  function bookSlot(centerName) {
    const dates = generateDates();
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.setAttribute("tabindex", "-1");
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-3">
          <h5>Select a Date at ${centerName}</h5>
          ${dates
            .map(
              (date) =>
                `<button class="btn btn-sm btn-danger m-1" onclick="selectTime('${centerName}', '${date}')">${date}</button>`
            )
            .join("")}
          <button class="btn btn-secondary mt-3" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    new bootstrap.Modal(modal).show();
  }
  
  // Time slots
  function selectTime(centerName, date) {
    const slots = [
      "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"
    ];
  
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.setAttribute("tabindex", "-1");
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-3">
          <h5>Select a Time Slot on ${date}</h5>
          ${slots
            .map(
              (slot) =>
                `<button class="btn btn-outline-danger m-1" onclick="confirmBooking('${centerName}', '${date}', '${slot}')">${slot}</button>`
            )
            .join("")}
          <button class="btn btn-secondary mt-3" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    new bootstrap.Modal(modal).show();
  }

  function confirmBooking(centerName, date, slot) {
    const donationId = "DN" + Math.floor(100000 + Math.random() * 900000);
    const userEmail = document.getElementById("userEmail").value;
  
    const params = {
      email: userEmail,
      center_name: centerName,  // ✅ This is now a string, and it works!
      date: date,
      time_slot: slot,
      donation_id: donationId
    };
  
    console.log("Sending booking with params:", params);
  
    if (!centerName || !date || !slot || !donationId) {
      console.error("❌ One or more booking fields are empty.");
      return;
    }
  
    emailjs.send("service_3cll0zq", "template_bgdlqia", params)
      .then(response => {
        console.log("✅ Email sent:", response);
  
        // Close modal
        const modals = document.querySelectorAll(".modal.show");
        modals.forEach((modalEl) => {
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) modalInstance.hide();
        });
  
        setTimeout(() => {
          alert(
            `✅ Booking Confirmed!\n\n🩸 Center: ${centerName}\n📅 Date: ${date}\n⏰ Time: ${slot}\n🆔 Donation ID: ${donationId}`
          );
          window.location.href = "index.html";
        }, 300);
      })
      .catch(error => {
        console.error("❌ EmailJS Error:", error);
        alert("Booking failed. See console for error.");
      });
  }
  

  
  
  // Generate next 7 days
  function generateDates() {
    const dates = [];
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }));
    }
  
    return dates;
  }
  
  // Handle location search
  document.getElementById("find-locations-button").addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const filtered = bloodCenters
            .map((center) => ({
              ...center,
              distance: getDistance(latitude, longitude, center.latitude, center.longitude),
            }))
            .filter((center) => center.distance <= 50)
            .sort((a, b) => a.distance - b.distance);
  
          displayCenters(filtered);
        },
        () => {
          alert("Please allow location access to find nearby centers.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });  