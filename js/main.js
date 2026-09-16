const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const yearSpan = document.getElementById("year");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
