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



$(document).ready(function () {
  var owl = $(".loop").owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 20,
    dots: true,
    autoplay: false,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    smartSpeed: 800,
    onInitialized: function (event) {
      updateDots(event);
      updateActiveDot(event); 
    },
    onTranslate: function (event) {
      updateActiveDot(event); 
    },
  });

  function updateDots(event) {
    var dotContent = [
      {
        text: "Next-Gen Utility for Smarter Cities!",
        imgSrc: "content/images/banner1-thumbnail.jpg",
      },
      {
        text: "Next-Gen Utility for Smarter Cities!",
        imgSrc: "content/images/banner1-thumbnail.jpg",
      },
      {
        text: "Next-Gen Utility for Smarter Cities!",
        imgSrc: "content/images/banner1-thumbnail.jpg",
      },
      {
        text: "Next-Gen Utility for Smarter Cities!",
        imgSrc: "content/images/banner1-thumbnail.jpg",
      },
    ];

    var $dotsContainer = $(event.target).find(".owl-dots");

    $dotsContainer.html('');

    dotContent.forEach(function(content, index) {
      var $button = $(`
        <button role="button" class="owl-dot" data-index="${index}">
          <img src="${content.imgSrc}" alt="Image ${index + 1}">
          <span>${content.text}</span>
        </button>
      `);

      $dotsContainer.append($button); // Append button to dots container
    });

    $dotsContainer.find(".owl-dot").on('click', function() {
      var index = $(this).data('index');
      owl.trigger('to.owl.carousel', [index,800]); // Move to the corresponding slide
    });
  }

  function updateActiveDot(event) {
    var $dotsContainer = $(event.target).find(".owl-dots");
    var $dots = $dotsContainer.find(".owl-dot");
    var activeIndex = $(event.target).find(".owl-item.active").index();

    if (activeIndex < 0) activeIndex = 0;

    $dots.removeClass('active');

    $dots.eq(activeIndex).addClass('active');
  }
});




