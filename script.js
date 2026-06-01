const BUSINESS_WHATSAPP_NUMBER = "";
const defaultWhatsAppMessage =
  "Hello E&J Carpet Cleaning, I'd like to request a quote.";

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const quoteForm = document.querySelector("[data-quote-form]");
const statusMessage = document.querySelector("[data-form-status]");
const whatsAppLinks = document.querySelectorAll("[data-whatsapp-link]");

function buildWhatsAppUrl(message) {
  const base = BUSINESS_WHATSAPP_NUMBER
    ? `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}`
    : "https://wa.me/";

  return `${base}?text=${encodeURIComponent(message)}`;
}

function updateWhatsAppLinks(message = defaultWhatsAppMessage) {
  whatsAppLinks.forEach((link) => {
    link.href = buildWhatsAppUrl(message);
  });
}

function setInvalid(field, isInvalid) {
  const row = field.closest(".form-row");
  if (!row) return;
  row.classList.toggle("is-invalid", isInvalid);
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    const invalid = !field.value.trim();
    setInvalid(field, invalid);
    if (invalid) isValid = false;
  });

  return isValid;
}

year.textContent = new Date().getFullYear();
updateWhatsAppLinks();

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
  if (event.target.matches("input, select, textarea")) {
    setInvalid(event.target, false);
  }
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm(quoteForm)) {
    statusMessage.textContent = "Please complete the required fields.";
    return;
  }

  const formData = new FormData(quoteForm);
  const name = formData.get("name").trim();
  const contact = formData.get("phone").trim();
  const service = formData.get("service").trim();
  const message = formData.get("message").trim();

  const whatsAppMessage = [
    "Hello E&J Carpet Cleaning, I'd like to request a quote.",
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Service: ${service}`,
    message ? `Message: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  statusMessage.textContent = "Opening WhatsApp with your quote request.";
  window.open(buildWhatsAppUrl(whatsAppMessage), "_blank", "noopener");
});
