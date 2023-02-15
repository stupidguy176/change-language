
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

let dropdownBtn,dropdownMenu

const checkDropdownPosition =  function () {
    if (window.innerHeight - dropdownBtn.getBoundingClientRect().bottom < DROPDOWN_HEIGHT){
        dropdownMenu.style.top = 'auto'
        dropdownMenu.style.bottom = '46px'
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

function createButton(item) {
    const el = document.createElement('button');
    el.setAttribute('id', 'btn');

    el.addEventListener('click', function handleClick(event) {
        event.stopPropagation();
        toggleDropdown();
    });

    el.textContent = item.name;

    el.className = 'btn'

    const dropdown = document.getElementById(LANG_WRAPPER);
    dropdown.appendChild(el);

    dropdownBtn = document.getElementById("btn");
}

const createOption = function (item) {
    // item created ex:
    // <div id='ja' class="dropdown-item" onclick="onSelect('ja')">
    //     日本語
    // </div >
    const el = document.createElement('div');
    el.setAttribute("id", item.locale);

    el.addEventListener('click', function handleClick(event) {
        onSelect(item)
    });

    el.textContent = item.name;

    el.className = 'dropdown-item'

    const dropdown = document.getElementById(DROPDOWN_ID);
    dropdown.appendChild(el);
}

function createListOption() {
    dropdownMenu = document.getElementById(DROPDOWN_ID);

    // Create element
    for(let i = 0; i < languages.length; i++) {
        createOption(languages[i])
    }
}

async function createChangeLanguageArea() {
    await createButton(languages[0])
    await createListOption()
}

function onSelect(item) {
    let elements = document.getElementsByClassName('dropdown-item');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('selected');
    }
    document.getElementById(item.locale).classList.add('selected');
    dropdownBtn.innerHTML = item.name;
}

window.onload = async (event) => {
    await createChangeLanguageArea()
};

// <div id='language'></div>
// => commom component
// callBack = (vi)=>{
//
// }
// currentLanguage = ggj_lang
// export function changeLanguage(language,currentLanguage,callbackFn) {
//     // Get cookie via currentLanguage
//
//     // Implement UI into <div id="language">
//
//
//     //TODO:
//     // set skijan.com, .gogogjungle.co.jp,
//     //callAPISetCookie(vi)
//
//     // return callback function
//     callbackFn()
// }