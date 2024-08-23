//bootstrap popover init
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// form data entry
let unknownNameSpan = document.querySelector('.unknown-name-span')
let preferredNameSpan = document.querySelector('.preferred-name-span')
let infantSpan = document.querySelector('.infant-span')
let secondaryNameSpan = document.querySelector('.secondary-name-span')
let yearsSpan = document.querySelector('.years-span')
let enslavedSpan = document.querySelector('.enslaved-span')

// const allForms = document.querySelectorAll()

//main listener for any name inputs, last, first, middle, additional, titles
//all logic/helper funcs related to this exported to updateNameInputs.js
document.querySelectorAll('.form-input').forEach(input =>
    input.addEventListener('input', (e) => {

        revealItemCheckBoxes(input)
        const id = input.id

        const currObjItem = personDataObj[input.id]

        if (input.type === 'text') {

            if (id === 'firstBirthName') {
                hideIndividualTextInputs(input.value.length, '#title-input-container');
                revealIndividualTextInputs(input.value.length, '#first-init-preferred-item, #preferred-shortname-item');
            } else if (id === 'middleBirthName') {
                revealIndividualTextInputs(input.value.length, '#mid-init-preferred-item');
            }

            currObjItem.value = input.value //set value of obj item to input value
            //if the item has these options set these too
            if (currObjItem.isPreferred ) {
                currObjItem.isPreferred = input.value ? true : false

            }
            // console.log(currObjItem)
        }
        const parentItem = input.closest('.input-item')
        const locatedObjKey = parentItem && parentItem.querySelector('.form-input').id
        const locatedObjItem = personDataObj[locatedObjKey]

        if (input.type === 'checkbox') {

            if (input.classList.contains('preferred-btn')) {
                locatedObjItem.isPreferred = input.checked

                resetPreferredBtn(input)
            } else if (input.classList.contains('hide-item-toggle')) {
                locatedObjItem.isHidden = input.checked
            } else if (id === 'unknownCheckbox') {
                personDataObj.unknown.isUnknown = input.checked
                personDataObj.unknown.unknownData = input.checked ? '[Unnamed Person]' : ''
                unknownNameBoxHandler(input.checked) // hide/show/delete item inputs etc...
            } else if (id === 'enslavedCheckbox') {
                personDataObj.enslaved.isEnslaved = input.checked
                personDataObj.enslaved.value = input.checked ? '(Enslaved Person)' : ''
                revealIndividualTextInputs(input.checked, '#enslaved-text-item');
            } else if (id === 'infantCheckbox') {
                personDataObj.infant.isInfant = input.checked
                infantCheckHandler(input.checked)
            } else {
                // console.log(locatedObjKey)
                locatedObjItem.isCirca = input.checked
            }
        }
        if (input.type === 'select-one') {
            if (id === 'unknownData') {
                personDataObj.unknown[id] = input.value
            }
            else if (id === 'nameSuffix') {
                personDataObj[id].value = input.value
                personDataObj[id].isPreferred = input.value ? true : false
            }
            else { //birthdate/death/flourished
                locatedObjItem.beforeOrAfter = input.value
            }


        }
        setCurrItemAsPreferred(input)


        console.log(personDataObj)

    })
);

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
                document.querySelector('#middleInitialInput').value = ''
            } else if (input.id === 'firstBirthName') {
                document.querySelector('#firstInitial').value = ''
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
        console.log(filledInput)
        const prefferedBtn = filledInput.nextElementSibling.querySelector('.preferred-btn')
        prefferedBtn.click()
    }
    // nameInputsHandler()
}