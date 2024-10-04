// $(document).ready(function () {
//   checkCookieConsent();
//   applyStoredTheme();
//   applyStoredFontSizes();
//   handleResponsiveStyles();

//   $(window).on("resize", function () {
//     handleResponsiveStyles();
//     applyStoredFontSizes();
//   });

//   $("#incbtn").on("click", function () {
//     changeSizeByBtn(1, ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara");
//   });

//   $("#decbtn").on("click", function () {
//     changeSizeByBtn(-1, ".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara");
//   });

//   $("#regbtn").on("click", function () {
//     resetSize(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara");
//   });

//   $(".theme-btn").on("click", function (event) {
//     event.preventDefault();
//     const theme = $(this).data("theme");
//     changeTheme(theme, $(this));
//   });

//   const $toggleImage = $(".tglimg");
//   const $menu = $(".selected");

//   if ($toggleImage.length && $menu.length) {
//     $toggleImage.on("click", function (event) {
//       event.stopPropagation();
//       $menu.toggleClass("active");
//     });

//     $(document).on("click", function (event) {
//       if (!$(event.target).closest(".topnav").length && $menu.hasClass("active")) {
//         $menu.removeClass("active");
//       }
//     });

//     $menu.on("mouseover", function (event) {
//       event.stopPropagation();
//       $menu.addClass("active");
//     });

//     $menu.on("mouseleave", function () {
//       $menu.removeClass("active");
//     });
//   }
// });

// const sizeChangePercentage = 0.16;
// const clickSteps = 2;

// function getFontSize($element) {
//   return parseFloat($element.css("font-size"));
// }

// function storeOriginalSize($element) {
//   const viewportWidth = $(window).width();
//   const key = `${getElementStorageKey($element)}-originalSize-${viewportWidth}`;
//   if (!localStorage.getItem(key)) {
//     localStorage.setItem(key, getFontSize($element));
//   }
// }

// function getOriginalSize($element) {
//   const viewportWidth = $(window).width();
//   const key = `${getElementStorageKey($element)}-originalSize-${viewportWidth}`;
//   const storedSize = localStorage.getItem(key);
//   return storedSize ? parseFloat(storedSize) : getFontSize($element);
// }

// function calculateIncrement(originalSize, minSize, maxSize) {
//   let totalRange = maxSize - minSize;
//   return totalRange / (clickSteps * 2);
// }

// function changeSizeByBtn(change, className) {
//   if (isOverlayVisible()) return;

//   $(className).each(function () {
//     const $element = $(this);
//     storeOriginalSize($element);

//     const originalSize = getOriginalSize($element);
//     const minSizeForElement = originalSize * (1 - sizeChangePercentage);
//     const maxSizeForElement = originalSize * (1 + sizeChangePercentage);
//     const currentSize = getFontSize($element);

//     const increment = calculateIncrement(originalSize, minSizeForElement, maxSizeForElement);
//     let newSize = currentSize + change * increment;

//     newSize = Math.max(minSizeForElement, Math.min(maxSizeForElement, newSize));

//     localStorage.setItem(`${getElementStorageKey($element)}-${$(window).width()}`, newSize);
//     $element.css("font-size", newSize + "px");
//   });
// }

// function resetSize(className) {
//   if (isOverlayVisible()) return;

//   $(className).each(function () {
//     const $element = $(this);
//     const originalSize = getOriginalSize($element);
//     $element.css("font-size", originalSize + "px");
//     localStorage.removeItem(`${getElementStorageKey($element)}-${$(window).width()}`);
//   });
// }

// function changeTheme(themeClass, $buttonElement) {
//   if (isOverlayVisible()) return;

//   if ($buttonElement.length) {
//     $(".theme-btn").removeClass("activetheme");

//     $("body").removeClass(function (index, className) {
//       return (className.match(/(^|\s)theme-\S+/g) || []).join(" ");
//     }).removeClass("activetheme");

//     $("body").addClass(themeClass);
//     $buttonElement.addClass("activetheme");

//     setCookie("theme", themeClass, 30);
//     handleResponsiveStyles();
//   } else {
//     console.error('buttonElement is not a valid element or missing classList property');
//   }
// }

// function acceptCookies() {
//   $("#cookieConsent").hide();
//   $("#overlay").hide();
//   setCookie("cookieConsent", "accepted", 30);
// }

// function rejectCookies() {
//   $("#cookieConsent").hide();
//   $("#overlay").hide();
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
//     let c = ca[i].trim();
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

// function checkCookieConsent() {
//   const cookieConsent = getCookie("cookieConsent");
//   if (cookieConsent !== "accepted" && cookieConsent !== "rejected") {
//     $("#cookieConsent").show();
//     $("#overlay").show();
//   } else {
//     $("#cookieConsent").hide();
//     $("#overlay").hide();
//   }
// }

// function applyStoredTheme() {
//   const theme = getCookie("theme");
//   if (theme) {
//     $("body").addClass(theme);
//     $(`.theme-btn[data-theme="${theme}"]`).addClass("activetheme");
//   } else {
//     const defaultTheme = "theme-light";
//     $("body").addClass(defaultTheme);
//     const $defaultThemeButton = $(`.theme-btn[data-theme="${defaultTheme}"]`);
//     if ($defaultThemeButton.length) {
//       $defaultThemeButton.addClass("activetheme");
//     }
//   }
//   handleResponsiveStyles();
// }

// function applyStoredFontSizes() {
//   $(".sec-head, .main-para, .liItem, .hyperelink, .cardttl, .cardpara").each(function () {
//     const $element = $(this);
//     const viewportWidth = $(window).width();
//     const storedSize = localStorage.getItem(`${getElementStorageKey($element)}-${viewportWidth}`);
//     if (storedSize) {
//       $element.css("font-size", storedSize + "px");
//     } else {
//       const computedSize = getFontSize($element);
//       localStorage.setItem(`${getElementStorageKey($element)}-originalSize-${viewportWidth}`, computedSize);
//       $element.css("font-size", computedSize + "px");
//     }
//   });
// }

// function getElementStorageKey($element) {
//   const className = $element.attr("class").split(" ").find((cls) => cls);
//   return className;
// }

// function isOverlayVisible() {
//   return $("#overlay").is(":visible");
// }

// function handleResponsiveStyles() {
//   const viewportWidth = $(window).width();
//   const theme = getCookie("theme") || "theme-light";

//   $("link[data-responsive]").remove();

//   loadCSS("content/css/custom.css");

//   if (theme === "theme-dark") {
//     loadCSS("content/css/Dark-Theme.css");
//   } else if (theme === "theme-high-contrast") {
//     loadCSS("content/css/High-Contrast.css");
//   }

//   if (viewportWidth < 576) {
//     loadCSS("content/css/Responsive-Mobile.css");
//   } else if (viewportWidth >= 576 && viewportWidth <= 767) {
//     loadCSS("content/css/Responsive-Desktop.css");
//   } else if (viewportWidth >= 768 && viewportWidth <= 991) {
//     loadCSS("content/css/Responsive-Leptop.css");
//   }
// }

// function loadCSS(href) {
//   if (!$(`link[href="${href}"]`).length) {
//     $("<link>")
//       .attr("rel", "stylesheet")
//       .attr("href", href)
//       .attr("data-responsive", true)
//       .appendTo("head");
//   }
// }

// $(document).ready(function () {
//   checkCookieConsent();
//   applyStoredTheme();
//   applyStoredFontSize();
//   handleResponsiveStyles();

//   $(window).on("resize", function () {
//     handleResponsiveStyles();
//   });

//   $("#incbtn").on("click", function () {
//     adjustRootFontSize(1.08); // Increase by 8%
//   });

//   $("#decbtn").on("click", function () {
//     adjustRootFontSize(1 / 1.08); // Decrease by approximately 8%
//   });

//   $("#regbtn").on("click", function () {
//     resetRootFontSize(); // Reset to default
//   });

//   $(".theme-btn").on("click", function (event) {
//     event.preventDefault();
//     const theme = $(this).data("theme");
//     changeTheme(theme, $(this));
//   });

//   const $toggleImage = $(".tglimg");
//   const $menu = $(".selected");

//   if ($toggleImage.length && $menu.length) {
//     $toggleImage.on("click", function (event) {
//       event.stopPropagation();
//       $menu.toggleClass("active");
//     });

//     $(document).on("click", function (event) {
//       if (!$(event.target).closest(".topnav").length && $menu.hasClass("active")) {
//         $menu.removeClass("active");
//       }
//     });

//     $menu.on("mouseover", function (event) {
//       event.stopPropagation();
//       $menu.addClass("active");
//     });

//     $menu.on("mouseleave", function () {
//       $menu.removeClass("active");
//     });
//   }
// });

// const sizeChangePercentage = 0.08;
// const clickSteps = 2;
// const minFontSize = 13.54;
// const maxFontSize = 18.66;

// function getRootFontSize() {
//   const fontSize = getComputedStyle(document.documentElement).getPropertyValue('--font-size');
//   return parseFloat(fontSize);
// }

// function adjustRootFontSize(factor) {
//   let rootFontSize = getRootFontSize();
//   rootFontSize *= factor;

//   // Ensure the font size is within min and max bounds
//   rootFontSize = Math.max(minFontSize, Math.min(maxFontSize, rootFontSize));

//   document.documentElement.style.setProperty('--font-size', `${rootFontSize}px`);
//   storeRootFontSize(rootFontSize);
// }

// function resetRootFontSize() {
//   const defaultFontSize = 16; // Default font size in pixels
//   document.documentElement.style.setProperty('--font-size', `${defaultFontSize}px`);
//   storeRootFontSize(defaultFontSize);
// }

// function storeRootFontSize(size) {
//   localStorage.setItem('rootFontSize', size);
// }

// function applyStoredFontSize() {
//   const storedSize = localStorage.getItem('rootFontSize');
//   if (storedSize) {
//     document.documentElement.style.setProperty('--font-size', `${storedSize}px`);
//   }
// }

// function changeTheme(themeClass, $buttonElement) {
//   if (isOverlayVisible()) return;

//   if ($buttonElement.length) {
//     $(".theme-btn").removeClass("activetheme");

//     $("body").removeClass(function (index, className) {
//       return (className.match(/(^|\s)theme-\S+/g) || []).join(" ");
//     }).removeClass("activetheme");

//     $("body").addClass(themeClass);
//     $buttonElement.addClass("activetheme");

//     setCookie("theme", themeClass, 30);
//     handleResponsiveStyles();
//   } else {
//     console.error('buttonElement is not a valid element or missing classList property');
//   }
// }

// function acceptCookies() {
//   $("#cookieConsent").hide();
//   $("#overlay").hide();
//   setCookie("cookieConsent", "accepted", 30);
// }

// function rejectCookies() {
//   $("#cookieConsent").hide();
//   $("#overlay").hide();
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
//     let c = ca[i].trim();
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

// function checkCookieConsent() {
//   const cookieConsent = getCookie("cookieConsent");
//   if (cookieConsent !== "accepted" && cookieConsent !== "rejected") {
//     $("#cookieConsent").show();
//     $("#overlay").show();
//   } else {
//     $("#cookieConsent").hide();
//     $("#overlay").hide();
//   }
// }

// function applyStoredTheme() {
//   const theme = getCookie("theme");
//   if (theme) {
//     $("body").addClass(theme);
//     $(`.theme-btn[data-theme="${theme}"]`).addClass("activetheme");
//   } else {
//     const defaultTheme = "theme-light";
//     $("body").addClass(defaultTheme);
//     const $defaultThemeButton = $(`.theme-btn[data-theme="${defaultTheme}"]`);
//     if ($defaultThemeButton.length) {
//       $defaultThemeButton.addClass("activetheme");
//     }
//   }
//   handleResponsiveStyles();
// }

// function handleResponsiveStyles() {
//   const viewportWidth = $(window).width();
//   const theme = getCookie("theme") || "theme-light";

//   $("link[data-responsive]").remove();

//   loadCSS("content/css/custom.css");

//   if (theme === "theme-dark") {
//     loadCSS("content/css/Dark-Theme.css");
//   } else if (theme === "theme-high-contrast") {
//     loadCSS("content/css/High-Contrast.css");
//   }

//   if (viewportWidth < 576) {
//     loadCSS("content/css/Responsive-Mobile.css");
//   } else if (viewportWidth >= 576 && viewportWidth <= 767) {
//     loadCSS("content/css/Responsive-Desktop.css");
//   } else if (viewportWidth >= 768 && viewportWidth <= 991) {
//     loadCSS("content/css/Responsive-Leptop.css");
//   }
// }

// function loadCSS(href) {
//   if (!$(`link[href="${href}"]`).length) {
//     $("<link>")
//       .attr("rel", "stylesheet")
//       .attr("href", href)
//       .attr("data-responsive", true)
//       .appendTo("head");
//   }
// }

// function isOverlayVisible() {
//   return $("#overlay").is(":visible");
// }

//last

$(document).ready(function () {
  checkCookieConsent();
  applyStoredTheme();
  applyStoredFontSize();
  handleResponsiveStyles();

  $(window).on("resize", function () {
    handleResponsiveStyles();
  });

  $("#incbtn").on("click", function () {
    adjustRootFontSize(1.08); // Increase by 8%
  });

  $("#decbtn").on("click", function () {
    adjustRootFontSize(1 / 1.08); // Decrease by approximately 8%
  });

  $("#regbtn").on("click", function () {
    resetRootFontSize(); // Reset to default
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
  } else if (viewportWidth >= 576 && viewportWidth <= 767) {
    loadCSS("content/css/Responsive-Desktop.css");
  } else if (viewportWidth >= 768 && viewportWidth <= 991) {
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

$("#closebtntop").click(function () {
  $(".topnav").css("display", "none");
});



// document.addEventListener("DOMContentLoaded", function () {
//   const playButton = document.querySelector(".owl-play");
//   const pauseButton = document.querySelector(".owl-pause");

//   pauseButton.addEventListener("click", function () {
//     pauseButton.style.display = "none";
//     playButton.style.display = "flex";
//   });

//   playButton.addEventListener("click", function () {
//     playButton.style.display = "none";
//     pauseButton.style.display = "flex";
//   });
// });

// $(document).ready(function() {
//   var bigimage = $("#big");
//   var thumbs = $("#thumbs");
//   //var totalslides = 10;
//   var syncedSecondary = true
//   bigimage
//     .owlCarousel({
//     items: 1,
//     slideSpeed: 2000,
//     nav: true,
//     autoplay: true,
//     dots: false,
//     loop: true,
//     responsiveRefreshRate: 200,
//     navText: [
//       '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
//       '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
//     ]
//   })
//     .on("changed.owl.carousel", syncPosition);

//   thumbs
//     .on("initialized.owl.carousel", function() {
//     thumbs
//       .find(".owl-item")
//       .eq(0)
//       .addClass("current");
//   })
//     .owlCarousel({
//     items: 4,
//     dots: true,
//     nav: true,
//     navText: [
//       '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
//       '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
//     ],
//     smartSpeed: 200,
//     slideSpeed: 500,
//     slideBy: 4,
//     responsiveRefreshRate: 100
//   })
//     .on("changed.owl.carousel", syncPosition2);

//   function syncPosition(el) {
//     //if loop is set to false, then you have to uncomment the next line
//     //var current = el.item.index;

//     //to disable loop, comment this block
//     var count = el.item.count - 1;
//     var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

//     if (current < 0) {
//       current = count;
//     }
//     if (current > count) {
//       current = 0;
//     }
//     //to this
//     thumbs
//       .find(".owl-item")
//       .removeClass("current")
//       .eq(current)
//       .addClass("current");
//     var onscreen = thumbs.find(".owl-item.active").length - 1;
//     var start = thumbs
//     .find(".owl-item.active")
//     .first()
//     .index();
//     var end = thumbs
//     .find(".owl-item.active")
//     .last()
//     .index();

//     if (current > end) {
//       thumbs.data("owl.carousel").to(current, 100, true);
//     }
//     if (current < start) {
//       thumbs.data("owl.carousel").to(current - onscreen, 100, true);
//     }
//   }

//   function syncPosition2(el) {
//     if (syncedSecondary) {
//       var number = el.item.index;
//       bigimage.data("owl.carousel").to(number, 100, true);
//     }
//   }

//   thumbs.on("click", ".owl-item", function(e) {
//     e.preventDefault();
//     var number = $(this).index();
//     bigimage.data("owl.carousel").to(number, 300, true);
//   });
//   $(".owl-item").eq(0).addClass("active");

//     // Handle fade transition manually
//     owl.on("changed.owl.carousel", function (event) {
//       var items = $(".owl-item");
//       items.removeClass("active");
//       items.eq(event.item.index).addClass("active");
//     });
  
//     // Play button functionality
//     $(".owl-play").on("click", function () {
//       owl.trigger("play.owl.autoplay"); // Starts autoplay
//     });
  
//     // Pause button functionality
//     $(".owl-pause").on("click", function () {
//       owl.trigger("stop.owl.autoplay"); // Stops autoplay
//     });
// });









document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".owl-play");
  const pauseButton = document.querySelector(".owl-pause");
  const bigimage = $("#big"); // Reference to the main carousel

  // Initial setup: Show play button and hide pause button
  playButton.style.display = "none";

  // Pause button functionality
  pauseButton.addEventListener("click", function () {
    bigimage.trigger('stop.owl.autoplay'); // Stops autoplay
    pauseButton.style.display = "none"; // Hide pause button
    playButton.style.display = "flex"; // Show play button
  });

  // Play button functionality
  playButton.addEventListener("click", function () {
    bigimage.trigger('play.owl.autoplay'); // Starts autoplay
    playButton.style.display = "none"; // Hide play button
    pauseButton.style.display = "flex"; // Show pause button
  });
});

// Carousel setup
$(document).ready(function() {
  var bigimage = $("#big");
  var thumbs = $("#thumbs");
  var syncedSecondary = true;

  // Main carousel
  bigimage.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: true,
    autoplay: true,
    dots: false,
    loop: true,
    responsiveRefreshRate: 200,
    navText: [
      '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
      '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
    ]
  }).on("changed.owl.carousel", syncPosition);

  // Thumbnails carousel
  thumbs.on("initialized.owl.carousel", function() {
    thumbs.find(".owl-item").eq(0).addClass("current");
  }).owlCarousel({
    items: 4,
    dots: true,
    nav: true,
    navText: [
      '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
      '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
    ],
    smartSpeed: 200,
    slideSpeed: 500,
    slideBy: 4,
    responsiveRefreshRate: 100
  }).on("changed.owl.carousel", syncPosition2);

  // Syncing the main carousel with thumbnails
  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    thumbs.find(".owl-item").removeClass("current").eq(current).addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs.find(".owl-item.active").first().index();
    var end = thumbs.find(".owl-item.active").last().index();

    if (current > end) {
      thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      bigimage.data("owl.carousel").to(number, 100, true);
    }
  }

  thumbs.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 300, true);
  });

  // Initial active class for thumbnails
  $(".owl-item", bigimage).eq(0).addClass("active").css("opacity", 1);
});











$(document).ready(function () {
  $(".client-slide").owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    nav: false,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      525: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 6,
      },
    },
  });
  $(".testimonialslide").owlCarousel({
    loop: true,
    autoplay: true,
    items:1,
    dots:true,
    smartSpeed: 700,
   });
});


$(window).scroll(function() {
  if ($(this).scrollTop() >= 100) {
      $(".nvbrhdr").addClass("bg-white");
  } else {
      $(".nvbrhdr").removeClass("bg-white");
  }
});
