document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesOffsetBefore: 20,
    slidesOffsetAfter: 20,
    spaceBetween: 24,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

  var swiper1 = new Swiper(".swiper1", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next1",
      prevEl: ".swiper-button-prev1",
    },
    slidesPerView: 1,
    spaceBetween: 24,
    paginationClickable: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
    },
  });
});

//accordien

document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const accordionItem = this.parentElement;
      const accordionContent = this.nextElementSibling;
      const isOpen = accordionItem.classList.contains("active");

      // Close all accordion items
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
        const content = item.querySelector(".accordion-content");
        content.style.maxHeight = null;
      });

      if (!isOpen) {
        accordionItem.classList.add("active");
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      }
    });
  });
});

(function ($) {
  "use strict";

  $(window).scroll(function () {
    if ($(window).scrollTop() >= 100) {
      $(".nvbrhdr").addClass("bg-white");
    } else {
      $(".nvbrhdr").removeClass("bg-white");
    }
  });
  $(document).ready(function () {
    $("#line").click(function () {
      $("#line").hide();
      $("#cross").show();
      $(".collapsenav.navbar-collapse").addClass("expanded").slideDown();
      $(".exbtn").show();
    });

    $("#cross").click(function () {
      $("#cross").hide();
      $("#line").show();
      $(".collapsenav.navbar-collapse").removeClass("expanded").slideUp();
      $(".exbtn").hide();
    });
  });
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  const parentMenus = document.querySelectorAll(".parent-menu");

  parentMenus.forEach((parentMenu) => {
    const submenu = parentMenu.querySelector(".submenu");
    const submenu1 = parentMenu.querySelector(".submenu1");

    parentMenu.addEventListener("click", function (event) {
      if (window.innerWidth <= 991) {
        event.preventDefault();

        if (submenu) {
          submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";
        }

        if (submenu1 && parentMenu.classList.contains("prodli")) {
          submenu1.style.display =
            submenu1.style.display === "block" ? "none" : "block";
        }
      }
    });
  });
});

//header
$(document).ready(function () {
  function initializeMenu(menuClass) {
    var $menu = $("." + menuClass);
    $menu.find(".col-md-9 > div").hide();
    $menu.find(".one").show();
    $menu.find(".col-md-3 ul li:first").addClass("active");
    $menu.find(".col-md-3 ul li").on("mouseenter click", function (event) {
      event.preventDefault();
      var $this = $(this);
      $menu.find(".col-md-3 ul li").removeClass("active");
      $this.addClass("active");
      $menu.find(".col-md-9 > div").hide();
      var index = $this.index();
      $menu.find(".col-md-9 > div").eq(index).show();
    });
  }
  initializeMenu("parentmenu1");
  initializeMenu("parentmenu2");
  initializeMenu("parentmenu3");
});
