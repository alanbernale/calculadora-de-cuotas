import './style.css'

const MIN_FEE = 2,
  MAX_FEE = 72

let inputAmount = document.getElementById('input-amount'),
  inputTea = document.getElementById('input-tea'),
  inputFee = document.getElementById('input-fee'),
  tagFee = document.getElementById('tag-fee'),
  tagTotal = document.getElementById('tag-total'),
  tagTem = document.getElementById('tag-tem'),
  calculateButton = document.getElementById("calculate-button"),
  cleanButton = document.getElementById("clean-button"),
  decreaseButton = document.getElementById('decrease-button'),
  increaseButton = document.getElementById('increase-button')

const validateInput = el => {
  if (el.value === '') {
    let validationFeedback = document.createElement('span')
    validationFeedback.classList.add('form__validation')
    validationFeedback.textContent = 'Debes llenar este campo.'
    validationFeedback.role = 'alert'

    el.classList.add('form__input--invalid')
    el.after(validationFeedback)
    return false
  }

  return true
}

/**
 * Asignación de evento para aumentar valor de dataNumberFee.
 */
decreaseButton.addEventListener('click', () => {
  if (inputFee.value <= MIN_FEE) {
    return
  }
  inputFee.value = Number(inputFee.value) - 1
})

/**
 * Asignación de evento para disminuir valor de dataNumberFee.
 */
increaseButton.addEventListener('click', () => {
  if (inputFee.value >= MAX_FEE) {
    return
  }
  inputFee.value = Number(inputFee.value) + 1
})

inputAmount.addEventListener('input', () => {
  if (!inputAmount.classList.contains('form__input--invalid')) {
    return
  }

  inputAmount.classList.remove('form__input--invalid')
  inputAmount.nextSibling.remove()
})

/**
 * Asignación de evento para mantener valor de dataNumberFee en rango.
 */
inputFee.addEventListener('change', () => {
  if (inputFee.value > MAX_FEE) {
    inputFee.value = MAX_FEE
  } else if (inputFee.value < MIN_FEE) {
    inputFee.value = MIN_FEE
  }
})

/**
 * Asignación de evento para calcular resultados.
 */
calculateButton.addEventListener('click', () => {
  if (validateInput(inputAmount) && validateInput(inputTea)) return

  let valueTea = Number(inputTea.value) / 100

  let valueTem = (1 + valueTea) ** (1 / 12) - 1

  valueTem = Math.round(valueTem * Math.pow(10, 4)) / Math.pow(10, 4)

  let valueAmount = Number(inputAmount.value),
    valueNumberFee = Number(inputFee.value)

  let valueCuota = (valueAmount * (valueTem * (1 + valueTem) ** valueNumberFee)) / (((1 + valueTem) ** valueNumberFee) - 1)

  valueCuota = Math.round(valueCuota * Math.pow(10, 2)) / Math.pow(10, 2)

  let valueTotal = Math.round((valueCuota * valueNumberFee) * Math.pow(10, 2)) / Math.pow(10, 2)

  tagFee.textContent = String(valueCuota)
  tagTem.textContent = String(valueTem * 100)
  tagTotal.textContent = String(valueTotal)
})

/**
 * Asignación de evento para limpiar campos.
 */
cleanButton.addEventListener('click', () => {
  inputAmount.value = ''
  inputTea.value = ''
  inputFee.value = '2'
  tagFee.textContent = '0.00'
  tagTotal.textContent = '0.00'
  tagTem.textContent = '0.00'
})
