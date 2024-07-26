// document.addEventListener("DOMContentLoaded", () => {

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVvDfU_kZuq64WHa57DQy0CNIpBYut1M8",
  authDomain: "registration-a4dce.firebaseapp.com",
  projectId: "registration-a4dce",
  storageBucket: "registration-a4dce.appspot.com",
  messagingSenderId: "19262028728",
  appId: "1:19262028728:web:58a3ed0c36011cbc97ad4d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Get the form data using formData() method
//and add the data to the database
const form = document.querySelector("#formId");
const submit = document.getElementById("submit-btn");
const feedback = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default submission
  const formData = new FormData(form);
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const dob = formData.get("dob");
  const password = formData.get("password");
  addDoc(collection(db, "users"), {
    firstname: firstname,
    lastname: lastname,
    email: email,
    dob: dob,
    password: password,
  });
});

//Get the data from the database
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  //extract the data from the document
  const data = doc.data();
  console.log(data);
});

// const form = document.getElementById("formId");

submit.addEventListener("click", (event) => {
  // prevent default form submission
  // event.preventDefault();

  // clear previous message
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
    feedback.style.color = "red";
    feedback.classList.add("error");
    document.getElementById("email").classList.add("input-error");
    return;
  }

  // const formData = new FormData(form);
  // fetch("https://formspree.io/f/xanwqlrp", {
  //   method: "POST",
  //   body: formData,
  //   headers: {
  //     Accept: "application/json",
  //   },
  // })
  //   .then((response) => {
  //     // on successful registration
  //     if (response.ok) {
  //       feedback.textContent = "Registration successful";
  //       feedback.style.color = "green";
  //       feedback.classList.add("success");

  //       // clear all form fields
  //       form.reset();
  //     } else {
  //       feedback.textContent =
  //         "There was a problem submitting your form. Please try again";
  //       feedback.style.color = "red";
  //       feedback.classList.add("error");
  //     }
  //   })
  //   .catch((error) => {
  //     feedback.textContent =
  //       "There was a problem submitting your form. Please try again";
  //     feedback.style.color = "red";
  //     feedback.classList.add("error");
  //   });

  // alert("Registration successful");
});
// });
