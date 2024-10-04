document.addEventListener("DOMContentLoaded", () => {
  // Initialize cookie consent, theme, and font sizes
  checkCookieConsent();
  applyStoredTheme();
  applyStoredFontSizes();
  handleResponsiveStyles();
  window.addEventListener('resize', handleResponsiveStyles);

  // Add event listeners for buttons
  document.getElementById("incbtn").addEventListener("click", () =>
      changeSizeByBtn(1, ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara")
  );
  document.getElementById("decbtn").addEventListener("click", () =>
      changeSizeByBtn(-1, ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara")
  );
  document.getElementById("regbtn").addEventListener("click", () =>
      resetSize(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara")
  );

  // Add event listeners for theme buttons
  document.querySelectorAll(".theme-btn").forEach((button) => {
      button.addEventListener("click", () => {
          const theme = button.getAttribute("data-theme");
          changeTheme(theme, button);
      });
  });

  // Hide/show top list
  const toggleImage = document.querySelector(".tglimg");
  const menu = document.querySelector(".selected");

  if (toggleImage && menu) {
      toggleImage.addEventListener("click", (event) => {
          event.stopPropagation();
          menu.classList.toggle("active");
      });

      document.addEventListener("click", (event) => {
          if (!event.target.closest(".topnav") && menu.classList.contains("active")) {
              menu.classList.remove("active");
          }
      });

      menu.addEventListener("mouseover", (event) => {
          event.stopPropagation();
          menu.classList.add("active");
      });

      menu.addEventListener("mouseleave", () => {
          menu.classList.remove("active");
      });
  }
});

const minSizeMultiplier = 0.75;
const maxSizeMultiplier = 1.75;
const clickSteps = 1; // Number of clicks to reach min or max size

function getFontSize(element) {
  return parseFloat(window.getComputedStyle(element).fontSize);
}

function storeOriginalSize(element) {
  const key = getElementStorageKey(element) + "-originalSize";
  if (!localStorage.getItem(key)) {
      localStorage.setItem(key, getFontSize(element));
  }
}

function getOriginalSize(element) {
  const key = getElementStorageKey(element) + "-originalSize";
  const storedSize = localStorage.getItem(key);
  return storedSize ? parseFloat(storedSize) : getFontSize(element);
}

function calculateIncrement(originalSize, minSize, maxSize) {
  const totalRange = maxSize - minSize;
  return totalRange / (clickSteps * 2); // two clicks to max, two clicks to min
}

function changeSizeByBtn(change, className) {
  if (isOverlayVisible()) return;

  document.querySelectorAll(className).forEach((element) => {
      storeOriginalSize(element);

      const originalSize = getOriginalSize(element);
      const minSizeForElement = originalSize * minSizeMultiplier;
      const maxSizeForElement = originalSize * maxSizeMultiplier;
      const currentSize = getFontSize(element);
      const increment = calculateIncrement(originalSize, minSizeForElement, maxSizeForElement);
      let newSize = currentSize + change * increment;

      newSize = Math.max(minSizeForElement, Math.min(maxSizeForElement, newSize));
      localStorage.setItem(getElementStorageKey(element), newSize);
      element.style.fontSize = newSize + "px";
  });
}

function resetSize(className) {
  if (isOverlayVisible()) return;

  document.querySelectorAll(className).forEach((element) => {
      const originalSize = getOriginalSize(element);
      element.style.fontSize = originalSize + "px";
      localStorage.removeItem(getElementStorageKey(element));
  });
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

function acceptCookies() {
  document.getElementById("cookieConsent").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  setCookie("cookieConsent", "accepted", 30);
}

function rejectCookies() {
  document.getElementById("cookieConsent").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  setCookie("cookieConsent", "rejected", 30);
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function checkCookieConsent() {
  const cookieConsent = getCookie("cookieConsent");
  if (cookieConsent !== "accepted" && cookieConsent !== "rejected") {
      document.getElementById("cookieConsent").style.display = "block";
      document.getElementById("overlay").style.display = "block";
  } else {
      document.getElementById("cookieConsent").style.display = "none";
      document.getElementById("overlay").style.display = "none";
  }
}

function applyStoredTheme() {
  const theme = getCookie("theme");
  if (theme) {
      document.body.classList.add(theme);
      document.querySelector(`.theme-btn[data-theme="${theme}"]`).classList.add("activetheme");
  } else {
      const defaultTheme = "theme-light";
      document.body.classList.add(defaultTheme);
      const defaultThemeButton = document.querySelector(`.theme-btn[data-theme="${defaultTheme}"]`);
      if (defaultThemeButton) {
          defaultThemeButton.classList.add("activetheme");
      }
  }
  handleResponsiveStyles(); // Reload styles with stored theme
}

function applyStoredFontSizes() {
  document.querySelectorAll(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara").forEach((element) => {
      const storedSize = localStorage.getItem(getElementStorageKey(element));
      if (storedSize) {
          element.style.fontSize = storedSize + "px";
      } else {
          const computedSize = getFontSize(element);
          localStorage.setItem(getElementStorageKey(element) + "-originalSize", computedSize);
          element.style.fontSize = computedSize + "px";
      }
  });
}

function getElementStorageKey(element) {
  const className = element.className.split(" ").find((cls) => cls);
  return className;
}

function isOverlayVisible() {
  return document.getElementById("overlay").style.display === "block";
}

function handleResponsiveStyles() {
  const viewportWidth = window.innerWidth;
  const theme = getCookie("theme") || "theme-light";

  // Remove previously loaded responsive CSS files
  document.querySelectorAll('link[data-responsive]').forEach(link => link.remove());

  // Load custom and theme CSS first
  loadCSS('content/css/custom.css');

  if (theme === 'theme-dark') {
      loadCSS('content/css/Dark-Theme.css');
  } else if (theme === 'theme-high-contrast') {
      loadCSS('content/css/High-Contrast.css');
  }

  // Load responsive CSS based on viewport width
  if (viewportWidth < 768) {
      loadCSS('content/css/Responsive-Mobile.css');
  } else if (viewportWidth >= 768 && viewportWidth <= 991) {
      loadCSS('content/css/Responsive-Desktop.css');
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
