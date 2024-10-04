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

document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".owl-play");
  const pauseButton = document.querySelector(".owl-pause");
  const bigimage = $("#big");

  playButton.style.display = "none";

  pauseButton.addEventListener("click", function () {
    bigimage.trigger("stop.owl.autoplay");
    pauseButton.style.display = "none";
    playButton.style.display = "flex";
  });

  playButton.addEventListener("click", function () {
    bigimage.trigger("play.owl.autoplay");
    playButton.style.display = "none";
    pauseButton.style.display = "flex";
  });
});

$(document).ready(function () {
  var bigimage = $("#big");
  var thumbs = $("#thumbs");
  var syncedSecondary = true;
  var isRemovingPrevClasses = false; // Track if we're in the process of removing prev classes
  var isFirstCycle = true; // Track if it's the first cycle

  bigimage
    .owlCarousel({
      items: 1,
      slideSpeed: 3000,
      nav: true,
      autoplay: true,
      dots: false,
      loop: true,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
    })
    .on("changed.owl.carousel", syncPosition);

  thumbs
    .on("initialized.owl.carousel", function () {
      // No initial "current" class to avoid premature marking
    })
    .owlCarousel({
      items: 4,
      dots: true,
      nav: true,
    })
    .on("changed.owl.carousel", syncPosition2);

  $(".play").on("click", function () {
    bigimage.trigger("play.owl.autoplay", [1000]);
  });

  $(".stop").on("click", function () {
    bigimage.trigger("stop.owl.autoplay");
  });

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }

    // Clear current class if we are removing "prev" classes
    if (!isRemovingPrevClasses) {
      if (!isFirstCycle) {
        thumbs.find(".owl-item").removeClass("current");
        thumbs.find(".owl-item").eq(current).addClass("current");
      }
    }

    // Add prev class to previous items
    addPrevClasses(current);

    // Check if cycle is complete
    if (current === 0 && !isRemovingPrevClasses) {
      removePrevClasses();
    }
  }

  function addPrevClasses(current) {
    const items = thumbs.find(".owl-item");

    // Clear previous "prev" classes first
    items.removeClass("prev");

    // Add "prev" class to the last 4 items including the current
    for (let i = 0; i <= Math.min(3, current); i++) {
      items.eq(current - i).addClass("prev");
    }
  }

  function removePrevClasses() {
    const items = thumbs.find(".owl-item");
    const totalItems = items.length;

    isRemovingPrevClasses = true; // Set the flag to true

    let removeCount = 0; // To track the number of removed classes
    const totalRemoveTime = 1600; // Total time for removal
    const steps = 4; // Number of steps to remove (4 items)

    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        const index = totalItems - 1 - i; // Get the index in reverse order
        if (items.eq(index).hasClass("prev")) {
          items.eq(index).removeClass("prev");
          removeCount++;

          // After removing the last "prev" class
          if (removeCount === steps) {
            isRemovingPrevClasses = false; // Reset the flag
            // Allow the current class to be added on the next transition
            if (!isFirstCycle) {
              bigimage.trigger("next.owl.carousel"); // Move to the next slide
            } else {
              isFirstCycle = false; // Mark first cycle as completed
            }
          }
        }
      }, (totalRemoveTime / steps) * i); // Timing for sequential removal
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      bigimage.data("owl.carousel").to(number, 500, true);
    }
  }

  thumbs.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 500, true);
  });

  // Initial setup for the active class
  $(".owl-item", bigimage).eq(0).addClass("active").css("opacity", 1);

  $(".owl-pause").on("click", function () {
    $(".owl-carousel .owl-item.current.active").addClass("paused");
  });
  $(".owl-play").on("click", function () {
    $(".owl-carousel .owl-item.current.active").removeClass("paused");
  });

  // extra
  $(".client-slide").owlCarousel({
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
    nav: false,
    smartSpeed: 3000,

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
    items: 1,
    dots: true,
    smartSpeed: 1200,
  });

  $(".owl-pause").on("click", function () {
    $(".owl-carousel .owl-item.current.active").addClass("paused");
  });
  $(".owl-play").on("click", function () {
    $(".owl-carousel .owl-item.current.active").removeClass("paused");
  });
});

$(window).scroll(function () {
  if ($(this).scrollTop() >= 250) {
    $(".nvbrhdr").addClass("bg-white");
  } else {
    $(".nvbrhdr").removeClass("bg-white");
  }
});

// particlesJS("particles-js", {
//   particles: {
//     number: { value: 80, density: { enable: true, value_area: 800 } },
//     color: { value: "#ffffff" },
//     shape: {
//       type: "circle",
//       stroke: { width: 0, color: "#000000" },
//       polygon: { nb_sides: 5 },
//       image: { src: "img/github.svg", width: 100, height: 100 },
//     },
//     opacity: {
//       value: 0.5,
//       random: false,
//       anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
//     },
//     size: {
//       value: 3,
//       random: true,
//       anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
//     },
//     line_linked: {
//       enable: true,
//       distance: 150,
//       color: "#ffffff",
//       opacity: 0.4,
//       width: 1,
//     },
//     move: {
//       enable: true,
//       speed: 6,
//       direction: "none",
//       random: false,
//       straight: false,
//       out_mode: "out",
//       bounce: false,
//       attract: { enable: false, rotateX: 600, rotateY: 1200 },
//     },
//   },
//   interactivity: {
//     detect_on: "canvas",
//     events: {
//       onhover: { enable: true, mode: "repulse" },
//       onclick: { enable: true, mode: "push" },
//       resize: true,
//     },
//     modes: {
//       grab: { distance: 400, line_linked: { opacity: 1 } },
//       bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
//       repulse: { distance: 200, duration: 0.4 },
//       push: { particles_nb: 4 },
//       remove: { particles_nb: 2 },
//     },
//   },
//   retina_detect: true,
// });
// var count_particles, stats, update;
// stats = new Stats();
// stats.setMode(0);
// stats.domElement.style.position = "absolute";
// stats.domElement.style.left = "0px";
// stats.domElement.style.top = "0px";
// document.body.appendChild(stats.domElement);
// count_particles = document.querySelector(".js-count-particles");
// update = function () {
//   stats.begin();
//   stats.end();
//   if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
//     count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
//   }
//   requestAnimationFrame(update);
// };
// requestAnimationFrame(update);
