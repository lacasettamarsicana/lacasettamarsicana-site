const galleryTrack = document.getElementById("galleryTrack");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
// Per aggiungere nuove foto, aggiorna soltanto questo totale.
const galleryPhotoCount = 66;
const galleryLocale = (document.documentElement.lang || "it").split("-")[0].toLowerCase();
const galleryTranslations = {
  it: { open: n => `Apri foto ${n}`, alt: n => `Foto ${n} della Casetta Marsicana` },
  en: { open: n => `Open photo ${n}`, alt: n => `Photo ${n} of La Casetta Marsicana` },
  de: { open: n => `Foto ${n} öffnen`, alt: n => `Foto ${n} von La Casetta Marsicana` },
  es: { open: n => `Abrir foto ${n}`, alt: n => `Foto ${n} de La Casetta Marsicana` },
  fr: { open: n => `Ouvrir la photo ${n}`, alt: n => `Photo ${n} de La Casetta Marsicana` }
};
const galleryLabels = galleryTranslations[galleryLocale] || galleryTranslations.it;

// Le prime quattro immagini sono gia presenti nell'HTML anche senza JavaScript.
// Le altre sono create qui, per tutte e cinque le lingue, con caricamento differito.
if (galleryTrack) {
  const newPhotos = document.createDocumentFragment();
  for (let number = 5; number <= galleryPhotoCount; number++) {
    const item = document.createElement("button");
    item.className = "gallery-item";
    item.type = "button";
    item.dataset.galleryIndex = String(number - 1);
    item.setAttribute("aria-label", galleryLabels.open(number));

    const photo = document.createElement("img");
    photo.src = `/images/gallery-${String(number).padStart(2, "0")}.webp`;
    photo.alt = galleryLabels.alt(number);
    photo.loading = "lazy";
    photo.decoding = "async";
    item.appendChild(photo);
    newPhotos.appendChild(item);
  }
  galleryTrack.appendChild(newPhotos);
}

const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxBackdrop = document.getElementById("lightboxBackdrop");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentIndex = 0;
let touchStartX = 0;

function scrollGallery(direction) {
  if (!galleryTrack) return;
  const amount = galleryTrack.clientWidth * 0.82;
  galleryTrack.scrollBy({ left: direction * amount, behavior: "smooth" });
}

if (galleryPrev) {
  galleryPrev.addEventListener("click", () => scrollGallery(-1));
}

if (galleryNext) {
  galleryNext.addEventListener("click", () => scrollGallery(1));
}

function showLightboxImage(index) {
  if (!galleryItems.length || !lightboxImage) return;

  currentIndex = (index + galleryItems.length) % galleryItems.length;
  const sourceImage = galleryItems[currentIndex].querySelector("img");

  lightboxImage.src = sourceImage.src;
  lightboxImage.alt = sourceImage.alt;

  if (lightboxCaption) {
    lightboxCaption.textContent = sourceImage.alt;
  }

  if (lightboxCounter) {
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
  }
}

function openLightbox(index) {
  if (!lightbox) return;
  showLightboxImage(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
}

function changeLightboxImage(direction) {
  showLightboxImage(currentIndex + direction);
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxBackdrop?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => changeLightboxImage(-1));
lightboxNext?.addEventListener("click", () => changeLightboxImage(1));

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") changeLightboxImage(-1);
  if (event.key === "ArrowRight") changeLightboxImage(1);
});

lightboxImage?.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

lightboxImage?.addEventListener("touchend", (event) => {
  const deltaX = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(deltaX) < 45) return;
  changeLightboxImage(deltaX > 0 ? -1 : 1);
}, { passive: true });
