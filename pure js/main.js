
const DROPDOWN_HEIGHT = 45 * 6

const LANG_WRAPPER = 'language-wrapper'
const DROPDOWN_ID = 'lang-dropdown'

const languages = [
    {
        name: '日本語',
        locale: 'ja'
    },
    {
        name: 'ภาษาไทย',
        locale: 'th'
    },
    {
        name: 'English',
        locale: 'en'
    },
    {
        name: '繁體中文',
        locale: 'ch'
    },
    {
        name: '简体中文',
        locale: 'tw'
    },
    {
        name: 'Tiếng Việt',
        locale: 'vi'
    },
]

let callbackFunction

function LoadCSS( cssURL ) {

    // 'cssURL' is the stylesheet's URL, i.e. /css/styles.css

    return new Promise( function( resolve, reject ) {

        var link = document.createElement( 'link' );

        link.rel  = 'stylesheet';

        link.href = cssURL;

        document.head.appendChild( link );

        link.onload = function() {

            resolve();

            console.log( 'CSS has loaded!' );
        };
    } );
}

// const languages = {
//     ja: '日本語',
//     th: 'ภาษาไทย',
//     en: 'English',
//     ch: '繁體中文',
//     tw: '简体中文',
//     vi: 'Tiếng Việt',
// }

let dropdownBtn,dropdownMenu

const checkDropdownPosition =  function () {
    if (window.innerHeight - dropdownBtn.getBoundingClientRect().bottom < DROPDOWN_HEIGHT){
        dropdownMenu.style.top = 'auto'
        dropdownMenu.style.bottom = '26px'
        // dropdownMenu.style.bottom = '46px'
    } else {
        dropdownMenu.style.top = '46px'
        dropdownMenu.style.bottom = 'auto'
    }
}

const showDropdown = function () {
    dropdownMenu.style.display = 'block';
    dropdownMenu.classList.add('show');
};

const closeDropdown = function () {
    dropdownMenu.classList.remove('show');
    setTimeout(()=>{
        dropdownMenu.style.display = 'none';
        dropdownMenu.style.top = 'auto'
        dropdownMenu.style.bottom = 'auto'
    }, 200)
};

const toggleDropdown = function () {
    if (dropdownMenu.classList.contains('show')) {
        closeDropdown();
    } else {
        checkDropdownPosition();
        showDropdown();
    }
}

function createButton(languageId, item) {
    // item created ex:
    // <button id="btn" class="btn">日本語</button>

    const el = document.createElement('button');
    el.setAttribute('id', 'btn');

    el.addEventListener('click', function handleClick(event) {
        event.stopPropagation();
        toggleDropdown();
    });

    el.textContent = item.name;

    el.className = 'btn'

    const dropdown = document.getElementById(languageId);
    dropdown.appendChild(el);

    dropdownBtn = document.getElementById("btn");
}

const createOption = function (item, langCookie) {
    // item created ex:
    // <div id='ja' class="dropdown-item" onclick="onSelect('ja')">日本語</div >

    const el = document.createElement('div');
    el.setAttribute("id", item.locale);

    el.addEventListener('click', function handleClick(event) {
        onSelect(item)
    });

    el.textContent = item.name;

    el.className = 'dropdown-item'

    if(item.locale === langCookie.locale) el.className += ' selected'

    const dropdown = document.getElementById(DROPDOWN_ID);
    dropdown.appendChild(el);
}

function createListOption(langCookie) {
    dropdownMenu = document.getElementById(DROPDOWN_ID);

    // Create element
    for(let i = 0; i < languages.length; i++) {
        createOption(languages[i], langCookie)
    }

    // for (const [key, value] of Object.entries(languages)) {
    //     console.log(`${key}: ${value}`);
    // }
}

async function createChangeLanguageArea(languageId, langCookie) {
    LoadCSS( 'main.css' ).then( async function() {

        console.log( 'Another function is triggered after CSS had been loaded.' );

        await createButton(languageId, langCookie)
        await createListOption(langCookie)

    } );


}

function onSelect(item) {
    let elements = document.getElementsByClassName('dropdown-item');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
    }
    document.getElementById(item.locale).classList.add('selected');
    dropdownBtn.innerHTML = item.name;

    callbackFunction(item.locale)
}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookie[k.trim()] = v;
    })
    return cookie[name];
}

// window.onload = async (event) => {
//     await createChangeLanguageArea()
// };

// <div id='language'></div>
// => commom component
// callBack = (vi)=>{
//
// }
// currentLanguage = ggj_lang
export async function changeLanguage(languageId,cookieName,callbackFn) {
    console.log('inside callback------------')
    console.log(languageId)
    console.log(cookieName)

    // Get cookie via cookieName
    const lang = getCookie(cookieName)

    // Implement UI into <div id="language">
    const div = document.createElement('div');
    div.setAttribute('id', LANG_WRAPPER);
    div.setAttribute('class', 'change-lang-container');
    div.innerHTML = `
        <label for="lang-dropdown"></label>
        <div class="dropdown" id="lang-dropdown"></div>
    `;
    document.getElementById(languageId).appendChild(div);

    const langCookie = languages.find(item => item.locale === lang)
    await createChangeLanguageArea(languageId, langCookie)

    // return callback function
    callbackFn(lang)
    callbackFunction = callbackFn
}