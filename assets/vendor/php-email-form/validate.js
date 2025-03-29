document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    let forms = document.querySelectorAll(".php-email-form");

    forms.forEach(function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let loading = form.querySelector(".loading");
            let errorMessage = form.querySelector(".error-message");
            let sentMessage = form.querySelector(".sent-message");

            // Show loading and hide previous messages
            loading.classList.add("d-block");
            errorMessage.classList.remove("d-block");
            sentMessage.classList.remove("d-block");

            // Use EmailJS to send the form
            emailjs.sendForm("service_bjk0blr", "template_vp1frte", form)
                .then(() => {
                    loading.classList.remove("d-block"); // Hide loading
                    sentMessage.classList.add("d-block"); // Show success message
                    form.reset(); // Reset the form after successful submission
                })
                .catch((error) => {
                    loading.classList.remove("d-block"); // Hide loading
                    errorMessage.textContent = "Failed to send message. Please try again.";
                    errorMessage.classList.add("d-block"); // Show error message
                    console.error("EmailJS Error:", error);
                });
        });
    });
});
