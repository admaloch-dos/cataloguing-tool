
const handleFirstInitialPreferred = () => {
    const initialBtn = document.querySelector('#firstInitialBtn');
    const nameInputVal = document.querySelector('#firstNameInput').value;
    const initialInput = document.querySelector('#firstInitialInput')
    const newValue = getInitialValue(initialBtn.checked, nameInputVal);
    initialInput.value = newValue;
}
const handleMiddleInitialPreferred = () => {
    const initialBtn = document.querySelector('#middleInititialBtn');
    const nameInputVal = document.querySelector('#middle-name').value;
    const initialInput = document.querySelector('#middleInitialInput')
    const newValue = getInitialValue(initialBtn.checked, nameInputVal);
    initialInput.value = newValue;
}

// take input and add to array, incase there are multiple then turn into initials with .
const getInitialValue = (isChecked, nameInputVal) => {
    if (isChecked) {
        return nameInputVal.split(' ')
            .map(str => str.slice(0, 1).toUpperCase() + '.')
            .join(' ')
    } else {
        return '';
    }
}
