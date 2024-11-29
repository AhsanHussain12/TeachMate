import bcrypt from "bcrypt"

// Function to generatehashstring->(salt+pass) of a password
function generatehashPassword(password) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

// Function to check a password against a hashpassword coming from DB or etc
function comparePasswords(inputPassword, hashedPassword) {
    return bcrypt.compareSync(inputPassword, hashedPassword);
}

export {generatehashPassword,comparePasswords};


