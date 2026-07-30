(function () {
  "use strict";

  const form = document.querySelector("#contact-form");
  if (!form) return;

  const loading = form.querySelector(".loading");
  const success = form.querySelector(".sent-message");
  const errorMessage = form.querySelector(".error-message");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    loading.classList.add("d-block");
    success.classList.remove("d-block");
    errorMessage.classList.remove("d-block");
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Your message could not be sent. Please try again.");
      }

      form.reset();
      success.classList.add("d-block");
    } catch (error) {
      errorMessage.textContent =
        error.message || "Your message could not be sent. Please email me directly.";
      errorMessage.classList.add("d-block");
    } finally {
      loading.classList.remove("d-block");
      submitButton.disabled = false;
    }
  });
})();
