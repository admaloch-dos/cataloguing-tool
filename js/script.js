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

        const { unknown, firstBirthName, firstInitial, middleBirthName, middleInitial, birthDate, deathDate, flourished, enslaved, infant, nonHuman, ficticious } = personDataObj


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

        secondaryNameStr = secondaryNameStr.trim()
        preferredNameStr = preferredNameStr.trim()


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
                suffixStr = suffixItem.resultStr
            } else {
                secondaryNameStr += suffixItem.resultStr
                suffixStr = ''
            }
        } else {
            suffixStr = ''
        }

        //format birth date str
        let birthDateStr = ''
        if (!deathDate.resultStr && birthDate.resultStr && !deathDate.isAlive) {
            birthDateStr = `b. ${birthDate.resultStr}`
        } else if (deathDate.resultStr && birthDate.resultStr || !deathDate.resultStr && birthDate.resultStr && deathDate.isAlive) {
            birthDateStr = `${birthDate.resultStr}-`
        } else {
            birthDateStr = birthDate.resultStr
        }

        //format deathdate str
        let deathDateStr = ''
        if (!birthDate.resultStr && deathDate.resultStr && !deathDate.isAlive) {
            deathDateStr = `d. ${deathDate.resultStr}`
        } else if (!birthDate.resultStr && deathDate.resultStr && deathDate.isAlive) {
            deathDateStr = ''
        } else {
            deathDateStr = deathDate.resultStr
        }

        //flourished name str
        const flourishedStr = flourished.resultStr ? `fl. ${flourished.resultStr}` : ''

        //format unknown person item
        // const formattedUnknown = unknown.unknownData ? `[${unknown.unknownData}],` : ''
        let formattedUnknown = ''
        if (unknown.isUnknown) {
            const isCommaNeeded = birthDateStr || deathDateStr || flourishedStr
             formattedUnknown = unknown.unknownData ? `[${unknown.unknownData}]` : ''
             formattedUnknown = isCommaNeeded ? `${formattedUnknown},` : formattedUnknown

        }

        //format infant str
        let infantStr = ''
        if (infant.isInfant) {
            const isCommaNeeded = birthDateStr || deathDateStr || flourishedStr
            infantStr = infant.isInfant ? '[infant]' : ''
            infantStr = isCommaNeeded ? `${infantStr},` : infantStr
        }

        //format non human str
        let nonHumanTypeStr = ''
        if (nonHuman.isNonHuman && nonHuman.resultStr) {
            const areDatesKnown = birthDateStr || deathDateStr || flourishedStr
            nonHumanTypeStr = areDatesKnown ? `(${nonHuman.resultStr}),` : `(${nonHuman.resultStr})`
        }

        //format ficticious person str
        let ficticiousPersonStr = ''
        if (ficticious.isFicticious) {
            const isCommaNeeded = birthDateStr || deathDateStr || flourishedStr
            ficticiousPersonStr = !ficticious.resultStr ? '(ficticious person)' : `(ficticious person from ${ficticious.resultStr})`
            ficticiousPersonStr = !isCommaNeeded ? ficticiousPersonStr : `${ficticiousPersonStr},`
        }


        //format secondary name str
        if (secondaryNameStr) {
            secondaryNameStr = `(${secondaryNameStr})`
            const isSecondaryTheEnd = !suffixStr && !birthDateStr && !deathDateStr && !flourishedStr && !enslavedStr
            secondaryNameStr = isSecondaryTheEnd ? secondaryNameStr : `${secondaryNameStr},`
        }

        // format preferred name str
        if (preferredNameStr) {
            const isPreferredAlone = !secondaryNameStr && !suffixStr && !birthDateStr && !deathDateStr && !flourishedStr && !enslavedStr
            const isCommaNeeded = (!secondaryNameStr && !isPreferredAlone && (suffixStr || birthDateStr || deathDateStr || flourishedStr || enslavedStr))
            preferredNameStr = isCommaNeeded ? `${preferredNameStr},` : preferredNameStr
        }


        let resStr = `${formattedUnknown} ${preferredNameStr} ${infantStr} ${nonHumanTypeStr} ${secondaryNameStr}${suffixStr} ${ficticiousPersonStr} ${birthDateStr}${deathDateStr} ${flourishedStr} ${enslavedStr}`

        // regex to finalize certain quirks that conditionals coudn't quite get rid of
        // resStr = resStr.replace(/,{2}/g, ',');
        resStr = resStr.trim()
        resStr = resStr.replace(/\s+/g, ' ');
        resStr = resStr.replace(/,(\s*,)+/g, ',');
        resStr = resStr.replace(/\s*,/g, ",");
        resStr = resStr.replace(/,\s*$/, ",");

        //preview item
        document.querySelector('#previewText').value = resStr.trim()

        console.log(personDataObj)

    })
);


// i need a regex that does multiple things



//temporary hide hide btn toggle
const hideItemToggle = document.querySelectorAll('.hide-item-toggle').forEach(item => {
    item.closest('.custom-checkbox ').classList.remove('d-flex')
    item.closest('.custom-checkbox ').classList.add('d-none')
})

