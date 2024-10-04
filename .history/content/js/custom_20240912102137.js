const minSizeMultiplier = 0.75;
const maxSizeMultiplier = 1.75;
const clickSteps = 1; // Number of clicks to reach min or max size

const incbtn = document.getElementById("incbtn");
const regbtn = document.getElementById("regbtn");
const decbtn = document.getElementById("decbtn");

const defaultTheme = "theme-light"; // Define the default theme class name

function getFontSize(element) {
  let currentSize = window.getComputedStyle(element).fontSize;
  return parseFloat(currentSize);
}

function storeOriginalSize(element) {
  let key = getElementStorageKey(element) + "-originalSize";
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, getFontSize(element));
  }
}

function getOriginalSize(element) {
  let key = getElementStorageKey(element) + "-originalSize";
  let storedSize = localStorage.getItem(key);
  return storedSize ? parseFloat(storedSize) : getFontSize(element);
}

function calculateIncrement(originalSize, minSize, maxSize) {
  // Calculate the increment needed to reach min or max size in 2 clicks
  let totalRange = maxSize - minSize;
  return totalRange / (clickSteps * 2); // two clicks to max, two clicks to min
}

function changeSizeByBtn(change, className) {
  if (isOverlayVisible()) return;

  document.querySelectorAll(className).forEach((element) => {
    storeOriginalSize(element);

    let originalSize = getOriginalSize(element);
    let minSizeForElement = originalSize * minSizeMultiplier;
    let maxSizeForElement = originalSize * maxSizeMultiplier;
    let currentSize = getFontSize(element);

    // Calculate the increment to reach min or max size in 2 clicks
    let increment = calculateIncrement(originalSize, minSizeForElement, maxSizeForElement);

    // Calculate the new size
    let newSize = currentSize + change * increment;

    // Clamp newSize within minSize and maxSize
    newSize = Math.max(minSizeForElement, Math.min(maxSizeForElement, newSize));

    // Save the new font size in localStorage
    localStorage.setItem(getElementStorageKey(element), newSize);

    element.style.fontSize = newSize + "px";
  });
}

function resetSize(className) {
  if (isOverlayVisible()) return;

  document.querySelectorAll(className).forEach((element) => {
    // Reset the font size to the original CSS-defined size
    let originalSize = getOriginalSize(element);
    element.style.fontSize = originalSize + "px";

    // Remove the stored size in localStorage
    localStorage.removeItem(getElementStorageKey(element));
  });
}

function changeTheme(themeClass, buttonElement) {
  if (isOverlayVisible()) return;

  // Remove the activetheme class from all theme buttons
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.remove("activetheme");
  });

  // Remove the existing theme classes from the body
  document.body.className.split(" ").forEach(cls => {
    if (cls.startsWith("theme-") || cls === "activetheme") {
      document.body.classList.remove(cls);
    }
  });

  // Apply the new theme class and add activetheme class
  document.body.classList.add(themeClass);
  buttonElement.classList.add("activetheme");

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
    while (c.charAt(0) === " ") c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
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
    // Apply default theme and set the default theme button as active
    document.body.classList.add(defaultTheme);
    let defaultThemeButton = document.querySelector(`.theme-btn[data-theme="${defaultTheme}"]`);
    if (defaultThemeButton) {
      defaultThemeButton.classList.add("activetheme");
    }
  }
}

function applyStoredFontSizes() {
  document
    .querySelectorAll(
      ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara"
    )
    .forEach((element) => {
      let storedSize = localStorage.getItem(getElementStorageKey(element));
      if (storedSize) {
        element.style.fontSize = storedSize + "px";
      } else {
        // Initialize with the computed CSS size if no size is stored
        let computedSize = getFontSize(element);
        localStorage.setItem(
          getElementStorageKey(element) + "-originalSize",
          computedSize
        );
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

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  checkCookieConsent();
  applyStoredTheme();
  applyStoredFontSizes();

  // Add event listeners for buttons
  incbtn.addEventListener("click", () =>
    changeSizeByBtn(1, ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara")
  );
  decbtn.addEventListener("click", () =>
    changeSizeByBtn(-1, ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara")
  );
  regbtn.addEventListener("click", () =>
    resetSize(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara")
  );

  // Add event listeners for theme buttons
  document.querySelectorAll(".theme-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const theme = button.getAttribute("data-theme");
      changeTheme(theme, button);
    });
  });
});



// hide show top list

document.addEventListener("DOMContentLoaded", () => {
  const toggleImage = document.querySelector(".tglimg");
  const menu = document.querySelector(".selected");
  function toggleMenu(event) {
    event.stopPropagation(); 
    if (menu) {
      menu.classList.toggle("active");
    }
  }
  function hideMenu(event) {
    if (!event.target.closest(".topnav")) {
      if (menu && menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    }
  }
  if (toggleImage) {
    toggleImage.addEventListener("click", toggleMenu);
  }
  document.addEventListener("click", hideMenu);
  if (menu) {
    menu.addEventListener("mouseover", (event) => {
      event.stopPropagation(); 
      if (!menu.classList.contains("active")) {
        menu.classList.add("active");
      }
    });
    menu.addEventListener("mouseleave", () => {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    });
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const themeStyleLink = document.getElementById('theme-style');
  const responsiveStyleLink = document.getElementById('responsive-style');
  
  // Function to apply the selected theme
  function applyTheme(theme) {
      if (theme === 'dark') {
          themeStyleLink.setAttribute('href', 'content/css/custom.css');
          const darkThemeLink = document.createElement('link');
          darkThemeLink.rel = 'stylesheet';
          darkThemeLink.href = 'content/css/Dark-Theme.css';
          document.head.appendChild(darkThemeLink);
      } else if (theme === 'light') {
          themeStyleLink.setAttribute('href', 'content/css/custom.css');
          // Remove Dark Theme CSS if present
          const darkThemeLink = document.querySelector('link[href="content/css/Dark-Theme.css"]');
          if (darkThemeLink) {
              document.head.removeChild(darkThemeLink);
          }
      }
  }
  
  // Function to apply responsive styles
  else-if (768<window.innerWidth < 991) {
          responsiveStyleLink.setAttribute('href', 'content/css/Responsive-desktop.css');
      }  function applyResponsiveStyles() {
      if (window.innerWidth < 767) {
          responsiveStyleLink.setAttribute('href', 'content/css/Responsive-Mobile.css');
      } 
       
      else {
          responsiveStyleLink.setAttribute('href', 'content/css/custom.css');
      }
  }

  // Apply theme based on user preference or default to light theme
  const userTheme = localStorage.getItem('theme') || 'light'; // Assuming theme is stored in local storage
  applyTheme(userTheme);

  // Apply responsive styles based on initial window width
  applyResponsiveStyles();

  // Update responsive styles on window resize
  window.addEventListener('resize', applyResponsiveStyles);
});
