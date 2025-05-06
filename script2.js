 // Navbar Scroll Animation
 window.addEventListener("scroll", function() {
    let navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});
// Counter Animation
document.addEventListener("DOMContentLoaded", function () {
const counters = document.querySelectorAll('.statistic-counter');
const speed = 2000;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
});
});
document.querySelector('.contact-form').addEventListener('submit', function(e) {
e.preventDefault(); // Prevent form from submitting normally

// You can add your form submission logic here
alert('Message Sent!');
});
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const carousel = document.querySelector(".carousel");

    navbar.classList.add("animate__animated", "animate__fadeInDown");
    navbar.style.opacity = "1";

    setTimeout(() => {
        carousel.classList.add("animate__animated", "animate__fadeInUp");
        carousel.style.opacity = "1";
    }, 1000);
});

// Function to move to specific slide (zero-based index)
function goToSlide(slideIndex) {
    var carousel = new bootstrap.Carousel(document.getElementById("carouselExampleFade"));
    carousel.to(slideIndex);
}
function goToCampaigns() {
    var myCarousel = new bootstrap.Carousel(document.querySelector('#carouselExampleFade'));
    myCarousel.to(2); // Moves to the third slide (index starts at 0)
}


document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    const observerOptions = {
        root: null, // viewport
        threshold: 0.2, // 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("section-visible");
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);

    // Apply different animations to alternating sections
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add("slide-in-left");
        } else {
            section.classList.add("slide-in-right");
        }
        observer.observe(section);
    });
});




document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".feedback-form").addEventListener("submit", function (event) {
        event.preventDefault();
        
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let feedback = document.getElementById("feedback").value.trim();

        let nameRegex = /^[A-Za-z ]+$/;
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!nameRegex.test(name)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Name",
                text: "Please enter a valid name (letters and spaces only)."
            });
            return;
        }

        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Email",
                text: "Please enter a valid email address."
            });
            return;
        }

        if (feedback.length < 5) {
            Swal.fire({
                icon: "info",
                title: "Feedback Too Short",
                text: "Your feedback should be at least 5 characters long."
            });
            return;
        }
        
        // Display thank you message
        Swal.fire({
            icon: "success",
            title: "Thank You!",
            text: "Your feedback has been received.",
            confirmButtonText: "OK"
        });
        
        // Clear form fields after submission
        document.querySelector(".feedback-form").reset();
    });
});








document.addEventListener("DOMContentLoaded", function () {
    // Contact Form Submission
    document.querySelector(".contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Display thank you message
        Swal.fire({
            icon: "success",
            title: "Thank You!",
            text: "Your message has been sent successfully.",
            confirmButtonText: "OK"
        });
        
        // Clear form fields after submission
        document.querySelector(".contact-form").reset();
    });
});
