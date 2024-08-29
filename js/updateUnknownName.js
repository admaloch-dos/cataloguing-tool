// //handle is name unknown checkbox -
// //select is revealed on click to specify if known - male/female etc..
// //this indicates taht all name related inputs are unknown and will be emptied/hidden on click
// const unknownNameBoxHandler = (isChecked) => {
//     const itemsToShowOrHide = "#infant-section, #title-section, #last-name-section, #first-name-section, #middle-name-section, #additional-names-section"
//     if (isChecked) {
//         clearSectionTextInputs('.name-section')
//         $(itemsToShowOrHide).addClass('d-none').removeClass('d-flex')
//         $('#unknownData').addClass('d-flex').removeClass('d-none')
//         const suffixSelect = document.querySelector('#nameSuffix')
//         suffixSelect.selectedIndex = 0;
//         triggerEvent(suffixSelect)
//     } else {
//         $('#unknownData').addClass('d-none').removeClass('d-flex')
//         $(itemsToShowOrHide).addClass('d-flex').removeClass('d-none')
//     }
// }



