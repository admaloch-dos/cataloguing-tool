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
    // lastNameHandler()
}

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

const lastNameHandler = () => {
    let lastNameInput = document.querySelector('#lastName')
    let lastPenInput = document.querySelector('#penNameLast')
    let lastAnglicizedInput = document.querySelector('#anglicizedLastName')
    // console.log(lastNameInput.value, lastPenInput.value, lastAnglicizedInput.value)
    // if(lastNameInput.value) {
    //     const checkBoxes = lastNameInput.
    // }

    const checkbox = document.getElementById('btn-check');
    console.log(checkbox.checked)

}



//listen for every form input item and show checkbox + select items on text input
const formInputItems = document.querySelectorAll('.form-item-input').forEach(input => {
    input.addEventListener('keyup', () => {
        const checkBoxesContainer = input.nextElementSibling
        if (input.value) {
            checkBoxesContainer.classList.remove('d-none')
            checkBoxesContainer.classList.add('d-flex')
        } else {
            checkBoxesContainer.classList.remove('d-flex')
            checkBoxesContainer.classList.add('d-none')
        }
    })

})

document.querySelectorAll('.btn-check').forEach(btn => {
    btn.addEventListener('click', function () {
        console.log(this.checked)
    });
})


//temporary hide hide toggle
const hideItemToggle = document.querySelectorAll('.hide-item-toggle').forEach(item => {
    item.closest('.custom-checkbox ').classList.remove('d-flex')
    item.closest('.custom-checkbox ').classList.add('d-none')
})