const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


// form data entry

let unknownNameSpan = document.querySelector('.unknown-name-span')
let preferredNameSpan = document.querySelector('.preferred-name-span')
let secondaryNameSpan = document.querySelector('.secondary-name-span')
let yearsSpan = document.querySelector('.years-span')
let enslavedSpan = document.querySelector('.enslaved-span')


const updateStringHandler = () => {
    unknownSpanHandler()
    const {preferredLastName, secondaryLastName} = lastNameHandler()


    preferredNameSpan.innerText = `${preferredLastName}`
    secondaryNameSpan.innerText = ` (${secondaryLastName})`
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

// for last name section
const lastNameHandler = () => {
    let preferredLastName = '';
    let secondaryLastName = '';
    let lastNameSection = document.querySelector('.last-name-section')
    lastNameSection.querySelectorAll('.preferred-btn').forEach(btn => {
        const textValue = btn.closest('.input-item').querySelector('.form-item-input').value
        // console.log(textValue)
        if (textValue && textValue.length > 1) {
            const formattedInput = textValue.slice(0, 1).toUpperCase() + textValue.slice(1)
            if (btn.checked) {
                preferredLastName = formattedInput
            } else {
                if (textValue) {
                    console.log(secondaryLastName)
                    secondaryLastName += !secondaryLastName ? formattedInput : ` ${secondaryLastName}`
                }
            }
        }
    })
    return { preferredLastName, secondaryLastName }
}

//func for generating string for last/first/middle names

// const genStrings = (container, preferredName, )


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
            preferredButtons.forEach(item => {
                if (item.id !== this.id && item.checked) {
                    item.click()
                }
            })
        }
        updateStringHandler()
    });
})


//temporary hide hide toggle
const hideItemToggle = document.querySelectorAll('.hide-item-toggle').forEach(item => {
    item.closest('.custom-checkbox ').classList.remove('d-flex')
    item.closest('.custom-checkbox ').classList.add('d-none')
})