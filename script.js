document.addEventListener("DOMContentLoaded", () => {
    // Skill bar animation
    const progressBars = document.querySelectorAll('.skill');
    
    progressBars.forEach(skill => {
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
    gsap.from(".project-box", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.3,
        ease: "power1.out",
    });

    // GSAP hover effects for all project boxes
    document.querySelectorAll(".project-box").forEach(box => {
        box.addEventListener("mouseenter", () => {
            gsap.to(box, { scale: 1.05, duration: 0.3, ease: "power1.inOut" });
        });

        box.addEventListener("mouseleave", () => {
            gsap.to(box, { scale: 1, duration: 0.3, ease: "power1.inOut" });
        });
    });
});

// Function to display project details on click
function showDetails(project) {
    alert(`You clicked on ${project}. More details coming soon!`);
}


document.querySelector("#contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.querySelector("input[name='first-name']").value.trim();
    const lastName = document.querySelector("input[name='last-name']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const phone = document.querySelector("input[name='phone']").value.trim();
    const message = document.querySelector("textarea[name='message']").value.trim();

    if (!firstName || !lastName || !email || !phone || !message) {
        alert("Please fill in all fields.");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Invalid email format.");
        return;
    }

    if (!/^\d{10,15}$/.test(phone)) {
        alert("Invalid phone number.");
        return;
    }

    alert("Message sent successfully!");
    this.reset();
});
