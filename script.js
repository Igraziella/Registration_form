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
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // fields validation
    if (!firstname || !lastname || !dob || !email || !password) {
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
      feedback.textcontent = "Please enter a valid email";
      feedback.style.color = "red"
      feedback.classList.add("error")
      document.getElementById("email").classList.add("input-error");
      return;
    }

    const formData = new FormData(form);
    fetch("https://formspree.io/f/xanwqlrp", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      // on successful registration
      if (response.ok) {
        feedback.textContent = "Registration successful";
        feedback.style.color = "green";
        feedback.classList.add("success");
        
        // clear all form fields
        form.reset();
      } else {
        feedback.textContent = "There was a problem submitting your form. Please try again";
        feedback.style.color = "red";
        feedback.classList.add("error");
      }
    }).catch(error => {
      feedback.textContent = "There was a problem submitting your form. Please try again";
        feedback.style.color = "red";
        feedback.classList.add("error");
    });
    
    // alert("Registration successful");
    
  });
});
