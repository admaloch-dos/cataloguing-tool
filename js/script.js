//bootstrap popover init
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// form data entry
let previewText = document.querySelector('#previewText')


// const allForms = document.querySelectorAll()

//main listener for any name inputs, last, first, middle, additional, titles
//all logic/helper funcs related to this exported to updateNameInputs.js
document.querySelectorAll('.form-input').forEach(input =>
    input.addEventListener('input', (e) => {

        let updatedObj = {...personDataObj}

        const id = input.id

        if (input.type === 'text') {
            const currObjItem = updatedObj[id]
            let inputValue = capFirstLettersInStr(input.value)
            let formattedStr = inputValue
            revealItemCheckBoxes(input) //also run on the namesuffix select input
            if (id === 'firstBirthName') {
                hideIndividualTextInputs(inputValue.length, '#title-input-container');
                revealIndividualTextInputs(inputValue.length, '#first-init-preferred-item, #preferred-shortname-item');
            } else if (id === 'middleBirthName') {
                revealIndividualTextInputs(inputValue.length, '#mid-init-preferred-item');
            } else if (id === 'lastBirthName' ||
                id === 'lastPenName' ||
                id === 'lastAnglicizedName') {

                formattedStr = inputValue.length ? `${inputValue},` : ''
            } else if (id === 'nickname') {
                formattedStr = inputValue.length ? `'${inputValue}'` : ''
            } else if (id === 'birthDate' || id === 'deathDate' || id === 'flourished') {
                formattedStr = formatYearItemStr(input, currObjItem)
            }
            if (currObjItem.isPreferred) {
                currObjItem.isPreferred = inputValue ? true : false
            }
            //set value of obj item and formatted string
            currObjItem.value = inputValue.trim()
            currObjItem.resultStr = formattedStr ? formattedStr.trim() : inputValue.trim()
        }

        const parentSection = input.closest('.input-item')
        const locatedObjKey = parentSection && parentSection.querySelector('.form-input').id
        const locatedObjItem = updatedObj[locatedObjKey]

        if (input.type === 'checkbox') {

            if (input.classList.contains('preferred-btn')) {
                locatedObjItem.isPreferred = input.checked

                resetPreferredBtn(input)
                if (input.classList.contains('preferred-initial')) {
                    //for initial btn.. locate normal name input and grab first letter and insert into hidden initial text input then trigger input change
                    const nameInput = input.closest('.input-item').previousElementSibling.querySelector('.name-input')
                    const initialTextInput = input.closest('.check-boxes').previousElementSibling
                    input.checked ? initialTextInput.value = nameInput.value.slice(0, 1) + '.' : ''
                    triggerEvent(initialTextInput)
                }
            } else if (input.classList.contains('hide-item-toggle')) {
                locatedObjItem.isHidden = input.checked
            } else if (id === 'unknownCheckbox') {
                updatedObj.unknown.isUnknown = input.checked
                updatedObj.unknown.unknownData = input.checked ? 'Unnamed Person' : ''
                unknownNameBoxHandler(input.checked) // hide/show/delete item inputs etc...
            } else if (id === 'infantCheckbox') {
                updatedObj.infant.isInfant = input.checked
                infantCheckHandler(input.checked)
            } else if (id === 'enslavedCheckbox') {
                updatedObj.enslaved.isEnslaved = input.checked;
                revealIndividualTextInputs(input.checked, '#enslaved-text-item');
            } else { //date items circa checkbox -- update value and the item string
                locatedObjItem.isCirca = input.checked
                locatedObjItem.resultStr = formatYearItemStr(input, locatedObjItem)
            }
        }
        if (input.type === 'select-one') {
            if (id === 'unknownData') {
                updatedObj.unknown[id] = input.value
            }
            else if (id === 'nameSuffix') {
                updatedObj[id].value = input.value
                updatedObj[id].isPreferred = input.value ? true : false
                revealItemCheckBoxes(input)
            }
            else { //dates - before after select - update select item and results str
                locatedObjItem.beforeOrAfter = input.value
                locatedObjItem.resultStr = formatYearItemStr(input, locatedObjItem)
            }
        }
        setCurrItemAsPreferred(input)

        personDataObj = updatedObj

        let preferredNameStr = '';
        let secondaryNameStr = ''

        for (let input in personDataObj) {
            const inputItem = personDataObj[input]
            if (typeof inputItem.isPreferred !== 'undefined') {
                let itemVal = inputItem.resultStr

                if (inputItem.isPreferred) {
                    preferredNameStr += `${itemVal} `
                } else {
                    secondaryNameStr += `${itemVal} `
                }
            }
        }

        secondaryNameStr = secondaryNameStr.trim() ? `(${secondaryNameStr})` : ''

        const { unknown, birthDate, deathDate, flourished, enslaved, infant } = personDataObj

        const formattedUnknown = unknown.unknownData ? `[${unknown.unknownData}]` : ''

        const infantStr = infant.isInfant ? '[infant]' : ''

        let enslavedStr = ''
        if (enslaved.isEnslaved) {
            enslavedStr = !enslaved.value ? '(Enslaved person)' : `(Enslaved by ${enslaved.value})`
        }

        const resStr = `${formattedUnknown} ${preferredNameStr} ${infantStr} ${secondaryNameStr} ${birthDate.resultStr} ${deathDate.resultStr} ${flourished.resultStr} ${enslavedStr}`

        previewText.innerText = resStr

        console.log(personDataObj)
    })
);

//year items have text, checkbox and select input.
//this formats the resulting string whenever one of these items runs
const formatYearItemStr = (input, objItem) => {
    const { value, isCirca, beforeOrAfter } = objItem
    const parentSectionId = input.closest('.input-item').id
    //birth string needs -
    let textStr = value && parentSectionId === 'birth-date-item' ? `${value}-` : value
    let circaStr = isCirca ? '.ca' : ''
    let beforeAfterStr = beforeOrAfter
    if (input.type === 'text') {
        const formattedInputVal = capFirstLettersInStr(input.value)
        textStr = input.id === 'birthDate' ? `${formattedInputVal}-` : formattedInputVal
    } else if (input.type === 'checkbox') {
        circaStr = input.checked ? '.ca' : ''
    } else {
        if (input.value === 'before') {
            beforeAfterStr = '.b'
        } else if (input.value === 'after') {
            beforeAfterStr = '.a'
        } else beforeAfterStr = ''
    }
    return `${circaStr}${beforeAfterStr}${textStr}`
}


// const formatUnknownItemStr = (input, objItem) => {
//     const { isUnknown, unknownData } = objItem

//     let currCheckVal = ''
//     let resultStr = unknownData ? ['Enslaved Person']

//     if (input.type === 'checkbox') {
//         currCheckVal = input.val
//     } else {

//     }
//     return `${circaStr}${beforeAfterStr}${textStr}`
// }

const resetPreferredBtn = (currBtn) => {
    // console.log('this ran')
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
        const singlePreferredContainer = input.closest('.single-preferred-name')
        if (input.value) {
            if (!prefferedBtn.checked) {
                prefferedBtn.click()
                if (singlePreferredContainer) {
                }
            }
        } else {
            if (prefferedBtn.checked) prefferedBtn.click()
            if (input.id === 'middleBirthName') {
                const middleInitInput = document.querySelector('#middleInitialInput')
                if (middleInitInput) middleInitInput.value = ''
            } else if (input.id === 'firstBirthName') {
                const firstInitInput = document.querySelector('#firstInitial')
                if (firstInitInput) firstInitInput.value = ''
            }
            resetPreferredInput(input) //set the first input that has text in it in the current section as preferred- if any
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
        // console.log(filledInput)
        const prefferedBtn = filledInput.nextElementSibling.querySelector('.preferred-btn')
        prefferedBtn.click()
    }
    // nameInputsHandler()
}