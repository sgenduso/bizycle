module.exports =

function(title, company, location, description, expiry) {

  var titleError = 'Title must be filled'
  var companyError = 'Company must be filled'
  var locationError = 'Location must be filled'
  var descriptionError = 'Description must be filled'
  var expiryError = 'Expiration date must be filled'
  var errors = [];
  if(title === ''){
    errors.push(titleError)
  }
  if (company === ''){
    errors.push(companyError)
  }
  if (location === ''){
    errors.push(locationError)
  }
  if (description === ''){
    errors.push(descriptionError)
  }
  if (expiry === ''){
    errors.push(expiryError)
  }
  return errors;
}
