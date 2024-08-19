const setCurrInputAsDefault = (input) => {
    if (!input) return
    const checkBoxesContainer = input.nextElementSibling
    if (checkBoxesContainer) {
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

}

// if the current preferred input is erased, search for the first input that has text
const resetPreferredInput = (input) => {
    const parentContainer = input.closest('.single-preferred-name')
    const formInputs = parentContainer && Array.from(parentContainer.querySelectorAll('.form-item-input'))
    const filledInput = formInputs && formInputs.find(input => input.value.length > 0)
    if (filledInput) {
        const prefferedBtn = filledInput.nextElementSibling.querySelector('.preferred-btn')
        prefferedBtn.click()
    }
    updateStringHandler()
}

//if current preferred input is deleted, reset to first input in container that has text
const resetPreferredBtn = (currBtn) => {
    const parentContainer = currBtn.closest('.single-preferred-name')
    if (parentContainer) {
        const preferredButtons = parentContainer.querySelectorAll('.preferred-btn');
        preferredButtons?.forEach(btn => {
            if (btn.id !== currBtn.id && btn.checked) {
                btn.click()
            }
        })
    }
}