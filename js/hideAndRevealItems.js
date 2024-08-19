const revealExtraNameOptions = (inputElement) => {
    hideOrRevealOnTextInput('reveal', inputElement, 'firstNameInput', '#first-init-preferred-item, #preferred-shortname-item')
    hideOrRevealOnTextInput('reveal', inputElement, 'middle-name', '#mid-init-preferred-item')
    hideOrRevealOnTextInput('hide', inputElement, 'firstNameInput', '#title-input-container')

}

//some items need to be hidden by default then shown if input is filled in and vice versa
//func takes curr form input id and compares its id to comparison id, then reveals or hides based on input of 'reveal' or 'hide'
const hideOrRevealOnTextInput = (revealOrHide, currInput, idComparison, item) => {
    if (currInput && currInput.id === idComparison) {
        if (currInput.value.length > 0) {
            revealOrHide === 'reveal'
                ? $(item).removeClass('d-none').addClass('d-flex')
                : $(item).removeClass('d-flex').addClass('d-none')
        } else {
            revealOrHide === 'reveal'
                ? $(item).removeClass('d-flex').addClass('d-none')
                : $(item).removeClass('d-none').addClass('d-flex')
        }
    }
}



