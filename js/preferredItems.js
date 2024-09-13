const resetPreferredBtn = (currBtn) => {
    const parentContainer = currBtn.closest('.single-preferred-name')
    if (parentContainer) {
        const preferredButtons = parentContainer.querySelectorAll('.preferred-btn');
        preferredButtons.forEach(btn => {
            if (btn.id !== currBtn.id && btn.checked) {
                btn.click()
            }
        })
    }
}


// When you type a new text input - sets it as the preferred input by clicking P btn
//this triggers taht btn and logic related to that ben press is triggered
// logic for btn located at script .preferred-btn input listener or the handle func in handlePreferredBtns.js
const setCurrItemAsPreferred = (input) => {
    const preferredBtnContainer = input.nextElementSibling

    if (preferredBtnContainer) {
        const prefferedBtn = preferredBtnContainer.querySelector('.preferred-btn')
        if (!prefferedBtn) return;
        if (input.value) {
            if (!prefferedBtn.checked) {
                prefferedBtn.click()
            }
        } else {
            resetPreferredInput(input) //set the first input that has text in it in the current section as preferred- if any

            if (prefferedBtn.checked) prefferedBtn.click()
            if (input.id === 'middleBirthName') {
                const middleInitInput = document.querySelector('#middleInitialInput')
                if (middleInitInput) middleInitInput.value = ''
            } else if (input.id === 'firstBirthName') {
                const firstInitInput = document.querySelector('#firstInitial')
                if (firstInitInput) firstInitInput.value = ''
            }
        }
    }
}

// if the current preferred input is erased, search for the first input that has text
const resetPreferredInput = (input) => {
    const parentContainer = input.closest('.single-preferred-name')
    if (!parentContainer) return;
    const formInputs = Array.from(parentContainer.querySelectorAll('.form-item-input'))
    const filledInput = formInputs.find(input => input.value.length > 0)
    if (filledInput) {
        const prefferedBtn = filledInput.nextElementSibling.querySelector('.preferred-btn')
        prefferedBtn.click()
    }
}