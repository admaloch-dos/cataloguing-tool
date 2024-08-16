

//if current preferred input is deleted, reset to first input in container that has text
const resetPreferredBtn = (currBtn) => {
    const parentContainer = currBtn.closest('.name-section')
    if (parentContainer) {
        const preferredButtons = parentContainer.querySelectorAll('.preferred-btn');
        preferredButtons.forEach(btn => {
            if (btn.id !== currBtn.id && btn.checked) {
                btn.click()
            }
        })
    }
}