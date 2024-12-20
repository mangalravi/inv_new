$(document).ready(function () {
  checkCookieConsent(),
    applyStoredTheme(),
    applyStoredFontSize(),
    handleResponsiveStyles(),
    $(window).on("resize", function () {
      handleResponsiveStyles();
    }),
    $(".incbtn").on("click", function () {
      adjustRootFontSize(1.08);
    }),
    $(".decbtn").on("click", function () {
      adjustRootFontSize(1 / 1.08);
    }),
    $(".regbtn").on("click", function () {
      resetRootFontSize();
    });
});
const sizeChangePercentage = 0.08,
  minFontSize = 13.54,
  maxFontSize = 18.66;
function getRootFontSize() {
  const e = getComputedStyle(document.documentElement).getPropertyValue(
    "--bs-body-font-size"
  );
  return parseFloat(e);
}
function adjustRootFontSize(e) {
  let t = getRootFontSize();
  (t *= e),
    (t = Math.max(minFontSize, Math.min(maxFontSize, t))),
    document.documentElement.style.setProperty("--bs-body-font-size", `${t}px`),
    storeRootFontSize(t);
}
function resetRootFontSize() {
  document.documentElement.style.setProperty("--bs-body-font-size", "16px"),
    storeRootFontSize(16);
}
function storeRootFontSize(e) {
  localStorage.setItem("rootFontSize", e);
}
function applyStoredFontSize() {
  const e = localStorage.getItem("rootFontSize");
  e &&
    document.documentElement.style.setProperty("--bs-body-font-size", `${e}px`);
}
function changeTheme(e, t) {
  isOverlayVisible() ||
    ($(".theme-btn").removeClass("activetheme"),
    $("body").removeClass(function (e, t) {
      return (t.match(/(^|\s)theme-\S+/g) || []).join(" ");
    }),
    $("body").addClass(e),
    t.addClass("activetheme"),
    setCookie("theme", e, 30),
    handleResponsiveStyles());
}
function getCookie(e) {
  const t = `; ${document.cookie}`.split(`; ${e}=`);
  if (2 === t.length) return t.pop().split(";").shift();
}
function acceptCookies() {
  $("#cookieConsent").hide(),
    $("#overlay").hide(),
    setCookie("cookieConsent", "accepted", 30);
}
function rejectCookies() {
  $("#cookieConsent").hide(),
    $("#overlay").hide(),
    setCookie("cookieConsent", "rejected", 30);
}
function setCookie(e, t, o) {
  let n = "";
  if (o) {
    const e = new Date();
    e.setTime(e.getTime() + 24 * o * 60 * 60 * 1e3),
      (n = "; expires=" + e.toUTCString());
  }
  document.cookie = `${e}=${t || ""}${n}; path=/`;
}
function getCookie(e) {
  const t = e + "=",
    o = document.cookie.split(";");
  for (let e = 0; e < o.length; e++) {
    let n = o[e].trim();
    if (0 === n.indexOf(t)) return n.substring(t.length, n.length);
  }
  return null;
}
function checkCookieConsent() {
  const e = getCookie("cookieConsent");
  "accepted" !== e && "rejected" !== e
    ? ($("#cookieConsent").show(), $("#overlay").show())
    : ($("#cookieConsent").hide(), $("#overlay").hide());
}
function applyStoredTheme() {
  const e = getCookie("theme");
  if (e)
    $("body").addClass(e),
      $(`.theme-btn[data-theme="${e}"]`).addClass("activetheme");
  else {
    const e = "theme-light";
    $("body").addClass(e);
    const t = $(`.theme-btn[data-theme="${e}"]`);
    t.length && t.addClass("activetheme");
  }
  handleResponsiveStyles();
}
function handleResponsiveStyles() {
  const e = $(window).width(),
    t = getCookie("theme") || "theme-light";
  $("link[data-responsive]").remove(),
    loadCSS("content/css/custom.css"),
    "theme-dark" === t
      ? loadCSS("content/css/Dark-Theme.css")
      : "theme-high-contrast" === t && loadCSS("content/css/High-Contrast.css"),
    e < 576
      ? loadCSS("content/css/Responsive-Mobile.css")
      : e >= 576 && e <= 767
      ? loadCSS("content/css/Responsive-Desktop.css")
      : e >= 768 && e <= 991
      ? loadCSS("content/css/Responsive-Leptop.css")
      : e >= 992 && e <= 1199 && loadCSS("content/css/Responsive-XL.css");
}
function loadCSS(e) {
  $("<link>")
    .attr({
      rel: "stylesheet",
      type: "text/css",
      href: e,
      "data-responsive": !0,
    })
    .appendTo("head");
}
function loadCSS(e) {
  $(`link[href="${e}"]`).length ||
    $("<link>")
      .attr("rel", "stylesheet")
      .attr("href", e)
      .attr("data-responsive", !0)
      .appendTo("head");
}
function isOverlayVisible() {
  return $("#overlay").is(":visible");
}
$(document).ready(function () {
  const e = getCookie("theme") || "theme-light";
  changeTheme(e, $(`.theme-btn[data-theme="${e}"]`)),
    $(".theme-btn").on("click", function (e) {
      e.preventDefault();
      changeTheme($(this).data("theme"), $(this));
    });
}),
  $(window).on("resize", handleResponsiveStyles),
  $(document).ready(handleResponsiveStyles),
  $(window).scroll(function () {
    $(this).scrollTop() >= 250
      ? $(".nvbrhdr").addClass("bg-white")
      : $(".nvbrhdr").removeClass("bg-white");
  }),
  $(document).ready(function () {
    $(".gallery").slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: !0,
      autoplaySpeed: 0,
      speed: 3e3,
      infinite: !0,
      arrows: !1,
      cssEase: "linear",
      swipe: !1,
      pauseOnHover: !1,
    }),
      $(".gallery").on("mousedown", function (e) {
        e.preventDefault();
      }),
      $(".gallery").on("click", function (e) {
        e.preventDefault();
      });
  }),
  $(function () {
    $(".slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: !1,
      arrows: !1,
      autoplay: !0,
      speed: 500,
      fade: !0,
      autoplaySpeed: 3e3,
    }),
      $(".slider").on("beforeChange", function (e, t, o, n) {
        $(".thumbnails .owl-item").removeClass("active"),
          $('.thumbnails .owl-item[data-slide="' + n + '"]').addClass("active");
      }),
      $(".thumbnails .owl-item").click(function () {
        var e = $(this).data("slide");
        $(".slider").slick("slickGoTo", e),
          $(".thumbnails .owl-item").removeClass("active"),
          $(this).addClass("active");
      }),
      $(".play-pause").data("paused", !0),
      $(".play-icon").hide(),
      $(".pause-icon").show(),
      $(".play-pause").click(function () {
        var e = $(this).data("paused"),
          t = $(".thumbnails .owl-item.active");
        e
          ? ($(".slider").slick("slickPause"),
            $(this).data("paused", !1),
            $(".play-icon").show(),
            $(".pause-icon").hide(),
            t.addClass("paused"))
          : ($(".slider").slick("slickPlay"),
            $(this).data("paused", !0),
            $(".play-icon").hide(),
            $(".pause-icon").show(),
            t.removeClass("paused"));
      }),
      $(".testimonialslide").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: !0,
        arrows: !1,
        autoplay: !0,
        speed: 2e3,
        fade: !1,
        autoplaySpeed: 3e3,
      });
  }),
  $(document).ready(function () {
    $("#First .parent-menu a").on("click", function (e) {
      e.stopPropagation();
    }),
      $(".parent-menu.hvrmnu.parentmenu1").on("click", function () {
        $(".innoffcan").offcanvas("show");
      }),
      $(".innoffcan").on("hidden.bs.offcanvas", function () {
        $("#First").offcanvas("show");
      });
  }),
  $(document).ready(function () {
    $(".menu").click(function () {
      $("#First").addClass("offtrans"),
        $("#First").hasClass("offtrans") &&
          $("html").addClass("overflow-hidden");
    }),
      $("#First .btn-close").click(function () {
        $("#First").removeClass("offtrans"),
          $("html").removeClass("overflow-hidden");
      });
  }),
  document.querySelectorAll(".maintabdv li").forEach(function (e) {
    e.addEventListener("click", function () {
      document.querySelectorAll(".maintabdv li").forEach(function (e) {
        e.classList.remove("active");
      }),
        this.classList.add("active");
    });
  }),
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counterElement = entry.target;
            if (!counterElement.classList.contains("counted")) {
              const t = +counterElement.getAttribute("data-target"),
                o = +counterElement.getAttribute("data-speed"),
                n = t / (2e3 / o),
                s = () => {
                  const i = +counterElement.innerText;
                  if (i < t) {
                    counterElement.innerText = Math.ceil(i + n);
                    setTimeout(s, o);
                  } else {
                    counterElement.innerText = t;
                  }
                };
              s();
              counterElement.classList.add("counted");
            }
            observer.unobserve(counterElement);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".counter").forEach((counter) => {
      observer.observe(counter);
    });
  }),
  jQuery(function () {
    const e = jQuery(".timeline .slick-slider"),
      t = jQuery(".yeartimeslide"),
      o = $(".os-scrollbar-handle"),
      n = $(".horizontal-scroll-border");
    $(document).ready(function () {
      for (let e = 0; e < 20; e++) {
        const t = $('<div class="rounded-dots-scrollbar"></div>');
        0 === e && t.addClass("active"), n.append(t);
      }
      function s(n) {
        e.slick("slickGoTo", n),
          t.slick("slickGoTo", n),
          (function (e) {
            const t = $(".os-scrollbar-track").width(),
              n = o.width(),
              s = (e / 19) * (t - n);
            o.css({ left: s, transition: "left 0.7s" });
          })(n),
          (function (e) {
            $(".rounded-dots-scrollbar").removeClass("active"),
              $(".rounded-dots-scrollbar").eq(e).addClass("active");
          })(n);
      }
      function i(t) {
        const o = e.slick("slickCurrentSlide");
        let n;
        (n =
          t.originalEvent.deltaY > 0
            ? Math.min(o + 1, 19)
            : Math.max(o - 1, 0)),
          n !== o && (t.preventDefault(), s(n));
      }
      function a() {
        $(this).on("wheel", i);
      }
      function l() {
        $(this).off("wheel", i);
      }
      e.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: !1,
        dots: !1,
        infinite: !1,
        draggable: !1,
      }),
        t.slick({
          vertical: !0,
          infinite: !1,
          centerMode: !0,
          centerPadding: "20px",
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: !1,
          draggable: !1,
        }),
        e.on("mouseenter", a),
        e.on("mouseleave", l),
        t.on("mouseenter", a),
        t.on("mouseleave", l),
        o.on("mousedown touchstart", function (e) {
          e.preventDefault();
          const t = $(this),
            o = (e.pageX || e.originalEvent.touches[0].pageX, t.width()),
            n = t.parent().width();
          return (
            $(document).on("mousemove touchmove", function (e) {
              let i =
                (e.pageX || e.originalEvent.touches[0].pageX) -
                t.parent().offset().left;
              i = Math.max(0, Math.min(i, n - o));
              s(Math.floor((i / (n - o)) * 19)), t.css({ left: i });
            }),
            $(document).on("mouseup touchend", function () {
              $(document).off("mousemove touchmove");
            }),
            !1
          );
        }),
        $(".rounded-dots-scrollbar").on("click", function () {
          s($(this).index());
        }),
        $(".yeartimeslide").on("afterChange", function (e, t, o) {
          o >= 7
            ? $(".rgthd").addClass("changed")
            : $(".rgthd").removeClass("changed");
        });
    });
  }),
  document.addEventListener("DOMContentLoaded", function () {
    const e = document.getElementById("submitBtn");
    e &&
      e.addEventListener("click", function (e) {
        e.preventDefault(),
          t.forEach((e) => {
            document.getElementById(e).style.display = "none";
          });
        const o = {
          fullName: {
            value: document.getElementById("fullName").value.trim(),
            errorId: "fullNameError",
            validate: (e) => e.length >= 3,
            errorMessage: "Please enter your name",
          },
          email: {
            value: document.getElementById("email").value.trim(),
            errorId: "emailError",
            validate: (e) =>
              /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|.+\.in)$/.test(e),
            errorMessage: "Enter a valid email",
          },
          phone: {
            value: document.getElementById("phone").value.trim(),
            errorId: "phoneError",
            validate: (e) => /^[0-9]{10}$/.test(e),
            errorMessage: "Enter a valid phone number",
          },
        };
        let n = !0;
        for (const e in o)
          o[e].validate(o[e].value) ||
            ((document.getElementById(o[e].errorId).textContent =
              o[e].errorMessage),
            (document.getElementById(o[e].errorId).style.display = "block"),
            (n = !1));
        n &&
          (function (e) {
            const t = document.getElementById("successMessage");
            (t.textContent = e),
              (t.style.display = "block"),
              t.classList.add("success"),
              setTimeout(() => {
                (t.style.display = "none"), location.reload();
              }, 1e3);
          })("Form submitted successfully!");
      });
    const t = ["fullNameError", "emailError", "phoneError"];
    function o(e, t, o) {
      const n = document.getElementById(e);
      n &&
        n.addEventListener("input", function () {
          const e = t(this.value.trim());
          document.getElementById(o).style.display = e ? "none" : "block";
        });
    }
    o("fullName", (e) => e.length >= 3, "fullNameError"),
      o(
        "email",
        (e) => /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|.+\.in)$/.test(e),
        "emailError"
      );
    const n = document.getElementById("phone");
    n &&
      n.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
        const e = /^[0-9]{10}$/.test(this.value);
        document.getElementById("phoneError").style.display = e
          ? "none"
          : "block";
      });
  });

//onscroll animation
// common IntersectionObserver callback
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("paused");
    }
  });
};

const observerOptions = {
  threshold: 0.5,
};
const section = document.querySelector(".counternum-section");
if (section) {
  const sectionObserver = new IntersectionObserver(
    observerCallback,
    observerOptions
  );
  sectionObserver.observe(section);
}
const utilities = document.querySelectorAll(".imgouterdv");
utilities.forEach((utility) => {
  const utilityObserver = new IntersectionObserver(
    observerCallback,
    observerOptions
  );
  utilityObserver.observe(utility);
});
