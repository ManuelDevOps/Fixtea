const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
    const syncNav = () => {
        if (window.innerWidth <= 850 && menuButton.getAttribute("aria-expanded") !== "true") nav.hidden = true;
        else if (window.innerWidth > 850) nav.hidden = false;
    };
    syncNav();
    window.addEventListener("resize", syncNav);
    menuButton.addEventListener("click", () => {
        const open = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!open));
        nav.hidden = open;
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && window.innerWidth <= 850 && !nav.hidden) {
            menuButton.setAttribute("aria-expanded", "false");
            nav.hidden = true;
            menuButton.focus();
        }
    });
}
const fab = document.querySelector(".a11y-fab");
const panel = document.querySelector(".a11y-panel");
const closeA11y = document.querySelector(".a11y-close");
let scale = 1;
function setPanel(open) {
    if (!panel || !fab) return;
    panel.hidden = !open;
    fab.setAttribute("aria-expanded", String(open));
    if (open) closeA11y?.focus();
    else fab.focus();
}
fab?.addEventListener("click", () => setPanel(panel.hidden));
closeA11y?.addEventListener("click", () => setPanel(false));
document.querySelector('[data-a11y="plus"]')?.addEventListener("click", () => {
    scale = Math.min(1.25, scale + 0.1);
    document.documentElement.style.setProperty("--scale", scale);
});
document.querySelector('[data-a11y="minus"]')?.addEventListener("click", () => {
    scale = Math.max(0.9, scale - 0.1);
    document.documentElement.style.setProperty("--scale", scale);
});
document
.querySelector('[data-a11y="contrast"]')
?.addEventListener("click", () => document.body.classList.toggle("high-contrast"));
document
.querySelector('[data-a11y="links"]')
?.addEventListener("click", () => document.body.classList.toggle("underline-links"));
document.querySelector('[data-a11y="reset"]')?.addEventListener("click", () => {
    scale = 1;
    document.documentElement.style.setProperty("--scale", 1);
    document.body.classList.remove("high-contrast", "underline-links");
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && !panel.hidden) setPanel(false);
});
const contactForm = document.querySelector("[data-contact-form]");
contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(`Consulta web: ${data.get("service")}`);
    const body = encodeURIComponent(
        `Nombre: ${data.get("name")}\nTeléfono: ${data.get("phone")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:info@fixitea.com?subject=${subject}&body=${body}`;
});
const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=C.%20Padre%20%C3%81lvarez%2030%2C%2021400%20Ayamonte%2C%20Huelva";
const mapsEmbed =
    "https://www.google.com/maps?q=C.%20Padre%20%C3%81lvarez%2030%2C%2021400%20Ayamonte%2C%20Huelva&output=embed";
document.querySelectorAll(".map-art").forEach((placeholder) => {
    placeholder.outerHTML = `<div class="map-preview"><iframe src="${mapsEmbed}" title="Mapa de FIXITEA en C. Padre Álvarez, 30, Ayamonte" loading="lazy" tabindex="-1" aria-hidden="true"></iframe><a class="map-preview-link" href="${mapsUrl}" target="_blank" rel="noopener" aria-label="Abrir la ubicación de FIXITEA en Google Maps"></a></div>`;
});
const contactTitle = document.querySelector(".page-hero h1");
if (contactTitle?.textContent.includes("Contacto")) {
    const titleRow = document.createElement("div");
    titleRow.className = "contact-title-row";
    const phone = document.createElement("a");
    phone.className = "contact-hero-phone";
    phone.href = "tel:+34662138031";
    phone.innerHTML = "<small>Llámanos</small><strong>662 13 80 31</strong>";
    contactTitle.before(titleRow);
    titleRow.append(contactTitle, phone);
}
