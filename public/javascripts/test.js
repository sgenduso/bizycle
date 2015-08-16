var notLoggedInElements = document.getElementsByClassName('not-logged-in');

var loginModal = document.getElementById('login-modal');
var closeModal = document.getElementById('close-modal');
var submitLogin = document.getElementById('submit-login');
var submitSignup = document.getElementById('submit-signup');
var errors = document.getElementById('errors');
var hiddenInput = document.createElement('input');
var hiddenInputOne = document.createElement('input');
var appendDivs = document.getElementsByClassName('append');

console.log(notLoggedInElements[0].id);

if (errors) {
  loginModal.showModal();
}

if(notLoggedInElements) {
  for (var i = 0; i < 2; i++) {
    function (notLoggedInElements[i]) {
      console.log(notLoggedInElements[i]);
      notLoggedInElements[i].addEventListener('click', function () {
      hiddenInput.type='text';
      hiddenInput.style.display='none'
      hiddenInput.value=notLoggedInElements[i].id;
      hiddenInput.name='path';

      hiddenInputOne.type='text';
      hiddenInputOne.style.display='none'
      hiddenInputOne.value=notLoggedInElements[i].id;
      hiddenInputOne.name='path';

      appendDivs[0].appendChild(hiddenInputOne);
      appendDivs[1].appendChild(hiddenInput);

      loginModal.showModal();
      })
    }(notLoggedInElements[i]);
  }
}

  closeModal.addEventListener('click', function () {
    loginModal.close();
  });
