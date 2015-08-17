var notLoggedInElements = document.getElementsByClassName('not-logged-in');

var loginModal      = document.getElementById('login-modal');
var closeModal      = document.getElementById('close-modal');
var submitLogin     = document.getElementById('submit-login');
var submitSignup    = document.getElementById('submit-signup');
var errors          = document.getElementById('errors');
var appendDivs      = document.getElementsByClassName('append');

var firstName       = document.getElementById('signup-first-name')
var lastName        = document.getElementById('signup-last-name')
var email           = document.getElementById('signup-email')
var password        = document.getElementById('signup-password')
var confirmPassword = document.getElementById('signup-confirm-password')

var loginEmail      = document.getElementById('login-email');
var loginPassword   = document.getElementById('login-password');


for (var i = 0; i < notLoggedInElements.length; i++) {
  notLoggedInElements[i].addEventListener('click', function () {

  that = this;

    loginModal.showModal();

    submitSignup.addEventListener('click', function () {

      var xhr = new XMLHttpRequest();
      var sentObject =
      {
        signup_first_name: firstName.value,
        signup_last_name: lastName.value,
        signup_email: email.value,
        signup_password: password.value,
        path: that.id
      };
      xhr.open('post', "/signup", false);
      xhr.setRequestHeader('Content-type', "application/json");
      sentObjectString = JSON.stringify(sentObject);
      xhr.send(sentObjectString);
      console.log(xhr.response);
      console.log(typeof xhr.response, "TYPE");
      var redirectPath = JSON.parse(xhr.response);
      if(xhr.response === "") {
        window.location.replace('http://localhost:3000/');
      }
      else {
        var redirectPath = "http://localhost:3000/" + redirectPath;
        console.log(typeof redirectPath, "redirect path");
        window.location.replace(redirectPath);
      }
    })

    submitLogin.addEventListener('click', function () {

      var xhr = new XMLHttpRequest();
      var sentObject =
      {
        email: loginEmail.value,
        password: loginPassword.value,
        path: that.id
      };
      xhr.open('post', "/findme", false);
      xhr.setRequestHeader('Content-type', "application/json");
      sentObjectString = JSON.stringify(sentObject);
      xhr.send(sentObjectString);
      console.log(xhr.response);
    })
  })
closeModal.addEventListener('click', function () {
  loginModal.close();
  console.log('HITS event listener');
})
}
