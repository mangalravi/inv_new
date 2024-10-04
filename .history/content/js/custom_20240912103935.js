document.addEventListener("DOMContentLoaded", () => {
  checkCookieConsent();
  applyStoredTheme();
  applyStoredFontSizes();
  handleResponsiveStyles();
  window.addEventListener('resize', handleResponsiveStyles);
});

function handleResponsiveStyles() {
  const viewportWidth = window.innerWidth;
  const theme = getCookie("theme") || defaultTheme;

  // Remove previously loaded responsive CSS files
  document.querySelectorAll('link[data-responsive]').forEach(link => link.remove());
  
  // Load responsive CSS based on viewport width
  if (viewportWidth < 768) {
      loadCSS('content/css/Responsive-Mobile.css');
  } else if (viewportWidth >= 768 && viewportWidth <= 991) {
      loadCSS('content/css/Responsive-Desktop.css');
  }

  // Always load custom CSS
  loadCSS('content/css/custom.css');

  // Load theme CSS
  if (theme === 'theme-dark') {
      loadCSS('content/css/Dark-Theme.css');
  } else if (theme === 'theme-high-contrast') {
      loadCSS('content/css/High-Contrast.css');
  }
}

function loadCSS(href) {
  let link = document.querySelector(`link[href="${href}"]`);
  if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.dataset.responsive = true; // Mark it for removal on resize
      document.head.appendChild(link);
  }
}

function changeTheme(themeClass, buttonElement) {
  if (isOverlayVisible()) return;

  document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.classList.remove("activetheme");
  });

  document.body.className.split(" ").forEach(cls => {
      if (cls.startsWith("theme-") || cls === "activetheme") {
          document.body.classList.remove(cls);
      }
  });

  document.body.classList.add(themeClass);
  buttonElement.classList.add("activetheme");

  setCookie("theme", themeClass, 30);
  handleResponsiveStyles(); // Reload styles with new theme
}

function checkCookieConsent() {
  let cookieConsent = getCookie("cookieConsent");
  if (cookieConsent !== "accepted" && cookieConsent !== "rejected") {
      document.getElementById("cookieConsent").style.display = "block";
      document.getElementById("overlay").style.display = "block";
  } else {
      document.getElementById("cookieConsent").style.display = "none";
      document.getElementById("overlay").style.display = "none";
  }
}

function applyStoredTheme() {
  let theme = getCookie("theme");
  if (theme) {
      document.body.classList.add(theme);
      document.querySelector(`.theme-btn[data-theme="${theme}"]`).classList.add("activetheme");
  } else {
      document.body.classList.add(defaultTheme);
      let defaultThemeButton = document.querySelector(`.theme-btn[data-theme="${defaultTheme}"]`);
      if (defaultThemeButton) {
          defaultThemeButton.classList.add("activetheme");
      }
  }
  handleResponsiveStyles(); // Reload styles with stored theme
}

function applyStoredFontSizes() {
  document.querySelectorAll(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara").forEach((element) => {
      let storedSize = localStorage.getItem(getElementStorageKey(element));
      if (storedSize) {
          element.style.fontSize = storedSize + "px";
      } else {
          let computedSize = getFontSize(element);
          localStorage.setItem(getElementStorageKey(element) + "-originalSize", computedSize);
          element.style.fontSize = computedSize + "px";
      }
  });
}

function getElementStorageKey(element) {
  let className = element.className.split(" ").find((cls) => cls); // Get the first class name
  return className;
}

function isOverlayVisible() {
  return document.getElementById("overlay").style.display === "block";
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
