console.log("reaches this script");
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
      var redirectPath = JSON.parse(xhr.response);
      if(redirectPath.length === 0) {
        window.location.replace('http://localhost:3000/');
      }
      else {
        var redirectPath = "http://localhost:3000/" + redirectPath;
        window.location.replace(redirectPath);
      }
    })

    submitLogin.addEventListener('click', function () {

      var xhr = new XMLHttpRequest();
      var sentObject =
      {
        login_email: loginEmail.value,
        login_password: loginPassword.value,
        path: that.id
      };
      xhr.open('post', "/login", false);
      xhr.setRequestHeader('Content-type', "application/json");
      sentObjectString = JSON.stringify(sentObject);
      xhr.send(sentObjectString);
      console.log(xhr.response);
      var redirectPath = JSON.parse(xhr.response);
      if(redirectPath.length === 0) {
        window.location.replace('http://localhost:3000/');
      }
      else {
        var redirectPath = "http://localhost:3000/" + redirectPath;
        window.location.replace(redirectPath);
      }
    })
  })
}
// closeModal.addEventListener('click', function () {
//   loginModal.close();
//   console.log('HITS event listener');
// })
