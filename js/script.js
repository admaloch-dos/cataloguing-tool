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
document.querySelectorAll('.name-input').forEach(nameInput =>
    nameInput.addEventListener('input', () => {
        nameInputsHandler(nameInput)
    })
);

//main listener for year inputs from form - birth date, death date, flourished
//all logic/helper funcs related to this exported to updateNameInputs.js
document.querySelectorAll('.year-input').forEach(yearInput =>
    yearInput.addEventListener('input', () => {
        yearInputsHandler(yearInput)
    })
);

//main listener for enslaved input and text input that pops up if clicked
//all logic/helper funcs related to this exported to updateEnslaved.js
document.querySelectorAll('.enslaved-input').forEach(input => {
    input.addEventListener('input', () => {
        enslavedInputsHandler(input)
    })
})

//main listener for is name unknown checkbox and unknown select options
//all logic/helper funcs related to this exported to updateUnknownName.js
document.querySelector('.unknown-item-toggle').addEventListener('change', unknownNameBoxHandler)


//main listener for the infant checkbox
//all logic/helper funcs related to this exported to updateInitialPreferred.js
document.querySelector('#btn-check-infant').addEventListener('input', infantCheckHandler)


//unknown person type select that shows up if above is run ^
document.querySelector('#unknownNameSelect').addEventListener('change', () => {
    unknownNameSpan.innerText = `[${unknownNameSelect.value}]`
})


//main listener for initial preffered checkboxes for first and middle name sections
//all logic/helper funcs related to this exported to updateInitialPreferred.js
document.querySelector('#firstInitialBtn').addEventListener('input', firstInitialBtnHandler)
document.querySelector('#middleInititialBtn').addEventListener('input', middleInitialsBtnHandler)


//main listener for the suffix select
//all logic/helper funcs related to this exported to updateSuffixSelect.js
document.querySelector('#suffixSelect').addEventListener('change', suffixSelectHandler)


//main listener for all .preferred-btn checkbox btn inputs - these are for any name related input
//all logic/helper funcs related to this exported to updatePreferredName.js
document.querySelectorAll('.preferred-btn').forEach(btn => {
    btn.addEventListener('change', function () {
        resetPreferredBtn(this)
        nameInputsHandler() //btn presses triggers the main name input handler ^^ to run and update preffered name span
    });
})


//temporary hide hide btn toggle
const hideItemToggle = document.querySelectorAll('.hide-item-toggle').forEach(item => {
    item.closest('.custom-checkbox ').classList.remove('d-flex')
    item.closest('.custom-checkbox ').classList.add('d-none')
})

