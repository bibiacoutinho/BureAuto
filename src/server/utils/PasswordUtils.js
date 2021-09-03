const password = require("secure-random-password")

/* eslint-disable-next-line no-unused-vars */
const PasswordUtils = module.exports = {
    randomPassword: function() {
        return password.randomPassword({
            length: 12,
            characters: [
                {characters: password.upper, exactly: 3},
                {characters: password.symbols, exactly: 2},
                {characters: password.digits, exactly: 3},
                {characters: password.lower, exactly: 4}
            ]
        })
    }
}