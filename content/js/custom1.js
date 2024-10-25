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

    // Check the class after adding it
    if ($("#First").hasClass("offtrans")) {
      $("html").addClass("overflow-hidden");
    } 
  });

  $("#First .btn-close").click(function () {
    $("#First").removeClass("offtrans");

    // Remove the overflow-hidden class when closing
    $("html").removeClass("overflow-hidden");
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

    // Initialize the first slider
    $slider1.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: false,
      draggable: false
    });

    // Initialize the second slider
    $slider2.slick({
      vertical: true,
      infinite: false,
      centerMode: true,
      centerPadding: '20px',
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false
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
        transition: 'left 0.7s'
      });
    }

    function updateActiveDot(currentSlide) {
      $('.rounded-dots-scrollbar').removeClass('active');
      $('.rounded-dots-scrollbar').eq(currentSlide).addClass('active');
    }

    // Handle mouse wheel event
    function handleWheel(event) {
      event.preventDefault();
      const currentSlide = $slider1.slick('slickCurrentSlide');
      let newSlide;

      const delta = event.originalEvent.deltaY;

      if (delta > 0) {
        newSlide = Math.min(currentSlide + 1, totalSlides - 1);
      } else {
        newSlide = Math.max(currentSlide - 1, 0);
      }

      syncSlides(newSlide);
    }

    // Handle mouse and touch dragging
    function handleDragStart(e) {
      e.preventDefault();
      const $this = $(this);
      const startX = e.pageX || e.originalEvent.touches[0].pageX;
      const handleWidth = $this.width();
      const scrollbarWidth = $this.parent().width();

      $(document).on('mousemove touchmove', function (moveEvent) {
        const currentX = moveEvent.pageX || moveEvent.originalEvent.touches[0].pageX;
        let newPosition = currentX - $this.parent().offset().left;
        newPosition = Math.max(0, Math.min(newPosition, scrollbarWidth - handleWidth));

        const currentSlide = Math.floor((newPosition / (scrollbarWidth - handleWidth)) * (totalSlides - 1));
        syncSlides(currentSlide);
        $this.css({ left: newPosition });
      });

      $(document).on('mouseup touchend', function () {
        $(document).off('mousemove touchmove');
      });

      return false; // Prevent text selection
    }

    // Attach event listeners
    $scrollbarHandle.on('mousedown touchstart', handleDragStart);
    $slider1.on('wheel', handleWheel);
    $slider2.on('wheel', handleWheel);

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



// contact form validation

document.getElementById('submitBtn').addEventListener('click', function(event) {
  event.preventDefault(); 
  clearErrorMessages();

  const fields = {
    fullName: {
      value: document.getElementById('fullName').value.trim(),
      errorId: 'fullNameError',
      validate: (value) => value.length >= 3,
      errorMessage: "Please enter your name"
    },
    email: {
      value: document.getElementById('email').value.trim(),
      errorId: 'emailError',
      validate: (value) => /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|.+\.in)$/.test(value),
      errorMessage: "Enter a valid email"
    },
    phone: {
      value: document.getElementById('phone').value.trim(),
      errorId: 'phoneError',
      validate: (value) => /^[0-9]{10}$/.test(value),
      errorMessage: "Enter a valid phone number"
    }
  };
  let isValid = true;

  for (const field in fields) {
    if (!fields[field].validate(fields[field].value)) {
      document.getElementById(fields[field].errorId).textContent = fields[field].errorMessage;
      document.getElementById(fields[field].errorId).style.display = 'block';
      isValid = false;
    }
  }

  if (isValid) {
    showSuccessMessage("Form submitted successfully!");
  }
});

const inputArray = ['fullNameError', 'emailError', 'phoneError'];

// Clear error messages
function clearErrorMessages() {
  inputArray.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

// Show success message and reload the page
function showSuccessMessage(message) {
  const successMessageDiv = document.getElementById('successMessage');
  successMessageDiv.textContent = message;
  successMessageDiv.style.display = 'block';
  successMessageDiv.classList.add('success'); 

  setTimeout(() => {
    successMessageDiv.style.display = 'none';
    location.reload(); 
  }, 1000);
}

// Input validation
function setupInputValidation(inputId, validateFn, errorId) {
  document.getElementById(inputId).addEventListener('input', function() {
    const isValid = validateFn(this.value.trim());
    document.getElementById(errorId).style.display = isValid ? 'none' : 'block';
  });
}

// Validate inputs
setupInputValidation('fullName', (value) => value.length >= 3, 'fullNameError');
setupInputValidation('email', (value) => /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|.+\.in)$/.test(value), 'emailError');

document.getElementById('phone').addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
  const isValid = /^[0-9]{10}$/.test(this.value);
  document.getElementById('phoneError').style.display = isValid ? 'none' : 'block';
});
