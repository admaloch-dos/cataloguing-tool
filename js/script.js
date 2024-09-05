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

        for (let input in personDataObj) {
            const inputItem = personDataObj[input]
            if (typeof inputItem.isPreferred !== 'undefined') {
                let itemVal = inputItem.resultStr
                // console.log(inputItem)
                if (input === 'firstBirthName') {
                    const middleInitPreffered = personDataObj.middleInitial.isPreferred
                    const firstInitPreffered = personDataObj.firstInitial.isPreferred
                    if (middleInitPreffered && !firstInitPreffered) {
                        secondaryNameStr += `${itemVal} `
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





        const { unknown, birthDate, deathDate, flourished, enslaved, infant } = personDataObj

        const formattedUnknown = unknown.unknownData ? `[${unknown.unknownData}],` : ''

        const infantStr = infant.isInfant ? '[infant]' : ''

        let enslavedStr = ''

        if (enslaved.isEnslaved) {
            enslavedStr = !enslaved.value ? '(Enslaved person)' : `(Enslaved by ${enslaved.value})`
        }



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
                console.log('secondary name str:',secondaryNameStr)
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


        const resStr = `${formattedUnknown} ${preferredNameStr} ${infantStr} ${secondaryNameStr}${suffixStr}${birthDate.resultStr}${deathDate.resultStr} ${flourished.resultStr} ${enslavedStr}`

        //preview item
        document.querySelector('#previewText').innerText = resStr

        // console.log(personDataObj)
    })
);

//temporary hide hide btn toggle
const hideItemToggle = document.querySelectorAll('.hide-item-toggle').forEach(item => {
    item.closest('.custom-checkbox ').classList.remove('d-flex')
    item.closest('.custom-checkbox ').classList.add('d-none')
})

