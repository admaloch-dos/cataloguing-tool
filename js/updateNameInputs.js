//main logic for name-inputs event listener
//all inputs in name related sections - last, first, middle, additional, titles
//all handled similarly with exceptions
//additional names can have multiple preferred
const nameInputsHandler = (nameInput) => {
    if (nameInput) {
        revealInputOptions(nameInput) //reveal curr inputs checkbox options on text input
        setCurrInputAsDefault(nameInput); // When you type a new text input - sets it as the preferred input by clicking P btn
        revealExtraNameOptions(nameInput); // Reveals options based on input
    }

    const { preferred: preferredLastName, secondary: secondaryLastNames } = lastNameHandler();
    const { preferred: preferredFirstName, secondary: secondaryFirstName } = firstNameHandler();
    const { preferred: preferredMiddleName, secondary: secondaryMiddleName } = middleNameHandler();
    const { preferred: preferredExtraNames, secondary: secondaryExtraNames } = extraNamesHandler();
    const { preferred: preferredTitleName, secondary: secondaryTitleName } = titlesHandler();

    const isSecondarySpanEmpty = !secondaryTitleName && !secondaryLastNames && !secondaryFirstName && !secondaryMiddleName && !secondaryExtraNames

    let formattedPLastName = formatPrimaryLastName(preferredLastName, preferredTitleName, preferredFirstName)
    let formattedPFirstName = formatPrimaryLastName(preferredFirstName, preferredTitleName, preferredFirstName)

    preferredNameSpan.innerText = `${preferredTitleName}${preferredLastName}${preferredFirstName}${preferredMiddleName}${preferredExtraNames}`;
    secondaryNameSpan.innerText = !isSecondarySpanEmpty ? `(${secondaryTitleName}${secondaryLastNames}${secondaryFirstName}${secondaryMiddleName}${secondaryExtraNames})` : ''
}


const lastNameHandler = () => {
    const lastNameSection = document.querySelector('.last-name-section')
    return genNameString(lastNameSection)
}
const firstNameHandler = () => {
    const firstNameSection = document.querySelector('.first-name-section')
    return genNameString(firstNameSection)
}
const middleNameHandler = () => {
    const middleNameSection = document.querySelector('.middle-name-section')
    return genNameString(middleNameSection)
}

const extraNamesHandler = () => {
    const additionalNamesSection = document.querySelector('.additional-names-section')
    return genNameString(additionalNamesSection)
}
const titlesHandler = () => {
    const titleNameSection = document.querySelector('.title-section')
    return genNameString(titleNameSection)
}

//helper func for generating string for last/first/middle names preferred and secondary
const genNameString = (container) => {
    let preferred = '';
    let secondary = '';
    container.querySelectorAll('.preferred-btn').forEach(btn => {
        const textInput = btn.closest('.input-item').querySelector('.form-item-input')
        if (!textInput) return
        const formattedInputVal = textInput.value.length > 0 && formatNameString(textInput)
        if (formattedInputVal && formattedInputVal.length > 0) {
            if (btn.checked) {
                preferred += !preferred ? formattedInputVal : ` ${formattedInputVal}`
            } else {
                secondary += !secondary ? formattedInputVal : ` ${formattedInputVal}`
            }
        }
    })
    return { preferred, secondary }
}

//specially format strings based on specific input id
const formatNameString = (input) => {
    const inputVal = input.value
    const upperCaseVal = inputVal.slice(0, 1).toUpperCase() + inputVal.slice(1)
    if (input.id === 'nickname') {
        return `'${upperCaseVal}'`
    } else if (input.id === 'middle-name' || input.id === 'additionalLastNames' || input.id === 'indigenousName' || input.id === 'title') {
        return capFirstLettersInStr(inputVal)
    } else {
        return upperCaseVal
    }
}

// When you type a new text input - sets it as the preferred input by clicking P btn
//this triggers taht btn and logic related to that ben press is triggered
// logic for btn located at script .preferred-btn input listener or the handle func in handlePreferredBtns.js
const setCurrInputAsDefault = (input) => {
    if (!input) return
    // console.log(input)
    const checkBoxesContainer = input.nextElementSibling
    if (checkBoxesContainer) {
        const prefferedBtn = checkBoxesContainer.querySelector('.preferred-btn')
        if (input.value) {
            if (prefferedBtn && !prefferedBtn.checked) prefferedBtn.click()
        } else {
            if (prefferedBtn && prefferedBtn.checked) prefferedBtn.click()
            if (input.id === 'middle-name') {
                document.querySelector('#middleInitialInput').value = ''
            } else if (input.id === 'firstNameInput') {
                document.querySelector('#firstInitialInput').value = ''
            }
            resetPreferredInput(input) //set the first input that has text in it in the current section as preferred- if any
        }
    }
}

// if the current preferred input is erased, search for the first input that has text
const resetPreferredInput = (input) => {
    const parentContainer = input.closest('.single-preferred-name')
    const formInputs = parentContainer && Array.from(parentContainer.querySelectorAll('.form-item-input'))
    const filledInput = formInputs && formInputs.find(input => input.value.length > 0)
    if (filledInput) {
        console.log(filledInput)
        const prefferedBtn = filledInput.nextElementSibling.querySelector('.preferred-btn')
        prefferedBtn.click()
    }
    // updateNameInputHandler()
}

