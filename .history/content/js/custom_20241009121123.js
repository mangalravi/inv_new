$(document).ready(function () {
  checkCookieConsent();
  applyStoredTheme();
  applyStoredFontSize();
  handleResponsiveStyles();
  $(window).on("resize", function () {
    handleResponsiveStyles();
  });
  $("#incbtn").on("click", function () {
    adjustRootFontSize(1.08);
  });
  $("#decbtn").on("click", function () {
    adjustRootFontSize(1 / 1.08);
  });
  $("#regbtn").on("click", function () {
    resetRootFontSize();
  });
  $(".theme-btn").on("click", function (event) {
    event.preventDefault();
    const theme = $(this).data("theme");
    changeTheme(theme, $(this));
  });
  const $toggleImage = $(".tglimg");
  const $menu = $(".selected");
  if ($toggleImage.length && $menu.length) {
    $toggleImage.on("click", function (event) {
      event.stopPropagation();
      $menu.toggleClass("active");
    });
    $(document).on("click", function (event) {
      if (
        !$(event.target).closest(".topnav").length &&
        $menu.hasClass("active")
      ) {
        $menu.removeClass("active");
      }
    });
    $menu.on("mouseover", function (event) {
      event.stopPropagation();
      $menu.addClass("active");
    });

    $menu.on("mouseleave", function () {
      $menu.removeClass("active");
    });
  }
});
const sizeChangePercentage = 0.08;
const minFontSize = 13.54;
const maxFontSize = 18.66;
function getRootFontSize() {
  const fontSize = getComputedStyle(document.documentElement).getPropertyValue(
    "--font-size"
  );
  return parseFloat(fontSize);
}
function adjustRootFontSize(factor) {
  let rootFontSize = getRootFontSize();
  rootFontSize *= factor;
  // Ensure the font size is within min and max bounds
  rootFontSize = Math.max(minFontSize, Math.min(maxFontSize, rootFontSize));
  document.documentElement.style.setProperty(
    "--font-size",
    `${rootFontSize}px`
  );
  storeRootFontSize(rootFontSize);
}
function resetRootFontSize() {
  const defaultFontSize = 16; // Default font size in pixels
  document.documentElement.style.setProperty(
    "--font-size",
    `${defaultFontSize}px`
  );
  storeRootFontSize(defaultFontSize);
}
function storeRootFontSize(size) {
  localStorage.setItem("rootFontSize", size);
}
function applyStoredFontSize() {
  const storedSize = localStorage.getItem("rootFontSize");
  if (storedSize) {
    document.documentElement.style.setProperty(
      "--font-size",
      `${storedSize}px`
    );
  }
}
function changeTheme(themeClass, $buttonElement) {
  if (isOverlayVisible()) return;

  if ($buttonElement.length) {
    $(".theme-btn").removeClass("activetheme");

    $("body")
      .removeClass(function (index, className) {
        return (className.match(/(^|\s)theme-\S+/g) || []).join(" ");
      })
      .removeClass("activetheme");

    $("body").addClass(themeClass);
    $buttonElement.addClass("activetheme");

    setCookie("theme", themeClass, 30);
    handleResponsiveStyles();
  } else {
    console.error(
      "buttonElement is not a valid element or missing classList property"
    );
  }
}
function acceptCookies() {
  $("#cookieConsent").hide();
  $("#overlay").hide();
  setCookie("cookieConsent", "accepted", 30);
}
function rejectCookies() {
  $("#cookieConsent").hide();
  $("#overlay").hide();
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
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function checkCookieConsent() {
  const cookieConsent = getCookie("cookieConsent");
  if (cookieConsent !== "accepted" && cookieConsent !== "rejected") {
    $("#cookieConsent").show();
    $("#overlay").show();
  } else {
    $("#cookieConsent").hide();
    $("#overlay").hide();
  }
}
function applyStoredTheme() {
  const theme = getCookie("theme");
  if (theme) {
    $("body").addClass(theme);
    $(`.theme-btn[data-theme="${theme}"]`).addClass("activetheme");
  } else {
    const defaultTheme = "theme-light";
    $("body").addClass(defaultTheme);
    const $defaultThemeButton = $(`.theme-btn[data-theme="${defaultTheme}"]`);
    if ($defaultThemeButton.length) {
      $defaultThemeButton.addClass("activetheme");
    }
  }
  handleResponsiveStyles();
}
function handleResponsiveStyles() {
  const viewportWidth = $(window).width();
  const theme = getCookie("theme") || "theme-light";
  $("link[data-responsive]").remove();
  loadCSS("content/css/custom.css");
  if (theme === "theme-dark") {
    loadCSS("content/css/Dark-Theme.css");
  } else if (theme === "theme-high-contrast") {
    loadCSS("content/css/High-Contrast.css");
  }
  if (viewportWidth < 576) {
    loadCSS("content/css/Responsive-Mobile.css");
  } else if (viewportWidth >= 576 && viewportWidth < 767) {
    loadCSS("content/css/Responsive-Desktop.css");
  } else if (viewportWidth >= 768 && viewportWidth < 991) {
    loadCSS("content/css/Responsive-Leptop.css");
  }
}
function loadCSS(href) {
  if (!$(`link[href="${href}"]`).length) {
    $("<link>")
      .attr("rel", "stylesheet")
      .attr("href", href)
      .attr("data-responsive", true)
      .appendTo("head");
  }
}
function isOverlayVisible() {
  return $("#overlay").is(":visible");
}
$(window).scroll(function () {
  if ($(this).scrollTop() >= 250) {
    $(".nvbrhdr").addClass("bg-white");
  } else {
    $(".nvbrhdr").removeClass("bg-white");
  }
});
$(document).ready(function () {
  $(".gallery").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    infinite: true,
    arrows: false,
    cssEase: "linear",
    swipe: false,
    pauseOnHover: false,
  });

  // Prevent the default behavior on click and mouse down events
  $(".gallery").on("mousedown", function (event) {
    event.preventDefault();
  });

  $(".gallery").on("click", function (event) {
    event.preventDefault();
  });
});

$(function () {
  // Initialize Slick slider
  $(".slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 3000,
  });

  // Reset progress bar on slide change
  $(".slider").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      // Update active thumbnail
      $(".thumbnails .owl-item").removeClass("active");
      $('.thumbnails .owl-item[data-slide="' + nextSlide + '"]').addClass(
        "active"
      );
    }
  );

  // Thumbnail click event
  $(".thumbnails .owl-item").click(function () {
    var slideIndex = $(this).data("slide");
    $(".slider").slick("slickGoTo", slideIndex);
    $(".thumbnails .owl-item").removeClass("active");
    $(this).addClass("active");
  });

  // Initialize paused state
  $(".play-pause").data("paused", true);
  $(".play-icon").hide();
  $(".pause-icon").show();

  // Handle play/pause button click
  $(".play-pause").click(function () {
    var isPaused = $(this).data("paused");
    var activeThumbnail = $(".thumbnails .owl-item.active");

    if (isPaused) {
      $(".slider").slick("slickPause");
      $(this).data("paused", false);
      $(".play-icon").show();
      $(".pause-icon").hide();
      activeThumbnail.addClass("paused");
    } else {
      $(".slider").slick("slickPlay");
      $(this).data("paused", true);
      $(".play-icon").hide();
      $(".pause-icon").show();
      activeThumbnail.removeClass("paused");
    }
  });

  $(".testimonialslide").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    speed: 2000,
    fade: false,
    autoplaySpeed: 3000,
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   let openSubmenu = null; // Reference to the currently open submenu

//   // Function to handle tab switching for each parent menu
//   function handleTabSwitch(parentMenu) {
//     const tabLinks = parentMenu.querySelectorAll(".tab-link");
//     const tabContents = parentMenu.querySelectorAll(".tab");
//     const submenu = parentMenu.querySelector(".submenu"); // Assuming submenu has a class "submenu"

//     // Check if submenu exists
//     if (submenu) {
//       // Initially hide the submenu
//       submenu.style.display = "none";

//       // Function to toggle the submenu visibility
//       const toggleSubmenu = () => {
//         if (openSubmenu && openSubmenu !== submenu) {
//           openSubmenu.style.display = "none"; // Close the currently open submenu
//         }

//         // Toggle the submenu visibility
//         const isSubmenuOpen = submenu.style.display === "block";
//         submenu.style.display = isSubmenuOpen ? "none" : "block";

//         // Update the reference to the currently open submenu
//         openSubmenu = submenu.style.display === "block" ? submenu : null;
//       };

//       // Add click event listener to parent menu for toggling submenu
//       parentMenu.addEventListener("click", (event) => {
//         if (
//           event.target.classList.contains("parent-menu") ||
//           event.target.closest(".parent-menu")
//         ) {
//           toggleSubmenu();
//           event.stopPropagation(); // Prevent the event from bubbling up
//         }
//       });

//       // Prevent submenu from closing when clicking inside it
//       submenu.addEventListener("click", (event) => {
//         event.stopPropagation(); // Prevent click event from closing the submenu
//       });

//       // Add hover event listeners to show/hide submenu for desktop
//       parentMenu.addEventListener("mouseenter", () => {
//         if (window.innerWidth > 991) {
//           submenu.style.display = "block";
//         }
//       });

//       parentMenu.addEventListener("mouseleave", () => {
//         if (window.innerWidth > 991) {
//           submenu.style.display = "none"; // Hide submenu on mouse leave
//           openSubmenu = null; // Reset the reference
//         }
//       });
//     }

//     tabLinks.forEach((link) => {
//       const tabId = link.getAttribute("data-tab");
//       const activeTab = parentMenu.querySelector(`#${tabId}`);

//       // Function to show the corresponding tab
//       const showTab = (event) => {
//         event.preventDefault();

//         // Remove active class from all tab links and hide all tab contents
//         tabLinks.forEach((link) => link.classList.remove("active"));
//         tabContents.forEach((content) => (content.style.display = "none"));

//         // Add active class to the clicked tab link
//         link.classList.add("active");

//         // Show the corresponding tab
//         if (activeTab) {
//           activeTab.style.display = "block";
//         }
//       };

//       // Add click event listener for tabs
//       link.addEventListener("click", showTab);
//       // Add hover event listener for tabs
//       link.addEventListener("mouseenter", showTab);
//     });

//     // Ensure only one tab is displayed at a time
//     tabContents.forEach((tab) => {
//       tab.addEventListener("mouseenter", () => {
//         tab.style.display = "block"; // Keep tab content visible
//       });
//     });

//     // Optionally, show the first tab by default
//     if (tabLinks.length > 0) {
//       tabLinks[0].click();
//     }
//   }

//   // Select all parent menus and apply the tab switch functionality to each
//   const parentMenus = document.querySelectorAll(".parent-menu");
//   parentMenus.forEach((menu) => {
//     handleTabSwitch(menu);
//   });

//   // Ensure all submenus are closed on page load
//   const allSubmenus = document.querySelectorAll(".submenu");
//   allSubmenus.forEach((submenu) => {
//     submenu.style.display = "none"; // Close all submenus
//   });
// });



<script>
document.addEventListener("DOMContentLoaded", function() {
  // Function to handle submenu toggling
  const toggleSubmenu = (event) => {
    const submenu = event.currentTarget.querySelector('.submenu');
    if (submenu) {
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }
  };

  // Get all parent menu items
  const parentMenus = document.querySelectorAll('.parent-menu');

  // Add click event listener to each parent menu
  parentMenus.forEach(menu => {
    menu.addEventListener('click', function(event) {
      if (window.innerWidth <= 991) {
        toggleSubmenu(event);
      }
    });
  });

  // Close all submenus on page load
  if (window.innerWidth <= 991) {
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
      submenu.style.display = 'none';
    });
  }
});

