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
        } else if (input.classList.contains('delete-initial')) {
            const emptyItem = { value: '', isPreferred: false, isHidden: false, resultStr: '' }
            if (input.id === 'deleteFirstInitialBtn') {
                updatedObj.firstInitial = emptyItem
                resetTextInput('#firstInitial')
            } if (input.id === 'deleteMidInitialBtn') {
                updatedObj.middleInitial = emptyItem
                resetTextInput('#middleInitial')


            }

            updatedObj.enslaved.isEnslaved = input.checked;
        } else { //date items circa checkbox -- update value and the item string
            currItem.isCirca = input.checked
            currItem.resultStr = formatYearItemStr(input, currItem)
        }
    }

    return updatedObj;
}