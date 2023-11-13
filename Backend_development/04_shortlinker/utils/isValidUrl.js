const URL_REGEX = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

function isValidUrl(url) {
  return URL_REGEX.test(url);
}

module.exports = isValidUrl;
