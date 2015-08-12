function validate(title, company, location, description, expiry) {
  var title = 'Title must be filled'
  var company = 'Company must be filled'
  var location = 'Location must be filled'
  var description = 'Description must be filled'
  var expiry = 'Expiry must be filled'
  var errors = [];
  if(title === ''){
    errors.push(title)
  } else if (company === ''){
    errors.push(company)
  } else if (location === ''){
    errors.push(location)
  } else if (description === ''){
    errors.push(description)
  } else if (expiry === ''){
    errors.push(expiry)
  }
  return errors;
}
