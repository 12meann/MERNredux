const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};
const isUsername = username => {
  const regEx = /^[a-z0-9_-]{3,25}$/;
  if (username.match(regEx)) return true;
  else return false;
};

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateRegister = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (isEmpty(data.username)) {
    errors.username = "Must not be empty";
  } else if (!isUsername(data.username)) {
    errors.username =
      "Only characters from a-z, 0-9, underscore and hyphen are allowed. Must be 3 to 25 characters.";
  }
  if (data.password.length < 6)
    errors.password = "Must be 6 or more characters";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLogin = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateUserUpdate = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.username)) {
    errors.username = "Must not be empty";
  } else if (!isUsername(data.username)) {
    errors.username =
      "Only characters from a-z, 0-9, underscore and hyphen are allowed. Must be 3 to 25 characters.";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validatePost = data => {
  let errors = {};

  if (isEmpty(data.content)) errors.content = "Must not be empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
