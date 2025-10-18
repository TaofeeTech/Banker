// REGISTER FUNCTIONALITY

let regBtn = document.getElementById("register_banker");
let loginBtn = document.getElementById("login_banker");

regBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // stop form from submitting normally

  // Collect input values
  const name = document.getElementById("inputname").value.trim();
  const email = document.getElementById("inputemail").value.trim();
  const username = document.getElementById("inputusername").value.trim();
  const password = document.getElementById("newpin").value.trim();
  const confirmPassword = document.getElementById("confirmpin").value.trim();

  // Error placeholders
  const PasswordError = document.querySelector(".errorm");
  const FieldsError = document.querySelector(".errmn");

  // Reset previous errors
  PasswordError.innerText = "";
  FieldsError.innerText = "";

  // Check for empty fields
  if (!name || !email || !username || !password || !confirmPassword) {
    FieldsError.classList.add("text-danger");
    FieldsError.innerText = "All fields are required.";
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    PasswordError.classList.add("text-danger");
    PasswordError.innerText = "Passwords do not match.";
    return;
  }

  // Prepare data for backend
  const registerData = {
    type: "admin",
    name: name,
    email: email,
    username: username,
    password: password,
  };

  try {
    // Send POST request to backend API
    const response = await fetch("http://localhost/banker/api/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    // Parse backend response
    const result = await response.json();

    if (response.ok && result.status === "success") {
      alert("Registration successful! Please log in.");
      window.location.href = "signin.html";
    } else {
      alert(`Registration failed: ${result.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    alert("Something went wrong. Please try again later.");
  }
});

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const identifier = document.getElementById("inputusername").value.trim();
  const password = document.getElementById("inputpin").value.trim();
  const type = "admin" // user or admin

  if (!identifier || !password) {
    alert("Please fill all fields.");
    return;
  }

  const loginData = { type, identifier, password };

  try {
    const response = await fetch("http://localhost/banker/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (response.ok && result.status === "success") {
      alert(`Welcome ${result.data.name}!`);
      // e.g. redirect
      window.location.href =
        type === "admin" ? "admin/dashboard/index.html" : "landing.html";
    } else {
      alert(`Login failed: ${result.message}`);
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Try again later.");
  }
});
