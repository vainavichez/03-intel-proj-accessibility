const bootstrapStylesheet = document.getElementById("bootstrap-stylesheet");

function updateDirection(language) {
  const isArabic = language === "ar";

  document.documentElement.lang = isArabic ? "ar" : "en";
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  bootstrapStylesheet.href = isArabic
    ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
    : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
}

function connectGoogleTranslate() {
  const googleLanguageSelector = document.querySelector(".goog-te-combo");

  if (!googleLanguageSelector) {
    return false;
  }

  googleLanguageSelector.addEventListener("change", (event) => {
    updateDirection(event.target.value || "en");
  });

  updateDirection(googleLanguageSelector.value || "en");
  return true;
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ar",
      autoDisplay: false
    },
    "google_translate_element"
  );

  const translateContainer = document.getElementById("google_translate_element");
  const translateObserver = new MutationObserver(() => {
    if (connectGoogleTranslate()) {
      translateObserver.disconnect();
    }
  });

  translateObserver.observe(translateContainer, {
    childList: true,
    subtree: true
  });

  connectGoogleTranslate();
}

window.googleTranslateElementInit = googleTranslateElementInit;
