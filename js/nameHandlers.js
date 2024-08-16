const lastNameHandler = () => {
    const lastNameSection = document.querySelector('.last-name-section')
    return genStrings(lastNameSection)
}
const firstNameHandler = () => {
    const firstNameSection = document.querySelector('.first-name-section')
    return genStrings(firstNameSection)
}
const middleNameHandler = () => {
    const middleNameSection = document.querySelector('.middle-name-section')
    return genStrings(middleNameSection)
}

const extraNamesHandler = () => {
    const additionalNamesSection = document.querySelector('.additional-names-section')
    return genStrings(additionalNamesSection)
}
const titlesHandler = () => {
    const titleNameSection = document.querySelector('.title-section')
    return genStrings(titleNameSection)
}

//utility func for generating string for last/first/middle names preferred and secondary
const genStrings = (container) => {
    let preferred = '';
    let secondary = '';
    container.querySelectorAll('.preferred-btn').forEach(btn => {
        const textInput = btn.closest('.input-item').querySelector('.form-item-input')
        // console.log(textInput)
        if (!textInput) return
        const formattedInputVal = textInput.value.length > 0 && formatStrings(textInput)
        if (formattedInputVal && formattedInputVal.length > 0) {
            // console.log(formattedInputVal)
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
const formatStrings = (input) => {
    const inputVal = input.value
    const upperCaseVal = inputVal.slice(0, 1).toUpperCase() + inputVal.slice(1)
    if (input.id === 'nickname') {
        return `'${upperCaseVal}'`
    }  else if (input.id === 'middle-name' || input.id === 'additionalLastNames' || input.id === 'indigenousName' || input.id === 'title') {
        return inputVal.split(' ')
            .map(str => str.slice(0, 1).toUpperCase() + str.slice(1))
            .join(' ');
    } else {
        return upperCaseVal
    }
}