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
            formattedStr = formatYearItemStr(input, currItem)
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
            currItem.isPreferred = input.checked

            resetPreferredBtn(input)
            if (input.classList.contains('preferred-initial')) {
                //for initial btn.. locate normal name input and grab first letter and insert into hidden initial text input then trigger input change
                const nameInput = input.closest('.input-item').previousElementSibling.querySelector('.name-input')
                const initialTextInput = input.closest('.check-boxes').previousElementSibling
                input.checked ? initialTextInput.value = nameInput.value.slice(0, 1) + '.' : ''
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
    console.log(`${circaStr}${beforeAfterStr}${textStr}`)
    return `${circaStr}${beforeAfterStr}${textStr}`
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