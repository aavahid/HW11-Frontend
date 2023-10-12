const emailElement = document.getElementById("email");
const confirmEmailElement = document.getElementById("confirmEmail");
const passwordElement = document.getElementById("password");
const btnSaveElement = document.getElementById("save__btn");
const listElement = document.getElementById("accounts__list");

const loginEmailElement = document.getElementById("loginEmail");
const loginPasswordElement = document.getElementById("loginPassword");
const btnLoginElement = document.getElementById("login__btn");

const accounts = [];

function deleteAccount(email) {
  const index = accounts.findIndex((acc) => acc.email === email);
  if (index !== -1) {
    const confirmed = confirm(
      `Are you sure you want to delete the account with email: ${email}?`
    );
    if (confirmed) {
      accounts.splice(index, 1);
      renderAccountList();
    }
  }
}

function renderAccountList() {
  listElement.innerHTML = "";
  accounts.forEach((account) => {
    listElement.innerHTML += `<li>${account.email} <button class="delete__btn" data-email="${account.email}">Delete</button></li>`;
  });

  const deleteButtons = document.querySelectorAll(".delete__btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const email = event.target.getAttribute("data-email");
      deleteAccount(email);
    });
  });
}

btnSaveElement.onclick = () => {
  const email = emailElement.value;
  const confirmPassword = confirmEmailElement.value;
  const password = passwordElement.value;

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!email.match(emailRegex)) {
    alert("Invalid email format. Please enter a valid email address.");
    return;
  }

  if (email !== confirmPassword) {
    alert("Email addresses do not match. Please re-enter them.");
    return;
  }

  if (accounts.some((acc) => acc.email === email)) {
    alert(
      "An account with this email already exists. Please use a different email."
    );
    return;
  }

  const newAccount = { email, password };
  accounts.push(newAccount);
  renderAccountList();
  emailElement.value = "";
  confirmEmailElement.value = "";
  passwordElement.value = "";
};

btnLoginElement.onclick = () => {
  const loginEmail = loginEmailElement.value;
  const loginPassword = loginPasswordElement.value;
  const account = accounts.find(
    (acc) => acc.email === loginEmail && acc.password === loginPassword
  );
  if (account) {
    alert("Sucessful login!");
  } else {
    alert("Email or password does not match any account.");
  }
};
renderAccountList();
