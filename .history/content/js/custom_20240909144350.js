const initialFontSize = 16; // Base value; individual elements use their own sizes.
const minSizeMultiplier = 0.75;
const maxSizeMultiplier = 1.5;


const incbtn
function getFontSize(element) {
  let currentSize = window.getComputedStyle(element).fontSize;
  return parseFloat(currentSize);
}

function changeSizeByBtn(change, className) {
  if (isOverlayVisible()) return;

  document.querySelectorAll(className).forEach((element) => {
    // Get the stored original font size or use the current font size
    let storedSize = localStorage.getItem(getElementStorageKey(element) + "-originalSize");
    let originalSize = storedSize ? parseFloat(storedSize) : getFontSize(element);
    let minSizeForElement = originalSize * minSizeMultiplier;
    let maxSize = originalSize * maxSizeMultiplier;
    let currentSize = getFontSize(element);
    let newSize = currentSize + change;

    // Clamp newSize within minSize and maxSize
    newSize = Math.max(minSizeForElement, Math.min(maxSize, newSize));
    element.style.fontSize = newSize + "px";

    // Save the new font size in localStorage
    localStorage.setItem(getElementStorageKey(element), newSize);
    
    // Log values for debugging
    console.log(`Element: ${element.className}, Original Size: ${originalSize}, Current Size: ${currentSize}, New Size: ${newSize}`);
  });
}

function resetSize(className) {
  if (isOverlayVisible()) return;

  document.querySelectorAll(className).forEach((element) => {
    // Get the stored original font size or use the initial font size
    let storedSize = localStorage.getItem(getElementStorageKey(element) + "-originalSize");
    let originalSize = storedSize ? parseFloat(storedSize) : initialFontSize;
    element.style.fontSize = originalSize + "px";

    // Reset the font size in localStorage
    localStorage.removeItem(getElementStorageKey(element));
  });
}

function changeTheme(themeClass) {
  if (isOverlayVisible()) return;
  document.body.className = themeClass;

  // Save the selected theme in a cookie
  setCookie("theme", themeClass, 30);
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
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function checkCookieConsent() {
  let cookieConsent = getCookie("cookieConsent");
  if (cookieConsent !== "accepted" && cookieConsent !== "rejected") {
    // Show the cookie consent banner if no previous consent
    document.getElementById("cookieConsent").style.display = "block";
    document.getElementById("overlay").style.display = "block"; // Show overlay
  } else {
    // Hide the cookie consent banner and overlay if consent already given
    document.getElementById("cookieConsent").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
}

function applyStoredTheme() {
  let theme = getCookie("theme");
  if (theme) {
    document.body.className = theme;
  }
}

function applyStoredFontSizes() {
  // Apply font sizes for all elements based on class
  document.querySelectorAll('.sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara').forEach((element) => {
    let storedSize = localStorage.getItem(getElementStorageKey(element));
    if (storedSize) {
      element.style.fontSize = storedSize + "px";
    } else {
      // Apply initial font size if no stored size
      element.style.fontSize = initialFontSize + "px";
    }

    // Store the original size if not already stored
    if (!localStorage.getItem(getElementStorageKey(element) + "-originalSize")) {
      localStorage.setItem(getElementStorageKey(element) + "-originalSize", getFontSize(element));
    }
  });
}

function getElementStorageKey(element) {
  // Create a unique key for each element based on its class and index
  let className = element.className.split(' ').find(cls => cls); // Get the first class name
  return className;
}

function isOverlayVisible() {
  return document.getElementById("overlay").style.display === "block";
}

// Check cookie consent and apply stored settings on page load
checkCookieConsent();
applyStoredTheme();
applyStoredFontSizes();
