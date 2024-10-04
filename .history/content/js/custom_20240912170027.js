// document.addEventListener("DOMContentLoaded", () => {
//   // Initialize cookie consent, theme, and font sizes
//   checkCookieConsent();
//   applyStoredTheme();
//   applyStoredFontSizes();
//   handleResponsiveStyles();
//   window.addEventListener("resize", handleResponsiveStyles);

//   // Add event listeners for buttons
//   document
//     .getElementById("incbtn")
//     .addEventListener("click", () =>
//       changeSizeByBtn(
//         1,
//         ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara"
//       )
//     );
//   document
//     .getElementById("decbtn")
//     .addEventListener("click", () =>
//       changeSizeByBtn(
//         -1,
//         ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara"
//       )
//     );
//   document
//     .getElementById("regbtn")
//     .addEventListener("click", () =>
//       resetSize(
//         ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara"
//       )
//     );

//   // Add event listeners for theme buttons
//   document.querySelectorAll(".theme-btn").forEach((button) => {
//     // console.log('Setting up click event for:', button);
//     button.addEventListener("click", (event) => {
//       event.preventDefault();
//       const theme = button.getAttribute("data-theme");
//       // console.log('Button clicked:', button);
//       changeTheme(theme, button);
//     });
//   });

//   // Hide/show top list
//   const toggleImage = document.querySelector(".tglimg");
//   const menu = document.querySelector(".selected");

//   if (toggleImage && menu) {
//     toggleImage.addEventListener("click", (event) => {
//       event.stopPropagation();
//       menu.classList.toggle("active");
//     });

//     document.addEventListener("click", (event) => {
//       if (
//         !event.target.closest(".topnav") &&
//         menu.classList.contains("active")
//       ) {
//         menu.classList.remove("active");
//       }
//     });

//     menu.addEventListener("mouseover", (event) => {
//       event.stopPropagation();
//       menu.classList.add("active");
//     });

//     menu.addEventListener("mouseleave", () => {
//       menu.classList.remove("active");
//     });
//   }
// });

// const sizeChangePercentage = 0.16; // 16% font size change
// const clickSteps = 2; // Number of clicks to reach min or max size

// function getFontSize(element) {
//   return parseFloat(window.getComputedStyle(element).fontSize);
// }

// function storeOriginalSize(element) {
//   const key = getElementStorageKey(element) + "-originalSize";
//   if (!localStorage.getItem(key)) {
//     localStorage.setItem(key, getFontSize(element));
//   }
// }

// function getOriginalSize(element) {
//   const key = getElementStorageKey(element) + "-originalSize";
//   const storedSize = localStorage.getItem(key);
//   return storedSize ? parseFloat(storedSize) : getFontSize(element);
// }

// function calculateIncrement(originalSize, minSize, maxSize) {
//   // Calculate the increment needed to reach min or max size in `clickSteps` clicks
//   let totalRange = maxSize - minSize;
//   return totalRange / (clickSteps * 2); // Two clicks to max, two clicks to min
// }

// function changeSizeByBtn(change, className) {
//   if (isOverlayVisible()) return;

//   document.querySelectorAll(className).forEach((element) => {
//     storeOriginalSize(element);

//     const originalSize = getOriginalSize(element);
//     const minSizeForElement = originalSize * (1 - sizeChangePercentage);
//     const maxSizeForElement = originalSize * (1 + sizeChangePercentage);
//     const currentSize = getFontSize(element);

//     // Calculate the increment to reach min or max size in `clickSteps` clicks
//     const increment = calculateIncrement(
//       originalSize,
//       minSizeForElement,
//       maxSizeForElement
//     );

//     // Calculate the new size
//     let newSize = currentSize + change * increment;

//     // Clamp newSize within minSize and maxSize
//     newSize = Math.max(minSizeForElement, Math.min(maxSizeForElement, newSize));

//     // Save the new font size in localStorage
//     localStorage.setItem(getElementStorageKey(element), newSize);

//     // Update the font size
//     element.style.fontSize = newSize + "px";
//   });
// }

// function resetSize(className) {
//   if (isOverlayVisible()) return;

//   document.querySelectorAll(className).forEach((element) => {
//     const originalSize = getOriginalSize(element);
//     element.style.fontSize = originalSize + "px";
//     localStorage.removeItem(getElementStorageKey(element));
//   });
// }

// function changeTheme(themeClass, buttonElement) {
//   // console.log('Theme:', themeClass);
//   // console.log('Button Element:', buttonElement);
//   if (isOverlayVisible()) return;

//   // Ensure buttonElement is valid
//   if (buttonElement && buttonElement.classList) {
//     document.querySelectorAll(".theme-btn").forEach((btn) => {
//       btn.classList.remove("activetheme");
//     });

//     document.body.className.split(" ").forEach((cls) => {
//       if (cls.startsWith("theme-") || cls === "activetheme") {
//         document.body.classList.remove(cls);
//       }
//     });

//     document.body.classList.add(themeClass);
//     buttonElement.classList.add("activetheme");

//     setCookie("theme", themeClass, 30);
//     handleResponsiveStyles(); // Reload styles with new theme
//   } else {
//     console.error('buttonElement is not a valid element or missing classList property');
//   }
// }


// function acceptCookies() {
//   document.getElementById("cookieConsent").style.display = "none";
//   document.getElementById("overlay").style.display = "none";
//   setCookie("cookieConsent", "accepted", 30);
// }

// function rejectCookies() {
//   document.getElementById("cookieConsent").style.display = "none";
//   document.getElementById("overlay").style.display = "none";
//   setCookie("cookieConsent", "rejected", 30);
// }

// function setCookie(name, value, days) {
//   let expires = "";
//   if (days) {
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = `${name}=${value || ""}${expires}; path=/`;
// }

// function getCookie(name) {
//   const nameEQ = name + "=";
//   const ca = document.cookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") c = c.substring(1);
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

// function checkCookieConsent() {
//   const cookieConsent = getCookie("cookieConsent");
//   if (cookieConsent !== "accepted" && cookieConsent !== "rejected") {
//     document.getElementById("cookieConsent").style.display = "block";
//     document.getElementById("overlay").style.display = "block";
//   } else {
//     document.getElementById("cookieConsent").style.display = "none";
//     document.getElementById("overlay").style.display = "none";
//   }
// }

// function applyStoredTheme() {
//   const theme = getCookie("theme");
//   if (theme) {
//     document.body.classList.add(theme);
//     document
//       .querySelector(`.theme-btn[data-theme="${theme}"]`)
//       .classList.add("activetheme");
//   } else {
//     const defaultTheme = "theme-light";
//     document.body.classList.add(defaultTheme);
//     const defaultThemeButton = document.querySelector(
//       `.theme-btn[data-theme="${defaultTheme}"]`
//     );
//     if (defaultThemeButton) {
//       defaultThemeButton.classList.add("activetheme");
//     }
//   }
//   handleResponsiveStyles(); // Reload styles with stored theme
// }

// function applyStoredFontSizes() {
//   document
//     .querySelectorAll(
//       ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara"
//     )
//     .forEach((element) => {
//       const storedSize = localStorage.getItem(getElementStorageKey(element));
//       if (storedSize) {
//         element.style.fontSize = storedSize + "px";
//       } else {
//         const computedSize = getFontSize(element);
//         localStorage.setItem(
//           getElementStorageKey(element) + "-originalSize",
//           computedSize
//         );
//         element.style.fontSize = computedSize + "px";
//       }
//     });
// }

// function getElementStorageKey(element) {
//   const className = element.className.split(" ").find((cls) => cls);
//   return className;
// }

// function isOverlayVisible() {
//   return document.getElementById("overlay").style.display === "block";
// }

// function handleResponsiveStyles() {
//   const viewportWidth = window.innerWidth;
//   const theme = getCookie("theme") || "theme-light";

//   // Remove previously loaded responsive CSS files
//   document
//     .querySelectorAll("link[data-responsive]")
//     .forEach((link) => link.remove());

//   // Load custom CSS first
//   loadCSS("content/css/custom.css");

//   if (theme === "theme-dark") {
//     loadCSS("content/css/Dark-Theme.css");
//   } else if (theme === "theme-high-contrast") {
//     loadCSS("content/css/High-Contrast.css");
//   }

//   // Load responsive CSS based on viewport width
//   if (viewportWidth < 576) {
//     loadCSS("content/css/Responsive-Mobile.css");
//   } else if (viewportWidth >= 576 && viewportWidth <= 767) {
//     loadCSS("content/css/Responsive-Desktop.css");
//   } else if (viewportWidth >= 768 && viewportWidth <= 991) {
//     loadCSS("content/css/Responsive-Leptop.css");
//   }
// }

// function loadCSS(href) {
//   let link = document.querySelector(`link[href="${href}"]`);
//   if (!link) {
//     link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = href;
//     link.dataset.responsive = true; 
//     document.head.appendChild(link);
//   }
// }




document.addEventListener("DOMContentLoaded", () => {
  checkCookieConsent();
  applyStoredTheme();
  handleResponsiveStyles(); // Apply responsive styles
  applyStoredFontSizes(); // Apply stored font sizes based on viewport
  window.addEventListener("resize", handleResponsiveStyles); // Update on resize

  document.getElementById("incbtn").addEventListener("click", () =>
    changeSizeByBtn(1)
  );
  document.getElementById("decbtn").addEventListener("click", () =>
    changeSizeByBtn(-1)
  );
  document.getElementById("regbtn").addEventListener("click", () =>
    resetSize()
  );

  document.querySelectorAll(".theme-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.getAttribute("data-theme");
      changeTheme(theme, button);
    });
  });

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

const sizeChangePercentage = 0.08; // 8% font size change
const clickSteps = 2; // Number of clicks to reach min or max size

function getViewportWidth() {
  return window.innerWidth;
}

function getBaseFontSize(variable) {
  const size = getComputedStyle(document.documentElement).getPropertyValue(variable);
  return parseFloat(size);
}

function calculateIncrement(originalSize, minSize, maxSize) {
  return (maxSize - minSize) / (clickSteps * 2); // Two clicks to max, two clicks to min
}

function updateCSSVariables(sizeChange) {
  const variables = {
    "--font-size-sec-head": 2, // Base size in rem
    "--font-size-main-para": 16, // Base size in px
    "--font-size-liItem": 14, // Base size in px
    "--font-size-hyperelink": 16, // Base size in px
    "--font-size-cardttl": 18, // Base size in px
    "--font-size-cardpara": 14 // Base size in px
  };

  Object.keys(variables).forEach((variable) => {
    const baseSize = getBaseFontSize(variable);
    const newSize = baseSize * (1 + sizeChange);
    document.documentElement.style.setProperty(variable, `${newSize}px`);
  });
}

function changeSizeByBtn(change) {
  if (isOverlayVisible()) return;

  document.querySelectorAll(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara").forEach((element) => {
    storeOriginalSize(element);

    const originalSize = getOriginalSize(element);
    const minSizeForElement = originalSize * (1 - sizeChangePercentage);
    const maxSizeForElement = originalSize * (1 + sizeChangePercentage);
    const currentSize = getFontSize(element);

    const increment = calculateIncrement(
      originalSize,
      minSizeForElement,
      maxSizeForElement
    );

    let newSize = currentSize + change * increment;
    newSize = Math.max(minSizeForElement, Math.min(maxSizeForElement, newSize));

    // Update font size using CSS variables
    updateCSSVariables(change * sizeChangePercentage);
    localStorage.setItem(getStorageKey(element), newSize);
  });
}

function resetSize() {
  if (isOverlayVisible()) return;

  document.querySelectorAll(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara").forEach((element) => {
    const originalSize = getOriginalSize(element);
    updateCSSVariables(0); // Reset to base size
    localStorage.removeItem(getStorageKey(element));
  });
}

function storeOriginalSize(element) {
  const key = getStorageKey(element) + "-originalSize";
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, getFontSize(element));
  }
}

function getOriginalSize(element) {
  const key = getStorageKey(element) + "-originalSize";
  const storedSize = localStorage.getItem(key);
  return storedSize ? parseFloat(storedSize) : getFontSize(element);
}

function getFontSize(element) {
  return parseFloat(window.getComputedStyle(element).fontSize);
}

function getStorageKey(element) {
  const viewportWidth = getViewportWidth();
  const className = element.className.split(" ").find(cls => cls);
  return `${className}-${viewportWidth}`;
}

function applyStoredFontSizes() {
  document.querySelectorAll(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara").forEach((element) => {
    const storedSize = localStorage.getItem(getStorageKey(element));
    if (storedSize) {
      updateFontSizeClass(element, parseFloat(storedSize));
    } else {
      const computedSize = getFontSize(element);
      localStorage.setItem(getStorageKey(element), computedSize);
      updateFontSizeClass(element, computedSize);
    }
  });
}

function updateFontSizeClass(element, size) {
  // This function is now redundant because we're using CSS variables directly
}

function isOverlayVisible() {
  return document.getElementById("overlay").style.display === "block";
}

function handleResponsiveStyles() {
  const viewportWidth = getViewportWidth();
  const theme = getCookie("theme") || "theme-light";

  // Remove previously loaded responsive CSS files
  document.querySelectorAll("link[data-responsive]").forEach((link) => link.remove());

  // Load custom and theme CSS first
  loadCSS("content/css/custom.css");

  if (theme === "theme-dark") {
    loadCSS("content/css/Dark-Theme.css");
  } else if (theme === "theme-high-contrast") {
    loadCSS("content/css/High-Contrast.css");
  }

  // Load responsive CSS based on viewport width
  if (viewportWidth < 576) {
    loadCSS("content/css/Responsive-Mobile.css");
  } else if (viewportWidth >= 576 && viewportWidth < 768) {
    loadCSS("content/css/Responsive-Desktop.css");
  } else if (viewportWidth >= 768 && viewportWidth < 992) {
    loadCSS("content/css/Responsive-Tablet.css");
  } else {
    loadCSS("content/css/Responsive-Desktop.css");
  }
}

function loadCSS(href) {
  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (!existingLink) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-responsive", "");
    document.head.appendChild(link);
  }
}
