document.addEventListener("DOMContentLoaded", function () {
  // Initialize elements
  const incbtn = document.getElementById("incbtn");
  const regbtn = document.getElementById("regbtn");
  const decbtn = document.getElementById("decbtn");
  const themeStyleLink = document.getElementById('theme-style');
  const responsiveStyleLink = document.getElementById('responsive-style');

  // Function to get the font size of an element
  function getFontSize(element) {
      let currentSize = window.getComputedStyle(element).fontSize;
      return parseFloat(currentSize);
  }

  // Store the original size of an element
  function storeOriginalSize(element) {
      let key = getElementStorageKey(element) + "-originalSize";
      if (!localStorage.getItem(key)) {
          localStorage.setItem(key, getFontSize(element));
      }
  }

  // Get the original size of an element
  function getOriginalSize(element) {
      let key = getElementStorageKey(element) + "-originalSize";
      let storedSize = localStorage.getItem(key);
      return storedSize ? parseFloat(storedSize) : getFontSize(element);
  }

  // Calculate the increment needed to reach min or max size in clicks
  function calculateIncrement(originalSize, minSize, maxSize) {
      let totalRange = maxSize - minSize;
      return totalRange / (clickSteps * 2); // two clicks to max, two clicks to min
  }

  // Change size by button click
  function changeSizeByBtn(change, className) {
      if (isOverlayVisible()) return;

      document.querySelectorAll(className).forEach((element) => {
          storeOriginalSize(element);

          let originalSize = getOriginalSize(element);
          let minSizeForElement = originalSize * minSizeMultiplier;
          let maxSizeForElement = originalSize * maxSizeMultiplier;
          let currentSize = getFontSize(element);

          // Calculate the increment and new size
          let increment = calculateIncrement(originalSize, minSizeForElement, maxSizeForElement);
          let newSize = currentSize + change * increment;

          // Clamp newSize within minSize and maxSize
          newSize = Math.max(minSizeForElement, Math.min(maxSizeForElement, newSize));

          // Save the new font size
          localStorage.setItem(getElementStorageKey(element), newSize);
          element.style.fontSize = newSize + "px";
      });
  }

  // Reset font size to original
  function resetSize(className) {
      if (isOverlayVisible()) return;

      document.querySelectorAll(className).forEach((element) => {
          let originalSize = getOriginalSize(element);
          element.style.fontSize = originalSize + "px";
          localStorage.removeItem(getElementStorageKey(element));
      });
  }

  // Change theme based on button click
  function changeTheme(themeClass, buttonElement) {
      if (isOverlayVisible()) return;

      // Remove existing theme classes
      document.body.className.split(" ").forEach(cls => {
          if (cls.startsWith("theme-") || cls === "activetheme") {
              document.body.classList.remove(cls);
          }
      });

      // Apply new theme class
      document.body.classList.add(themeClass);
      buttonElement.classList.add("activetheme");

      setCookie("theme", themeClass, 30);
  }

  // Cookie consent handling
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

  // Apply the stored theme or default theme
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
  }

  // Apply stored font sizes or set default sizes
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

  // Apply responsive styles based on window width
  function applyResponsiveStyles() {
      const width = window.innerWidth;
      
      if (width < 768) {
          responsiveStyleLink.setAttribute('href', 'content/css/Responsive-Mobile.css');
      } else if (width >= 768 && width <= 991) {
          responsiveStyleLink.setAttribute('href', 'content/css/Responsive-Tablet.css'); // Adjust this as needed
      } else {
          responsiveStyleLink.setAttribute('href', 'content/css/Responsive-Desktop.css');
      }
  }

  // Initialize functions
  checkCookieConsent();
  applyStoredTheme();
  applyStoredFontSizes();
  applyResponsiveStyles();

  // Add event listeners for font size buttons
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

  // Update responsive styles on window resize
  window.addEventListener('resize', applyResponsiveStyles);

  // Toggle menu visibility
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
