let currentYear = new Date().getFullYear()
let currentMonth = new Date().getMonth() + 1
/**
 * Функция создаёт месяц для календаря в виде таблицы.
 * @param {string} elem html-элемент или тег куда будет вставляться таблица.
 * @param {number} year текущий год, который указан в переменной.
 * @param {number} month месяц в числовом формате.
 */
const createMonth = (elem, year, month) => {
    elem = document.querySelector(elem)

    let monthTwelveType = month - 1
    let dateYearAndMonth = new Date(year, monthTwelveType)

    const options = {
    month: 'long',
    }

    /**
     * Функция получает название месяца на русском и создаёт его с заглавной буквы.
     * @return {string} Название месяца на русском языке с большой буквы. Например: "Январь".
     */
    const monthOnARussianLanguageWithUpperCaseFirstLetterForHeader = () => {
        const monthOnARussianLanguage = dateYearAndMonth.toLocaleString('ru', options)

        return monthOnARussianLanguage[0].toUpperCase() + monthOnARussianLanguage.slice(1)
    }
    const monthforHeader = monthOnARussianLanguageWithUpperCaseFirstLetterForHeader()

    
    let table = `
    <table class="calendar__month ${dateYearAndMonth.toLocaleString('en-US', options).toLowerCase()}">
    <caption class="month__header">
        <h2 class="month__title">${monthforHeader}</h2>
    </caption>
    <tr class="weekday-date">
        <th>Пн</th>
        <th>Вт</th>
        <th>Ср</th>
        <th>Чт</th>
        <th>Пт</th>
        <th>Сб</th>
        <th>Вс</th>
    </tr>
    <tr class="weekday-days">
    `
    for (let i = 0; i < getDay(dateYearAndMonth); i++) {
        table += '<td></td>'
    }
    
    while (dateYearAndMonth.getMonth() == monthTwelveType) {
        table += '<td><span class="cell-inner">' + dateYearAndMonth.getDate() + '</span></td>'
        if (getDay(dateYearAndMonth) === 6) {
            table += '</tr><tr class="weekday-days">'
        }
        dateYearAndMonth.setDate(dateYearAndMonth.getDate() + 1)
    }

    if (getDay(dateYearAndMonth) != 0) {
        for (let i = getDay(dateYearAndMonth); i < 7; i++) {
            table += '<td></td>'
        }
    }
    
    table += '</tr></table>'
    elem.insertAdjacentHTML('afterBegin', table)
}

/**
 * Функция для того, чтобы переделать воскресенье с 0 на 7
 * @param {number} date Номер дня недели.
 * @returns {number} пн = 0, вс = 6. 
 */
const getDay = (date) => {
    let day = date.getDay()
    if (day === 0) {
        day = 7
    }
    return day - 1
}

/**
 * Функция с циклом для создания всего календаря на 12 месяцев.
 */
const createAllCalendar = () => {
    for (let i = 12; i >= 1; i--) {
        createMonth('.calendar-wrapper', currentYear, i)
    }
}

createAllCalendar()

/**
 * Функция, которая отображает текущий год и месяц отдельно.
 * @param {string} elem html тег, в который будет вставлен текущий месяц.
 */
const createCurrentMonth = (elem) => {
    elem = document.querySelector(elem)
    
    createMonth('.current-month', currentYear, currentMonth)
}

createCurrentMonth()


/**
 * Функция, которая создаёт навигацию по годам.
 * @param {string} elem html тег, в который будет вставляться навигация
 */
const createYearsNavigation = (elem) => {
    elem = document.querySelector(elem)

    let yearsNavigation = `
    <button class="previous-year" type="button"></button>
    <div class="current-year">${currentYear}</div>
    <button class="next-year" type="button"></button>
    `

    elem.insertAdjacentHTML('afterBegin', yearsNavigation) 
}

createYearsNavigation('.year-navigation')

/**
 * Функция, которая при клике на кнопку показывает календарь на предыдущий год.
 * При этом очищает от старой разметки.
 */
const displayPreviousYear = () => {
    const buttonPreviousYear = document.querySelector('.previous-year')
    buttonPreviousYear.addEventListener('click', () => {
        currentYear -= 1
        const yearDisplay = document.querySelector('.current-year')
        yearDisplay.textContent = currentYear

        body = document.querySelector('.container')
        body.innerHTML = ''

        createAllCalendar()
    })
}

displayPreviousYear()

/**
 * Функция, которая при клике на кнопку показывает календарь на следующий год.
 * При этом очищает от старой разметки.
 */
const displayNextYear = () => {
    const buttonNextYear = document.querySelector('.next-year')
    buttonNextYear.addEventListener('click', () => {
        currentYear += 1
        const yearDisplay = document.querySelector('.current-year')
        yearDisplay.textContent = currentYear

        body = document.querySelector('.container')
        body.innerHTML = ''

        createAllCalendar()
    })
}

displayNextYear()

/**
 * Функция, которая создаёт и вставляет список контактов в html разметку.
 * @param {string} elem html тег, в который юудет вставлен список контактов.
 */
const makeAContactsList = (elem) => {
    elem = document.querySelector(elem)

    let contactsList = `
    <ul class="contacts-list">
        <li class="contacts-item"><a href="https://vk.com/enzotech" target="_blank" rel="noopener noreferrer"><img src="/icons/vkontakte.png" alt="" width="25" height="25" loading="lazy"></a></li>
        <li class="contacts-item"><a href="https://t.me/enzotech" target="_blank" rel="noopener noreferrer"><img src="/icons/telegram.png" alt="" width="25" height="25" loading="lazy"></a></li>
        <li class="contacts-item"><a href="https://github.com/Enz0tech" target="_blank" rel="noopener noreferrer"><img src="/icons/github.png" alt="" width="25" height="25" loading="lazy"></a></li>
    </ul>
    `

    elem.insertAdjacentHTML('afterBegin', contactsList)
}

makeAContactsList('.contacts')


// const makeActiveCell = () => {
//     const isActiveCell = document.querySelectorAll('.cell-inner')

//         cells.forEach(cell => {
//         cell.addEventListener('click', () => {
//             cell.classList.toggle('is-active') // БЕЗ точки!
//         })
//     })
//     // addEventListener('click', () => {
//     //     isActiveCell.forEach(cell => cell.classList.toggle('is-active'));
//     // })
// }

// makeActiveCell()