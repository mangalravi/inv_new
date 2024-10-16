$(document).ready(function () {
  checkCookieConsent();
  applyStoredTheme();
  applyStoredFontSize();
  handleResponsiveStyles();
  $(window).on("resize", function () {
    handleResponsiveStyles();
  });
  $(".incbtn").on("click", function () {
    adjustRootFontSize(1.08);
  });
  $(".decbtn").on("click", function () {
    adjustRootFontSize(1 / 1.08);
  });
  $(".regbtn").on("click", function () {
    resetRootFontSize();
  });
 
 
});
const sizeChangePercentage = 0.08;
const minFontSize = 13.54;
const maxFontSize = 18.66;
function getRootFontSize() {
  const fontSize = getComputedStyle(document.documentElement).getPropertyValue(
    "--bs-body-font-size"
  );
  return parseFloat(fontSize);
}
function adjustRootFontSize(factor) {
  let rootFontSize = getRootFontSize();
  rootFontSize *= factor;
  // Ensure the font size is within min and max bounds
  rootFontSize = Math.max(minFontSize, Math.min(maxFontSize, rootFontSize));
  document.documentElement.style.setProperty(
    "--bs-body-font-size",
    `${rootFontSize}px`
  );
  storeRootFontSize(rootFontSize);
}
function resetRootFontSize() {
  const defaultFontSize = 16; // Default font size in pixels
  document.documentElement.style.setProperty(
    "--bs-body-font-size",
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
      "--bs-body-font-size",
      `${storedSize}px`
    );
  }
}


// $(document).ready(function () {
//   checkCookieConsent();
//   applyStoredTheme();
//   applyStoredFontSize();
//   handleResponsiveStyles();
  
//   // Call handleResponsiveStyles once to initialize buttons
//   handleResponsiveStyles();

//   $(window).on("resize", function () {
//     handleResponsiveStyles();
//   });

//   $(".incbtn").on("click", function () {
//     adjustRootFontSize(1.08);
//   });

//   $(".decbtn").on("click", function () {
//     adjustRootFontSize(1 / 1.08);
//   });

//   $(".regbtn").on("click", function () {
//     resetRootFontSize();
//   });
// });

// const sizeChangePercentage = 0.08;
// const minFontSize = 13.54;
// const maxFontSize = 18.66;

// function getRootFontSize() {
//   const fontSize = getComputedStyle(document.documentElement).getPropertyValue(
//     "--bs-body-font-size"
//   );
//   return parseFloat(fontSize);
// }

// function adjustRootFontSize(factor) {
//   let rootFontSize = getRootFontSize();
//   rootFontSize *= factor;
//   // Ensure the font size is within min and max bounds
//   rootFontSize = Math.max(minFontSize, Math.min(maxFontSize, rootFontSize));
//   document.documentElement.style.setProperty(
//     "--bs-body-font-size",
//     `${rootFontSize}px`
//   );
//   storeRootFontSize(rootFontSize);
// }

// function resetRootFontSize() {
//   const defaultFontSize = 16; // Default font size in pixels
//   document.documentElement.style.setProperty(
//     "--bs-body-font-size",
//     `${defaultFontSize}px`
//   );
//   storeRootFontSize(defaultFontSize);
// }

// function storeRootFontSize(size) {
//   localStorage.setItem("rootFontSize", size);
// }

// function applyStoredFontSize() {
//   const storedSize = localStorage.getItem("rootFontSize");
//   if (storedSize) {
//     document.documentElement.style.setProperty(
//       "--bs-body-font-size",
//       `${storedSize}px`
//     );
//   }
// }

// function handleResponsiveStyles() {
//   if ($(window).width() < 992) {
//     // Disable buttons if the screen width is less than 992px
//     $(".incbtn, .decbtn, .regbtn").prop("disabled", true);
//     $("#incbtn, .decbtn, .regbtn").css("opacity", "0.5"); // Make buttons look disabled
//   } else {
//     // Enable buttons if the screen width is 992px or greater
//     $(".incbtn, .decbtn, .regbtn").prop("disabled", false);
//     $(".incbtn, .decbtn, .regbtn").css("opacity", "1"); // Restore button opacity
//   }
// }



$(document).ready(function () {
  // Check for saved theme in cookies, otherwise set default to light
  const savedTheme = getCookie("theme") || "theme-light";
  changeTheme(savedTheme, $(`.theme-btn[data-theme="${savedTheme}"]`));

  $(".theme-btn").on("click", function (event) {
    event.preventDefault();
    const theme = $(this).data("theme");
    changeTheme(theme, $(this));
  });
});

function changeTheme(themeClass, $buttonElement) {
  if (isOverlayVisible()) return;

  // Remove active class from all buttons
  $(".theme-btn").removeClass("activetheme");

  // Remove existing theme classes from body
  $("body")
    .removeClass(function (index, className) {
      return (className.match(/(^|\s)theme-\S+/g) || []).join(" ");
    });

  // Add the new theme class
  $("body").addClass(themeClass);

  // Add active class to the clicked button
  $buttonElement.addClass("activetheme");

  // Save the selected theme to cookies
  setCookie("theme", themeClass, 30);
  handleResponsiveStyles();
}

// Function to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
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
  }else if (viewportWidth >= 992 && viewportWidth < 1199) {
    loadCSS("content/css/Responsive-XL.css");
  }
}

// Utility function to load CSS dynamically
function loadCSS(href) {
  $("<link>")
    .attr({
      rel: "stylesheet",
      type: "text/css",
      href: href,
      "data-responsive": true,
    })
    .appendTo("head");
}

// Call this function on window resize and initial load
$(window).on("resize", handleResponsiveStyles);
$(document).ready(handleResponsiveStyles);

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

$(document).ready(function () {
  $("#First .parent-menu a").on("click", function (event) {
    event.stopPropagation(); 
  });

  $(".parent-menu.hvrmnu.parentmenu1").on("click", function () {
    $(".innoffcan").offcanvas("show"); 
  });

  $(".innoffcan").on("hidden.bs.offcanvas", function () {
    $("#First").offcanvas("show"); 
  });
});

$(document).ready(function () {
  $(".menu").click(function () {
    $("#First").addClass("offtrans");
  });

  $("#First .btn-close").click(function () {
    $("#First").removeClass("offtrans");
  });
});





$(document).ready(function(){

  $('.offerItemTitle').click(function(){

    $(this).parents('.offerslide').children('.offerItem').removeClass('active');
    $(this).parents('.offerslide').children('.offerItem').children('.offerItemTitle').removeClass('hide');
    $(this).parent('.offerItem').addClass('active');
    $(this).addClass('hide');

  });



});



