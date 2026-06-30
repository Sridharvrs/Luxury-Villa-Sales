let currentUser = null;

// LOAD MODAL INTO ALL PAGES
fetch("auth/auth.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
    initAuth();
  });

function initAuth() {

  const modal = document.getElementById("authModal");

  // ================= OPEN MODAL =================
  window.openAuth = () => {
    modal.classList.remove("hidden");
  };

  // ================= CLOSE MODAL =================
  document.getElementById("authClose").onclick = () => {
    modal.classList.add("hidden");
  };

  // ================= TAB SWITCH =================
  document.querySelectorAll(".tab").forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    };
  });

  // ================= PASSWORD VALIDATION =================
  function validatePassword(p) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(p);
  }

  function bindHint(inputId, hintId) {
    const input = document.getElementById(inputId);
    const hint = document.getElementById(hintId);

    if (!input || !hint) return;

    input.addEventListener("input", () => {
      if (validatePassword(input.value)) {
        hint.textContent = "Strong password ✔";
        hint.style.color = "lightgreen";
      } else {
        hint.textContent = "Min 8 chars + number + symbol";
        hint.style.color = "#ff4d4d";
      }
    });
  }

  bindHint("loginPassword", "loginHint");
  bindHint("signupPassword", "signupHint");

  // ================= EYE TOGGLE =================
  document.querySelectorAll(".eye").forEach(eye => {
    eye.addEventListener("click", () => {
      const input = document.getElementById(eye.dataset.eye);
      if (!input) return;

      input.type = input.type === "password" ? "text" : "password";
    });
  });

  // ================= SIGNUP (OPTIONAL / FAKE) =================
  document.querySelector("#signup .btn-auth").addEventListener("click", () => {

    const hint = document.getElementById("signupHint");

    hint.style.color = "lightgreen";
    hint.textContent = "Signup not required. You can login directly.";

    document.querySelector('[data-tab="login"]').click();
  });

  // ================= LOGIN (OPEN ACCESS SYSTEM) =================
  document.getElementById("loginBtn").addEventListener("click", () => {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const role = document.getElementById("loginRole").value;
    const hint = document.getElementById("loginHint");

    if (!email || !password) {
      hint.textContent = "Please enter email and password";
      hint.style.color = "#ff4d4d";
      return;
    }

    // CREATE FAKE SESSION (NO VALIDATION)
    currentUser = {
      email,
      role,
      name: email.split("@")[0] || "User"
    };

    hint.style.color = "lightgreen";
    hint.textContent = "Login successful! Redirecting...";

    // close modal before redirect
    modal.classList.add("hidden");

    setTimeout(() => {
      window.location.href =
        role === "admin"
          ? "admin-dashboard.html"
          : "user-dashboard.html";
    }, 500);
  });
}