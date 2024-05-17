function userScroll() {
  const navbar = document.querySelector(".navbar");
  const toTopBtn = document.querySelector("#to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-sticky");
      toTopBtn.classList.add("show");
    } else {
      navbar.classList.remove("navbar-sticky");
      toTopBtn.classList.remove("show");
    }
  });
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//////////////////////////
// Stats
////////////////////////

function incrementStats() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    counter.innerText = 0;

    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const c = +counter.innerText;

      const increment = target / 200;

      if (c < target) {
        counter.innerText = Math.ceil(c + increment);
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", userScroll);
document.addEventListener("DOMContentLoaded", incrementStats);
document.querySelector("#to-top").addEventListener("click", scrollToTop);

// replace  old year

document.addEventListener("DOMContentLoaded", function () {
  const customerInfoDivs = document.querySelectorAll(".customer-info");

  customerInfoDivs.forEach((div) => {
    const currentYear = new Date().getFullYear();
    const textContent = div.textContent;

    // Extract the starting year from the text content
    const match = textContent.match(/Since (\d{4})/);
    if (match) {
      const startYear = parseInt(match[1], 10);
      const yearsAsClient = currentYear - startYear;

      // Replace "Since YYYY" with "for X years"
      const updatedText = textContent.replace(
        `Since ${startYear}`,
        `for ${yearsAsClient} years`
      );
      div.textContent = updatedText;
    }
  });
});
