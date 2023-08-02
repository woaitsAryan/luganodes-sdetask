const crypto = require('crypto');

function generateResetToken() {
    const token = crypto.randomBytes(20).toString('hex');
    return token;
}

module.exports = { generateResetToken };