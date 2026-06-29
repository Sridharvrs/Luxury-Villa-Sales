// LOAD MODAL INTO ALL PAGES
fetch("auth/auth.html")
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);
    initAuth();
  });

function initAuth(){

  const modal = document.getElementById("authModal");

  // OPEN GLOBAL FUNCTION
  window.openAuth = () => {
    modal.classList.remove("hidden");
  };

  // CLOSE
  document.getElementById("authClose").onclick = () => {
    modal.classList.add("hidden");
  };

  // TAB SWITCH
  document.querySelectorAll(".tab").forEach(tab=>{
    tab.onclick = () => {

      document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
      document.querySelectorAll(".auth-form").forEach(f=>f.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    };
  });

  // PASSWORD VALIDATION
  function validate(p){
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(p);
  }

  function bindHint(inputId, hintId){
    const input = document.getElementById(inputId);
    const hint = document.getElementById(hintId);

    input?.addEventListener("input", () => {
      if(validate(input.value)){
        hint.textContent = "Strong password ✔";
        hint.style.color = "lightgreen";
      } else {
        hint.textContent = "Min 8 chars + number + symbol";
        hint.style.color = "#ff4d4d";
      }
    });
  }

  bindHint("loginPassword","loginHint");
  bindHint("signupPassword","signupHint");

  // EYE TOGGLE
  document.querySelectorAll(".eye").forEach(eye=>{
    eye.onclick = () => {
      const input = document.getElementById(eye.dataset.eye);
      input.type = input.type === "password" ? "text" : "password";
    };
  });
}