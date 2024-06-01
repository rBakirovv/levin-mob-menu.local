window.addEventListener("DOMContentLoaded", function () {
  const html = document.querySelector("html");
  const menuButton = document.querySelector(".mobile-menu__button-service");
  const mobileMenu = document.querySelector(".mobile-menu");
  const swipeMenu = document.querySelector(".swipe-menu");
  const swipeMenuContainer = document.querySelector(".swipe-menu__container");
  const overlaySwipeMenu = document.querySelector(".menu-background");

  function closeMenu() {
    swipeMenu.style.transition = "all 0.3s ease";

    html.style.overflow = "visible";
    menuButton.classList.remove("active");

    swipeMenu.style.transform = "translateY(150%)";

    overlaySwipeMenu.classList.remove("menu-background_active");

    setTimeout(() => {
      swipeMenu.style.transition = "none";
    }, 200)

    html.style.overflow = "hidden";

    setTimeout(() => {
      html.style.overflow = "visible";
    }, 300)
  }

  menuButton.addEventListener("click", () => {
    swipeMenu.style.transition = "all 0.3s ease";

    if (html.style.overflow === "hidden") {
      html.style.overflow = "visible";
      swipeMenu.style.transform = "translateY(150%)";
    } else {
      html.style.overflow = "hidden";
      swipeMenu.style.transform = "translateY(0%)";
    }

    if (menuButton.classList.contains("active")) {
      overlaySwipeMenu.classList.remove("menu-background_active");
    } else {
      overlaySwipeMenu.classList.add("menu-background_active");
    }

    menuButton.classList.toggle("active");

    setTimeout(() => {
      swipeMenu.style.transition = "none";
    }, 200)
  })

  let touchstartY = 0;
  let movedY = 0;

  if (swipeMenu) {
    swipeMenu.addEventListener("touchstart", function (event) {
      if (swipeMenuContainer.scrollTop <= 0) {
        swipeMenuContainer.scrollTo({
          top: 0
        });

        touchstartY = event.changedTouches[0].screenY;
      }
    }, false)

    swipeMenu.addEventListener("touchmove", function (event) {
      if (swipeMenuContainer.scrollTop <= 0) {
        swipeMenuContainer.scrollTo({
          top: 0
        });

        movedY = event.changedTouches[0].screenY;

        if (movedY - touchstartY > 0) {
          swipeMenuContainer.style.overflow = "hidden";
          swipeMenu.style.transform = `translateY(${movedY - touchstartY}px)`;
        }
      }
    })

    swipeMenu.addEventListener("touchend", function () {
      if (swipeMenuContainer.scrollTop <= 0) {
        swipeMenuContainer.scrollTo({
          top: 0
        });
        swipeMenuContainer.style.overflow = "scroll";

        swipeMenu.style.transition = "all 0.3s ease";

        if (movedY - touchstartY > 100 && movedY !== 0) {
          closeMenu();
          overlaySwipeMenu.classList.remove("menu-background_active");
        } else {
          swipeMenu.style.transform = `translateY(0)`;
        }

        touchstartY = 0;
        movedY = 0;

        setTimeout(() => {
          swipeMenu.style.transition = "none";
        }, 200)
      }
    }, false)
  }

  overlaySwipeMenu.addEventListener("click", () => {
    closeMenu();
  })

  window.addEventListener("scroll", () => {
    if (mobileMenu) {
      if (!mobileMenu.classList.contains("mobile-menu_opened")) {
        mobileMenu.classList.add("mobile-menu_opened");
      }
    }
  })
})