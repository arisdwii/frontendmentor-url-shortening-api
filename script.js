const menuToggleBtn = document.querySelector(".menu-toggle-btn");
const siteNav = document.querySelector(".site-nav");

menuToggleBtn.addEventListener("click", () => {
  menuToggleBtn.classList.toggle("active");
  siteNav.classList.toggle("open");
  document.body.classList.toggle("overhide");
});

document.addEventListener("click", (e) => {
  const isClickInsideNav = siteNav.contains(e.target);
  const isClickToggleBtn = menuToggleBtn.contains(e.target);

  if (!isClickInsideNav && !isClickToggleBtn) {
    menuToggleBtn.classList.remove("active");
    siteNav.classList.remove("open");
    document.body.classList.remove("overhide");
  }
});
