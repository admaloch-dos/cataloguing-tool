//bootstrap popover init
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))



//main listener for any name inputs, last, first, middle, additional, titles
//all logic/helper funcs related to this exported to updateNameInputs.js
document.querySelectorAll('.form-input').forEach(input =>
    input.addEventListener('input', (e) => {

        let updatedObj = { ...personDataObj }

        //handle form inputs
        //logic for these exported to formInputHandlers.js
        const inputUpdatedObj = updatedObj && handleTextInputs(input, updatedObj)
        if (inputUpdatedObj) updatedObj = inputUpdatedObj

        const checkBoxUpdatedObj = handleCheckInputs(input, updatedObj)
        if (checkBoxUpdatedObj) updatedObj = checkBoxUpdatedObj

        const selectUpdatedObj = handleSelectInputs(input, updatedObj)
        if (selectUpdatedObj) updatedObj = selectUpdatedObj

        //update curr item to preferred on input change
        setCurrItemAsPreferred(input);



        personDataObj = updatedObj;

        //loop over obj and create primary and secondary strings
        let preferredNameStr = '';
        let secondaryNameStr = '';

        const { unknown, firstBirthName, firstInitial, middleBirthName, middleInitial, birthDate, deathDate, flourished, enslaved, infant } = personDataObj

        for (let input in personDataObj) {

            const inputItem = personDataObj[input]
            if (typeof inputItem.isPreferred !== 'undefined') {
                let itemVal = inputItem.resultStr

                if (firstInitial.isPreferred || middleInitial.isPreferred) {
                    if (input === 'firstInitial') {
                        if (firstInitial.isPreferred && middleBirthName.isPreferred) {
                            secondaryNameStr += `${middleBirthName.resultStr} `
                        }
                    }
                    if (input === 'middleInitial') {
                        if (middleInitial.isPreferred && firstBirthName.isPreferred) {
                            secondaryNameStr = `${firstBirthName.resultStr}${secondaryNameStr} `
                        }

                    }
                }

                if (input !== 'nameSuffix') {
                    if (inputItem.isPreferred) {
                        preferredNameStr += `${itemVal} `
                    } else {
                        secondaryNameStr += `${itemVal} `
                    }
                }
            }
        }

        //format unknown person item
        const formattedUnknown = unknown.unknownData ? `[${unknown.unknownData}],` : ''

        //format infant str
        const infantStr = infant.isInfant ? '[infant]' : ''

        //format enslaved person str
        let enslavedStr = ''
        if (enslaved.isEnslaved) {
            enslavedStr = !enslaved.value ? '(enslaved person)' : `(enslaved by ${enslaved.value})`
        }

        //format suffix name
        const suffixItem = personDataObj.nameSuffix
        let suffixStr = ''
        if (suffixItem.value) {
            if (suffixItem.isPreferred) {
                console.log('suffix item is preferred')
                suffixStr = suffixItem.resultStr
            } else {
                console.log('suffix item is not preferred')

                secondaryNameStr += suffixItem.resultStr
                suffixStr = ''
                console.log('secondary name str:', secondaryNameStr)
            }
        } else {
            suffixStr = ''
        }
        if (secondaryNameStr.trim()) {
            secondaryNameStr = `(${secondaryNameStr.trim()})`
            if (birthDate.resultStr ||
                deathDate.resultStr ||
                flourished.resultStr ||
                enslavedStr) {
                secondaryNameStr = `${secondaryNameStr},`
            }
        }
        secondaryNameStr = secondaryNameStr.trim()
        secondaryNameStr = secondaryNameStr.trim()
        if (preferredNameStr.trim() && !secondaryNameStr.trim()) {
            console.log('this ran')
            preferredNameStr = `${preferredNameStr.trim()},`
        }

        //format deathdate str
        const deathDateStr = !birthDate.resultStr && deathDate.resultStr ? `-${deathDate.resultStr}` : deathDate.resultStr



        let resStr = `${formattedUnknown} ${preferredNameStr} ${infantStr} ${secondaryNameStr}${suffixStr} ${birthDate.resultStr}${deathDateStr} ${flourished.resultStr} ${enslavedStr}`

        // regex to finalize certain quirks that conditionals coudn't quite get rid of
        // resStr = resStr.replace(/,{2}/g, ',');
        resStr = resStr.replace(/,(\s*,)+/g, ',');


        //preview item
        document.querySelector('#previewText').innerText = resStr

        // console.log(personDataObj)
    })
);


const deleteInitialBtn = document.querySelectorAll('.delete-initial')

deleteInitialBtn.forEach(btn => {
    let updatedObj = { ...personDataObj }
    btn.addEventListener('click', () => {
        let currInputId = ''
        let currObjItem = {}
        if (btn.id === 'deleteFirstInitialBtn') {
            currObjItem = updatedObj.firstInitial
            currInputId = '#firstInitial'
        } if (btn.id === 'deleteMidInitialBtn') {
            currObjItem = updatedObj.middleInitial
            currInputId = '#middleInitial'
        }
        const textInput = document.querySelector(currInputId)
        if (textInput.value) {
            textInput.value = ''
            triggerEvent(textInput)
            currObjItem = { value: '', isPreferred: false, isHidden: false, resultStr: '' }
            personDataObj = updatedObj
        }
    })


})



//temporary hide hide btn toggle
const hideItemToggle = document.querySelectorAll('.hide-item-toggle').forEach(item => {
    item.closest('.custom-checkbox ').classList.remove('d-flex')
    item.closest('.custom-checkbox ').classList.add('d-none')
})

