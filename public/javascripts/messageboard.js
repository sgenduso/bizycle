var postButton = document.getElementById('post-msg');
var msgModal = document.getElementById('new-msg-modal');
var closeModal = document.getElementById('close-msg-modal');
var thumbsUp = document.getElementsByClassName('thumbs-up');

postButton.addEventListener('click', function () {
  msgModal.showModal();
});

if (closeModal) {
  closeModal.addEventListener('click', function () {
    msgModal.close();
  });
}


function checkForLikes(thumb) {
  var messageXhr = new XMLHttpRequest();
  messageXhr.open('GET', '/messages/liked/'+thumb.id, false);
  messageXhr.send(null);
  var xhrResponse = messageXhr.response;
  // alert(xhrResponse);
  if(xhrResponse === "true"){
    thumb.classList.add('fa-thumbs-o-up');
    thumb.classList.remove('fa-thumbs-up');
 }else{
   thumb.classList.add('fa-thumbs-up');
   thumb.classList.remove('fa-thumbs-o-up');
  }
 }


function toggleLikes(thumb) {
  var messageXhr = new XMLHttpRequest();
  messageXhr.open('GET', '/messages/togglelike/'+thumb.id, false);
  messageXhr.send(null);
  var xhrResponse = messageXhr.response;
  if (xhrResponse === 'true') {
    thumb.classList.add('fa-thumbs-up');
    thumb.classList.remove('fa-thumbs-o-up');
  } else {
    thumb.classList.add('fa-thumbs-o-up');
    thumb.classList.remove('fa-thumbs-up');
  }
}

window.onload = function () {
[].forEach.call(thumbsUp, function (thumb) {
  checkForLikes(thumb);
});
};

[].forEach.call(thumbsUp, function (thumb) {
  thumb.addEventListener('click', function () {
  toggleLikes(thumb);
});
});



//   if (thumb.className === 'fa fa-thumbs-o-up fa-2x') {
//     thumb.addEventListener('click', function () {
//     var likeMessageXhr = new XMLHttpRequest();
//     likeMessageXhr.open('GET', '/messages/liked/'+this.id);
//     likeMessageXhr.send(null);
//     thumb.className="fa fa-thumbs-up fa-2x";
//     // var xhrResponse = JSON.parse(messageXhr.responseText);
//     // var xhrResponse = messageXhr.response;
//   });
// } else {
//   thumb.addEventListener('click', function () {
//   var unlikeMessageXhr = new XMLHttpRequest();
//   unlikeMessageXhr.open('GET', '/messages/unliked/'+this.id);
//   unlikeMessageXhr.send(null);
//   thumb.className='fa fa-thumbs-o-up fa-2x';
//   });
// }
