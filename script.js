document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formId");
  const submit = document.getElementById("submit-btn");
  const feedback = document.getElementById("message");

  submit.addEventListener("click", (event) => {

    // prevent default form submission
    event.preventDefault();

    // clear previous message
    feedback.textContent = "";
    feedback.classList.remove("error","success");

    document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));

    // Get form values
    const username = document.getElementById("username").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // fields validation
    if (!username || !firstname || !lastname || !dob || !email || !password) {
      feedback.textContent = "Complete all fields!";
      feedback.style.color = "red";
      feedback.classList.add("error");
      return;
    }

    // validate email format
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    if (!validateEmail(email)) {
      feedback.textContent = "Please enter a valid email";
      feedback.style.color = "red"
      feedback.classList.add("error")
      document.getElementById("email").classList.add("input-error");
      return;
    }
    
    // on successful registration
    feedback.textContent = "Registration successful";
    feedback.style.color = "green";
    feedback.classList.add("success");

    // clear all form fields
    form.reset();
  });
});


