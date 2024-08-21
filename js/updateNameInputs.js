//main logic for name-inputs event listener
//all inputs in name related sections - last, first, middle, additional, titles
//all handled similarly with exceptions
//additional names can have multiple preferred
//name is seprated into two parts, primary and secondary depending on which has primary btn pressed
//
const nameInputsHandler = (nameInput) => {

    if (nameInput) {
        revealItemCheckBoxes(nameInput) //show preferred/hide btn options when input has length
        hideOrRevealInputs(nameInput) // exported logic to reveal or hide certain items based on text input
        setCurrItemAsPreferred(nameInput); // When you type a new text input - auto click the pref button for htat item
    }

    const { preferred: preferredLastName, secondary: secondaryLastNames } = lastNameHandler();
    const { preferred: preferredFirstName, secondary: secondaryFirstName } = firstNameHandler();
    const { preferred: preferredMiddleName, secondary: secondaryMiddleName } = middleNameHandler();
    const { preferred: preferredExtraNames, secondary: secondaryExtraNames } = extraNamesHandler();
    const { preferred: preferredTitleName, secondary: secondaryTitleName } = titlesHandler();

    const isSecondarySpanEmpty = !secondaryTitleName && !secondaryLastNames && !secondaryFirstName && !secondaryMiddleName && !secondaryExtraNames

    let nameObj = {
        lastName: { preferred: preferredLastName, secondary: secondaryLastNames },
        firstName: { preferred: preferredFirstName, secondary: secondaryFirstName },
        middleName: { preferred: preferredMiddleName, secondary: secondaryMiddleName },
        extraNames: { preferred: preferredExtraNames, secondary: secondaryExtraNames },
        titleName: { preferred: preferredTitleName, secondary: secondaryTitleName }
    }


    nameObj.lastName.preferred = formatPrimaryLastName(nameObj)
    // let formattedPFirstName = formatPrimaryLastName(preferredFirstName, preferredTitleName, preferredFirstName)

    const { lastName, firstName, middleName, titleName } = nameObj

    preferredNameSpan.innerText = `${preferredTitleName}${lastName.preferred}${preferredFirstName}${preferredMiddleName}${preferredExtraNames}`;
    secondaryNameSpan.innerText = !isSecondarySpanEmpty ? ` (${secondaryTitleName}${secondaryLastNames}${secondaryFirstName}${secondaryMiddleName}${secondaryExtraNames})` : ''
}

const formatPrimaryLastName = (nameObj) => {
    const { lastName, firstName, middleName, titleName } = nameObj

   firstName.preferred && console.log(firstName.preferred)

    if (!lastName.preferred || titleName.preferred) return ''

    if (firstName.preferred || middleName.preferred) {
        return `${lastName.preferred}, `
    } else {
        return lastName.preferred
    }
}

// const formatPrimaryFirstName = (nameObj) => {
//     const { lastName, firstName, middleName, titleName } = nameObj

//    firstName.preferred && console.log(firstName.preferred)

//     if (!firstName.preferred) return ''

//     if (firstName.preferred || middleName.preferred) {
//         return `${lastName.preferred}, `
//     } else {
//         return lastName.preferred
//     }
// }



//logic for handling hidding or revealing fields on text input
//ex. first name field reveals initial and shortened name option etc..
const hideOrRevealInputs = (nameInput) => {
    revealIndividualTextInputs(nameInput, 'firstNameInput', '#first-init-preferred-item, #preferred-shortname-item');
    hideIndividualTextInputs(nameInput, 'firstNameInput', '#mid-init-preferred-item, #title-input-container');
    revealIndividualTextInputs(nameInput, 'middle-name', '#mid-init-preferred-item');
    hideIndividualTextInputs(nameInput, 'title', '#first-name-item', '#first-init-preferred-item');
}

//func to generate each string
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
const setCurrItemAsPreferred = (input) => {
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

