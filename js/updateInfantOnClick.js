//logic for infant checkbox handler
//if clicked, means that the infant died before name info could be recorded
//almost always means the only info known
const infantCheckHandler = (isChecked) => {
    const itemsToShowOrHide = "#title-section, #last-pen-name, #last-anglicized-name, #first-name-section, #middle-name-section, #additional-names-section, #additional-names-section"
    if (isChecked) {
        clearSectionTextInputs('.infant-hide')
        clearIndividualTextInputs(['#lastPenName', '#lastAnglicizedName'])
        $(itemsToShowOrHide).removeClass('d-flex').addClass('d-none')
        const suffixSelect = document.querySelector('#nameSuffix')
        suffixSelect.selectedIndex = 0;
        triggerEvent(suffixSelect)
    } else {
        $(itemsToShowOrHide).removeClass('d-none').addClass('d-flex')
    }
}

