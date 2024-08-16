const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


// form data entry
let unknownNameSpan = document.querySelector('.unknown-name-span')
let preferredNameSpan = document.querySelector('.preferred-name-span')
let infantSpan = document.querySelector('.infant-span')
let secondaryNameSpan = document.querySelector('.secondary-name-span')
let yearsSpan = document.querySelector('.years-span')
let enslavedSpan = document.querySelector('.enslaved-span')

//main update string handler-- listens for every text input
const updateStringHandler = (inputElement) => {
    setCurrInputAsDefault(inputElement) // when new input is typed in it sets that as new preferred
    revealExtraNameOptions(inputElement) //if first name input filled - reveal initial or shortened name option

    const { preferred: preferredLastName, secondary: secondaryLastNames } = lastNameHandler()
    const { preferred: preferredFirstName, secondary: secondaryFirstName } = firstNameHandler()
    const { preferred: preferredMiddleName, secondary: secondaryMiddleName } = middleNameHandler()

    preferredNameSpan.innerText = `${preferredLastName}${preferredFirstName}${preferredMiddleName}`
    secondaryNameSpan.innerText = `(${secondaryLastNames}${secondaryFirstName}${secondaryMiddleName})`
}

//is name unknown? checkbox handler
document.querySelector('.unknown-item-toggle').addEventListener('change', unknownNameBoxHandler)

//unknown person type select that shows up if above is run ^
document.querySelector('#unknownNameSelect').addEventListener('change', () => {
    unknownNameSpan.innerText = `[${unknownNameSelect.value}]`
})

//listen for the preferred btn for last first and middle names and unclick if new one is clicked -- only one item can be preferred
document.querySelectorAll('.preferred-btn').forEach(btn => {
    btn.addEventListener('change', function () {
        resetPreferredBtn(this)
        updateStringHandler()
    });
})


//listner for initial btn for first name
document.querySelector('#firstInitialBtn').addEventListener('input', handleFirstInitialPreferred)

document.querySelector('#middleInititialBtn').addEventListener('input', handleMiddleInitialPreferred)

document.querySelector('#btn-check-infant').addEventListener('input', infantCheckHandler)

//temporary hide hide toggle
const hideItemToggle = document.querySelectorAll('.hide-item-toggle').forEach(item => {
    item.closest('.custom-checkbox ').classList.remove('d-flex')
    item.closest('.custom-checkbox ').classList.add('d-none')
})



const testInputVal = 'david james'
const testInputArr = testInputVal.split(' ').map(str => str.slice(0, 1).toUpperCase() + '.').join(' ')
console.log(testInputArr)