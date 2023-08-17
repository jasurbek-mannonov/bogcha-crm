const addZero = val => val > 9 ? val : `0${val}`

export const convertDate = (date) => {
    let d = new Date(date)

    return `${addZero(d.getHours())}:${addZero(d.getMinutes())} ${addZero(d.getDate())}.${addZero(d.getMonth())}.${d.getFullYear()}`
}