// const minSizeMultiplier = 0.75;
// const maxSizeMultiplier = 2.0;

// const incbtn = document.getElementById("incbtn");
// const regbtn = document.getElementById("regbtn");
// const decbtn = document.getElementById("decbtn");

// function getFontSize(element) {
//   let currentSize = window.getComputedStyle(element).fontSize;
//   return parseFloat(currentSize);
// }

// function storeOriginalSize(element) {
//   let key = getElementStorageKey(element) + "-originalSize";
//   if (!localStorage.getItem(key)) {
//     localStorage.setItem(key, getFontSize(element));
//   }
// }

// function getOriginalSize(element) {
//   let key = getElementStorageKey(element) + "-originalSize";
//   let storedSize = localStorage.getItem(key);
//   return storedSize ? parseFloat(storedSize) : getFontSize(element);
// }

// function changeSizeByBtn(change, className) {
//   if (isOverlayVisible()) return;
//   console.log(className);

//   document.querySelectorAll(className).forEach((element) => {
//     storeOriginalSize(element);
//     console.log(element);

//     let originalSize = getOriginalSize(element);
//     let minSizeForElement = originalSize * minSizeMultiplier;
//     let maxSizeForElement = originalSize * maxSizeMultiplier;
//     let currentSize = getFontSize(element);
//     let newSize = currentSize + change;

//     // Clamp newSize within minSize and maxSize
//     newSize = Math.max(minSizeForElement, Math.min(maxSizeForElement, newSize));

//     // Save the new font size in localStorage
//     localStorage.setItem(getElementStorageKey(element), newSize);

//     element.style.fontSize = newSize + "px";

//     // // Log values for debugging
//     // console.log(
//     //   `Element: ${element.className}, Original Size: ${originalSize}, Current Size: ${currentSize}, New Size: ${newSize}`
//     // );
//   });
// }

// function resetSize(className) {
//   if (isOverlayVisible()) return;

//   document.querySelectorAll(className).forEach((element) => {
//     // Reset the font size to the original CSS-defined size
//     let originalSize = getOriginalSize(element);
//     element.style.fontSize = originalSize + "px";

//     // Remove the stored size in localStorage
//     localStorage.removeItem(getElementStorageKey(element));
//   });
// }

// function changeTheme(themeClass) {
//   if (isOverlayVisible()) return;
//   document.body.className = themeClass;
//   setCookie("theme", themeClass, 30);
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
//     let date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = "; expires=" + date.toUTCString();
//   }
//   document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

// function getCookie(name) {
//   let nameEQ = name + "=";
//   let ca = document.cookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") c = c.substring(1);
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

// function checkCookieConsent() {
//   let cookieConsent = getCookie("cookieConsent");
//   if (cookieConsent !== "accepted" && cookieConsent !== "rejected") {
//     document.getElementById("cookieConsent").style.display = "block";
//     document.getElementById("overlay").style.display = "block";
//   } else {
//     document.getElementById("cookieConsent").style.display = "none";
//     document.getElementById("overlay").style.display = "none";
//   }
// }

// function applyStoredTheme() {
//   let theme = getCookie("theme");
//   if (theme) {
//     document.body.className = theme;
//   }
// }

// function applyStoredFontSizes() {
//   document
//     .querySelectorAll(
//       ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara "
//     )
//     .forEach((element) => {
//       let storedSize = localStorage.getItem(getElementStorageKey(element));
//       if (storedSize) {
//         element.style.fontSize = storedSize + "px";
//       } else {
//         // Initialize with the computed CSS size if no size is stored
//         let computedSize = getFontSize(element);
//         localStorage.setItem(
//           getElementStorageKey(element) + "-originalSize",
//           computedSize
//         );
//         element.style.fontSize = computedSize + "px";
//       }
//     });
// }

// function getElementStorageKey(element) {
//   let className = element.className.split(" ").find((cls) => cls); // Get the first class name
//   return className;
// }

// function isOverlayVisible() {
//   return document.getElementById("overlay").style.display === "block";
// }

// // Initialize
// document.addEventListener("DOMContentLoaded", () => {
//   checkCookieConsent();
//   applyStoredTheme();
//   applyStoredFontSizes();

//   // Add event listeners for buttons
//   incbtn.addEventListener("click", () =>
//     changeSizeByBtn(
//       2,
//       ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara"
//     )
//   );
//   decbtn.addEventListener("click", () =>
//     changeSizeByBtn(
//       -2,
//       ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara"
//     )
//   );
//   regbtn.addEventListener("click", () =>
//     resetSize(
//       ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara"
//     )
//   );
// });





// hide show top list

document.addEventListener("DOMContentLoaded", () => {
  // Get all elements with the class "tglimg"
  const toggleImages = document.querySelectorAll(".tglimg");

  // Function to toggle visibility of the related <ul>
  function toggleMenu(event) {
    // Prevent the click event from bubbling up to parent elements
    event.stopPropagation();
    
    // Get the parent <li> element
    const parentLi = event.target.closest("li");
    
    if (!parentLi) return; // If not inside a <li>, do nothing
    
    // Find the related <ul> within the parent <li>
    const relatedUl = parentLi.querySelector("ul");
    
    // Toggle the 'active' class to show/hide the <ul>
    if (relatedUl) {
      // Close all other open menus
      document.querySelectorAll(".d-flex li ul.active").forEach((ul) => {
        if (ul !== relatedUl) ul.classList.remove("active");
      });
      // Toggle the current menu
      relatedUl.classList.toggle("active");
    }
  }

  // Add event listeners to each toggle image
  toggleImages.forEach((image) => {
    image.addEventListener("click", toggleMenu);
  });

  // Ensure that clicking outside the menu hides the active menu
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".d-flex")) {
      document.querySelectorAll(".d-flex li ul.active").forEach((ul) => {
        ul.classList.remove("active");
      });
    }
  });
});
