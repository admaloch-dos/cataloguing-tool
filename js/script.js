//bootstrap popover init
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))



//main listener for any name inputs, last, first, middle, additional, titles
//all logic/helper funcs related to this exported to updateNameInputs.js
document.querySelectorAll('.form-input').forEach(input =>
    input.addEventListener('input', (e) => {

        let updatedObj = { ...personDataObj }

        //handle form inputs
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

                if (inputItem.isPreferred) {
                    preferredNameStr += `${itemVal} `
                } else {
                    secondaryNameStr += `${itemVal} `
                }
            }
        }

        secondaryNameStr = secondaryNameStr.trim() ? `(${secondaryNameStr})` : ''

        const { unknown, birthDate, deathDate, flourished, enslaved, infant } = personDataObj

        const formattedUnknown = unknown.unknownData ? `[${unknown.unknownData}]` : ''

        const infantStr = infant.isInfant ? '[infant]' : ''

        let enslavedStr = ''
        
        if (enslaved.isEnslaved) {
            enslavedStr = !enslaved.value ? '(Enslaved person)' : `(Enslaved by ${enslaved.value})`
        }

        const resStr = `${formattedUnknown} ${preferredNameStr} ${infantStr} ${secondaryNameStr} ${birthDate.resultStr} ${deathDate.resultStr} ${flourished.resultStr} ${enslavedStr}`

        //preview item
        document.querySelector('#previewText').innerText = resStr

        // console.log(personDataObj)
    })
);



