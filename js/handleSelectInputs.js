const handleSelectInputs = (input, obj) => {

    let updatedObj = { ...obj }

    if (input.type === 'select-one') {
        const parentSection = input.closest('.input-item')
        const locatedObjKey = parentSection && parentSection.querySelector('.form-input').id
        const locatedObjItem = updatedObj[locatedObjKey]
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
    return updatedObj;
}