

//pass in preferred or secondary to determine what string to format
const formatLastName = (nameObj, preferredOrSecondary) => {
    const { last, first, middle, title, extras } = nameObj
    if (!last[preferredOrSecondary]) return ''
    if (first[preferredOrSecondary] || middle[preferredOrSecondary] || extras[preferredOrSecondary] || title[preferredOrSecondary]) {
        return `${last[preferredOrSecondary]}, `
    } else {
        return last[preferredOrSecondary]
    }
}

const formatMiddleName = (nameObj, preferredOrSecondary) => {
    const { last, first, middle, title, extras } = nameObj
    if (!middle[preferredOrSecondary]) return ''

    if (last[preferredOrSecondary] || first[preferredOrSecondary] || extras[preferredOrSecondary] || title[preferredOrSecondary]) {
        return ` ${middle[preferredOrSecondary]}`
    } else {
        return middle[preferredOrSecondary]
    }
}

const formatExtraNames = (nameObj, preferredOrSecondary) => {
    const { last, first, middle, title, extras } = nameObj
    if (!extras[preferredOrSecondary]) return ''

    if (last[preferredOrSecondary] || first[preferredOrSecondary] || middle[preferredOrSecondary] || title[preferredOrSecondary]) {
        return ` ${extras[preferredOrSecondary]}`
    } else {
        return extras[preferredOrSecondary]
    }
}


