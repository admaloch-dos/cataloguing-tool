//main funcs/logic pertaining to form year-inputs event listener
const yearInputsHandler = (yearInput) => {
    revealInputOptions(yearInput) //reveal curr inputs checkbox options on text input
    handleEmptyYearInputs(yearInput)//helper func to export some logic for empty input handling

    const birthDateStr = genYearString('#birth-date-item')
    const deathDateStr = genYearString('#death-date-item')
    const flourishedStr = genYearString('#flourished-item')

    const formattedFlStr = flourishedStr ? `fl. ${flourishedStr}` : ''
    const formattedDeathStr = deathDateStr ? `-${deathDateStr}` : ''

    yearsSpan.innerText = `${birthDateStr}${formattedDeathStr}${formattedFlStr}`;
}

//utility func for generating string for last/first/middle names preferred and secondary
const genYearString = (sectionId) => {
    const currSection = document.querySelector(sectionId)
    const textInput = currSection.querySelector('input[type="text"]')
    const beforeOrAfterSelect = currSection.querySelector('select')
    const circaCheckBox = currSection.querySelector('input[type="checkbox"]')

    if (!textInput.value.trim()) {
        beforeOrAfterSelect.selectedIndex = 0;
        if (circaCheckBox.checked) {
            circaCheckBox.click()
        }
    }

    const circaStr = circaCheckBox.checked ? 'ca.' : ''
    const outputStr = `${beforeOrAfterSelect.value} ${circaStr} ${textInput.value}`
    return outputStr.trim()
}

//helperfunction for handling empty inputs.
//if birth date or death date text inputs aren't empty remove flourished input and vice versa

const handleEmptyYearInputs = (yearInputElement) => {

    const birthTextInput = document.querySelector('#birthDate')
    const deathTextInput = document.querySelector('#deathDate')
    const flourishedTextInput = document.querySelector('#flourished')

    if (yearInputElement.id === 'birthDate' || yearInputElement.id === 'deathDate') {
        if (yearInputElement.value.trim()) {
            resetTextInput('#flourished')
            $('#flourished-item').removeClass('d-flex').addClass('d-none')
        } else if (!birthTextInput.value.trim() && !deathTextInput.value.trim()) {
            $('#flourished-item').removeClass('d-none').addClass('d-flex')
        }
    } else if (yearInputElement.id === 'flourished') {

        if (yearInputElement.value.trim()) {
            console.log('has text')
            resetTextInput('#birthDate')
            resetTextInput('#deathDate')
            $('#birth-date-item, #death-date-item').removeClass('d-flex').addClass('d-none')
        } else if (!flourishedTextInput.value.trim()) {
            $('#birth-date-item, #death-date-item').removeClass('d-none').addClass('d-flex')
        }
    }
}









