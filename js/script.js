const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


// form data entry

let unknownNameSpan = document.querySelector('.unknown-name-span')
let preferredNameSpan = document.querySelector('.preferred-name-span')
let secondaryNameSpan = document.querySelector('.secondary-name-span')
let yearsSpan = document.querySelector('.years-span')
let enslavedSpan = document.querySelector('.enslaved-span')

//main update string handler-- listens for every text input
const updateStringHandler = (inputElement) => {

    revealFirstNameOptions(inputElement) //if first name input filled - reveal initial or shortened name option
    unknownSpanHandler()
    let currSection = ''
    currSection = inputElement ? inputElement.closest('.main-section').id : ''

    const { preferred: preferredLastName, secondary: secondaryLastNames } = lastNameHandler()
    const { preferred: preferredFirstName, secondary: secondaryFirstName } = firstNameHandler()

    preferredNameSpan.innerText = `${preferredLastName}${preferredFirstName}`
    secondaryNameSpan.innerText = `(${secondaryLastNames}${secondaryFirstName})`
}

const lastNameHandler = () => {
    const lastNameSection = document.querySelector('.last-name-section')
    return genStrings(lastNameSection)
}
const firstNameHandler = () => {
    const firstNameSection = document.querySelector('.first-name-section')
    return genStrings(firstNameSection)
}






//for unknown checkbox
const unknownSpanHandler = () => {
    const unknownCheckBox = document.querySelector('.unknown-item-toggle')
    const unknownNameSelect = document.querySelector('#unknownNameSelect')
    // console.log(unknownNameSelect)
    if (unknownCheckBox.checked) {
        unknownNameSpan.innerText = `[${unknownNameSelect.value}]`
        $('#unknownNameSelect, .unknown-name-span').fadeIn()
        $('.last-name-section, .first-name-section, .middle-name-section, .additional-names-section, .title-section').fadeOut();
    } else {
        $('#unknownNameSelect, .unknown-name-span').fadeOut()
        $('.last-name-section, .first-name-section, .middle-name-section, .additional-names-section, .title-section').fadeIn();
    }
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
                preferred = formattedInputVal
            } else {
                secondary += !secondary ? formattedInputVal : ` ${formattedInputVal}`
            }
        }
    })
    return { preferred, secondary }
}

//specially format strings based on specific input id
const formatStrings = (input) => {
    const upperCaseVal = input.value.slice(0, 1).toUpperCase() + input.value.slice(1)
    if (input.id === 'nickname') {
        return `'${upperCaseVal}'`
    } else {
        return upperCaseVal
    }
}

//various funcs/listeners
//listen for every form input item and show checkbox + select items on text input
const formInputItems = document.querySelectorAll('.form-item-input').forEach(input => {
    input.addEventListener('keyup', () => {

        const checkBoxesContainer = input.nextElementSibling
        const prefferedBtn = checkBoxesContainer.querySelector('.preferred-btn')
        if (input.value) {
            // checkBoxesContainer.classList.remove('d-none')
            // checkBoxesContainer.classList.add('d-flex')
            if (prefferedBtn && !prefferedBtn.checked) prefferedBtn.click()
        } else {
            // checkBoxesContainer.classList.remove('d-flex')
            // checkBoxesContainer.classList.add('d-none')
            if (prefferedBtn && prefferedBtn.checked) prefferedBtn.click()
            resetPreferredInput(input)
        }
    })
})

const revealFirstNameOptions = (inputElement) => {
    if (inputElement && inputElement.id === 'firstName') {
        if (inputElement.value.length > 2) {
            $('#first-init-preferred-item, #preferred-shortname-item').removeClass('d-none').addClass('d-flex');
        } else {
            $('#first-init-preferred-item, #preferred-shortname-item').removeClass('d-flex').addClass('d-none');
        }
    }
}

// if the current preferred input is erased, search for the first input that has text
const resetPreferredInput = (input) => {
    const parentContainer = input.closest('.name-section')
    const filledInput = Array.from(parentContainer.querySelectorAll('.form-item-input')).find(input => input.value.length > 0);
    if (filledInput) {
        const prefferedBtn = filledInput.nextElementSibling.querySelector('.preferred-btn')
        prefferedBtn.click()
    }
    updateStringHandler()
}

//listen for the preferred btn for last first and middle names and unclick if new one is clicked -- only one item can be preferred
document.querySelectorAll('.preferred-btn').forEach(btn => {
    btn.addEventListener('change', function () {
        const parentContainer = this.closest('.name-section')
        if (parentContainer) {
            const preferredButtons = parentContainer.querySelectorAll('.preferred-btn');
            preferredButtons.forEach(btn => {
                if (btn.id !== this.id && btn.checked) {
                    btn.click()
                    console.log(this)
                }
            })
        }
        updateStringHandler()
    });
})

//handler for first initial btn to populate name field when pressed
const firstInitBtn = document.querySelector('#firstInitBtn')
firstInitBtn.addEventListener('input', () => {
    console.log(firstInitBtn.checked);
    const initialInput = document.querySelector('#firstInitial')
    if (firstInitBtn.checked) {
        const fullName = document.querySelector('#firstName').value
        initialInput.value = `.${fullName.slice(0, 1).toUpperCase()}`
    } else {
        initialInput.value = ''
    }
});



//temporary hide hide toggle
const hideItemToggle = document.querySelectorAll('.hide-item-toggle').forEach(item => {
    item.closest('.custom-checkbox ').classList.remove('d-flex')
    item.closest('.custom-checkbox ').classList.add('d-none')
})