const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SECRET);

async function googleVerify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
  });
  const payload = ticket.getPayload();

  return payload;
}

module.exports = {
  googleVerify,
};
