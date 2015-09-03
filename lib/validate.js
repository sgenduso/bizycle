module.exports =

function(title, company, location, description, expiry) {

  var titleError = '* Job Title is required.';
  var companyError = '* Company Name is required.';
  var locationError = '* Location is required.';
  var descriptionError = '* Job Description is required.';
  var expiryError = '* Expiration date is required.';
  var errors = [];
  if(title === ''){
    errors.push(titleError);
  }
  if (company === ''){
    errors.push(companyError);
  }
  if (location === ''){
    errors.push(locationError);
  }
  if (description === ''){
    errors.push(descriptionError);
  }
  if (expiry === ''){
    errors.push(expiryError);
  }
  return errors;
};
