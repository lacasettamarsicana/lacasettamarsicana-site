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

// Conversion layer: keeps the static HTML simple while improving the contact flow.
const conversionStyles = document.createElement("link");
conversionStyles.rel = "stylesheet";
conversionStyles.href = "./css/conversion.css?v=20260917-1";
document.head.appendChild(conversionStyles);

const contactSection = document.getElementById("contatti");

if (contactSection) {
  const contactPanel = contactSection.querySelector(".contact-panel");
  const contactIntro = contactPanel?.children?.[0];
  const contactBox = contactSection.querySelector(".contact-box");

  if (contactIntro) {
    const introParagraph = contactIntro.querySelector("p:not(.eyebrow)");
    if (introParagraph) {
      introParagraph.textContent =
        "Hai già in mente quando venire a Cappadocia? Scrivici le date che ti interessano e ti risponderemo con disponibilità e informazioni utili per organizzare il soggiorno.";
    }

    if (!contactIntro.querySelector(".contact-highlights")) {
      const highlights = document.createElement("ul");
      highlights.className = "contact-highlights";
      highlights.innerHTML = `
        <li>Contatto diretto con la gestione</li>
        <li>Pet friendly e LGBTQ+ friendly</li>
        <li>Navetta da/per la Stazione di Tagliacozzo su richiesta</li>
      `;
      contactIntro.appendChild(highlights);
    }
  }

  if (contactBox) {
    const emailLink = contactBox.querySelector('a[href^="mailto:"]:not(.btn)');
    const textParagraph = contactBox.querySelector("p");
    const ctaButton = contactBox.querySelector(".btn");

    if (!contactBox.querySelector(".contact-box-title")) {
      const title = document.createElement("h3");
      title.className = "contact-box-title";
      title.textContent = "Chiedi disponibilità";
      contactBox.prepend(title);
    }

    if (textParagraph) {
      textParagraph.textContent =
        "Per aiutarci a risponderti più velocemente, indica le date, il numero di ospiti e se viaggi con un animale.";
    }

    if (ctaButton) {
      const subject = encodeURIComponent("Richiesta disponibilità - La Casetta Marsicana");
      const body = encodeURIComponent(
        "Ciao, vorrei chiedere la disponibilità de La Casetta Marsicana.\n\nDate di interesse: \nNumero di ospiti: \nAnimale al seguito: sì / no\n\nAltre informazioni: "
      );
      ctaButton.href = `mailto:info@lacasettamarsicana.it?subject=${subject}&body=${body}`;
      ctaButton.textContent = "Chiedi disponibilità via email";
    }

    if (emailLink) {
      emailLink.setAttribute("aria-label", "Scrivi a info@lacasettamarsicana.it");
    }

    if (!contactBox.querySelector(".contact-microcopy")) {
      const note = document.createElement("small");
      note.className = "contact-microcopy";
      note.textContent = "Il pulsante apre il tuo programma di posta con una richiesta già impostata.";
      contactBox.appendChild(note);
    }
  }
}
