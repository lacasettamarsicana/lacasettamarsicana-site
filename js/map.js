const loadMapButton = document.getElementById("loadMap");
const mapConsent = document.getElementById("mapConsent");

if (loadMapButton && mapConsent) {
  loadMapButton.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.className = "map-frame";
    iframe.title = "Mappa di La Casetta Marsicana";
    iframe.src = "https://www.google.com/maps?q=42.0060278%2C13.2759722&z=18&output=embed";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;

    mapConsent.replaceWith(iframe);
  });
}
