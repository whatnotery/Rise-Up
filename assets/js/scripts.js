const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const menuButton = document.getElementById("menuButton");
const closeButton = document.getElementById("closeSidebar");
const overlay = document.getElementById("overlay");
const isHomepage = document.body.dataset.isHomepage === "true";

function openSidebar() {
  sidebar.classList.remove("-translate-x-full");
  sidebar.classList.remove("hidden");
  main.classList.add("hidden");
  if (overlay) overlay.classList.remove("hidden");
  if (menuButton) menuButton.classList.add("hidden");
  if (closeButton) closeButton.classList.remove("hidden");
}

function closeSidebar() {
  sidebar.classList.add("-translate-x-full");
  sidebar.classList.add("hidden");
  main.classList.remove("hidden");
  if (overlay) overlay.classList.add("hidden");
  if (menuButton) menuButton.classList.remove("hidden");
  if (closeButton) closeButton.classList.add("hidden");
}

if (isHomepage && window.innerWidth < 768) openSidebar();
if (window.innerWidth > 768) closeSidebar();
if (closeButton) closeButton.classList.add("hidden");

if (menuButton) menuButton.addEventListener("click", openSidebar);
if (closeButton) closeButton.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeSidebar();
  }
  if (window.innerWidth <= 768 && isHomepage) {
    openSidebar();
  }
});
