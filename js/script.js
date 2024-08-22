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

//main listener for any name inputs, last, first, middle, additional, titles
//all logic/helper funcs related to this exported to updateNameInputs.js
document.querySelectorAll('.form-input').forEach(nameInput =>
    nameInput.addEventListener('input', (e) => {
        nameInputsHandler(nameInput)
    })
);


