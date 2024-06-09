document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formId");
  const submit = document.getElementById("submit-btn");
  const feedback = document.getElementById("message");

  submit.addEventListener("click", () => {
    feedback.textContent = "";

    // Get form values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // validation
    if (!username || !email || !password) {
      feedback.textContent = "Complete all fields!";
      return;
    }

    // validate email format
    if (!validateEmail(email)) {
      feedback.textContent = "Please enter a valid email";
      return;
    }

    feedback.textContent = "Registration successful";
    feedback.style.color = "green";

    // Clear all form fields
    form.reset();
  });
});

// function validateEmail(email) {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(String(email).toLowerCase());
// }
