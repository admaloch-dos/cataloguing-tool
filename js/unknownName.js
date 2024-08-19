//handle is name unknown checkbox - reveal select
const unknownNameBoxHandler = (event) => {
    const itemsToShowOrHide = "#infant-section, #title-section, #last-name-section, #first-name-section, #middle-name-section, #additional-names-section"
    if (event.target.checked) {
        unknownNameSpan.innerText = '[Unnamed Person]'
        $('#unknownNameSelect, .unknown-name-span').show()
        $(itemsToShowOrHide).fadeOut();
        clearSectionTextInputs('.name-section')
        const suffixSelect = document.querySelector('#suffixSelect');
        suffixSelect.value = 'Select a suffix';
        triggerEvent(suffixSelect)
    } else {
        $('#unknownNameSelect, .unknown-name-span').hide()
        $(itemsToShowOrHide).fadeIn();
        unknownNameSpan.innerText = ''
    }
}

const clearSectionTextInputs = (sectionTag) => {
    const sections = document.querySelectorAll(sectionTag)
    sections.forEach(section => {
        const inputItems = section.querySelectorAll('.form-item-input')
        inputItems.forEach(input => {
            if (input.type === 'text') {
                input.value = ''
                triggerEvent(input)
            }
        })
    })
}

