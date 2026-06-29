// ===============================
// CONTACT PAGE SCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // FORM VALIDATION
    const form = document.getElementById("contactForm");
    const msg = document.getElementById("formMsg");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            msg.textContent = "Please fill all required fields";
            msg.style.color = "red";
            return;
        }

        msg.textContent = "Message sent successfully!";
        msg.style.color = "green";

        form.reset();

        setTimeout(() => {
            msg.textContent = "";
        }, 3000);
    });

    // FAQ ACCORDION
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });

});