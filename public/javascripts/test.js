var notLoggedIn = document.getElementById('not-logged-in');
var loginModal = document.getElementById('login-modal');
var closeModal = document.getElementById('close-modal');
var submitLogin = document.getElementById('submit-login');
var submitSignup = document.getElementById('submit-signup');
var errors = document.getElementById('errors');

if (errors) {
  loginModal.showModal();
}

if(notLoggedIn) {

  notLoggedIn.addEventListener('click', function () {
    loginModal.showModal();
  });

  closeModal.addEventListener('click', function () {
    loginModal.close();
  });
}
