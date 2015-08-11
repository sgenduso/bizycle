var notLoggedIn = document.getElementById('notLoggedIn');
var loginModal = document.getElementById('loginModal')

notLoggedIn.addEventListener('click', function () {
  loginModal.innerHTML = "";
  var text = document.createElement('p');
  var close = document.createElement('button');
  close.innerHTML = 'X';
  loginModal.appendChild(text).innerHTML = "test modal";
  loginModal.appendChild(close);
  loginModal.showModal();

  close.addEventListener('click', function () {
    loginModal.close();
  })
});
