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
var errors          = document.getElementById('errors')


function validateSignUp(firstName, lastName, email, password, confirmPassword) {
  var errorArray = [];
  var firstEmpty = 'First name must be filled'
  var lastEmpty = 'Last name must be filled'
  var passError = 'Password must be eight characters long'
  var match = 'Passwords must match'
  var emailError = 'Enter a valid email.'

  if(firstName === ''){
    errorArray.push(firstEmpty)
  }
  if(lastName === ''){
    errorArray.push(lastEmpty)
  }
  if(password.length < 8){
    errorArray.push(passError)
  }
  if(email === '' || email.indexOf('@') === -1){
    errorArray.push(emailError)
  }
  if(password != confirmPassword){
    errorArray.push(match)
  }

  return errorArray
}
function validateLogin(email, password) {
  var errorArray = [];
  var passError = 'Enter a password'
  var emailError = 'Enter a valid email.'

  if(password === ''){
    errorArray.push(passError)
  }
  if(email === '' || email.indexOf('@') === -1){
    errorArray.push(emailError)
  }

  return errorArray
}

for (var i = 0; i < notLoggedInElements.length; i++) {
  notLoggedInElements[i].addEventListener('click', function () {

  that = this;

    loginModal.showModal();


    submitSignup.addEventListener('click', function () {
      errors.innerHTML = '';

      var formErrors = validateSignUp(firstName.value, lastName.value, email.value, password.value, confirmPassword.value);

      if(formErrors.length > 0)  {
        formErrors.forEach(function (error) {
          var newError = document.createElement('p')
          newError.innerHTML= error;
          errors.appendChild(newError);
        })
      } else {
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
        console.log(redirectPath, "PATH");
        if(Object.keys(redirectPath).indexOf('error') != -1){

          var newError = document.createElement('p')
          newError.innerHTML= redirectPath.error;
          errors.appendChild(newError);
        } else {
          if(redirectPath.length === 0) {
            window.location.replace('http://localhost:3000/');
          }
          else {
            var redirectPath = "http://localhost:3000/" + redirectPath;
            window.location.replace(redirectPath);
          }
        }
      }
    })

      //
    submitLogin.addEventListener('click', function () {
      errors.innerHTML = '';
        var formErrors = validateLogin(loginEmail.value, loginPassword.value);

        if(formErrors.length > 0)  {
          console.log("IN FORM ERRORS");
          formErrors.forEach(function (error) {
            var newError = document.createElement('p')
            newError.innerHTML= error;
            errors.appendChild(newError);
          })
        }

        else {
          console.log("START XML");
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
          console.log(typeof redirectPath, "TYPE");
          if(Object.keys(redirectPath).indexOf('error') != -1){
            var newError = document.createElement('p')
            newError.innerHTML= redirectPath.error;
            errors.appendChild(newError);
          }
          else {
            if(redirectPath.length === 0) {
              window.location.replace('http://localhost:3000/');
            }
            else {
              var redirectPath = "http://localhost:3000/" + redirectPath;
              window.location.replace(redirectPath);
            }
          }
        }
      })
    })
  }

if(notLoggedInElements) {
  closeModal.addEventListener('click', function () {
    loginModal.close();
    console.log('HITS event listener');
  })
}
