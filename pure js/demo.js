import {changeLanguage} from "./main.js";

const callbackFuntion = (data) => {
    console.log('callbackFuntion data: ', data)
}

export function checkMe() {
    console.log('check me')

}

async function onTestData() {
    console.log('on testtttt')
    const languageId = 'change-langer'
    const cookieName = 'ggj_lang'
    await changeLanguage(languageId, cookieName, callbackFuntion)
}

window.onload = async () => {
    await onTestData()
}