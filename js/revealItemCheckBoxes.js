//helper func - options for each input are hidden by default- on input change they will be revealed
const revealItemCheckBoxes = (input) => {
    if (!input) return
    const checkBoxesContainer = input.nextElementSibling
    if (checkBoxesContainer) {
        // console.log(checkBoxesContainer)
        // console.log(input.id)
        if (input.id !== 'firstInitial' || input.id !== 'middleInitial') {
            if (input.value) {
                checkBoxesContainer.classList.remove('d-none')
                checkBoxesContainer.classList.add('d-flex')
            } else {
                checkBoxesContainer.classList.remove('d-flex')
                checkBoxesContainer.classList.add('d-none')
            }
        }

    }
}