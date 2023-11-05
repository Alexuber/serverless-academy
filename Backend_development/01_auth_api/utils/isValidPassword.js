function isValidPassword(password) {
  const minLength = 8;
  return password.length >= minLength;
}
module.exports = isValidPassword;
