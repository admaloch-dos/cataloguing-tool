//handle is name unknown checkbox -
//select is revealed on click to specify if known - male/female etc..
//this indicates taht all name related inputs are unknown and will be emptied/hidden on click
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



