var notLoggedIn = document.getElementById('notLoggedIn');
var loginModal = document.getElementById('loginModal');
var closeModal = document.getElementById('closeModal');
var submitLogin = document.getElementById('submit-login');
var submitSignup = document.getElementById('submit-signup');
var errors = document.getElementById('errors');

if (errors) {
  loginModal.showModal();
}

notLoggedIn.addEventListener('click', function () {
  loginModal.showModal();
});

closeModal.addEventListener('click', function () {
  loginModal.close();
});
