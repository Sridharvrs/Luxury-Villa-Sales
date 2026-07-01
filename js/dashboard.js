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


// ======================== 
const menusItem = document.querySelectorAll(".menu li");

menusItem.forEach(item => {
    item.addEventListener("click", () => {

        menusItem.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        item.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
        });

    });
});