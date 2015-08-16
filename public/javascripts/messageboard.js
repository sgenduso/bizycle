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
  console.log(xhrResponse);
  if (xhrResponse === 'true') {
    thumb.className = 'fa fa-thumbs-up fa-2x';
  } else {
    thumb.className = 'fa fa-thumbs-o-up fa-2x';
  }
}

window.onload = function () {
[].forEach.call(thumbsUp, function (thumb) {
  checkForLikes(thumb);
});
};

[].forEach.call(thumbsUp, function (thumb) {
  thumb.addEventListener('click', checkForLikes(thumb));
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
