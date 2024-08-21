//conditionals for name form text inputs preferred and secondary

const formatPrimaryLastName = (preferredLastName, preferredTitleName, preferredFirstName) => {
    if (!preferredLastName || preferredTitleName && preferredFirstName) return ''
    if(preferredFirstName || preferredTitleName) {
        return `${preferredLastName}, `
    } else {
        return preferredLastName
    }
}

const formatPrimaryFirstName = (preferredFirstName, preferredTitleName, preferredLastName) => {
    if (!preferredFirstName || preferredTitleName && preferredLastName) return ''
    if(preferredLastName || preferredTitleName) {
        return `${preferredFirstName}, `
    } else {
        return preferredFirstName
    }
}