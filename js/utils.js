const resetTextInput = (inputSelector) => {
    const inputItem = document.querySelector(inputSelector)
    inputItem.value = ''
}

const triggerEvent = (input) => {
    const event = new Event('input', {
        bubbles: true, // Allow the event to bubble up
        cancelable: true // Allow the event to be canceled
    });
    input.dispatchEvent(event);
}

const clearNameSpans = () => {
    preferredNameSpan.innerText = '';
    infantSpan.innerText = '';
    secondaryNameSpan.innerText = '';
}

// takes a string with multiple words and capitalizes first letter of each word
const capFirstLettersInStr = (inputStr) => {
    return inputStr.toLowerCase().split(' ')
        .map(str => str.slice(0, 1).toUpperCase() + str.slice(1))
        .join(' ');
}

const genInitials = (inputStr) => {
    return inputStr.toLowerCase().split(' ')
        .map(str => str.slice(0, 1).toUpperCase() + '.')
        .join(' ');
}


const capFirstLetterInStr = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
}


//input a section tag and any input in that section will be emptied
//helper to handle emptieing name related inputs if filled in
// last, first, middle, additional names, titles etc..
const clearSectionTextInputs = (sectionTag) => {
    const sections = document.querySelectorAll(sectionTag)
    sections.forEach(section => {
        const inputItems = section.querySelectorAll('.form-item-input')
        inputItems.forEach(input => {
            if (input.type === 'text') {
                input.value = ''
                triggerEvent(input)
            }
        })
    })
}

const clearIndividualTextInputs = (inputArr) => {
    if (!inputArr.length) return;
    for (let input of inputArr) {
        const inputElement = document.querySelector(input)
        inputElement.value = ''
        triggerEvent(inputElement)
    }
}

//next 2 funcs - take current text input, and a comparison id.. if they are the same it will hide or reveal a list of inputted items
//only works if bootstrap d-none and d-flex are used to show or hide the item
const hideIndividualTextInputs = (isInput, items) => {
    isInput
        ? $(items).removeClass('d-flex').addClass('d-none')
        : $(items).removeClass('d-none').addClass('d-flex')
}

const revealIndividualTextInputs = (isInput, items) => {
    isInput
        ? $(items).removeClass('d-none').addClass('d-flex')
        : $(items).removeClass('d-flex').addClass('d-none')
}