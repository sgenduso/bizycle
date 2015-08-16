var notLoggedInElements = document.getElementsByClassName('not-logged-in');

var loginModal = document.getElementById('login-modal');
var closeModal = document.getElementById('close-modal');
var submitLogin = document.getElementById('submit-login');
var submitSignup = document.getElementById('submit-signup');
var errors = document.getElementById('errors');
var hiddenInput = document.createElement('input');
var hiddenInputOne = document.createElement('input');
var appendDivs = document.getElementsByClassName('append');

var firstName = document.getElementById('signup-first-name')
var lastName = document.getElementById('signup-last-name')
var email = document.getElementById('signup-email')
var password = document.getElementById('signup-password')
var confirmPassword = document.getElementById('signup-confirm-password')

console.log(notLoggedInElements[0]);
notLoggedInElements[0].addEventListener('click', function () {
  loginModal.showModal();
  submitSignup.addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    var sentObject =
    {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value
    };
    xhr.open('post', "/findme", false);
    xhr.setRequestHeader('Content-type', "application/json");
    sentObjectString = JSON.stringify(sentObject);
    xhr.send(sentObjectString);
    console.log(xhr.response);
  })
})




// submitSignup.addEventListener('click', function () {
//   var loginCheck = new XMLHttpRequest();
//     xhr.open('post', '/signup', false);
//     xhr.setRequestHeader('Content-type', 'application/json');
//
//     var loginFormSent = {
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: password
//     }
//
//     loginFormSent = JSON.stringify(loginFormSent);
//     xhr.send(loginFormSent);
// })


// if(notLoggedInElements) {

//   for (var i = 0; i < notLoggedInElements.length; i++) {
//     notLoggedInElements[i].addEventListener('click', function () {
//       // hiddenInput.type='text';
//       // hiddenInput.style.display='none'
//       // hiddenInput.value=this.id;
//       // hiddenInput.name='path';
//       //
//       // hiddenInputOne.type='text';
//       // hiddenInputOne.style.display='none'
//       // hiddenInputOne.value=this.id;
//       // hiddenInputOne.name='path';
//       //
//       // appendDivs[0].appendChild(hiddenInputOne);
//       // appendDivs[1].appendChild(hiddenInput);
//       //
//       // console.log(typeof hiddenInputOne.value, 'VALUEOne', hiddenInputOne.value);
//       // console.log(typeof hiddenInput.value, 'VALUE', hiddenInput.value);
//
//       loginModal.showModal();
//         submitSignup.addEventListener('click', function () {
//     var xhr = new XMLHttpRequest();
//     var sentObjectExample = {name: "Akhil", message: "final twilio test"};
//       xhr.open('post', "/findme", false);
//       xhr.setRequestHeader('Content-type', "application/json");
//       sentObjectString = JSON.stringify(sentObjectExample);
//       xhr.send(sentObjectString);
//       console.log(xhr.response);
//     })
//   })
// }

  //     submitSignup.addEventListener('click', function () {
  //       var loginCheck = new XMLHttpRequest();
  //         loginCheck.open('post', '/signup', false);
  //       // console.log("GOT HERE");
  //         loginCheck.setRequestHeader('Content-type', 'application/json');
  //
  //         var loginFormSent = {
  //           firstName: firstName,
  //           lastName: lastName,
  //           email: email,
  //           password: password
  //         }
  //
  //         loginFormSent = JSON.stringify(loginFormSent);
  //         loginCheck.send(loginFormSent);
  //         console.log(loginCheck.response, "RESPONSE");
  //         // console.log("SENT WORKED");
  //     })
  //
  //     closeModal.addEventListener('click', function () {
  //       loginModal.close();
  //     });
  //   })
  // }
// }

// if (errors) {
//   // for (var i = 0; i < notLoggedInElements.length; i++) {
//     hiddenInput.type='text';
//     hiddenInput.style.display='none'
//     hiddenInput.value=notLoggedInElements[0].id;
//     hiddenInput.name='path';
//
//     hiddenInputOne.type='text';
//     hiddenInputOne.style.display='none'
//     hiddenInputOne.value=notLoggedInElements[1].id;
//     hiddenInputOne.name='path';
//
//     appendDivs[0].appendChild(hiddenInputOne);
//     appendDivs[1].appendChild(hiddenInput);
//
//     console.log(typeof hiddenInputOne.value, 'VALUEOne', hiddenInputOne.value);
//     console.log(typeof hiddenInput.value, 'VALUE', hiddenInput.value);
//
//     loginModal.showModal();
//     closeModal.addEventListener('click', function () {
//       loginModal.close();
//     });
// }

//   closeModal.addEventListener('click', function () {
//     loginModal.close();
//   });
// }

// if(notLoggedInElements) {
//   for (var i = 0; i < notLoggedInElements.length; i++) {
//     notLoggedInElements[i].addEventListener('click', function () {
//       hiddenInput.type='text';
//       hiddenInput.style.display='none'
//       hiddenInput.value=this.id;
//       hiddenInput.name='path';
//
//       hiddenInputOne.type='text';
//       hiddenInputOne.style.display='none'
//       hiddenInputOne.value=this.id;
//       hiddenInputOne.name='path';
//
//       appendDivs[0].appendChild(hiddenInputOne);
//       appendDivs[1].appendChild(hiddenInput);
//
//       loginModal.showModal();
//       console.log("HITS SHOW MODAL METHOD");
//     });
//   }
//   closeModal.addEventListener('click', function () {
//     loginModal.close();
//     console.log('HITS event listener');
//   })
// }
