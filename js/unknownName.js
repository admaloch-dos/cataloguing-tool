//handle is name unknown checkbox - reveal select
const unknownCheckBox = document.querySelector('.unknown-item-toggle')
unknownCheckBox.addEventListener('change', () => {
    if (unknownCheckBox.checked) {
        unknownNameSpan.innerText = '[Unnamed Person]'
        $('#unknownNameSelect, .unknown-name-span').fadeIn()
        $('.last-name-section, .first-name-section, .middle-name-section, .additional-names-section, .title-section').fadeOut();
    } else {
        $('#unknownNameSelect, .unknown-name-span').fadeOut()
        $('.last-name-section, .first-name-section, .middle-name-section, .additional-names-section, .title-section').fadeIn();
    }
})

//unnamed select options handler
const unknownNameSelect = document.querySelector('#unknownNameSelect')
unknownNameSelect.addEventListener('change', () => {
    unknownNameSpan.innerText = `[${unknownNameSelect.value}]`
})
