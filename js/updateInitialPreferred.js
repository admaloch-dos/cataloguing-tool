
const firstInitialBtnHandler = () =>{
    const firstInitialBtn = document.querySelector('#firstInitialBtn');
    const firstNameInputVal = document.querySelector('#firstNameInput').value;
    const firstInitialInput = document.querySelector('#firstInitialInput')
    const updatedFirstInitialVal = getInitialValue(firstInitialBtn.checked, firstNameInputVal);
    firstInitialInput.value = updatedFirstInitialVal;
    triggerEvent(firstInitialInput)
}

const middleInitialsBtnHandler = () =>{
    const midInitialBtn = document.querySelector('#middleInititialBtn');
    const midNameInputVal = document.querySelector('#middle-name').value;
    const midInitialInput = document.querySelector('#middleInitialInput')
    const updatedMidInitialVal = getInitialValue(midInitialBtn.checked, midNameInputVal);
    midInitialInput.value = updatedMidInitialVal;
    triggerEvent(midInitialInput)
}

// helper to take input and add to array, incase there are multiple then turn into initials with .
const getInitialValue = (isChecked, nameInputVal) => {
    if (isChecked) {
        return nameInputVal.split(' ')
            .map(str => str.slice(0, 1).toUpperCase() + '.')
            .join(' ')
    } else {
        return '';
    }
}
