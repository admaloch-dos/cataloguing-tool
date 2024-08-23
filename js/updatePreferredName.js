
// //listen for the preferred btn checkbox buttons
// // if preferred btn is clicked.. that input text is the preffered name for that section
// // last first middle and title can only have one.. so this runs when a new one is clicked
// //it looks for the parent container and any preferred btn within and unclicks previious preferred if any

// const resetPreferredBtn = (currBtn) => {
//     // console.log('this ran')
//     const parentContainer = currBtn.closest('.single-preferred-name')
//     if (parentContainer) {
//         const preferredButtons = parentContainer.querySelectorAll('.preferred-btn');
//         preferredButtons?.forEach(btn => {
//             if (btn.id !== currBtn.id && btn.checked) {
//                 btn.click()
//             }
//         })
//     }
// }