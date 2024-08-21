//all logic for .enslaved-input.. if the checkbox is clicked it reveals text input if the slave owner name was known
//both the checkbox and text input have the enslaved-input that is being listened for.. so test for checkbox or text input
const enslavedInputsHandler = (input) => {
    if (input.type === 'checkbox') {
        if (input.checked) {
            $('#enslaved-text-item').removeClass('d-none').addClass('d-flex')
            enslavedSpan.innerText = ' (enslaved person)'
        } else {
            $('#enslaved-text-item').removeClass('d-flex').addClass('d-none')
        }
    } else {
        const formattedInput = capFirstLettersInStr(input.value)
        enslavedSpan.innerText = `(Enslaved by ${formattedInput})`
    }
}