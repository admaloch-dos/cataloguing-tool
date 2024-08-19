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

//utility func for generating string for last/first/middle names preferred and secondary
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
    }  else if (input.id === 'middle-name' || input.id === 'additionalLastNames' || input.id === 'indigenousName' || input.id === 'title') {
        return inputVal.split(' ')
            .map(str => str.slice(0, 1).toUpperCase() + str.slice(1))
            .join(' ');
    } else {
        return upperCaseVal
    }
}