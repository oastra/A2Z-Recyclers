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
//  Form Validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nameInput = form.querySelector('input[placeholder="Enter name"]');
  const emailInput = form.querySelector('input[placeholder="Enter email"]');
  const phoneInput = form.querySelector('input[placeholder="Enter phone"]');
  const messageTextarea = form.querySelector(
    'textarea[placeholder="Enter message"]'
  );

  const showError = (input, message) => {
    const errorDiv = input.parentElement.querySelector(".error-message");
    errorDiv.textContent = message;
    errorDiv.classList.add("active");
    input.classList.add("error-border");
  };

  const clearError = (input) => {
    const errorDiv = input.parentElement.querySelector(".error-message");
    errorDiv.textContent = "";
    errorDiv.classList.remove("active");
    input.classList.remove("error-border");
  };

  const validateName = () => {
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Name is required.");
    } else {
      clearError(nameInput);
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address.");
    } else {
      clearError(emailInput);
    }
  };

  const validatePhone = () => {
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneInput.value)) {
      showError(phoneInput, "Please enter a valid 10-digit phone number.");
    } else {
      clearError(phoneInput);
    }
  };

  const validateMessage = () => {
    if (messageTextarea.value.trim() === "") {
      showError(messageTextarea, "Message is required.");
    } else {
      clearError(messageTextarea);
    }
  };

  nameInput.addEventListener("focusout", validateName);
  emailInput.addEventListener("focusout", validateEmail);
  phoneInput.addEventListener("focusout", validatePhone);
  messageTextarea.addEventListener("input", validateMessage);

  form.addEventListener("submit", (event) => {
    validateName();
    validateEmail();
    validatePhone();
    validateMessage();

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});
