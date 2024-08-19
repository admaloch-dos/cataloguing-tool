
const infantCheckHandler = (event) => {
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    const itemsToShowOrHide = "#title-section, #last-pen-name, #last-anglicized-name, #first-name-section, #middle-name-section, #additional-names-section, #additional-names-section"
    if (isChecked) {
        infantSpan.innerText = '[Infant]'
        updateInputsOnClick()
        $(itemsToShowOrHide).removeClass('d-flex').addClass('d-none')
    } else {
        infantSpan.innerText = ''
        $(itemsToShowOrHide).removeClass('d-none').addClass('d-flex')
    }
}

const updateInputsOnClick = () => {
    const firstOrMidNameSections = document.querySelectorAll('.first-or-middle-section')
    firstOrMidNameSections.forEach(section => {
        const inputItems = section.querySelectorAll('.form-item-input')
        inputItems.forEach(input => {
            if (input.type === 'text') {
                // console.log(input)
                input.value = ''
                triggerEvent(input)
            }
        })
    })
}