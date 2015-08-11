var notLoggedIn = document.getElementById('notLoggedIn');
var loginModal = document.getElementById('loginModal');
var closeModal = document.getElementById('closeModal');

notLoggedIn.addEventListener('click', function () {
  loginModal.showModal();
});

closeModal.addEventListener('click', function () {
  loginModal.close();
});
