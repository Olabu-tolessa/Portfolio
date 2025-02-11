document.addEventListener("DOMContentLoaded", () => {
    // Skill bar animation
    document.querySelectorAll('.skill').forEach(skill => {
        const progress = skill.querySelector('.progress');
        const percentage = parseInt(progress.getAttribute('data-percent'));
        const percentageSpan = skill.querySelector('.percentage');

        let currentPercentage = 0;
        const interval = setInterval(() => {
            if (currentPercentage < percentage) {
                currentPercentage++;
                progress.style.width = currentPercentage + '%';
                if (percentageSpan) {
                    percentageSpan.textContent = currentPercentage + '%';
                }
            } else {
                clearInterval(interval);
            }
        }, 10);
    });

    // GSAP animation for projects
    if (typeof gsap !== "undefined") {
        gsap.from(".project-box", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.3,
            ease: "power1.out",
        });

        // GSAP hover effects for project boxes
        document.querySelectorAll(".project-box").forEach(box => {
            box.addEventListener("mouseenter", () => {
                gsap.to(box, { scale: 1.05, duration: 0.3, ease: "power1.inOut" });
            });

            box.addEventListener("mouseleave", () => {
                gsap.to(box, { scale: 1, duration: 0.3, ease: "power1.inOut" });
            });
        });
    }

    // Contact form submission
    const contactForm = document.querySelector("#contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const firstName = document.querySelector("input[name='first-name']").value.trim();
            const lastName = document.querySelector("input[name='last-name']").value.trim();
            const email = document.querySelector("input[name='email']").value.trim();
            const phone = document.querySelector("input[name='phone']").value.trim();
            const subject = document.querySelector("input[name='subject']").value.trim();
            const message = document.querySelector("textarea[name='message']").value.trim();
            const submitButton = document.querySelector(".btn-submit");
            const statusMessage = document.getElementById("status-message");

            // Reset status message
            statusMessage.innerText = "";
            statusMessage.style.color = "";

            // Validation
            if (!firstName || !lastName || !email || !phone || !subject || !message) {
                statusMessage.innerText = "Please fill in all fields.";
                statusMessage.style.color = "red";
                return;
            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                statusMessage.innerText = "Invalid email format.";
                statusMessage.style.color = "red";
                return;
            }

            if (!/^\d{10,15}$/.test(phone)) {
                statusMessage.innerText = "Invalid phone number.";
                statusMessage.style.color = "red";
                return;
            }

            // Disable button to prevent multiple submissions
            submitButton.disabled = true;
            submitButton.innerText = "Sending...";

            // Prepare form data
            let formData = new FormData(this);

            try {
                let response = await fetch("send-email.php", {
                    method: "POST",
                    body: formData
                });

                let result = await response.json();
                statusMessage.innerText = result.message;
                statusMessage.style.color = result.success ? "green" : "red";

                if (result.success) this.reset();
            } catch (error) {
                statusMessage.innerText = "Error sending message. Try again later.";
                statusMessage.style.color = "red";
            }

            // Re-enable button
            submitButton.disabled = false;
            submitButton.innerText = "Send Message";
        });
    }
});

document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const message = document.getElementById("subscribe-message");
    message.innerText = "Coming Soon!";
    message.style.display = "block";

    setTimeout(() => {
        message.style.display = "none";
    }, 3000); // Hide message after 3 seconds
});