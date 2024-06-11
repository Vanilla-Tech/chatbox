export default {
  get(url) {
    return this.$http.get(url)
  },
  getSetting() {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            data: {
              customer: {
                id: 1,
                maxiumLoginFailure: 10,
                forceLogoutClientInstance: false,
                clientApplicationTimer: '20:00',
                lockScreen: false,
                logOffApplication: false,
                disallowedChangeTimer: 20,
                minimumPasswordLength: null,
                maximumPasswordLength: null,
                passwordExpireOnEvery: null,
                maximumPasswordAge: null,
                disallowedPasswordHistory: null,
                userMushChangePasswordOnNextLogin: false,
                alphaNumeric: false,
                passwordComplex: false,
                disallowedSequentialNumberAlphabet: false,
                disallowedCharacterRepetition: false,
                disallowedUserIdInPassword: false,
                suspendAccountAfter: null,
                deleteAccountAfter: null
              },
              agent: {
                id: 2,
                maxiumLoginFailure: 40,
                forceLogoutClientInstance: false,
                clientApplicationTimer: '10:00',
                lockScreen: false,
                logOffApplication: false,
                disallowedChangeTimer: null,
                minimumPasswordLength: null,
                maximumPasswordLength: null,
                passwordExpireOnEvery: null,
                maximumPasswordAge: null,
                disallowedPasswordHistory: null,
                userMushChangePasswordOnNextLogin: false,
                alphaNumeric: false,
                passwordComplex: false,
                disallowedSequentialNumberAlphabet: false,
                disallowedCharacterRepetition: false,
                disallowedUserIdInPassword: false,
                suspendAccountAfter: null,
                deleteAccountAfter: null
              }
            }
          }),
        3000
      )
    })
  }
}
