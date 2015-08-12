module.exports = {
  validate: function(title, company, location, description, expiry) {
    var title = 'Title must be filled'
    var company = 'Company must be filled'
    var location = 'Location must be filled'
    var description = 'Description must be filled'
    var expiry = 'Expiration date must be filled'
    var errors = [];
    if(title === ''){
      errors.push(title)
    }
    if (company === ''){
      errors.push(company)
    }
    if (location === ''){
      errors.push(location)
    }
    if (description === ''){
      errors.push(description)
    }
    if (expiry === ''){
      errors.push(expiry)
    }
    return errors;
  }
}
