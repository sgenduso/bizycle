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

[].forEach.call(thumbsUp, function (thumb) {
  thumb.addEventListener('click', function () {
  var messageXhr = new XMLHttpRequest();
  messageXhr.open('GET', '/messages/liked/'+this.id);
  messageXhr.send(null);
  var xhrResponse = JSON.parse(responseText);
  console.log(xhrResponse);

});
});
