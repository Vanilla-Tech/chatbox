import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.directive('numericOnly', {
  bind(el) {
    el.addEventListener('keyup', () => {
      const regex = /^[0-9]*$/
      if (!regex.test(el.value)) {
        el.value = el.value.slice(0, -1)
      }
    })
  }
})

const bindDrag = el => {
  const handler = event => {
    event.preventDefault()
    return false
  }

  el.addEventListener('dragenter', handler)
  el.addEventListener('dragover', handler)
  el.addEventListener('drop', handler)
}

Vue.directive('only-numeric', {
  bind(el, binding) {
    bindDrag(el)
    el.addEventListener('keypress', e => {
      if (e.target.value.length == 0 && e.which == 48) {
        return false
      }
    })

    el.addEventListener('keydown', e => {
      const event = e || window.event
      if (binding.arg && binding.arg === 'decimal') {
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 37 && event.keyCode <= 40) ||
          (event.keyCode >= 96 && event.keyCode <= 105) ||
          event.keyCode === 8 ||
          event.keyCode === 9 ||
          event.keyCode === 37 ||
          event.keyCode === 39 ||
          event.keyCode === 46 ||
          event.keyCode === 190 ||
          event.keyCode === 110
        ) {
          return false
        }
        event.preventDefault()

        if (
          event.target.value.indexOf('.') !== -1 &&
          (event.keyCode === 190 || event.keyCode === 110)
        )
          event.preventDefault()
      } else if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 37 && event.keyCode <= 40) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode === 8 ||
        event.keyCode === 9 ||
        event.keyCode === 46
      ) {
        return false
      } else {
        event.preventDefault()
      }
    })
  }
})

const dictionaryCountries = [
  {
    country: 'au',
    message: '123456-123456/7890',
    pattern: '^([0-9]){6}-([0-9]){6,10}$'
  },
  {
    country: 'nz',
    message: '12-3456-1234567-12/3',
    pattern: '^([0-9]){2}-([0-9]){4}-([0-9]){7}-([0-9]){2,3}$'
  },
  {
    country: 'uk',
    message: '123456-12345678/90',
    pattern: '^([0-9]){6}-([0-9]){8,10}$'
  },
  {
    country: 'us',
    message: '123456789-12345678/123456789',
    pattern: '^([0-9]){9}-([0-9]){8,17}$'
  },
  {
    country: 'ch',
    message: 'Card number must be 16 to 19 digits.',
    pattern: '^([0-9]){16,19}$'
  }
]

const config = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  strict: true,
  classes: true,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true,
  validity: false,
  aria: true
}

VeeValidate.Validator.extend('BankAccount', {
  getMessage: (field, args) => {
    const message = dictionaryCountries.filter(p => p.country === args[0])
    if (message === null) return ''

    return `Invalid A/C No. ${message[0].message}`
  },
  validate: (value, args) => {
    let countrySelected = ''
    if (args == null) return true

    if (args !== null) countrySelected = args[0]

    const regExpression = dictionaryCountries.filter(p => p.country === countrySelected)[0]

    if (regExpression === undefined) return true
    const strongRegex = new RegExp(regExpression.pattern)
    return strongRegex.test(value)
  }
})

VeeValidate.Validator.extend('verify_password', {
  getMessage: () =>
    `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
  validate: value => {
    var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    return strongRegex.test(value)
  }
})

Vue.use(VeeValidate, config)
