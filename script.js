const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const quoteForm = document.querySelector("[data-quote-form]");
const statusMessage = document.querySelector("[data-form-status]");
const phoneNumber = "61414612749";

function buildWhatsAppUrl(message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function setInvalid(field, isInvalid) {
  const row = field.closest(".form-row");
  if (row) row.classList.toggle("is-invalid", isInvalid);
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const invalid = !field.value.trim();
    setInvalid(field, invalid);
    if (invalid) isValid = false;
  });
  return isValid;
}

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }
});

quoteForm.addEventListener("input", (event) => {
  if (event.target.matches("input, select, textarea")) setInvalid(event.target, false);
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateForm(quoteForm)) {
    statusMessage.textContent = "Please complete the required fields.";
    return;
  }

  const formData = new FormData(quoteForm);
  const message = [
    "Hello E&J Carpet Cleaning, I'd like to request a quote.",
    `Name: ${formData.get("name").trim()}`,
    `Contact: ${formData.get("phone").trim()}`,
    `Service: ${formData.get("service").trim()}`,
    formData.get("message").trim() ? `Message: ${formData.get("message").trim()}` : "",
  ].filter(Boolean).join("\n");

  statusMessage.textContent = "Opening WhatsApp with your quote request.";
  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
});
