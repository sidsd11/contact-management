export const formatDateTime = (date) => {
    const d = new Date(date)

    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = String(d.getFullYear()).slice(-2)

    let hour = d.getHours()
    const min = String(d.getMinutes()).padStart(2, '0')
    const ampm = hour >= 12 ? 'pm' : 'am'
    hour = hour % 12 || 12

    return `${day}/${month}/${year} ${hour}:${min} ${ampm}`
}