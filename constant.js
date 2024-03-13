require('dotenv');

const auth = {
    type: 'OAuth2',
    user: 'yogendraverma.rater@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
}

const mailOptions = {
    from: 'yogendra311204@gmail',
    to: 'yogendraverma.rater@gmail.com',
    subject: 'Gmail API using nodejs'
}

module.exports = {
    auth,
    mailOptions
}