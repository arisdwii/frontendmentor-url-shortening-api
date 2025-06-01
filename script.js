// === DOM Element References ===
const menuToggleBtn = document.querySelector(".menu-toggle-btn");
const siteNav = document.querySelector(".site-nav");
const shortenerForm = document.querySelector(".shortener-form");
const shortenerInput = document.querySelector(".shortener-input");
const shortenerMsg = document.querySelector(".shortener-message");
const shortenerResults = document.querySelector(".shortener-results");

// === Toggle Mobile Navigation Menu ===
menuToggleBtn.addEventListener("click", () => {
  menuToggleBtn.classList.toggle("active");
  siteNav.classList.toggle("open");
  document.body.classList.toggle("overhide");
});

// === Close Menu When Clicking Outside ===
document.addEventListener("click", (e) => {
  const isClickInsideNav = siteNav.contains(e.target);
  const isClickToggleBtn = menuToggleBtn.contains(e.target);

  if (!isClickInsideNav && !isClickToggleBtn) {
    menuToggleBtn.classList.remove("active");
    siteNav.classList.remove("open");
    document.body.classList.remove("overhide");
  }
});

// === Remove Error State While Typing ===
shortenerInput.addEventListener("input", () => {
  shortenerMsg.textContent = "";
  shortenerForm.classList.remove("error");
});

// === Handle Form Submission ===
shortenerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const originalUrl = shortenerInput.value.trim().toLowerCase();

  if (!originalUrl) {
    shortenerMsg.textContent = "Please add a link";
    shortenerForm.classList.add("error");
    return;
  }

  const shortened = await shortenUrl(originalUrl);

  if (shortened) {
    renderResult(originalUrl, shortened);
    shortenerInput.value = "";
  }
});

// === API Request to CleanURI ===
async function shortenUrl(originalUrl) {
  try {
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ url: originalUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.result_url;
  } catch (error) {
    console.error("Error shortening URL:", error);
    return null;
  }
}

// === Render the Result to the DOM ===
function renderResult(originalUrl, shortenedUrl) {
  const wrapper = document.createElement("div");
  wrapper.className = "shortener-result";

  wrapper.innerHTML = `
      <a href="${originalUrl}" class="link-original">${originalUrl}</a>

      <div class="link-output">
        <input type="text" class="link-short" value="${shortenedUrl}" readonly>
        <button class="btn-copy">Copy</button>
      </div>`;

  shortenerResults.prepend(wrapper);

  const btnCopy = wrapper.querySelector(".btn-copy");
  const input = wrapper.querySelector(".link-short");

  // === Handle Copy Button Click ===
  btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(input.value).then(() => {
      btnCopy.textContent = "Copied!";
      btnCopy.classList.add("copied");

      setTimeout(() => {
        btnCopy.textContent = "Copy";
        btnCopy.classList.remove("copied");
      }, 2000);
    });
  });
}
