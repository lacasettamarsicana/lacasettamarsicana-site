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
conversionStyles.href = "/css/conversion.css?v=20260917-2";
document.head.appendChild(conversionStyles);

const currentLanguage = document.documentElement.lang.toLowerCase();
const isEnglish = currentLanguage.startsWith("en");
const isGerman = currentLanguage.startsWith("de");

const contactSection = document.getElementById("contatti");

if (contactSection) {
  const contactPanel = contactSection.querySelector(".contact-panel");
  const contactIntro = contactPanel?.children?.[0];
  const contactBox = contactSection.querySelector(".contact-box");

  if (contactIntro) {
    const introParagraph = contactIntro.querySelector("p:not(.eyebrow)");
    if (introParagraph) {
      introParagraph.textContent = isGerman
        ? "Wissen Sie schon, wann Sie nach Cappadocia kommen möchten? Schreiben Sie uns Ihre gewünschten Reisedaten – wir antworten Ihnen mit Informationen zur Verfügbarkeit und allem Wichtigen für die Planung Ihres Aufenthalts."
        : isEnglish
        ? "Already know when you would like to visit Cappadocia? Send us your preferred dates and we will reply with availability and useful information to plan your stay."
        : "Hai già in mente quando venire a Cappadocia? Scrivici le date che ti interessano e ti risponderemo con disponibilità e informazioni utili per organizzare il soggiorno.";
    }

    if (!contactIntro.querySelector(".contact-highlights")) {
      const highlights = document.createElement("ul");
      highlights.className = "contact-highlights";
      highlights.innerHTML = isGerman
        ? `
        <li>Direkter Kontakt mit der Unterkunft</li>
        <li>Haustiere willkommen</li>
        <li>Shuttle vom/zum Bahnhof Tagliacozzo auf Anfrage</li>
      `
        : isEnglish
        ? `
        <li>Direct contact with the property manager</li>
        <li>Pet friendly</li>
        <li>Shuttle to/from Tagliacozzo railway station on request</li>
      `
        : `
        <li>Contatto diretto con la gestione</li>
        <li>Pet friendly</li>
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
      title.textContent = isGerman
        ? "Verfügbarkeit anfragen"
        : isEnglish
        ? "Check availability"
        : "Chiedi disponibilità";
      contactBox.prepend(title);
    }

    if (textParagraph) {
      textParagraph.textContent = isGerman
        ? "Damit wir Ihnen schneller antworten können, nennen Sie bitte die Reisedaten, die Anzahl der Gäste und ob Sie mit einem Haustier reisen."
        : isEnglish
        ? "To help us reply more quickly, please include your dates, number of guests and whether you are travelling with a pet."
        : "Per aiutarci a risponderti più velocemente, indica le date, il numero di ospiti e se viaggi con un animale.";
    }

    if (ctaButton) {
      const subject = encodeURIComponent(
        isGerman
          ? "Verfügbarkeitsanfrage - La Casetta Marsicana"
          : isEnglish
          ? "Availability request - La Casetta Marsicana"
          : "Richiesta disponibilità - La Casetta Marsicana"
      );

      const body = encodeURIComponent(
        isGerman
          ? "Hallo, ich möchte die Verfügbarkeit der La Casetta Marsicana anfragen.\n\nGewünschte Reisedaten: \nAnzahl der Gäste: \nHaustier dabei: ja / nein\n\nWeitere Informationen: "
          : isEnglish
          ? "Hello, I would like to check availability at La Casetta Marsicana.\n\nPreferred dates: \nNumber of guests: \nTravelling with a pet: yes / no\n\nAdditional information: "
          : "Ciao, vorrei chiedere la disponibilità de La Casetta Marsicana.\n\nDate di interesse: \nNumero di ospiti: \nAnimale al seguito: sì / no\n\nAltre informazioni: "
      );

      ctaButton.href = `mailto:info@lacasettamarsicana.it?subject=${subject}&body=${body}`;
      ctaButton.textContent = isGerman
        ? "Verfügbarkeit per E-Mail anfragen"
        : isEnglish
        ? "Check availability by email"
        : "Chiedi disponibilità via email";
    }

    if (emailLink) {
      emailLink.setAttribute(
        "aria-label",
        isGerman
          ? "E-Mail an info@lacasettamarsicana.it"
          : isEnglish
          ? "Email info@lacasettamarsicana.it"
          : "Scrivi a info@lacasettamarsicana.it"
      );
    }

    if (!contactBox.querySelector(".contact-microcopy")) {
      const note = document.createElement("small");
      note.className = "contact-microcopy";
      note.textContent = isGerman
        ? "Die Schaltfläche öffnet Ihr E-Mail-Programm mit einer bereits ausgefüllten Anfrage."
        : isEnglish
        ? "The button opens your email app with a pre-filled request."
        : "Il pulsante apre il tuo programma di posta con una richiesta già impostata.";
      contactBox.appendChild(note);
    }
  }
}

// Registration identifiers: shown publicly in the footer and added to the structured data.
const registrationCodes = {
  cin: "IT066023C266DNPV6T",
  cir: "066023CVP0021"
};

const footerMeta = document.querySelector(".footer-meta");

if (footerMeta && !footerMeta.querySelector(".registration-codes")) {
  const codes = document.createElement("p");
  codes.className = "registration-codes";
  codes.innerHTML = `
    <span><strong>CIN</strong> ${registrationCodes.cin}</span>
    <span><strong>CIR</strong> ${registrationCodes.cir}</span>
  `;
  const footerLinks = footerMeta.querySelector(".footer-links");
  footerMeta.insertBefore(codes, footerLinks || null);
}

const structuredData = document.querySelector('script[type="application/ld+json"]');

if (structuredData) {
  try {
    const data = JSON.parse(structuredData.textContent);
    data.identifier = [
      {
        "@type": "PropertyValue",
        "propertyID": "CIN",
        "value": registrationCodes.cin
      },
      {
        "@type": "PropertyValue",
        "propertyID": "CIR",
        "value": registrationCodes.cir
      }
    ];
    structuredData.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    console.warn("Unable to update structured data with CIN and CIR.", error);
  }
}
