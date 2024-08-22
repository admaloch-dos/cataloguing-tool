const dataObj = {
    unknown:{
            isUnknown: false, unKnownInfo: ''
    },
    infant:{
        isInfant: false, unKnownInfo: ''
    },
    names:{
        lastName:{
            birthName: {value: '', isPreferred: true, isSecondary: false, isHidden: false},
            penName: {value: '', isPreferred: false, isSecondary: true, isHidden: false},
            anglicizedName: {value: '', isPreferred: false, isSecondary: true, isHidden: false}
        },
        firstName:{
            birthName: {value: '', isPreferred: true, isSecondary: false, isHidden: false},
            penName: {value: '', isPreferred: false, isSecondary: true, isHidden: false},
            anglicizedName: {value: '', isPreferred: false, isSecondary: true, isHidden: false},
            nickName: {value: '', isPreferred: false, isSecondary: true, isHidden: false}
        },
        middleName:{
            birthName: {value: '', isPreferred: true, isSecondary: false, isHidden: false},
            anglicizedName: {value: '', isPreferred: false, isSecondary: true, isHidden: false}
        },
        additionalNames:{
            maidenName: {value: '', isPreferred: true, isSecondary: false, isHidden: false},
            additionalLastNames: {value: '', isPreferred: false, isSecondary: true, isHidden: false},
            nameSuffix: {value: '', isPreferred: false, isSecondary: true, isHidden: false}
        },
        titleNames:{
            titleName: {value: '', isPreferred: true, isSecondary: false, isHidden: false},
            indigenousName: {value: '', isPreferred: false, isSecondary: true, isHidden: false},
        },
    },
    dates:{
        birthDate:{value: '', isCirca: false, beforeOrAfter: ''},
        deathDate:{value: '', isCirca: false, beforeOrAfter: ''},
        flourished:{value: '', isCirca: false, beforeOrAfter: ''},
    },
    enslaved:{
        isEnslaved: false, enslavedBy: ''
    }
}