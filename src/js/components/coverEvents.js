const coverEvents = {
  btn: document.getElementById('btn_check_rate'),
  input: document.getElementById('input_check_rate'),
  select: document.getElementById('select_check_rate'),

  checkIsNumber: function (e) {
    const regex = /\d/
    const notNumber = !regex.test(e.key)
    notNumber && e.preventDefault()
  },

  handleBtnClick: function (e) {
    const { input, select } = this
    const amount = Number(input.value)
    const purpose = select.value
    const url = `https://www.lnb.com.tw/borrow.html?amount=${amount}&purpose=${purpose}`
    const msg = {
      noAmountAndPurpose: 'Need your option information.',
      noAmount: 'Please entered how much do you need.',
      noPurpose: 'Please choose what\'s the money for.',
      amountBeyond: 'Your loan amount is beyond our scope.'
    }
    let status

    e.preventDefault()

    if (amount && purpose) {
      if (amount > 40000) {
        status = 'amountBeyond'
      } else {
        window.location.href = url
      }
    } else {
      if (!amount && !purpose) {
        status = 'noAmountAndPurpose'
      } else if (!amount) {
        status = 'noAmount'
      } else {
        status = 'noPurpose'
      }
    }

    status && window.alert(msg[status])
  },

  init: function () {
    const { input, btn, checkIsNumber, handleBtnClick } = this
    input.addEventListener('keypress', checkIsNumber.bind(this))
    btn.addEventListener('click', handleBtnClick.bind(this))
  }
}

module.exports = coverEvents
