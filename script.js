import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  addDoc,
  collection,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form submission
const form = document.querySelector("#formId");
const feedback = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Clear previous message
  feedback.textContent = "";
  feedback.classList.remove("error", "success");

  document
    .querySelectorAll(".input-error")
    .forEach((input) => input.classList.remove("input-error"));

  // Get form values
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Fields validation
  if (!firstname || !lastname || !dob || !email || !password) {
    feedback.textContent = "Complete all fields!";
    feedback.style.color = "red";
    feedback.classList.add("error");
    return;
  }

  // Validate email format
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (!validateEmail(email)) {
    feedback.textContent = "Please enter a valid email";
    feedback.style.color = "red";
    feedback.classList.add("error");
    document.getElementById("email").classList.add("input-error");
    return;
  }

  // Add data to Firebase
  try {
    await addDoc(collection(db, "users"), {
      firstname,
      lastname,
      email,
      dob,
      password,
    });

    feedback.textContent = "Registration successful!";
    feedback.style.color = "green";
    feedback.classList.add("success");

    // Clear form fields
    form.reset();
  } catch (error) {
    feedback.textContent =
      "There was a problem submitting your form. Please try again.";
    feedback.style.color = "red";
    feedback.classList.add("error");
  }
});
