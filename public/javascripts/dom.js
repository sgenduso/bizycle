var addRequirement = function () {
  var newDiv = document.createElement('div');
  var newInput = document.createElement("input");
  newInput.type = "text";
  newDiv.innerHTML = "Requirements";
  newDiv.appendChild(newInput);
  document.getElementById('dynamicInput').appendChild(newDiv);
};

var navLinks = document.getElementById('nav-links');

if (window.location.pathname ==='/') {
  navLinks.style.display = 'none';
}
var description = document.getElementsByClassName('description');
var job = document.getElementsByClassName('job');

var toggleDescription = function (i) {
  return function () {
    job[i].style.display = (job[i].style.display === 'block' ? 'none' : 'block' );
  }
}

for (var i = 0; i < description.length; i++) {
  description[i].addEventListener("click", toggleDescription(i))
}
