//handle is name unknown checkbox - reveal select
const unknownNameBoxHandler = () => {
    const unknownCheckBox = document.querySelector('.unknown-item-toggle')
    if (unknownCheckBox.checked) {
        unknownNameSpan.innerText = '[Unnamed Person]'
        $('#unknownNameSelect, .unknown-name-span').fadeIn()
        $('.last-name-section, .first-name-section, .middle-name-section, .additional-names-section, .title-section').fadeOut();
    } else {
        $('#unknownNameSelect, .unknown-name-span').fadeOut()
        $('.last-name-section, .first-name-section, .middle-name-section, .additional-names-section, .title-section').fadeIn();
    }
}


