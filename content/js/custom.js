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
  } else if (viewportWidth >= 576 && viewportWidth <= 767) {
    loadCSS("content/css/Responsive-Desktop.css");
  } else if (viewportWidth >= 768 && viewportWidth <= 991) {
    loadCSS("content/css/Responsive-Leptop.css");
  }else if (viewportWidth >= 992 && viewportWidth <= 1199) {
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


document.querySelectorAll('.maintabdv li').forEach(function(li) {
  li.addEventListener('click', function() {
      // Remove 'active' class from all li elements
      document.querySelectorAll('.maintabdv li').forEach(function(item) {
          item.classList.remove('active');
      });
      // Add 'active' class to the clicked li
      this.classList.add('active');
  });
});

// counter number

    document.addEventListener("DOMContentLoaded", function() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = +counter.getAttribute('data-speed');
            const increment = target / (2000 / speed); // Adjust based on speed

            const updateCount = () => {
                const count = +counter.innerText;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, speed); // Use the individual speed
                } else {
                    counter.innerText = target; // Ensure it ends on the target value
                }
            };

            updateCount();
        });
    });


// timeline slider

jQuery(function () {
  const $slider1 = jQuery(".timeline .slick-slider");
  const $slider2 = jQuery(".yeartimeslide");
  const $scrollbarHandle = $('.os-scrollbar-handle');
  const totalSlides = 20; // Total number of slides (0 to 19)
  const totalDots = 20; // Total number of dots
  const $dotsContainer = $('.horizontal-scroll-border');

  $(document).ready(function() {
    // Generate dots dynamically
    for (let i = 0; i < totalDots; i++) {
      const dot = $('<div class="rounded-dots-scrollbar"></div>');
      if (i === 0) {
        dot.addClass('active'); // Set the active class on the first dot
      }
      $dotsContainer.append(dot);
    }

    // Initialize the first slider with draggable option set to false
    $slider1.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: false,
      draggable: false // Disable dragging
    });

    // Initialize the second slider with draggable option set to false
    $slider2.slick({
      vertical: true,
      infinite: false,
      centerMode: true,
      centerPadding: '20px',
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false // Disable dragging
    });

    function syncSlides(currentSlide) {
      $slider1.slick('slickGoTo', currentSlide);
      $slider2.slick('slickGoTo', currentSlide);
      updateScrollbar(currentSlide);
      updateActiveDot(currentSlide);
    }

    function updateScrollbar(currentSlide) {
      const scrollbarWidth = $('.os-scrollbar-track').width();
      const handleWidth = $scrollbarHandle.width();
      const position = (currentSlide / (totalSlides - 1)) * (scrollbarWidth - handleWidth);
      $scrollbarHandle.css({
        left: position,
        transition: 'left 0.7s' // Smooth transition
      });
    }

    function updateActiveDot(currentSlide) {
      $('.rounded-dots-scrollbar').removeClass('active'); // Remove active class from all dots
      $('.rounded-dots-scrollbar').eq(currentSlide).addClass('active'); // Add active class to the current dot
    }

    // Handle wheel event
    function handleWheel(event) {
      event.preventDefault();
      const currentSlide = $slider1.slick('slickCurrentSlide');
      let newSlide;

      const delta = event.originalEvent.deltaY;

      if (delta > 0) {
        // Scroll down
        newSlide = Math.min(currentSlide + 1, totalSlides - 1);
      } else {
        // Scroll up
        newSlide = Math.max(currentSlide - 1, 0);
      }

      syncSlides(newSlide);
    }

    // Handle touch events
    function handleTouchStart(event) {
      const touch = event.originalEvent.touches[0];
      this.startY = touch.clientY;
    }

    function handleTouchMove(event) {
      const touch = event.originalEvent.touches[0];
      const deltaY = this.startY - touch.clientY;

      if (Math.abs(deltaY) > 10) {
        event.preventDefault();
        const currentSlide = $slider1.slick('slickCurrentSlide');
        let newSlide;

        if (deltaY > 0) {
          // Swipe up
          newSlide = Math.min(currentSlide + 1, totalSlides - 1);
        } else {
          // Swipe down
          newSlide = Math.max(currentSlide - 1, 0);
        }

        syncSlides(newSlide);
      }
    }

    // Attach event listeners
    $slider1.on('wheel', handleWheel);
    $slider2.on('wheel', handleWheel);

    // Touch events for mobile
    $slider1.on('touchstart', handleTouchStart);
    $slider1.on('touchmove', handleTouchMove);
    $slider2.on('touchstart', handleTouchStart);
    $slider2.on('touchmove', handleTouchMove);

    // Scrollbar dragging functionality
    $scrollbarHandle.on('mousedown', function (e) {
      const scrollbarWidth = $('.os-scrollbar-track').width();
      const handleWidth = $(this).width();

      $(document).on('mousemove', function (event) {
        let newPosition = event.pageX - $scrollbarHandle.parent().offset().left;
        newPosition = Math.max(0, Math.min(newPosition, scrollbarWidth - handleWidth));

        const currentSlide = Math.floor((newPosition / (scrollbarWidth - handleWidth)) * (totalSlides - 1));
        syncSlides(currentSlide);
      });

      $(document).on('mouseup', function () {
        $(document).off('mousemove');
      });

      return false; // Prevent text selection
    });

    // Click event for dots
    $('.rounded-dots-scrollbar').on('click', function() {
      const dotIndex = $(this).index();
      syncSlides(dotIndex);
    });

    $('.yeartimeslide').on('afterChange', function(event, slick, currentSlide) {
      if (currentSlide >= 7) {
        $('.rgthd').addClass('changed');
      } else {
        $('.rgthd').removeClass('changed');
      }
    });
  });
});
