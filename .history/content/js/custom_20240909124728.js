const initialFontSize = 20;
const minSize = 10;

function getFontSize(element) {
  let currentSize = window.getComputedStyle(element).fontSize;
  return parseFloat(currentSize);
}

function changeSizeByBtn(change, ids) {
  debugger;
  ids.forEach((id) => {
    let cont = document.getElementById(id);
    let currentSize = getFontSize(cont);
    let minSizeForElement = Math.max(minSize, initialFontSize * 0.75);
    let maxSize = initialFontSize * 1.5;
    let newSize = currentSize + change;
    debugger;
    console.log(newSize);

    // Clamp newSize within minSize and maxSize
    newSize = Math.max(minSizeForElement, Math.min(maxSize, newSize));
    cont.style.fontSize = newSize + "px";
    debugger;
    console.log(newSize);
    // Save the new font size in localStorage
    localStorage.setItem(id + "-fontSize", newSize);
  });
}

function resetSize(ids) {
  if (isOverlayVisible()) return;
  ids.forEach((id) => {
    let cont = document.getElementById(id);
    cont.style.fontSize = initialFontSize + "px";

    // Reset the font size in localStorage
    localStorage.removeItem(id + "-fontSize");
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
  let ids = ["changediv1", "changediv2", "changediv3"];
  ids.forEach((id) => {
    let storedSize = localStorage.getItem(id + "-fontSize");
    if (storedSize) {
      document.getElementById(id).style.fontSize = storedSize + "px";
    } else {
      // Apply initial font size if no stored size
      document.getElementById(id).style.fontSize = initialFontSize + "px";
    }
  });
}

function isOverlayVisible() {
  return document.getElementById("overlay").style.display === "block";
}

// Check cookie consent and apply stored settings on page load
checkCookieConsent();
applyStoredTheme();
applyStoredFontSizes();
