let loader = document.getElementById("loader");
let recaptchaError = document.getElementById("recaptcha-error");

window.onload = function () {
  document
    .getElementById("contact_form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (isValid(this)) {
        sendMail(this)
      }
    });
};

function sendMail(form) {
  const CERVICE_ID = "service_liawdtv";
  const TEMPLETE_ID = "template_fmbc174";
  let captcha = grecaptcha.getResponse();

  // just for styles
  loader.classList.add("show-loader");
  document.getElementById("overlay").style.display = "block";
  recaptchaError.classList.remove("show-recaptcha-error");

  // add here all fields you need
  let dataToSend = {
    name: form.name.value,
    message: form.message.value,
    department: form.department.value,
    email: form.email.value,
    phone: form.phone.value,
    "g-recaptcha-response": captcha,
  };

  if (!!captcha) {
    // send data to email
    emailjs
      .send(CERVICE_ID, TEMPLETE_ID, dataToSend)
      .then((res) => {
        form.reset();
        console.log(res);
      })
      .then(() => grecaptcha.reset())
      .then(() => {
        loader.classList.remove("show-loader");
        document.getElementById("overlay").style.display = "none";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    loader.classList.remove("show-loader");
    document.getElementById("overlay").style.display = "none";
    recaptchaError.classList.add("show-recaptcha-error");
  }
}

const names = ['name', 'email', 'message', 'department', 'phone']

function isValid(form) {
  let isValid = true;
  const valid = names.forEach((name) => {
    if (!form[name].value.trim().length) {
      form[name].classList.add('input-invalid')
      isValid = false;
    }
  })
  return isValid;
}


function validate(e) {
  if (!e.target.value.trim()) {
    e.target.classList.add('input-invalid')
  } else {
    e.target.classList.remove('input-invalid')
  }
}

[...document.querySelectorAll('.input-simple')].forEach(item => {
  item.addEventListener('change', validate)
})