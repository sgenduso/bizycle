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
