const handleTextInputs = (input, obj) => {
    //for text inputs.. the id is the key for the item in the object
    //obj[input.id]
    let updatedObj = { ...obj }


    if (input.type === 'text') {
        const id = input.id
        let currItem = updatedObj[id]
        let inputValue = capFirstLettersInStr(input.value)
        let formattedStr = inputValue
        revealItemCheckBoxes(input) //also run on the namesuffix select input
        if (id === 'firstBirthName') {
            if (input.value.length) {
                $('#title-input-container').removeClass('d-flex').addClass('d-none')
                $('#first-init-preferred-item, #preferred-shortname-item').removeClass('d-none').addClass('d-flex')
                clearIndividualTextInputs(['#titleName'])
            } else {
                $('#title-input-container').removeClass('d-none').addClass('d-flex')
                $('#first-init-preferred-item, #preferred-shortname-item').removeClass('d-flex').addClass('d-none')
                clearIndividualTextInputs(['#firstInitial'])
            }
        } else if (id === 'middleBirthName') {
            revealIndividualTextInputs(inputValue.length, '#mid-init-preferred-item');
        } else if (id === 'lastBirthName' ||
            id === 'lastPenName' ||
            id === 'lastAnglicizedName') {
            formattedStr = inputValue.length ? `${inputValue},` : ''
        } else if (input.classList.contains('initial-input')) {
            const deleteInitialBtn = input.closest('.input-item').querySelector('.delete-initial')
            console.log(deleteInitialBtn)
            if (input.value) {
                deleteInitialBtn.classList.remove('d-none')
            } else {
                deleteInitialBtn.classList.add('d-none')
            }
        } else if (id === 'nickname') {
            formattedStr = inputValue.length ? `'${inputValue}'` : ''
        } else if (id === 'birthDate' || id === 'deathDate' || id === 'flourished') {
            if (id === 'birthDate' || id === 'deathDate') {
                const flourishedInput = document.querySelector('#flourished')
                if (flourishedInput.value.trim()) {
                    clearIndividualTextInputs(['#flourished'])
                    removeYearInputs(flourishedInput)
                }
            } else if (id === 'flourished') {
                const birthDateInput = document.querySelector('#birthDate')
                const deathDateInput = document.querySelector('#deathDate')
                if (birthDateInput.value.trim()) {
                    clearIndividualTextInputs(['#birthDate'])
                    removeYearInputs(birthDateInput)
                }
                if (deathDateInput.value.trim()) {
                    clearIndividualTextInputs(['#deathDate'])
                    removeYearInputs(deathDateInput)
                }

            }
            if (!input.value.length) removeYearInputs(input)
            else {
                formattedStr = formatYearItemStr(input, currItem)
            }
        } else if (id === 'titleName' || id === 'indigenousName') {

        }

        if (currItem.isPreferred) {
            currItem.isPreferred = inputValue ? true : false
        }
        //set value of obj item and formatted string
        const textInputVal = inputValue.trim()
        const formattedResStr = formattedStr ? formattedStr.trim() : inputValue.trim()
        currItem.value = textInputVal
        currItem.resultStr = formattedResStr
        return updatedObj
    }
}

const handleCheckInputs = (input, obj) => {
    let updatedObj = { ...obj }
    if (input.type === 'checkbox') {
        const parentSection = input.closest('.input-item')
        const locatedObjKey = parentSection && parentSection.querySelector('.form-input').id
        const currItem = updatedObj[locatedObjKey]
        if (input.classList.contains('preferred-btn')) {
            // console.log(updatedObj)
            const parent = input.closest('.main-section')

            currItem.isPreferred = input.checked



            resetPreferredBtn(input)
            if (input.classList.contains('preferred-initial')) {
                //for initial btn.. locate normal name input and grab first letter and insert into hidden initial text input then trigger input change
                const nameInput = input.closest('.input-item').previousElementSibling.querySelector('.name-input')
                const initialTextInput = input.closest('.check-boxes').previousElementSibling
                input.checked ? initialTextInput.value = genInitials(nameInput.value) : ''
                triggerEvent(initialTextInput)
            }

        } else if (input.classList.contains('hide-item-toggle')) {
            currItem.isHidden = input.checked
        } else if (input.id === 'unknownCheckbox') {
            updatedObj.unknown.isUnknown = input.checked
            updatedObj.unknown.unknownData = input.checked ? 'Unnamed Person' : ''
            unknownNameBoxHandler(input.checked) // hide/show/delete item inputs etc...
        } else if (input.id === 'infantCheckbox') {
            updatedObj.infant.isInfant = input.checked
            infantCheckHandler(input.checked)
        } else if (input.id === 'enslavedCheckbox') {
            updatedObj.enslaved.isEnslaved = input.checked;
            revealIndividualTextInputs(input.checked, '#enslaved-text-item');
        } else { //date items circa checkbox -- update value and the item string
            currItem.isCirca = input.checked
            currItem.resultStr = formatYearItemStr(input, currItem)

        }
    }
    return updatedObj;
}

const handleSelectInputs = (input, obj) => {

    let updatedObj = { ...obj }

    if (input.type === 'select-one') {
        const parentSection = input.closest('.input-item')
        const locatedObjKey = parentSection && parentSection.querySelector('.form-input').id
        const locatedObjItem = updatedObj[locatedObjKey]
        if (input.id === 'unknownData') {
            updatedObj.unknown[input.id] = input.value
        }
        else if (input.id === 'nameSuffix') {
            updatedObj[input.id].value = input.value
            updatedObj[input.id].resultStr = input.value
            updatedObj[input.id].isPreferred = input.value ? true : false
            revealItemCheckBoxes(input)
        }
        else { //dates - before after select - update select item and results str
            locatedObjItem.beforeOrAfter = input.value
            locatedObjItem.resultStr = formatYearItemStr(input, locatedObjItem)
        }
    }
    return updatedObj;
}

//year items have text, checkbox and select input.
//this formats the resulting string whenever one of these items runs
const formatYearItemStr = (input, objItem) => {
    const { value, isCirca, beforeOrAfter } = objItem
    const parentSectionId = input.closest('.input-item').id

    let textStr = value && parentSectionId === 'birth-date-item' ? `${value}-` : value
    let circaStr = isCirca ? 'ca.' : ''
    let beforeAfterStr = formatBeforeAfterStr(beforeOrAfter)

    if (input.type === 'text') {
        const formattedInputVal = capFirstLettersInStr(input.value)
        textStr = input.id === 'birthDate' ? `${formattedInputVal}-` : formattedInputVal
    } else if (input.type === 'checkbox') {
        circaStr = input.checked ? 'ca.' : ''
    } else {
        beforeAfterStr = formatBeforeAfterStr(input.value)
    }
    return `${circaStr}${beforeAfterStr}${textStr}`
}

// take year input item and clear checkbox and select
const removeYearInputs = (input) => {
    const checkboxes = input.nextElementSibling
    const circaBox = checkboxes.querySelector('.circa-checkbox')
    circaBox.checked = false
    const beforeAfterSelect = checkboxes.querySelector('.before-after-select')
    beforeAfterSelect.selectedIndex = 0
    triggerEvent(circaBox)
    triggerEvent(beforeAfterSelect)
}

const formatBeforeAfterStr = (inputText) => {
    let res = ''
    if (inputText === 'before') {
        res = '.b '
    } else if (inputText === 'after') {
        res = '.a '
    } else res = ''
    return res;
}



//handle is name unknown checkbox -
//select is revealed on click to specify if known - male/female etc..
//this indicates taht all name related inputs are unknown and will be emptied/hidden on click
const unknownNameBoxHandler = (isChecked) => {
    const itemsToShowOrHide = "#infant-section, #title-section, #last-name-section, #first-name-section, #middle-name-section, #additional-names-section"
    if (isChecked) {
        clearSectionTextInputs('.name-section')
        $(itemsToShowOrHide).addClass('d-none').removeClass('d-flex')
        $('#unknownData').addClass('d-flex').removeClass('d-none')
        const suffixSelect = document.querySelector('#nameSuffix')
        suffixSelect.selectedIndex = 0;
        triggerEvent(suffixSelect)
    } else {
        $('#unknownData').addClass('d-none').removeClass('d-flex')
        $(itemsToShowOrHide).addClass('d-flex').removeClass('d-none')
    }
}