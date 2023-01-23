let loader = document.getElementById("loader");
let recaptchaError = document.getElementById("recaptcha-error");

function sendMail() {
  const CERVICE_ID = "service_liawdtv";
  const TEMPLETE_ID = "template_fmbc174";
  let captcha = grecaptcha.getResponse();

  // just for styles
  loader.classList.add("show-loader");
  document.getElementById("overlay").style.display = "block";
  recaptchaError.classList.remove("show-recaptcha-error");

  // add here all fields you need
  let dataToSend = {
    name: document.getElementById("name").value,
    "g-recaptcha-response": captcha,
  };

  if (!!captcha) {
    // send data to email
    emailjs
      .send(CERVICE_ID, TEMPLETE_ID, dataToSend)
      .then((res) => {
        document.getElementById("name").value = "";
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
