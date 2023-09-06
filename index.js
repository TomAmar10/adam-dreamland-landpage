const $homeSection = document.getElementById("home");
const $workshopSection = document.getElementById("workshop");
const $aboutSection = document.getElementById("about");
const $contactSection = document.getElementById("contact");
const $homeNav = document.querySelectorAll(".home-nav");
const $workshopNav = document.querySelectorAll(".workshop-nav");
const $aboutNav = document.querySelectorAll(".about-nav");
const $contactNav = document.querySelectorAll(".contact-nav");
const $logo = document.querySelector(".logo-img");
const $contactBtn = document.querySelector(".contact-btn");
const $successMsg = document.querySelector(".success-msg");
const $spinner = document.querySelector(".loader");
const $contactBtnTop = document.querySelector(".contact-btn-top");
const $successMsgTop = document.querySelector(".success-msg-top");
const $spinnerTop = document.querySelector(".loader-top");
const $navigator = document.querySelector(".navigator");
const $mobileMenu = document.querySelector(".menu-container");
const $menuBtn = document.querySelector(".fa-bars");
$logo.addEventListener("click", () => navToElement($homeNav[0], $homeSection));
const sections = {
  home: $homeSection,
  workshop: $workshopSection,
  about: $aboutSection,
  contact: $contactSection,
};

const navButtons = {
  home: $homeNav,
  workshop: $workshopNav,
  about: $aboutNav,
  contact: $contactNav,
};
Object.keys(sections).forEach((sectionKey) => {
  navButtons[sectionKey].forEach((navButton) => {
    navButton.addEventListener("click", () =>
      navToElement(navButton, sections[sectionKey])
    );
  });
});

const navToElement = (navElement, sectionElement) => {
  Object.values(navButtons).forEach((buttons) =>
    buttons.forEach((button) => button.classList.remove("active-nav"))
  );
  navElement.classList.add("active-nav");

  const offsetTop =
    sectionElement.getBoundingClientRect().top + window.scrollY - 30;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionInView = Object.keys(sections).find(
          (key) => sections[key] === entry.target
        );
        Object.values(navButtons).forEach((buttons) =>
          buttons.forEach((button) => button.classList.remove("active-nav"))
        );
        if (sectionInView) {
          Object.values(navButtons[sectionInView]).forEach((button) =>
            button.classList.add("active-nav")
          );
        }
      }
    });
  },
  { threshold: 0.5 }
);
Object.values(sections).forEach((section) => {
  observer.observe(section);
});

// SLIDER MANAGEMENT ----------------

// let slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
// }

// FORM MANAGEMENT

document.addEventListener("DOMContentLoaded", function () {
  // BOTTOM FORM
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    startSending();
    const formData = new FormData(contactForm);
    await fetch("https://formspree.io/f/xpzgrjeg", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    endSending(contactForm);
  });

  //   TOP FORM
  const contactFormTop = document.getElementById("contact-form-top");
  contactFormTop.addEventListener("submit", async function (event) {
    event.preventDefault();
    startSendingTop();
    const formData = new FormData(contactFormTop);
    await fetch("https://formspree.io/f/xpzgrjeg", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    endSendingTop(contactFormTop);
  });
});

const startSending = () => {
  $contactBtn.disabled = true;
  $successMsg.style.display = "none";
  $spinner.style.display = "block";
};
const endSending = (form) => {
  $contactBtn.disabled = false;
  $spinner.style.display = "none";
  $successMsg.style.display = "block";
  form.reset();
};
// TOP FORM
const startSendingTop = () => {
  $contactBtnTop.disabled = true;
  $successMsgTop.style.display = "none";
  $spinnerTop.style.display = "block";
};
const endSendingTop = (topForm) => {
  $contactBtnTop.disabled = false;
  $spinnerTop.style.display = "none";
  $successMsgTop.style.display = "block";
  topForm.reset();
};

// MENU HANDLER

const toggleMobileMenu = () => {
  $navigator.classList.toggle("open-mobile-menu");
};

document.addEventListener("click", (event) => {
  if (
    (!$mobileMenu.contains(event.target) && event.target !== $menuBtn) ||
    event.target.classList.contains("single-nav")
  ) {
    $navigator.classList.remove("open-mobile-menu");
  }
});
