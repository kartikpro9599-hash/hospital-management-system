/* learn whitelisting from youtube
list from https://email-verify.my-addr.com/list-of-most-popular-email-domains.php
choose the best domain as per your need
i choose overall frontend + backend both form validation so if user accidentally input false things then frontend will reject them and server will save all the their energy like bandwith ram usage etc.
*/
const onlyWhiteListedEmail = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "live.com",
  "proton.com",
  "proton.me",
]);

function isWhitelisted(email) {
  // search for how to split email and chaining
  const email_domain = email.split("@")[1]?.toLowerCase();
  // .has prototype returns boolean so on the basis of this we will validate the form valid email
  return onlyWhiteListedEmail.has(email_domain);
}

export default isWhitelisted;
