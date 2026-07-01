/* ================================
   ÉLYSÉE USER DASHBOARD JS
================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       SIDEBAR ACTIVE STATE
    ================================= */
    const menuItems = document.querySelectorAll(".menu li");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {

            // Remove active from all
            menuItems.forEach(i => i.classList.remove("active"));

            // Add active to clicked
            item.classList.add("active");

        });
    });

    /* ================================
       CARD HOVER EFFECT (soft glow)
    ================================= */
    const cards = document.querySelectorAll(".card, .villa-card, .box");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 0 25px rgba(201,169,98,0.15)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "none";
        });
    });

    /* ================================
       SMOOTH SCROLL (future sections)
    ================================= */
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

});


const menuItems = document.querySelectorAll(".menu li[data-target]");
const pages = document.querySelectorAll(".page");

// ================= SWITCH PAGE =================
menuItems.forEach(item => {
  item.addEventListener("click", () => {

    // remove active menu
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const target = item.dataset.target;

    // hide all pages
    pages.forEach(p => p.classList.remove("active"));

    // show selected page
    document.getElementById(target).classList.add("active");
  });
});

// ================= LOGOUT =================
document.querySelector(".logout").addEventListener("click", () => {
  window.location.href = "index.html";
});

// ====================================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".sidebar-overlay");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");

    document.body.classList.toggle("no-scroll");
    document.documentElement.classList.toggle("no-scroll");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");

    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
});

// =======================================
const passwordInput = document.getElementById("adminPassword");
const passwordError = document.getElementById("passwordError");

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/~`])[A-Za-z\d@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/~`]{8,}$/;

passwordInput.addEventListener("input", () => {

    if(passwordInput.value === ""){
        passwordError.textContent = "";
        passwordInput.classList.remove("valid","invalid");
        return;
    }

    if(passwordRegex.test(passwordInput.value)){
        passwordError.textContent = "✓ Strong password";
        passwordError.style.color = "#32cd32";
        passwordInput.classList.add("valid");
        passwordInput.classList.remove("invalid");
    }else{
        passwordError.textContent =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
        passwordError.style.color = "#ff4d4d";
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");
    }
});