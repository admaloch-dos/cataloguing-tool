const setCurrInputAsDefault = (input) => {
    if (!input) return
    const checkBoxesContainer = input.nextElementSibling
    const prefferedBtn = checkBoxesContainer.querySelector('.preferred-btn')
    if (input.value) {
        checkBoxesContainer.classList.remove('d-none')
        checkBoxesContainer.classList.add('d-flex')
        if (prefferedBtn && !prefferedBtn.checked) prefferedBtn.click()
    } else {
        checkBoxesContainer.classList.remove('d-flex')
        checkBoxesContainer.classList.add('d-none')
        if (prefferedBtn && prefferedBtn.checked) prefferedBtn.click()
        resetPreferredInput(input)
    }
}

// if the current preferred input is erased, search for the first input that has text
const resetPreferredInput = (input) => {
    const parentContainer = input.closest('.name-section')
    const filledInput = Array.from(parentContainer.querySelectorAll('.form-item-input')).find(input => input.value.length > 0);
    if (filledInput) {
        const prefferedBtn = filledInput.nextElementSibling.querySelector('.preferred-btn')
        prefferedBtn.click()
    }
    updateStringHandler()
}