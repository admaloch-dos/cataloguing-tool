const suffixSelectHandler = () => {
    const suffixSelect = document.querySelector('#suffixSelect')
    const suffixInput = document.querySelector('#suffixInput')
    const checkBoxContainer = suffixSelect.nextElementSibling
    
    if (suffixSelect.value) {
        suffixInput.value = suffixSelect.value
        checkBoxContainer.classList.remove('d-none')
        checkBoxContainer.classList.add('d-flex')
    } else {
        suffixInput.value = ''
        checkBoxContainer.classList.remove('d-flex')
        checkBoxContainer.classList.add('d-none')
    }
    triggerEvent(suffixInput)

}