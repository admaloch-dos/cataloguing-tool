const handleTextInputs = (input, obj) => {
    //for text inputs.. the id is the key for the item in the object
    //obj[input.id]
    let updatedObj = { ...obj }
    const id = input.id
    let currItem = updatedObj[id]
    if (input.type === 'text') {
        let inputValue = capFirstLettersInStr(input.value)
        let formattedStr = inputValue
        revealItemCheckBoxes(input) //also run on the namesuffix select inputif()
        console.log(input)
        if (input.classList.contains('initial-input')) {
            const deleteInitialBtn = input.closest('.input-item').querySelector('.delete-initial')
            console.log(deleteInitialBtn)
            if (input.value) {


            }
        }
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