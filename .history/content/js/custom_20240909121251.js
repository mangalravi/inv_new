const initialFontSize = 20;
const minSize = 10; // Minimum font size

function getFontSize(element) {
  let currentSize = window.getComputedStyle(element).fontSize;
  return parseFloat(currentSize);
}

function changeSizeByBtn(change, ids) {
  if (isOverlayVisible()) return;
  ids.forEach((id) => {
    let cont = document.getElementById(id);
    let currentSize = getFontSize(cont);
    let minSizeForElement = Math.max(minSize, initialFontSize * 0.75);
    let maxSize = initialFontSize * 1.5;
    let newSize = currentSize + change;

    // Clamp newSize within minSize and maxSize
    newSize = Math.max(minSizeForElement, Math.min(maxSize, newSize));
    cont.style.fontSize = newSize + "px";
  });

  // Update the slider value based on the first element
  let firstElement = document.getElementById(ids[0]);
  document.getElementById("slider").value = getFontSize(firstElement);
}

function changeSizeBySlider() {
  if (isOverlayVisible()) return;
  let slider = document.getElementById("slider");
  let sliderValue = parseFloat(slider.value);
  let minSizeForSlider = Math.max(minSize, initialFontSize * 0.75);
  let maxSize = initialFontSize * 1.5;

  // Clamp slider value within minSize and maxSize
  sliderValue = Math.max(
    minSizeForSlider,
    Math.min(maxSize, sliderValue)
  );

  // Apply the font size to all elements
  const divarr = ["changediv1", "changediv2", "changediv3"];
  divarr.forEach((id) => {
    let cont = document.getElementById(id);
    cont.style.fontSize = sliderValue + "px";
  });
}

function resetSize(ids) {
  if (isOverlayVisible()) return;
  ids.forEach((id) => {
    let cont = document.getElementById(id);
    cont.style.fontSize = "16px";
  });
  document.getElementById("slider").value = 16;
}

function changeTheme(themeClass) {
  if (isOverlayVisible()) return;
  document.body.className = themeClass;
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
  console.log(ca);

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function checkCookieConsent() {
  // Always show the banner regardless of previous consent
  document.getElementById("cookieConsent").style.display = "block";
  document.getElementById("overlay").style.display = "block"; // Show overlay
}

function isOverlayVisible() {
  return document.getElementById("overlay").style.display === "block";
}

// Initialize the slider to match the default font size
document.getElementById("slider").value = initialFontSize;

// Check cookie consent on page load
checkCookieConsent();