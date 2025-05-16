import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js';

// Utility: Clear input fields
function clearInputs() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

// Utility: Friendly error messages
function getFriendlyErrorMessage(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Try again.";
    default:
      return "Something went wrong: " + error.message;
  }
}

// Signup Function
async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Signed up as " + userCredential.user.email);
    clearInputs();
  } catch (error) {
    alert("⚠️ " + getFriendlyErrorMessage(error));
  }
}

// Signin Function
async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Signed in as " + userCredential.user.email);
    clearInputs();
  } catch (error) {
    alert("⚠️ " + getFriendlyErrorMessage(error));
  }
}

// Signout Function
async function logout() {
  try {
    await signOut(auth);
    alert("👋 Signed out");
  } catch (error) {
    alert("⚠️ Signout error: " + error.message);
  }
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
  const status = document.getElementById("auth-status");
  if (user) {
    status.textContent = `✅ Logged in as ${user.email}`;
  } else {
    status.textContent = "🔒 Not logged in";
  }
});

// UI event handlers
document.getElementById("signup-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  signUp(email, password);
});

document.getElementById("login-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  signIn(email, password);
});

document.getElementById("logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

document.getElementById("auth-status").textContent = "🔒 Not logged in";
