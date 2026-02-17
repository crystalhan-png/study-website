const form = document.getElementById("form");

const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let errors = [];

  if (firstname_input) {
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    errors = getLoginFormErrors(
      email_input.value,
      password_input.value
    );
  }

  if (errors.length > 0) {
    error_message.innerText = errors.join(". ");
  } else {
    error_message.innerText = "";
    form.submit(); // allow form to submit
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (!firstname) errors.push("Firstname is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (password && password.length < 8)
    errors.push("Password must have at least 8 characters");
  if (password !== repeatPassword)
    errors.push("Passwords do not match");

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");

  return errors;
}

// ---- LIVE ERROR CLEARING ----
const allInputs = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input
].filter(Boolean);

allInputs.forEach(input => {
  input.addEventListener('input', () => {
    input.parentElement.classList.remove('incorrect');
    error_message.innerText = '';
  });
});
