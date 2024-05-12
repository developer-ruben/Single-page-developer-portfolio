const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  name.parentElement.classList.remove("form__group--error");
  email.parentElement.classList.remove("form__group--error");
  message.parentElement.classList.remove("form__group--error");

  let error = false;

  if (name.value === "") {
    name.parentElement.classList.add("form__group--error");
    name.nextElementSibling.textContent = "Please fill in this field";
    error = true;
  }

  if (email.value === "") {
    email.parentElement.classList.add("form__group--error");
    email.nextElementSibling.textContent = "Please fill in this field";
    error = true;
  } else if (!validateEmail(email.value)) {
    email.parentElement.classList.add("form__group--error");
    email.nextElementSibling.textContent = "Sorry, invalid format here";
    error = true;
  }

  if (message.value === "") {
    message.parentElement.classList.add("form__group--error");
    message.nextElementSibling.textContent = "Please fill in this field";
    error = true;
  }

  if (!error) {
    const data = new FormData(event.target);
    fetch(e.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          status.classList.add("form__status--success");
          status.style.display = "block";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.classList.add("form__status--error");
              status.style.display = "block";
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form";
            }
          });
        }

        setTimeout(() => {
          status.innerHTML = "";
          status.style.display = "none";
        }, 5000);
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
  }
});

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
