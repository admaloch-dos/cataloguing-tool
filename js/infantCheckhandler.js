
const infantCheckHandler = () => {
    const infantCheckBox = document.querySelector('#btn-check-infant')
    if (infantCheckBox.checked) {
        console.log(infantSpan)
        infantSpan.innerText = '[Infant]'
    } else {
        infantSpan.innerText = ''
    }
}