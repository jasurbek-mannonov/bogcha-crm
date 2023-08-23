const addZero = val => val > 9 ? val : `0${val}`

export const convertDate = (date, type = 0) => {
    if (!date) return false
    let d = new Date(date)

    return type == 0 ? `${addZero(d.getHours())}:${addZero(d.getMinutes())} ${addZero(d.getDate())}.${addZero(d.getMonth())}.${d.getFullYear()}` : 
    `${addZero(d.getDate())}.${addZero(d.getMonth())}.${d.getFullYear()}`
}