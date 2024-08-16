const revealExtraNameOptions = (inputElement) => {
    if (inputElement && inputElement.id === 'firstNameInput') {
        if (inputElement.value.length > 2) {
            $('#first-init-preferred-item, #preferred-shortname-item').removeClass('d-none').addClass('d-flex');
        } else {
            $('#first-init-preferred-item, #preferred-shortname-item').removeClass('d-flex').addClass('d-none');
        }
    }
    if (inputElement && inputElement.id === 'middle-name') {
        if (inputElement.value.length > 2) {
            $('#mid-init-preferred-item').removeClass('d-none').addClass('d-flex');
        } else {
            $('#mid-init-preferred-item').removeClass('d-flex').addClass('d-none');
        }
    }
}

